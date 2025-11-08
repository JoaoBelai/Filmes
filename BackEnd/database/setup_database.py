import mysql.connector
import os
from getpass import getpass
import sys


script_dir = os.path.dirname(os.path.abspath(__file__))

caminho_create = os.path.join(script_dir, 'CREATE_DB.sql')
caminho_insert = os.path.join(script_dir, 'INSERT_DB.sql')

try:
    user = getpass("Digite o user do MySQL: ")
    senha = getpass(f"Digite a senha do {user} do MySQL: ")

    print("Conectando ao banco de dados")
    conn = mysql.connector.connect(
        host="localhost",
        user=user,
        password=senha 
    )
    print("Conexão bem-sucedida!")

    cursor = conn.cursor()

    with open (caminho_create, 'r', encoding='utf-8') as f:
        sql_script_create = f.read()

    comandos = sql_script_create.split(';')

    for comando in comandos:
        if comando.strip():
            cursor.execute(comando)

    with open (caminho_insert, 'r', encoding='utf-8') as f:
        sql_script_insert = f.read()

    comandos = sql_script_insert.split(';')

    for comando in comandos:
        if comando.strip():
            cursor.execute(comando)

    conn.commit()
    print("\nBanco de dados criado e populado com sucesso!")

except mysql.connector.Error as err:
    print(f"Erro de MySQL: {err}")
    sys.exit()
except FileNotFoundError:
    print(f"Erro: Arquivo não encontrado")
    sys.exit()
except Exception as e:
    print(f"Um erro inesperado ocorreu: {e}")
    sys.exit()

finally:
    if cursor:
        cursor.close()
    if conn and conn.is_connected():
        conn.close()
        print("Conexão com MySQL fechada.")
