export function formatCurrency(value: number, currencyFormat: string): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currencyFormat,
    minimumFractionDigits: 0
  }).format(value)
}
