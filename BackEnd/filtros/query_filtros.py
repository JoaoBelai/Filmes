Q_FILTER_BASE = """
    SELECT DISTINCT
        f.id, f.titulo, f.poster, f.ano,
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
"""