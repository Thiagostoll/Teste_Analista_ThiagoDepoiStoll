-- ============================================================
--  Teste Técnico: Analista de Sistemas
--  Candidato : Thiago
--  Data       : 07/04/2026
--  Tabelas    : d_clientes, d_pedidos  (relação: id_cliente)
-- ============================================================


-- ------------------------------------------------------------
-- TAREFA 1 – Relatório de Performance por Cliente
-- Objetivo : Nome do Cliente | Total Gasto | Data da Última Compra
-- Regra    : Apenas pedidos com status 'Concluída' são somados.
-- Pro      : LEFT JOIN garante que clientes sem compras apareçam
--            (COALESCE trata o NULL como 0).
-- ------------------------------------------------------------

SELECT
    c.nome                          AS nome_cliente,
    COALESCE(SUM(p.valor), 0)       AS total_gasto,
    MAX(p.data)                     AS data_ultima_compra
FROM
    d_clientes c
LEFT JOIN
    d_pedidos p
    ON  c.id_cliente = p.id_cliente
    AND p.status     = 'Concluída'
GROUP BY
    c.id_cliente,
    c.nome
ORDER BY
    total_gasto DESC;


-- ------------------------------------------------------------
-- TAREFA 2 – Identificação de Churn (Clientes Inativos)
-- Objetivo : Nome e E-mail dos clientes que:
--   1. Possuem ao menos 1 pedido 'Concluída' no histórico.
--   2. NÃO realizaram nenhum pedido nos últimos 90 dias.
-- Estratégia: Subconsultas correlacionadas com EXISTS / NOT EXISTS
--             para maior clareza e performance em índices compostos.
-- ------------------------------------------------------------

SELECT
    c.nome   AS nome_cliente,
    c.email  AS email_cliente
FROM
    d_clientes c
WHERE
    -- Condição 1: tem ao menos 1 pedido concluído no histórico
    EXISTS (
        SELECT 1
        FROM   d_pedidos p1
        WHERE  p1.id_cliente = c.id_cliente
          AND  p1.status     = 'Concluída'
    )
    -- Condição 2: nenhum pedido nos últimos 90 dias
    AND NOT EXISTS (
        SELECT 1
        FROM   d_pedidos p2
        WHERE  p2.id_cliente = c.id_cliente
          AND  p2.data       >= CURRENT_DATE - INTERVAL '90 days'
    )
ORDER BY
    c.nome;


-- ============================================================
-- FIM DO ARQUIVO
-- ============================================================
