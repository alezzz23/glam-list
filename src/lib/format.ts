export function formatUsd(amount: number) {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function stockLabel(stock: number) {
  if (stock <= 0) return "Agotado";
  if (stock <= 8) return `Últimas ${stock} unidades`;
  return "En stock";
}
