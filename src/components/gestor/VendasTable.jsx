import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/vendas-data";
import { motion, AnimatePresence } from "framer-motion";

const statusStyles = {
  "Concluído": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelado": "bg-red-50 text-red-600 border-red-200",
  "Pendente": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function VendasTable({ vendas, onViewDetails, selectedIds, onToggle, onToggleAll }) {
  const allSelected = vendas.length > 0 && vendas.every(v => selectedIds.has(v.id));
  const someSelected = vendas.some(v => selectedIds.has(v.id)) && !allSelected;

  const selectedVendas = vendas.filter(v => selectedIds.has(v.id));
  const totalSelecionado = selectedVendas.reduce((s, v) => s + v.valor, 0);
  const qtdSelecionada = selectedVendas.length;

  return (
    <div className="space-y-2">
      {/* Barra de totalizadores da seleção */}
      <AnimatePresence>
        {qtdSelecionada > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-sm"
          >
            <span className="font-semibold text-primary">{qtdSelecionada} pedido{qtdSelecionada > 1 ? 's' : ''} selecionado{qtdSelecionada > 1 ? 's' : ''}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Total: <strong className="text-foreground">{formatCurrency(totalSelecionado)}</strong></span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Média: <strong className="text-foreground">{formatCurrency(totalSelecionado / qtdSelecionada)}</strong></span>
            <button
              onClick={() => onToggleAll(false)}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Limpar seleção
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onCheckedChange={(checked) => onToggleAll(!!checked)}
                  />
                </TableHead>
                <TableHead className="font-semibold text-foreground">ID</TableHead>
                <TableHead className="font-semibold text-foreground">Cliente</TableHead>
                <TableHead className="font-semibold text-foreground">Data</TableHead>
                <TableHead className="font-semibold text-foreground">Produto</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Valor</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {vendas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      Nenhum pedido encontrado com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  vendas.map((venda) => {
                    const isCancelado = venda.status === "Cancelado";
                    const isSelected = selectedIds.has(venda.id);
                    return (
                      <motion.tr
                        key={venda.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onToggle(venda.id)}
                        className={`border-b border-border transition-colors cursor-pointer
                          ${isSelected ? "bg-primary/5" : isCancelado ? "bg-red-50/50" : "hover:bg-muted/30"}`}
                      >
                        <TableCell onClick={e => e.stopPropagation()}>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => onToggle(venda.id)}
                          />
                        </TableCell>
                        <TableCell className={`font-mono text-sm ${isCancelado ? "text-red-500" : "text-muted-foreground"}`}>
                          #{venda.id}
                        </TableCell>
                        <TableCell className={`font-medium ${isCancelado ? "text-red-600 line-through" : ""}`}>
                          {venda.cliente}
                        </TableCell>
                        <TableCell className={isCancelado ? "text-red-500" : "text-muted-foreground"}>
                          {formatDate(venda.data)}
                        </TableCell>
                        <TableCell className={isCancelado ? "text-red-500" : ""}>
                          {venda.produto}
                        </TableCell>
                        <TableCell className={`text-right font-semibold ${isCancelado ? "text-red-600 line-through" : ""}`}>
                          {formatCurrency(venda.valor)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusStyles[venda.status] || ""}>
                            {venda.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center" onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewDetails(venda)}
                            className="text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detalhes
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}