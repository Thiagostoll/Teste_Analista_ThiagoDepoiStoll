import React, { useState, useMemo } from 'react';
import { vendasData } from "@/lib/vendas-data";
import { motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import PrintHeader from "@/components/PrintHeader";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

import KPICards from "@/components/gestor/KPICards";
import VendasFilters from "@/components/gestor/VendasFilters";
import VendasTable from "@/components/gestor/VendasTable";
import VendaDetailModal from "@/components/gestor/VendaDetailModal";

export default function GestorVendas() {
  const [clienteFilter, setClienteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [produtoFilter, setProdutoFilter] = useState("todos");
  const [valorRange, setValorRange] = useState("todos");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedVenda, setSelectedVenda] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleToggleAll = (checked) => {
    setSelectedIds(checked ? new Set(filteredVendas.map(v => v.id)) : new Set());
  };

  const filteredVendas = useMemo(() => {
    return vendasData.filter(v => {
      const matchCliente = v.cliente.toLowerCase().includes(clienteFilter.toLowerCase());
      const matchStatus = statusFilter === "todos" || v.status === statusFilter;
      const matchProduto = produtoFilter === "todos" || v.produto === produtoFilter;
      let matchValor = true;
      if (valorRange === "0-50") matchValor = v.valor <= 50;
      else if (valorRange === "50-150") matchValor = v.valor > 50 && v.valor <= 150;
      else if (valorRange === "150-300") matchValor = v.valor > 150 && v.valor <= 300;
      else if (valorRange === "300+") matchValor = v.valor > 300;
      return matchCliente && matchStatus && matchProduto && matchValor;
    });
  }, [clienteFilter, statusFilter, produtoFilter, valorRange]);

  const handleViewDetails = (venda) => {
    setSelectedVenda(venda);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Botão imprimir */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex justify-end no-print">
        <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
          <Printer className="w-4 h-4" />
          Imprimir
        </Button>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
        <PrintHeader title="Relatório de Vendas" subtitle="Teste Analista — Thiago" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <KPICards />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Pedidos</h2>
              <span className="text-sm text-muted-foreground">
                {filteredVendas.length} de {vendasData.length} pedidos
              </span>
            </div>
            <VendasFilters
              clienteFilter={clienteFilter}
              setClienteFilter={setClienteFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              produtoFilter={produtoFilter}
              setProdutoFilter={setProdutoFilter}
              valorRange={valorRange}
              setValorRange={setValorRange}
            />
            <VendasTable
              vendas={filteredVendas}
              onViewDetails={handleViewDetails}
              selectedIds={selectedIds}
              onToggle={handleToggle}
              onToggleAll={handleToggleAll}
            />
          </div>
        </motion.div>
      </main>

      <VendaDetailModal
        venda={selectedVenda}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}