from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs
from filmes.filmes_api import get_filmes, post_filmes, delete_filmes, put_filmes
from users.user_api import handle_login
from requests.resquests_api import handle_request

class MyHandle(BaseHTTPRequestHandler):

    def _enviar_resposta(self, status_code, dados):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(dados).encode('utf-8'))

    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


    def do_GET(self):
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
        path_name = urlparse(self.path).path

        if path_name.startswith('/filmes'):
            delete_filmes(self)

        elif path_name.startswith('/requests'): 
            handle_request(self)
            
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})
    
    def do_PUT(self):
        path_name = urlparse(self.path).path

        if path_name.startswith('/filmes'):
            put_filmes(self)

        elif path_name.startswith('/requests'): 
            handle_request(self)
        
        else:
            self._enviar_resposta(404, {"erro" : "Rota não encontrada"})


if __name__ == "__main__":
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, MyHandle) 

    print("Server Running in http://localhost:8000")
    httpd.serve_forever()