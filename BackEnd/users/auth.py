import jwt
from database.db_connection import JWT_SECRET_KEY

def verificar_logado(handler):
    try:
        auth_header = handler.headers.get('Authorization')
        if not auth_header:
            handler._enviar_resposta(401, {"erro": "Token de autorização ausente"})
            return None
        
        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        
        return payload
    
    except jwt.ExpiredSignatureError:
        handler._enviar_resposta(401, {"erro": "Token expirado"})
        return None
    except (jwt.InvalidTokenError, IndexError, Exception) as e:
        handler._enviar_resposta(401, {"erro": f"Token invalido: {e}"})
        return None

def verificar_admin(handler):
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
        
        return payload

    except jwt.ExpiredSignatureError:
        handler._enviar_resposta(401, {"erro": "Token expirado"})
        return None
    except (jwt.InvalidTokenError, IndexError, Exception) as e:
        handler._enviar_resposta(401, {"erro": f"Token invalido: {e}"})
        return None