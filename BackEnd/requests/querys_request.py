Q_INSERT_SOLICITACAO = """
    INSERT INTO solicitacao 
        (id_usuario_solicitante, role_solicitante, tipo, id_filme_alvo, dados_propostos)
    VALUES (%s, %s, %s, %s, %s)
"""

Q_GET_SOLICITACOES_PENDENTES = """
    SELECT id, id_usuario_solicitante, role_solicitante, tipo, id_filme_alvo, status
    FROM solicitacao
    WHERE status = 'pendente'
"""

Q_GET_ONE_SOLICITACAO = """
    SELECT * FROM solicitacao WHERE id = %s AND status = 'pendente'
"""

Q_UPDATE_STATUS_SOLICITACAO = """
    UPDATE solicitacao SET status = %s WHERE id = %s
"""