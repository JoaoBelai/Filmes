"""
Este módulo lida com a criação de "solicitações" (propostas de adição
ou edição de filmes) feitas por usuários. Ele também permite que
administradores listem, aprovem ou rejeitem essas solicitações.
"""

import json 
from database.db_connection import get_session
from users.auth import verificar_admin, verificar_logado
from requests.querys_request import (
    Q_INSERT_SOLICITACAO,
    Q_GET_SOLICITACOES_PENDENTES,
    Q_GET_ONE_SOLICITACAO,
    Q_UPDATE_STATUS_SOLICITACAO
)
from filmes.querys_filmes import (
    Q_INSERT_FILME, Q_INSERT_CATEGORIA, Q_LINK_FILME_CATEGORIA,
    Q_INSERT_DIRETOR, Q_LINK_FILME_DIRETOR,
    Q_INSERT_ATOR, Q_LINK_FILME_ATOR,
    Q_UPDATE_FILME, Q_DELETE_LINKS_CATEGORIA,
    Q_DELETE_LINKS_DIRETOR, Q_DELETE_LINKS_ATOR
)

def handle_request(handler):
    """
    Função principal de roteamento para a rota /requests.

    Verifica o método HTTP e o caminho para direcionar a 
    requisição à função correta 
    """
    path_parts = handler.path.split('/')
    id_solicitacao = None
    
    # Verifica se a URL contém um ID 
    if len(path_parts) > 2 and path_parts[2].isdigit():
        id_solicitacao = int(path_parts[2])

    if handler.command == 'POST':
        handle_post_request(handler)

    elif handler.command == 'GET':
        handle_get_request(handler)

    elif handler.command == 'PUT' and id_solicitacao is not None:
        handle_approve_request(handler, id_solicitacao)

    elif handler.command == 'DELETE' and id_solicitacao is not None:
        handle_reject_request(handler, id_solicitacao)

    else:
        handler._enviar_resposta(405, {"erro": f"Metodo {handler.command} nao permitido em /requests"})


def handle_post_request(handler):
    """
    Gerencia a criação de uma nova solicitação 
    Qualquer usuário logado pode enviar. A função armazena a
    proposta de mudança  como um JSON na tabela 'solicitacoes'
    com status 'pendente'.
    """
    user_payload = verificar_logado(handler)
    if not user_payload:
        return
    
    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return
        
    cursor = None
    try:
        id_user = user_payload.get('id')
        role_usuario = user_payload.get('role')

        # Lê o corpo (body) da requisição
        content_length = int(handler.headers['Content-Length'])
        body = handler.rfile.read(content_length).decode('utf-8')
        dados_propostos = json.loads(body)

        tipo = dados_propostos.get('tipo_solicitacao') 
        id_filme = dados_propostos.get('id_filme_alvo', None)

        # Remove campos de metadados antes de salvar o JSON
        dados_propostos.pop('tipo_solicitacao', None)
        dados_propostos.pop('id_filme_alvo', None)

        # Converte o resto dos dados em uma string JSON para armazenar
        dados_json = json.dumps(dados_propostos)

        params = (id_user, role_usuario, tipo, id_filme, dados_json)
        cursor = conn.cursor()
        conn.start_transaction()
        cursor.execute(Q_INSERT_SOLICITACAO, params)
        conn.commit()

        handler._enviar_resposta(202, {"mensagem": "Solicitacao recebida e aguardando aprovacao"})

    except Exception as e:
        if conn: conn.rollback()
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    finally:
        if cursor: 
            cursor.close()
        if conn and conn.is_connected(): 
            conn.close()


def handle_get_request(handler):
    """
    Gerencia a listagem de solicitações 
    Apenas administradores podem ver a lista de solicitações
    que ainda precisam de aprovação.
    """
    user_payload = verificar_admin(handler)
    if not user_payload:
        return

    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return
        
    cursor = None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(Q_GET_SOLICITACOES_PENDENTES)
        solicitacoes = cursor.fetchall()
        handler._enviar_resposta(200, solicitacoes)
    
    except Exception as e:
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()


