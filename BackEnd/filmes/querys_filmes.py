from filtros.query_filtros import Q_FILTER_BASE

Q_GET_ALL_FILMES = Q_FILTER_BASE + " GROUP BY f.id"

Q_GET_ONE_FILME = Q_FILTER_BASE + """
    WHERE 
        f.id = %s
    GROUP BY 
        f.id
"""

Q_INSERT_FILME = """
    INSERT INTO filme (titulo, ano, duracao, sinopse, produtora, poster, banner)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
"""

Q_INSERT_CATEGORIA = """
    INSERT INTO categoria (nome) VALUES (%s)
    ON DUPLICATE KEY UPDATE nome=nome
"""

Q_LINK_FILME_CATEGORIA = """
    INSERT INTO categoria_filme (id_categoria, id_filme) VALUES (%s, %s)
"""

Q_INSERT_DIRETOR = """
    INSERT INTO diretor (nome) VALUES (%s)
    ON DUPLICATE KEY UPDATE nome=nome
"""

Q_LINK_FILME_DIRETOR = """
    INSERT INTO diretor_filme (id_diretor, id_filme) VALUES (%s, %s)
"""

Q_INSERT_ATOR = """
    INSERT INTO ator (nome) VALUES (%s)
    ON DUPLICATE KEY UPDATE nome=nome
"""

Q_LINK_FILME_ATOR = """
    INSERT INTO ator_filme (id_ator, id_filme) VALUES (%s, %s)
"""

Q_DELETE_FILME = "DELETE FROM filme WHERE id = %s"

Q_UPDATE_FILME = """
    UPDATE filme SET 
        titulo = %s, 
        ano = %s, 
        duracao = %s, 
        sinopse = %s, 
        produtora = %s, 
        poster = %s, 
        banner = %s
    WHERE id = %s
"""

Q_DELETE_LINKS_CATEGORIA = "DELETE FROM categoria_filme WHERE id_filme = %s"

Q_DELETE_LINKS_DIRETOR = "DELETE FROM diretor_filme WHERE id_filme = %s"

Q_DELETE_LINKS_ATOR = "DELETE FROM ator_filme WHERE id_filme = %s"