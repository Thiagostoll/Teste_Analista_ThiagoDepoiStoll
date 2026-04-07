import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Receipt, XCircle, Clock, Percent } from "lucide-react";
import {
  getTotalVendasConcluidas, getTicketMedio, getVendasConcluidas,
  getTotalCancelado, getQtdPendente, getTaxaConclusao,
  getStatusDistribution, formatCurrency, vendasData
} from "@/lib/vendas-data";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = { "Concluído": "#16a34a", "Cancelado": "#dc2626", "Pendente": "#d97706" };

export default function KPICards() {
  const total = getTotalVendasConcluidas();
  const ticket = getTicketMedio();
  const qtdConcluidas = getVendasConcluidas().length;
  const totalCancelado = getTotalCancelado();
  const qtdPendente = getQtdPendente();
  const taxa = getTaxaConclusao();
  const dist = getStatusDistribution();

  const kpis = [
    {
      label: "Valor Total Concluído",
      value: formatCurrency(total),
      sub: `${qtdConcluidas} pedidos concluídos`,
      icon: TrendingUp,
      gradient: "from-blue-600/90 to-blue-700",
    },
    {
      label: "Ticket Médio",
      value: formatCurrency(ticket),
      sub: "Média por venda concluída",
      icon: Receipt,
      gradient: "from-emerald-600/90 to-emerald-700",
    },
    {
      label: "Total Cancelado",
      value: formatCurrency(totalCancelado),
      sub: `${vendasData.filter(v => v.status === "Cancelado").length} pedidos cancelados`,
      icon: XCircle,
      gradient: "from-red-500/90 to-red-600",
    },
    {
      label: "Pedidos Pendentes",
      value: qtdPendente,
      sub: `${taxa.toFixed(0)}% de taxa de conclusão`,
      icon: Clock,
      gradient: "from-amber-500/90 to-amber-600",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (i + 1) }}>
            <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${kpi.gradient} p-5 text-white shadow-md`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="flex items-start justify-between relative z-10">
                <div className="min-w-0">
                  <p className="text-xs font-medium opacity-80 uppercase tracking-wider leading-tight">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1.5 truncate">{kpi.value}</p>
                  <p className="text-xs mt-1.5 opacity-70">{kpi.sub}</p>
                </div>
                <div className="p-2.5 bg-white/15 rounded-xl shrink-0 ml-2">
                  <kpi.icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Taxa de conclusão + distribuição */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <Card className="p-5 border-border flex flex-col sm:flex-row items-center gap-6">
          {/* Barra de taxa */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold">Taxa de Conclusão</span>
              </div>
              <span className="text-sm font-bold text-emerald-600">{taxa.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${taxa}%` }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>
            <div className="flex gap-4 mt-3">
              {dist.map(d => (
                <div key={d.status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[d.status] }} />
                  {d.status}: <strong className="text-foreground">{d.count}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Mini pizza */}
          <div className="w-28 h-28 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dist} dataKey="count" nameKey="status" innerRadius={28} outerRadius={50} paddingAngle={3}>
                  {dist.map((entry) => (
                    <Cell key={entry.status} fill={COLORS[entry.status]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, n) => [v, n]}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}