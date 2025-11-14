import json
from database.db_connection import get_session
from filmes.querys_filmes import (
    Q_GET_ALL_FILMES, Q_GET_ONE_FILME,
    Q_INSERT_FILME, Q_LINK_FILME_CATEGORIA, 
    Q_INSERT_ATOR, Q_INSERT_DIRETOR, Q_INSERT_CATEGORIA,
    Q_LINK_FILME_ATOR, Q_LINK_FILME_DIRETOR,
    Q_DELETE_FILME, Q_UPDATE_FILME, Q_DELETE_LINKS_ATOR,
    Q_DELETE_LINKS_CATEGORIA, Q_DELETE_LINKS_DIRETOR,
    Q_GET_CLASSICOS, Q_GET_NOVOS, Q_GET_DESTAQUES, Q_GET_CRITICA
)
from filtros.filtros import handle_filmes_filter
from users.auth import verificar_admin

def _formatar_filmes_resposta(filmes_lista):
    for filme in filmes_lista:
        if filme.get('generos'): filme['generos'] = filme['generos'].split(', ')
        if filme.get('diretores'): filme['diretores'] = filme['diretores'].split(', ')
        if filme.get('elenco'): filme['elenco'] = filme['elenco'].split(', ')
    return filmes_lista

def _fetch_e_enviar(handler, query):
    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return
    cursor = None
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query)
        filmes = cursor.fetchall()
        filmes_formatados = _formatar_filmes_resposta(filmes) 
        handler._enviar_resposta(200, filmes_formatados)
    except Exception as e:
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    finally:
        if cursor: cursor.close()
        if conn and conn.is_connected(): conn.close()

def get_filmes(handler, query_params):

    if not query_params and handler.path == '/filmes/destaques':
        _fetch_e_enviar(handler, Q_GET_DESTAQUES)

    elif not query_params and handler.path == '/filmes/classicos':
        _fetch_e_enviar(handler, Q_GET_CLASSICOS)

    elif not query_params and handler.path == '/filmes/novos':
        _fetch_e_enviar(handler, Q_GET_NOVOS)

    elif not query_params and handler.path == '/filmes/critica':
        _fetch_e_enviar(handler, Q_GET_CRITICA)

    elif not query_params and handler.path == '/filmes':
        _fetch_e_enviar(handler, Q_GET_ALL_FILMES)

    elif not query_params and handler.path.startswith('/filmes/'):
        conn = get_session()

        if not conn:
            handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
            return

        cursor = None
        try:
            id_filme = int(handler.path.split('/')[-1])

            cursor = conn.cursor(dictionary=True)

            cursor.execute(Q_GET_ONE_FILME, (id_filme,))
            filme = cursor.fetchone()

            if filme:
                filmes_formatados = _formatar_filmes_resposta([filme])
                handler._enviar_resposta(200, filmes_formatados[0])
            else:
                handler._enviar_resposta(404, {"erro" : "Filme não encontrado"})

        except ValueError:
            handler._enviar_resposta(400, {"erro": "ID invalido, deve ser um numero"})
        
        finally:
            if cursor: cursor.close()
            if conn and conn.is_connected(): conn.close()

    else:
        conn = get_session()
        handle_filmes_filter(handler, conn, query_params)


