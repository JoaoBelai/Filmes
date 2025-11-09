import mysql.connector
from mysql.connector import errorcode

DB_CONFIG = {
    'user': 'admin', 
    'password': 'root', 
    'host': 'localhost',
    'database': 'Orion_Filmes'
}

JWT_SECRET_KEY = "chaveSuperSecreta1234"

def get_session():
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