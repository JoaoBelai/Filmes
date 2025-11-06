import json
from filmes.querys_filmes import filmes_mock

def get_filmes(handler):
    if handler.path == '/filmes':
        handler._enviar_resposta(200, filmes_mock)

    elif handler.path.startswith('/filmes/'):
        try:
            id_filme = int(handler.path.split('/')[-1])

            filme_encontrado = None
            for filme in filmes_mock:
                if filme['id'] == id_filme:
                    filme_encontrado = filme
                    break
                
            if filme_encontrado:
                handler._enviar_resposta(200, filme_encontrado)
            else:
                handler._enviar_resposta(404, {"erro" : "Filme não encontrado"})

        except ValueError:
            handler._enviar_resposta(400, {"erro": "ID invalido, deve ser um numero"})
        except Exception as e:
            handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})

    else:
        handler._enviar_resposta(404, {"erro" : "Rota não encontrada"})


def post_filmes(handler):
    if handler.path == '/filmes':
        try:
            content_length = int(handler.headers['Content-Length'])
            body = handler.rfile.read(content_length).decode('utf-8')
            novo_filme = json.loads(body)

            novo_filme['id'] = filmes_mock[-1]['id'] + 1
            filmes_mock.append(novo_filme)
            handler._enviar_resposta(201, novo_filme)
            
        except json.JSONDecodeError:
            handler._enviar_resposta(400, {"erro" : "JSON inválido"})
        except Exception as e:
            handler._enviar_resposta(500, {"erro" : f"Erro no servidor: {e}"})
    else:
        handler._enviar_resposta(404, {"erro" : "Rota não encontrada"})


def delete_filmes(handler):
    if handler.path.startswith('/filmes/'):
        try:
            id_filme = int(handler.path.split('/')[-1])

            filme_encontrado = None
            for filme in filmes_mock:
                if filme['id'] == id_filme:
                    filme_encontrado = filme
                    break
            
            if filme_encontrado:
                filmes_mock.remove(filme_encontrado)
                handler._enviar_resposta(200, {"mensagem": f"Filme ID {id_filme} deletado com sucesso"})
            else:
                handler._enviar_resposta(404, {"erro": "Filme nao encontrado"})

        except(ValueError, IndexError):
            handler._enviar_resposta(400, {"erro": "ID invalido"})
    else:
        handler._enviar_resposta(405, {"erro": "Metodo DELETE nao permitido para /filmes. Use /filmes/id"})


def put_filmes(handler):
    if handler.path.startswith('/filmes/'):
        try:
            id_filme = int(handler.path.split('/')[-1])

            content_length = int(handler.headers['Content-Length'])
            body = handler.rfile.read(content_length).decode('utf-8')
            dados_atualizados = json.loads(body)

            indice_filme = None
            for i, filme in enumerate(filmes_mock):
                if filme['id'] == id_filme:
                    indice_filme = i
                    break
            
            if indice_filme is not None:
                dados_atualizados['id'] = id_filme
                filmes_mock[indice_filme] = dados_atualizados
                handler._enviar_resposta(200, dados_atualizados)
            else:
                handler._enviar_resposta(404, {"erro": "Filme nao encontrado"})
        
        except json.JSONDecodeError:
            handler._enviar_resposta(400, {"erro": "JSON invalido"})
        except (ValueError, IndexError):
            handler._enviar_resposta(400, {"erro": "ID invalido"})
        except Exception as e:
            handler._enviar_resposta(500, {"erro": f"Erro no servidor: {e}"})
    else:
        handler._enviar_resposta(405, {"erro": "Metodo PUT nao permitido para /filmes. Use /filmes/id"})