def post_filmes(handler):
    user_payload = verificar_admin(handler)

    if not user_payload:
        return
    
    conn = get_session()

    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return

    cursor = None
    try:
        content_length = int(handler.headers['Content-Length'])
        body = handler.rfile.read(content_length).decode('utf-8')
        novo_filme = json.loads(body)

        cursor = conn.cursor(dictionary=True)

        conn.start_transaction()
        film_list =[
            novo_filme.get('titulo'),
            novo_filme.get('ano'),
            novo_filme.get('duracao'),
            novo_filme.get('sinopse'),
            novo_filme.get('produtora'),
            novo_filme.get('poster'),
            novo_filme.get('banner')
        ]
        cursor.execute(Q_INSERT_FILME, film_list)

        id_novo_filme = cursor.lastrowid

        for nome_categoria in novo_filme.get('generos', []):
            cursor.execute(Q_INSERT_CATEGORIA, (nome_categoria,))
            cursor.execute("SELECT id FROM categoria WHERE nome = %s", (nome_categoria,))
            id_categoria = cursor.fetchone()
            if id_categoria:
                cursor.execute(Q_LINK_FILME_CATEGORIA, (id_categoria['id'], id_novo_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar categoria: {nome_categoria}")


        for nome_diretor in novo_filme.get('diretores', []):
            cursor.execute(Q_INSERT_DIRETOR, (nome_diretor,))
            cursor.execute("SELECT id FROM diretor WHERE nome = %s", (nome_diretor,))
            id_diretor_result = cursor.fetchone()
            if id_diretor_result:
                cursor.execute(Q_LINK_FILME_DIRETOR, (id_diretor_result['id'], id_novo_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar diretor: {nome_diretor}")


        for nome_ator in novo_filme.get('elenco', []):
            cursor.execute(Q_INSERT_ATOR, (nome_ator,))
            cursor.execute("SELECT id FROM ator WHERE nome = %s", (nome_ator,))
            id_ator_result = cursor.fetchone()
            if id_ator_result:
                cursor.execute(Q_LINK_FILME_ATOR, (id_ator_result['id'], id_novo_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar ator: {nome_ator}")

        conn.commit()

        resposta = {
            "id": id_novo_filme,
            "titulo": novo_filme.get('titulo'),
            "mensagem": "Filme criado com sucesso"
        }
        handler._enviar_resposta(201, resposta)
    
    except json.JSONDecodeError:
        handler._enviar_resposta(400, {"erro": "JSON invalido"})

    except Exception as e:
        if conn:
            conn.rollback()
            print(f"Trasação revertida. ERRO: {e}")
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
        
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()
                

def delete_filmes(handler):
    user_payload = verificar_admin(handler)

    if not user_payload:
        return
    
    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return

    cursor = None
    try:
        id_filme = int(handler.path.split('/')[-1])

        cursor = conn.cursor()
        
        conn.start_transaction()
        cursor.execute(Q_DELETE_FILME, (id_filme,))

        if cursor.rowcount == 0:
            conn.rollback()
            print("Filme não encontrado")
            handler._enviar_resposta(404, {"erro": "Filme nao encontrado"})
        else:
            conn.commit()
            handler._enviar_resposta(200, {"mensagem": f"Filme ID {id_filme} deletado com sucesso"})

    except (ValueError, IndexError, TypeError):
        handler._enviar_resposta(400, {"erro": "ID invalido"})

    except Exception as e:
        if conn:
            conn.rollback()
            print(f"Transação revertida. Erro: {e}")
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

        
def put_filmes(handler):
    user_payload = verificar_admin(handler)

    if not user_payload:
        return
    
    conn = get_session()
    if not conn:
        handler._enviar_resposta(500, {"erro": "Nao foi possivel conectar ao banco"})
        return

    cursor = None
    try:
        id_filme = int(handler.path.split('/')[-1])

        content_length = int(handler.headers['Content-Length'])
        body = handler.rfile.read(content_length).decode('utf-8')
        dados_atualizados = json.loads(body)

        cursor = conn.cursor(dictionary=True)

        conn.start_transaction()
        film_list =[
            dados_atualizados.get('titulo'),
            dados_atualizados.get('ano'),
            dados_atualizados.get('duracao'),
            dados_atualizados.get('sinopse'),
            dados_atualizados.get('produtora'),
            dados_atualizados.get('poster'),
            dados_atualizados.get('banner'),
            id_filme
        ]
        cursor.execute(Q_UPDATE_FILME, film_list)
        cursor.execute(Q_DELETE_LINKS_CATEGORIA, (id_filme,))
        cursor.execute(Q_DELETE_LINKS_DIRETOR, (id_filme,))
        cursor.execute(Q_DELETE_LINKS_ATOR, (id_filme,))

        for nome_categoria in dados_atualizados.get('generos', []):
            cursor.execute(Q_INSERT_CATEGORIA, (nome_categoria,))
            cursor.execute("SELECT id FROM categoria WHERE nome = %s", (nome_categoria,))
            id_categoria = cursor.fetchone()
            if id_categoria:
                cursor.execute(Q_LINK_FILME_CATEGORIA, (id_categoria['id'], id_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar categoria: {nome_categoria}")

        for nome_diretor in dados_atualizados.get('diretores', []):
            cursor.execute(Q_INSERT_DIRETOR, (nome_diretor,))
            cursor.execute("SELECT id FROM diretor WHERE nome = %s", (nome_diretor,))
            id_diretor_result = cursor.fetchone()
            if id_diretor_result:
                cursor.execute(Q_LINK_FILME_DIRETOR, (id_diretor_result['id'], id_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar diretor: {nome_diretor}")


        for nome_ator in dados_atualizados.get('elenco', []):
            cursor.execute(Q_INSERT_ATOR, (nome_ator,))
            cursor.execute("SELECT id FROM ator WHERE nome = %s", (nome_ator,))
            id_ator_result = cursor.fetchone()
            if id_ator_result:
                cursor.execute(Q_LINK_FILME_ATOR, (id_ator_result['id'], id_filme))
            else:
                raise Exception(f"Falha ao encontrar/criar ator: {nome_ator}")

        conn.commit()

        dados_atualizados['id'] = id_filme
        handler._enviar_resposta(200, dados_atualizados)
    
    except (ValueError, IndexError, TypeError):
        handler._enviar_resposta(400, {"erro": "ID invalido ou JSON malformado"})

    except Exception as e:
        if conn:
            conn.rollback()
            print(f"Transação revertida. Erro: {e}")
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()