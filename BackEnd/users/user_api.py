"""
Este módulo contém a lógica para autenticar um usuário.
Ele recebe o email e a senha, verifica no banco de dados
e, se as credenciais estiverem corretas, gera e retorna
um token JWT (JSON Web Token) para o cliente.
"""

import json
import jwt
import datetime
from datetime import timezone
from users.querys_users import verificar_usuario
from database.db_connection import JWT_SECRET_KEY

def handle_login(handler):
    """
    Processa a requisição de login
    1. Lê o corpo da requisição 
    2. Chama a função 'verificar_usuario' para checar as credenciais no banco
    3. Se o usuário for válido, cria um 'payload' com os dados do usuário
       (id, role) e um tempo de expiração (1 hora)
    4. Gera um token JWT assinado com a chave secreta
    5. Envia o token para o cliente com status 200
    6. Se o usuário for inválido, envia um erro 401
    """
    try:
        # Lê e decodifica o JSON enviado pelo cliente
        content_length = int(handler.headers['Content-Length'])
        body = handler.rfile.read(content_length).decode('utf-8')
        login_data = json.loads(body)

        email = login_data.get('username') 
        password = login_data.get('password')

        # Valida as credenciais no banco de dados
        user_data = verificar_usuario(email, password)

        if user_data:
            # Define os dados que serão armazenados dentro do token
            payload = {
                "id": user_data['id'],
                "role": user_data['role'],
                # Define a expiração do token para 1 hora a partir de agora
                "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1) 
            }
            # Gera o token assinado
            token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

            handler._enviar_resposta(200, {"token": token})
        else:
            handler._enviar_resposta(401, {"erro": "Usuário ou senha inválidos"})

    except Exception as e:
        handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})