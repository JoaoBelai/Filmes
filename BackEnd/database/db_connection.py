"""
Arquivo de Conexão com o Banco de Dados.
Este módulo centraliza a configuração de conexão com o MySQL e
fornece uma função (get_session) para criar e retornar uma
nova conexão com o banco de dados.
Também armazena a chave secreta JWT para autenticação.
"""

import mysql.connector
from mysql.connector import errorcode

# Dicionário com as credenciais de acesso ao banco MySQL.
# É usado pela função get_session() para estabelecer a conexão.
DB_CONFIG = {
    'user': 'admin', 
    'password': 'root', 
    'host': 'localhost',
    'database': 'Orion_Filmes'
}

# Chave secreta usada para criar e verificar os tokens JWT (JSON Web Tokens).
JWT_SECRET_KEY = "chaveSuperSecreta1234"

def get_session():
    """
    Cria e retorna uma nova conexão (sessão) com o banco de dados.
    Tenta conectar ao MySQL usando as credenciais do DB_CONFIG.
    """
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Erro: Usuário ou senha do MySQL incorretos no 'db_connection.py'.")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Erro: O banco de dados 'orion_filmes' não foi encontrado.")
            print("Lembre-se de rodar o 'setup_database.py' primeiro.")
        else:
            print(f"Erro ao conectar ao banco: {err}")
        return None