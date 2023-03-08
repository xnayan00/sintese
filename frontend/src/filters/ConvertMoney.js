export function useConvertMoney(value) {
  const newValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return newValue
}