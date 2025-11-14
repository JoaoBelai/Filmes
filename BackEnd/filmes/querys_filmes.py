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

Q_GET_DESTAQUES = Q_FILTER_BASE + """
    WHERE f.id IN (21, 22, 12, 6, 9, 10, 15, 3, 8, 14)
    GROUP BY f.id
    ORDER BY FIELD(f.id, 21, 22, 12, 6, 9, 10, 15, 3, 8, 14)
"""

Q_GET_CLASSICOS = Q_FILTER_BASE + """
    WHERE f.id IN (1, 2, 4, 5, 6, 7, 8, 12)
    GROUP BY f.id
    ORDER BY FIELD(f.id, 1, 2, 4, 5, 6, 7, 8, 12)
"""

Q_GET_CRITICA = Q_FILTER_BASE + """
    WHERE f.id IN (21, 22, 12, 4, 8, 7, 6, 5, 1, 2)
    GROUP BY f.id
    ORDER BY FIELD(f.id, 21, 22, 12, 4, 8, 7, 6, 5, 1, 2)
"""

Q_GET_NOVOS = Q_FILTER_BASE + """
    WHERE f.id IN (24, 25, 26, 27, 28, 29, 30, 31, 32, 33)
    GROUP BY f.id
    ORDER BY FIELD(f.id, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33)
"""