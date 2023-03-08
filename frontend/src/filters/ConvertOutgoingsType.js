export function useConvertOutgoingsType(value){
  switch (value) {
    case 2:
      return 'Pagamento de salário'
    case 3:
      return 'Despesas fixas'
    case 4:
      return 'Outros'
  }
}