import json
import jwt
import datetime
from datetime import timezone
from users.querys_users import verificar_usuario
from database.db_connection import JWT_SECRET_KEY

def handle_login(handler):
    try:
        content_length = int(handler.headers['Content-Length'])
        body = handler.rfile.read(content_length).decode('utf-8')
        login_data = json.loads(body)

        email = login_data.get('username')
        password = login_data.get('password')

        user_data = verificar_usuario(email, password)

        if user_data:
            payload = {
                "id": user_data['id'],
                "role": user_data['role'],
                "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1) 
            }
            token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

            handler._enviar_resposta(200, {"token": token})
        else:
            handler._enviar_resposta(401, {"erro": "Usuário ou senha inválidos"})

    except Exception as e:
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})