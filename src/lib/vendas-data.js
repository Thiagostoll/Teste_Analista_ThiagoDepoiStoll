export const vendasData = [
  { id: 1001, cliente: "João Silva", data: "2026-04-01", produto: "ARROZ BRANCO 5KG", valor: 125.00, status: "Concluído" },
  { id: 1002, cliente: "Maria Souza", data: "2026-04-02", produto: "ARROZ BRANCO 2KG", valor: 48.00, status: "Cancelado" },
  { id: 1003, cliente: "Pedro Lima", data: "2026-04-03", produto: "ARROZ PARBO 5KG", valor: 135.00, status: "Pendente" },
  { id: 1004, cliente: "Carla Mendes", data: "2026-04-04", produto: "ARROZ INTEGRAL 5KG", valor: 150.00, status: "Concluído" },
  { id: 1005, cliente: "Lucas Pereira", data: "2026-04-04", produto: "ARROZ BRANCO 5KG", valor: 250.00, status: "Concluído" },
  { id: 1006, cliente: "Marcos Silva", data: "2026-04-05", produto: "ARROZ PARBO 2KG", valor: 52.00, status: "Concluído" },
  { id: 1007, cliente: "Juliana Alves", data: "2026-04-05", produto: "ARROZ INTEGRAL 2KG", valor: 60.00, status: "Cancelado" },
  { id: 1008, cliente: "João Silva", data: "2026-04-06", produto: "ARROZ BRANCO 2KG", valor: 24.00, status: "Concluído" },
  { id: 1009, cliente: "Fernanda Reis", data: "2026-04-06", produto: "ARROZ PARBO 5KG", valor: 135.00, status: "Pendente" },
  { id: 1010, cliente: "Eduardo Gomes", data: "2026-04-07", produto: "ARROZ BRANCO 5KG", valor: 125.00, status: "Concluído" },
  { id: 1011, cliente: "Patrícia Luz", data: "2026-04-07", produto: "ARROZ INTEGRAL 5KG", valor: 300.00, status: "Concluído" },
  { id: 1012, cliente: "André Costa", data: "2026-04-08", produto: "ARROZ PARBO 2KG", valor: 104.00, status: "Cancelado" },
  { id: 1013, cliente: "Carolina Lima", data: "2026-04-08", produto: "ARROZ BRANCO 5KG", valor: 500.00, status: "Concluído" },
  { id: 1014, cliente: "Guilherme Paz", data: "2026-04-09", produto: "ARROZ INTEGRAL 2KG", valor: 120.00, status: "Pendente" },
  { id: 1015, cliente: "Daniela Lopes", data: "2026-04-09", produto: "ARROZ BRANCO 2KG", valor: 96.00, status: "Concluído" },
  { id: 1016, cliente: "Maria Souza", data: "2026-04-10", produto: "ARROZ PARBO 5KG", valor: 270.00, status: "Concluído" },
  { id: 1017, cliente: "Adriano Matos", data: "2026-04-10", produto: "ARROZ BRANCO 5KG", valor: 125.00, status: "Cancelado" },
  { id: 1018, cliente: "Marina Borges", data: "2026-04-11", produto: "ARROZ INTEGRAL 5KG", valor: 150.00, status: "Concluído" },
  { id: 1019, cliente: "Camila Ramos", data: "2026-04-11", produto: "ARROZ PARBO 2KG", valor: 52.00, status: "Pendente" },
  { id: 1020, cliente: "Diego Barbosa", data: "2026-04-12", produto: "ARROZ BRANCO 5KG", valor: 375.00, status: "Concluído" },
  // Clientes com histórico antigo (para relatório de inativos)
  { id: 1021, cliente: "Roberto Faria", data: "2026-03-05", produto: "ARROZ BRANCO 5KG", valor: 125.00, status: "Concluído" },
  { id: 1022, cliente: "Simone Castro", data: "2026-03-06", produto: "ARROZ INTEGRAL 5KG", valor: 150.00, status: "Concluído" },
  { id: 1023, cliente: "Henrique Dias", data: "2026-03-10", produto: "ARROZ PARBO 5KG", valor: 270.00, status: "Concluído" },
  { id: 1024, cliente: "Luciana Pinto", data: "2026-02-03", produto: "ARROZ BRANCO 2KG", valor: 48.00, status: "Concluído" },
  { id: 1025, cliente: "Fábio Nogueira", data: "2026-02-10", produto: "ARROZ INTEGRAL 2KG", valor: 60.00, status: "Concluído" },
  { id: 1026, cliente: "Beatriz Cunha", data: "2026-02-15", produto: "ARROZ BRANCO 5KG", valor: 500.00, status: "Concluído" },
  { id: 1027, cliente: "Thiago Melo", data: "2026-01-04", produto: "ARROZ PARBO 2KG", valor: 104.00, status: "Concluído" },
  { id: 1028, cliente: "Priscila Vaz", data: "2026-01-10", produto: "ARROZ BRANCO 5KG", valor: 250.00, status: "Concluído" },
  { id: 1029, cliente: "Rodrigo Assis", data: "2025-12-20", produto: "ARROZ INTEGRAL 5KG", valor: 300.00, status: "Concluído" },
  { id: 1030, cliente: "Natália Sousa", data: "2025-12-01", produto: "ARROZ BRANCO 2KG", valor: 96.00, status: "Concluído" },
];

export function getVendasConcluidas() {
  return vendasData.filter(v => v.status === "Concluído");
}

export function getTotalVendasConcluidas() {
  return getVendasConcluidas().reduce((sum, v) => sum + v.valor, 0);
}

export function getTicketMedio() {
  const concluidas = getVendasConcluidas();
  if (concluidas.length === 0) return 0;
  return getTotalVendasConcluidas() / concluidas.length;
}

export function getStatusList() {
  return [...new Set(vendasData.map(v => v.status))];
}

export function getProdutoList() {
  return [...new Set(vendasData.map(v => v.produto))].sort();
}

export function getTotalCancelado() {
  return vendasData
    .filter(v => v.status === "Cancelado")
    .reduce((sum, v) => sum + v.valor, 0);
}

export function getQtdPendente() {
  return vendasData.filter(v => v.status === "Pendente").length;
}

export function getTaxaConclusao() {
  return (getVendasConcluidas().length / vendasData.length) * 100;
}

export function getStatusDistribution() {
  const counts = {};
  vendasData.forEach(v => { counts[v.status] = (counts[v.status] || 0) + 1; });
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function getClientesInativos(dias) {
  const hoje = new Date('2026-04-09');
  const limite = new Date(hoje);
  limite.setDate(hoje.getDate() - dias);

  // Último pedido concluído por cliente
  const ultimaCompra = {};
  vendasData.forEach(v => {
    if (v.status !== 'Concluído') return;
    const d = new Date(v.data);
    if (!ultimaCompra[v.cliente] || d > ultimaCompra[v.cliente].data) {
      ultimaCompra[v.cliente] = { data: d, dataStr: v.data, produto: v.produto, valor: v.valor };
    }
  });

  return Object.entries(ultimaCompra)
    .filter(([, info]) => info.data < limite)
    .map(([cliente, info]) => ({
      cliente,
      ultimaCompra: info.dataStr,
      produto: info.produto,
      valor: info.valor,
      diasInativo: Math.floor((hoje - info.data) / (1000 * 60 * 60 * 24)),
    }))
    .sort((a, b) => b.diasInativo - a.diasInativo);
}