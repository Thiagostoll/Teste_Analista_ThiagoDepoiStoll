import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Package, DollarSign, Hash, Info } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/vendas-data";

const statusStyles = {
  "Concluído": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Cancelado": "bg-red-50 text-red-600 border-red-200",
  "Pendente": "bg-amber-50 text-amber-700 border-amber-200",
};

function DetailRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
        <p className={`text-sm font-semibold mt-0.5 ${highlight ? "text-primary text-lg" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

export default function VendaDetailModal({ venda, open, onOpenChange }) {
  if (!venda) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-primary/10">
              <Info className="w-5 h-5 text-primary" />
            </div>
            Detalhes do Pedido
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm">Pedido #{venda.id}</span>
            <Badge variant="outline" className={statusStyles[venda.status] || ""}>
              {venda.status}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-1">
            <DetailRow icon={User} label="Cliente" value={venda.cliente} />
            <DetailRow icon={Calendar} label="Data do Pedido" value={formatDate(venda.data)} />
            <DetailRow icon={Package} label="Produto" value={venda.produto} />
            <DetailRow icon={Hash} label="ID do Pedido" value={`#${venda.id}`} />
          </div>

          <Separator className="my-2" />

          <DetailRow icon={DollarSign} label="Valor Total" value={formatCurrency(venda.valor)} highlight />
        </div>
      </DialogContent>
    </Dialog>
  );
}