def handle_approve_request(handler, id_solicitacao):
    """
    Gerencia a aprovação de uma solicitação

    Apenas administradores podem aprovar esta função:
    1. Busca a solicitação pendente pelo ID
    2. Lê o JSON armazenado e identifica o tipo 
    3. Executa a lógica de criação ou edição de filme
    4. Se a operação for bem-sucedida, atualiza o status da
       solicitação para 'aprovado'
    """
    user_payload = verificar_admin(handler)
    if not user_payload:
        return

    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return
        
    cursor = None
    try:
        cursor = conn.cursor(dictionary=True)
        conn.start_transaction()

        # Busca a solicitação que será aprovada
        cursor.execute(Q_GET_ONE_SOLICITACAO, (id_solicitacao,))
        solicitacao = cursor.fetchone()

        if not solicitacao:
            handler._enviar_resposta(404, {"erro": "Solicitacao pendente não encontrada"})
            conn.rollback()
            return
        
        tipo = solicitacao['tipo']
        dados_propostos = json.loads(solicitacao['dados_propostos'])

        # Se for uma solicitação de 'add', executa a lógica de criar um novo filme
        if tipo == 'add':
            filme_list =[
                dados_propostos.get('titulo'), dados_propostos.get('ano'),
                dados_propostos.get('duracao'), dados_propostos.get('sinopse'),
                dados_propostos.get('produtora'), dados_propostos.get('poster'),
                dados_propostos.get('banner')
            ]
            cursor.execute(Q_INSERT_FILME, filme_list)
            id_filme_novo = cursor.lastrowid

            for nome in dados_propostos.get('generos', []):
                cursor.execute(Q_INSERT_CATEGORIA, (nome,))
                cursor.execute("SELECT id FROM categoria WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_CATEGORIA, (res['id'], id_filme_novo))
            
            for nome in dados_propostos.get('diretores', []):
                cursor.execute(Q_INSERT_DIRETOR, (nome,))
                cursor.execute("SELECT id FROM diretor WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_DIRETOR, (res['id'], id_filme_novo))
                
            for nome in dados_propostos.get('elenco', []):
                cursor.execute(Q_INSERT_ATOR, (nome,))
                cursor.execute("SELECT id FROM ator WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_ATOR, (res['id'], id_filme_novo))
        
        # Se for uma solicitação de 'edit', executa a lógica de atualizar um filme
        elif tipo == 'edit':
            id_filme = solicitacao['id_filme_alvo']
            if not id_filme:
                raise Exception("Solicitação de edição sem 'id_filme_alvo'")
            
            filme_list =[
                dados_propostos.get('titulo'), dados_propostos.get('ano'),
                dados_propostos.get('duracao'), dados_propostos.get('sinopse'),
                dados_propostos.get('produtora'), dados_propostos.get('poster'),
                dados_propostos.get('banner'),
                id_filme
            ]
            cursor.execute(Q_UPDATE_FILME, filme_list)
            
            cursor.execute(Q_DELETE_LINKS_CATEGORIA, (id_filme,))
            cursor.execute(Q_DELETE_LINKS_DIRETOR, (id_filme,))
            cursor.execute(Q_DELETE_LINKS_ATOR, (id_filme,))

            for nome in dados_propostos.get('generos', []):
                cursor.execute(Q_INSERT_CATEGORIA, (nome,))
                cursor.execute("SELECT id FROM categoria WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_CATEGORIA, (res['id'], id_filme))
            
            for nome in dados_propostos.get('diretores', []):
                cursor.execute(Q_INSERT_DIRETOR, (nome,))
                cursor.execute("SELECT id FROM diretor WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_DIRETOR, (res['id'], id_filme))
                
            for nome in dados_propostos.get('elenco', []):
                cursor.execute(Q_INSERT_ATOR, (nome,))
                cursor.execute("SELECT id FROM ator WHERE nome = %s", (nome,))
                res = cursor.fetchone()
                if res: 
                    cursor.execute(Q_LINK_FILME_ATOR, (res['id'], id_filme))

        # Após a lógica de 'add' ou 'edit' ser concluída,
        # atualiza o status da solicitação para 'aprovado'
        cursor.execute(Q_UPDATE_STATUS_SOLICITACAO, ('aprovado', id_solicitacao))
        conn.commit()
        handler._enviar_resposta(200, {"mensagem": f"Solicitacao {id_solicitacao} aprovada com sucesso."})

    except Exception as e:
        if conn: conn.rollback()
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    
    finally:
        if cursor: 
            cursor.close()
        if conn and conn.is_connected(): 
            conn.close()


def handle_reject_request(handler, id_solicitacao):
    """
    Gerencia a rejeição de uma solicitação
    Apenas administradores podem rejeitar. A lógica é mais simples:
    ela apenas atualiza o status da solicitação para 'rejeitado'
    e não aplica nenhuma mudança nos filmes.
    """
    user_payload = verificar_admin(handler)
    if not user_payload:
        return

    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return
        
    cursor = None
    try:
        cursor = conn.cursor()
        conn.start_transaction()

        # Atualiza o status para 'rejeitado'
        cursor.execute(Q_UPDATE_STATUS_SOLICITACAO, ('rejeitado', id_solicitacao))

        if cursor.rowcount == 0:
            handler._enviar_resposta(404, {"erro": "Solicitação pendente não encontrada"})
            conn.rollback()
        else:
            conn.commit()
            handler._enviar_resposta(200, {"mensagem": f"Solicitacao {id_solicitacao} rejeitada."})

    except Exception as e:
        if conn: 
            conn.rollback()
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    
    finally:
        if cursor: 
            cursor.close()
        if conn and conn.is_connected(): 
            conn.close()