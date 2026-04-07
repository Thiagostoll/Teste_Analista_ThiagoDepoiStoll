import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { getStatusList, getProdutoList } from "@/lib/vendas-data";

const valorRanges = [
  { label: "Todos os Valores", value: "todos" },
  { label: "Até R$ 50", value: "0-50" },
  { label: "R$ 50 – R$ 150", value: "50-150" },
  { label: "R$ 150 – R$ 300", value: "150-300" },
  { label: "Acima de R$ 300", value: "300+" },
];

export default function VendasFilters({
  clienteFilter, setClienteFilter,
  statusFilter, setStatusFilter,
  produtoFilter, setProdutoFilter,
  valorRange, setValorRange,
}) {
  const statusList = getStatusList();
  const produtoList = getProdutoList();

  const hasActiveFilters =
    clienteFilter !== "" || statusFilter !== "todos" ||
    produtoFilter !== "todos" || valorRange !== "todos";

  const clearAll = () => {
    setClienteFilter("");
    setStatusFilter("todos");
    setProdutoFilter("todos");
    setValorRange("todos");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Busca por cliente */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar por nome do cliente..."
            value={clienteFilter}
            onChange={(e) => setClienteFilter(e.target.value)}
            className="pl-10 bg-card border-border h-11"
          />
          {clienteFilter && (
            <button onClick={() => setClienteFilter("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Status */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44 bg-card border-border h-11">
            <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            {statusList.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Produto */}
        <Select value={produtoFilter} onValueChange={setProdutoFilter}>
          <SelectTrigger className="w-full sm:w-52 bg-card border-border h-11">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Produtos</SelectItem>
            {produtoList.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Faixa de valor */}
        <Select value={valorRange} onValueChange={setValorRange}>
          <SelectTrigger className="w-full sm:w-48 bg-card border-border h-11">
            <SelectValue placeholder="Faixa de Valor" />
          </SelectTrigger>
          <SelectContent>
            {valorRanges.map(r => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground h-8 gap-1.5">
            <X className="w-3.5 h-3.5" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}