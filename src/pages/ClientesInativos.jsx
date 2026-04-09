import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserX, Download, Users, Clock } from "lucide-react";
import { getClientesInativos, formatCurrency, formatDate } from "@/lib/vendas-data";
import { jsPDF } from "jspdf";

const opcoes = [
  { label: "30 dias", dias: 30, color: "bg-amber-100 text-amber-800 border-amber-300" },
  { label: "60 dias", dias: 60, color: "bg-orange-100 text-orange-800 border-orange-300" },
  { label: "90 dias", dias: 90, color: "bg-red-100 text-red-700 border-red-300" },
];

export default function ClientesInativos() {
  const [diasFiltro, setDiasFiltro] = useState(30);

  const inativos = useMemo(() => getClientesInativos(diasFiltro), [diasFiltro]);
  const opcao = opcoes.find(o => o.dias === diasFiltro);

  const gerarPDF = () => {
    const doc = new jsPDF();
    const titulo = `Relatório de Clientes Inativos — ${diasFiltro} dias`;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(titulo, 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} | Total: ${inativos.length} cliente(s)`, 14, 28);

    // Cabeçalho da tabela
    let y = 40;
    doc.setFillColor(37, 99, 235);
    doc.rect(14, y - 5, 182, 8, 'F');
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    const cols = [14, 60, 100, 140, 170];
    const headers = ["Cliente", "Última Compra", "Produto", "Valor", "Dias"];
    headers.forEach((h, i) => doc.text(h, cols[i], y));
    y += 8;

    doc.setFont("helvetica", "normal");
    inativos.forEach((c, idx) => {
      if (y > 270) { doc.addPage(); y = 20; }
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y - 4, 182, 7, 'F');
      }
      doc.setTextColor(30);
      doc.text(c.cliente.substring(0, 22), cols[0], y);
      doc.text(formatDate(c.ultimaCompra), cols[1], y);
      doc.text(c.produto.substring(0, 18), cols[2], y);
      doc.text(formatCurrency(c.valor), cols[3], y);
      doc.text(`${c.diasInativo}d`, cols[4], y);
      y += 7;
    });

    doc.save(`clientes-inativos-${diasFiltro}dias.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-50">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Clientes Inativos</h1>
              <p className="text-xs text-muted-foreground">Análise de churn — Thiago</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={gerarPDF} className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Seletor de período */}
        <div className="flex gap-3 flex-wrap">
          {opcoes.map(o => (
            <button
              key={o.dias}
              onClick={() => setDiasFiltro(o.dias)}
              className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
                ${diasFiltro === o.dias
                  ? o.color + " shadow-sm scale-105"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}
            >
              Inativos há {o.label}
            </button>
          ))}
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Clientes Inativos</p>
                <p className="text-2xl font-bold">{inativos.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Sem compra há mais de</p>
                <p className="text-2xl font-bold">{diasFiltro} dias</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card className="border-border overflow-hidden">
          <CardHeader className="pb-0 px-5 pt-5">
            <CardTitle className="text-base font-semibold flex items-center justify-between">
              <span>Lista de Clientes Inativos</span>
              <Badge variant="outline" className={opcao?.color}>
                {inativos.length} cliente{inativos.length !== 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cliente</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Última Compra</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Produto</th>
                    <th className="text-right px-5 py-3 font-semibold text-foreground">Valor</th>
                    <th className="text-right px-5 py-3 font-semibold text-foreground">Dias Inativo</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {inativos.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-muted-foreground">
                          Nenhum cliente inativo neste período.
                        </td>
                      </tr>
                    ) : (
                      inativos.map((c, i) => (
                        <motion.tr
                          key={c.cliente}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-5 py-3 font-medium">{c.cliente}</td>
                          <td className="px-5 py-3 text-muted-foreground">{formatDate(c.ultimaCompra)}</td>
                          <td className="px-5 py-3 text-muted-foreground">{c.produto}</td>
                          <td className="px-5 py-3 text-right font-semibold">{formatCurrency(c.valor)}</td>
                          <td className="px-5 py-3 text-right">
                            <Badge variant="outline" className={
                              c.diasInativo >= 90 ? "bg-red-50 text-red-700 border-red-200" :
                              c.diasInativo >= 60 ? "bg-orange-50 text-orange-700 border-orange-200" :
                              "bg-amber-50 text-amber-700 border-amber-200"
                            }>
                              {c.diasInativo} dias
                            </Badge>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}