import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Receipt } from "lucide-react";
import { getTotalVendasConcluidas, getTicketMedio, getVendasConcluidas, formatCurrency } from "@/lib/vendas-data";
import { motion } from "framer-motion";

export default function KPICards() {
  const total = getTotalVendasConcluidas();
  const ticket = getTicketMedio();
  const qtd = getVendasConcluidas().length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Valor Total Concluído</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(total)}</p>
              <p className="text-sm mt-2 opacity-70">{qtd} vendas concluídas</p>
            </div>
            <div className="p-3 bg-white/15 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-600/90 to-emerald-700 p-6 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Ticket Médio</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(ticket)}</p>
              <p className="text-sm mt-2 opacity-70">Média por venda concluída</p>
            </div>
            <div className="p-3 bg-white/15 rounded-xl">
              <Receipt className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}