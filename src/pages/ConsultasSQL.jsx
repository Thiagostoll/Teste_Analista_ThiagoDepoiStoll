import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Database, Code, AlertTriangle } from "lucide-react";

const queries = [
  {
    title: "Tarefa 1: Relatório de Performance por Cliente",
    description: "Retorna o Nome do Cliente, Total Gasto (soma dos pedidos concluídos) e a Data da Última Compra. Utiliza LEFT JOIN para incluir clientes sem compras, tratando NULL com COALESCE.",
    badge: "LEFT JOIN + COALESCE",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    sql: `SELECT
    c.nome              AS nome_cliente,
    COALESCE(SUM(p.valor), 0)  AS total_gasto,
    MAX(p.data)                AS data_ultima_compra
FROM
    d_clientes c
LEFT JOIN
    d_pedidos p
    ON c.id_cliente = p.id_cliente
    AND p.status = 'Concluída'
GROUP BY
    c.id_cliente, c.nome
ORDER BY
    total_gasto DESC;`
  },
  {
    title: "Tarefa 2: Identificação de Churn (Clientes Inativos)",
    description: "Identifica clientes que não realizaram nenhum pedido nos últimos 90 dias, mas possuem ao menos um pedido concluído em seu histórico. Utiliza subconsultas correlacionadas com EXISTS / NOT EXISTS.",
    badge: "NOT EXISTS + EXISTS",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    sql: `SELECT
    c.nome   AS nome_cliente,
    c.email  AS email_cliente
FROM
    d_clientes c
WHERE
    -- Tem ao menos 1 pedido concluído no histórico
    EXISTS (
        SELECT 1
        FROM d_pedidos p1
        WHERE p1.id_cliente = c.id_cliente
          AND p1.status = 'Concluída'
    )
    -- Não fez nenhum pedido nos últimos 90 dias
    AND NOT EXISTS (
        SELECT 1
        FROM d_pedidos p2
        WHERE p2.id_cliente = c.id_cliente
          AND p2.data >= CURRENT_DATE - INTERVAL '90 days'
    )
ORDER BY
    c.nome;`
  }
];

function SQLBlock({ query, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * (index + 1) }}
    >
      <Card className="border-border overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <CardTitle className="text-lg font-bold">{query.title}</CardTitle>
            <Badge variant="outline" className={query.badgeColor}>
              <Code className="w-3 h-3 mr-1" />
              {query.badge}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {query.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg bg-slate-900 p-5 overflow-x-auto">
            <pre className="text-sm text-slate-100 font-mono leading-relaxed whitespace-pre">
              {query.sql}
            </pre>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ConsultasSQL() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Consultas SQL</h1>
              <p className="text-xs text-muted-foreground">Teste Analista — Thiago</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Gestor de Vendas</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Context */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="border-border bg-muted/30">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold text-foreground mb-1">Contexto das Tabelas</p>
                  <p className="text-muted-foreground">
                    As tabelas <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">d_clientes</code> e{' '}
                    <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">d_pedidos</code> se relacionam 
                    pela coluna <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">id_cliente</code>. 
                    O status dos pedidos na planilha é <strong>'Concluída'</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {queries.map((q, i) => (
          <SQLBlock key={i} query={q} index={i} />
        ))}
      </main>
    </div>
  );
}