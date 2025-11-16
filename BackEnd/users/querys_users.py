"""
Este módulo contém uma versão "mock" (simulada) da função de
verificação de usuário. Em vez de consultar o banco MySQL, ele
compara as credenciais com uma lista fixa de usuários
"""

# Dicionário que simula a tabela 'usuarios' do banco.
# A chave é o email (que é único).
USUARIOS_MOCK = {
    "admin@email.com": { 
        "id": 1,
        "password": "admin123",
        "role": "admin"
    },
    "user@email.com": {
        "id": 2,
        "password": "user123", 
        "role": "user"
    }
}

def verificar_usuario(email, password):
    """
    Verifica se o email e a senha correspondem a um usuário válido
    1. Busca o usuário pelo email no dicionário MOCK
    2. Se o usuário não for encontrado, retorna None
    3. Se o usuário for encontrado, compara a senha enviada com a
       senha armazenada no MOCK.
    4. Retorna os dados do usuário (user_data) se a senha bater,
       ou None se não bater.
    """
    user_data = USUARIOS_MOCK.get(email)

    if not user_data:
        return None
    
    if user_data['password'] == password:
        return user_data

    return None