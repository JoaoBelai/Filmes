"""
Script de configuração inicial do banco de dados.
Este script é responsável por se conectar ao servidor MySQL local,
executar os scripts SQL para criar a estrutura do banco (CREATE_DB.sql)
e inserir os dados iniciais (INSERT_DB.sql).
Deve ser executado apenas uma vez para configurar o ambiente.
"""

import mysql.connector
import os
from getpass import getpass 
import sys

# Define o diretório atual do script para encontrar os arquivos .sql
script_dir = os.path.dirname(os.path.abspath(__file__))
caminho_create = os.path.join(script_dir, 'CREATE_DB.sql')
caminho_insert = os.path.join(script_dir, 'INSERT_DB.sql')

conn = None
cursor = None

try:
    # Solicita ao usuário o user/senha e tenta conectar ao MySQL
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

    # Lê e executa o script de CRIAÇÃO do banco e tabelas
    with open (caminho_create, 'r', encoding='utf-8') as f:
        sql_script_create = f.read()

    # Divide o arquivo em comandos individuais (separados por ';')
    comandos = sql_script_create.split(';')
    for comando in comandos:
        if comando.strip():  
            cursor.execute(comando)

    # Lê e executa o script de INSERÇÃO de dados iniciais
    with open (caminho_insert, 'r', encoding='utf-8') as f:
        sql_script_insert = f.read()

    comandos = sql_script_insert.split(';')
    for comando in comandos:
        if comando.strip():
            cursor.execute(comando)

    # Efetiva todas as mudanças (CREATE e INSERT) no banco
    conn.commit()
    print("\nBanco de dados criado e populado com sucesso!")

except mysql.connector.Error as err:
    print(f"Erro de MySQL: {err}")
    sys.exit()
except FileNotFoundError:
    print(f"Erro: Arquivo SQL não encontrado. Verifique os caminhos.")
    sys.exit()
except Exception as e:
    print(f"Um erro inesperado ocorreu: {e}")
    sys.exit()

finally:
    # Garante que, independente de sucesso ou falha,
    # a conexão com o banco seja sempre fechada.
    if cursor:
        cursor.close()
    if conn and conn.is_connected():
        conn.close()
        print("Conexão com MySQL fechada.")