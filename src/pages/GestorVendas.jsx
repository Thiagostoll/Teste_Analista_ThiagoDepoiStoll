import React, { useState, useMemo } from 'react';
import { vendasData } from "@/lib/vendas-data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Database, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import KPICards from "@/components/gestor/KPICards";
import VendasFilters from "@/components/gestor/VendasFilters";
import VendasTable from "@/components/gestor/VendasTable";
import VendaDetailModal from "@/components/gestor/VendaDetailModal";

export default function GestorVendas() {
  const [clienteFilter, setClienteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedVenda, setSelectedVenda] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredVendas = useMemo(() => {
    return vendasData.filter(v => {
      const matchCliente = v.cliente.toLowerCase().includes(clienteFilter.toLowerCase());
      const matchStatus = statusFilter === "todos" || v.status === statusFilter;
      return matchCliente && matchStatus;
    });
  }, [clienteFilter, statusFilter]);

  const handleViewDetails = (venda) => {
    setSelectedVenda(venda);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Gestor de Vendas</h1>
              <p className="text-xs text-muted-foreground">Teste Analista — Thiago</p>
            </div>
          </div>
          <Link to="/sql">
            <Button variant="outline" size="sm" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Consultas SQL</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
            />
            <VendasTable vendas={filteredVendas} onViewDetails={handleViewDetails} />
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