import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/vendas-data";
import { motion, AnimatePresence } from "framer-motion";

const statusStyles = {
  "Concluído": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelado": "bg-red-50 text-red-600 border-red-200",
  "Pendente": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function VendasTable({ vendas, onViewDetails }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
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
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    Nenhum pedido encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              ) : (
                vendas.map((venda) => {
                  const isCancelado = venda.status === "Cancelado";
                  return (
                    <motion.tr
                      key={venda.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`border-b border-border transition-colors hover:bg-muted/30 ${
                        isCancelado ? "bg-red-50/50" : ""
                      }`}
                    >
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
                      <TableCell className="text-center">
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
  );
}