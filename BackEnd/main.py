"""
Este script usa o módulo http.server nativo do Python para
criar um servidor HTTP. A classe 'MyHandle' atua como o
roteador principal, recebendo todas as requisições
e as direcionando para os 'handlers' corretos
"""

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs
from filmes.filmes_api import get_filmes, post_filmes, delete_filmes, put_filmes
from users.user_api import handle_login
from requests.resquests_api import handle_request

class MyHandle(BaseHTTPRequestHandler):
    """
    Classe principal que gerencia as requisições.
    Herda do servidor HTTP base do Python e substitui os
    métodos 'do_GET', 'do_POST', etc., para criar a API.
    """

    def _enviar_resposta(self, status_code, dados):
        """
        Função auxiliar para enviar respostas JSON padronizadas
        Define o status code, os cabeçalhos (headers) de
        JSON e CORS, e envia o corpo da resposta em formato JSON
        """
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(dados).encode('utf-8'))

    
    def do_OPTIONS(self):
        """
        Responde às requisições HTTP OPTIONS
        Isso é essencial para o CORS, permitindo que o navegador
        verifique quais métodos e cabeçalhos são permitidos
        antes de enviar a requisição real
        """
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()


    def do_GET(self):
        """
        Gerencia todas as requisições do método GET
        Analisa a URL e direciona para a função de lógica apropriada
        """
        parsed_url = urlparse(self.path)
        path_name = parsed_url.path
        query_params = parse_qs(parsed_url.query)

        if path_name.startswith('/filmes'):
            get_filmes(self, query_params)

        elif path_name == '/requests':
            handle_request(self)
                
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})


    def do_POST(self):
        """
        Gerencia todas as requisições do método POST
        Verifica o caminho da rota e direciona para a lógica correspondente
        """
        path_name = urlparse(self.path).path

        if path_name == '/filmes':
            post_filmes(self)

        elif path_name == '/login':
            handle_login(self)

        elif path_name == '/requests':
            handle_request(self)
                
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})


    def do_DELETE(self):
        """
        Gerencia todas as requisições do método DELETE.
        Usado para deletar filmes ou rejeitar solicitações.
        """
        path_name = urlparse(self.path).path

        if path_name.startswith('/filmes'):
            delete_filmes(self)

        elif path_name.startswith('/requests'): 
            handle_request(self)
            
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})
    
    def do_PUT(self):
        """
        Gerencia todas as requisições do método PUT.
        Usado para atualizar filmes ou aprovar solicitações.
        """
        path_name = urlparse(self.path).path

        if path_name.startswith('/filmes'):
            put_filmes(self)

        elif path_name.startswith('/requests'): 
            handle_request(self)
        
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})

if __name__ == "__main__":
    """
    Inicia o servidor HTTP quando o script é executado diretamente.
    """
    server_address = ('', 8000) # Roda em localhost na porta 8000
    httpd = HTTPServer(server_address, MyHandle) 

    print("Server Running in http://localhost:8000")
    httpd.serve_forever()