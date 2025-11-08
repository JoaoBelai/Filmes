from filtros.query_filtros import Q_FILTER_BASE

def handle_filmes_filter(handler, conn, query_params):
    cursor = None
    try:
        cursor = conn.cursor(dictionary = True)

        query = Q_FILTER_BASE
        where_conditions = []
        having_conditions = []
        params = []

        if 'search' in query_params:
            search_term = query_params['search'][0]
            where_conditions.append("(f.titulo LIKE %s OR a.nome LIKE %s OR d.nome LIKE %s)")
            params.extend([f"%{search_term}%", f"%{search_term}%", f"%{search_term}%"])
        
        if 'categoria' in query_params:
            categorias_list = query_params['categoria']
            placeholders = ', '.join(['%s'] * len(categorias_list))
            where_conditions.append(f"c.nome IN ({placeholders})")
            params.extend(categorias_list)
            having_conditions.append(f"COUNT(DISTINCT c.nome) = {len(categorias_list)}")

        if 'ator' in query_params:
            atores_list = query_params['ator']
            placeholders = ', '.join(['%s'] * len(atores_list))
            where_conditions.append(f"a.nome IN ({placeholders})")
            params.extend(atores_list)

        if 'diretor' in query_params:
            diretores_list = query_params['diretor']
            placeholders = ', '.join(['%s'] * len(diretores_list))
            where_conditions.append(f"d.nome IN ({placeholders})")
            params.extend(diretores_list)

        if 'ano_min' in query_params:
            ano_min = int(query_params['ano_min'][0])
            where_conditions.append("f.ano >= %s")
            params.append(ano_min)

        if 'ano_max' in query_params:
            ano_max = int(query_params['ano_max'][0])
            where_conditions.append("f.ano <= %s")
            params.append(ano_max)

        if where_conditions:
            query += " WHERE " + " AND ".join(where_conditions)

        query += " GROUP BY f.id"

        if having_conditions:
            query += " HAVING " + " AND ".join(having_conditions)

        cursor.execute(query, tuple(params))
        filmes = cursor.fetchall()

        for filme in filmes:
            if filme.get('generos'): filme['generos'] = filme['generos'].split(', ')
            if filme.get('diretores'): filme['diretores'] = filme['diretores'].split(', ')
            if filme.get('elenco'): filme['elenco'] = filme['elenco'].split(', ')

        handler._enviar_resposta(200, filmes)
    
    except Exception as e:
        handler._enviar_resposta(500, {"erro": f"Erro ao processar filtros: {e}"})

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()