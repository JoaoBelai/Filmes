Q_GET_ALL_FILMES = "SELECT * FROM filme"

Q_GET_ONE_FILME = """
    SELECT 
        f.id, f.titulo, f.ano, f.duracao, f.sinopse, f.produtora, f.poster, f.banner,
        GROUP_CONCAT(DISTINCT c.nome SEPARATOR ', ') AS generos,
        GROUP_CONCAT(DISTINCT d.nome SEPARATOR ', ') AS diretores,
        GROUP_CONCAT(DISTINCT a.nome SEPARATOR ', ') AS elenco
    FROM 
        filme f
    LEFT JOIN categoria_filme cf ON f.id = cf.id_filme
    LEFT JOIN categoria c ON cf.id_categoria = c.id
    LEFT JOIN diretor_filme df ON f.id = df.id_filme
    LEFT JOIN diretor d ON df.id_diretor = d.id
    LEFT JOIN ator_filme af ON f.id = af.id_filme
    LEFT JOIN ator a ON af.id_ator = a.id
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