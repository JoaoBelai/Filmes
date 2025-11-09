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
    user_data = USUARIOS_MOCK.get(email)

    if not user_data:
        return None
    
    if user_data['password'] == password:
        return user_data
    
    return None