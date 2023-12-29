export const formatIntegerToBRL = (value: number) => {
  const brlFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return brlFormat.format(value / 100)
}
