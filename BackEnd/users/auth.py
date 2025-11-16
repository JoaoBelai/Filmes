"""
Este módulo contém funções auxiliares para verificar os tokens JWT
enviados no cabeçalho (Header) das requisições.

- verificar_logado: Garante que o usuário enviou um token válido.
- verificar_admin: Garante que o usuário tem um token válido E
  que ele possui a permissão (role) de 'admin'.
"""

import jwt
from database.db_connection import JWT_SECRET_KEY

def verificar_logado(handler):
    """
    Verifica se o usuário está logado (possui um token JWT válido)
    Busca o token no cabeçalho 'Authorization', decodifica
    e trata erros comuns
    Retorna o payload se o token for válido,
    ou None se a autenticação falhar 
    """
    try:
        # Pega o cabeçalho 'Authorization' 
        auth_header = handler.headers.get('Authorization')
        if not auth_header:
            handler._enviar_resposta(401, {"erro": "Token de autorização ausente"})
            return None
        
        # Extrai apenas o token, ignorando o "Bearer "
        token = auth_header.split(" ")[1]
        
        # Decodifica o token usando a chave secreta
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        
        # Se tudo deu certo, retorna os dados do usuário
        return payload
    
    except jwt.ExpiredSignatureError:
        handler._enviar_resposta(401, {"erro": "Token expirado"})
        return None
    except (jwt.InvalidTokenError, IndexError, Exception) as e:
        handler._enviar_resposta(401, {"erro": f"Token invalido: {e}"})
        return None

def verificar_admin(handler):
    """
    Verifica se o usuário é um Administrador
    Esta função faz tudo o que 'verificar_logado' faz mas adiciona uma verificação
    extra para garantir que o 'role' dentro do payload é 'admin'
    Usado para proteger rotas sensíveis Retorna o payload se for admin, ou None se falhar
    """
    try:
        auth_header = handler.headers.get('Authorization')

        if not auth_header:
            handler._enviar_resposta(401, {"erro": "Token de autorização ausente"})
            return None

        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])

        if payload.get('role') != 'admin':
            handler._enviar_resposta(403, {"erro": "Acesso proibido: Requer permissão de administrador"})
            return None
        
        # Se for admin, retorna os dados
        return payload

    except jwt.ExpiredSignatureError:
        handler._enviar_resposta(401, {"erro": "Token expirado"})
        return None
    except (jwt.InvalidTokenError, IndexError, Exception) as e:
        handler._enviar_resposta(401, {"erro": f"Token invalido: {e}"})
        return None