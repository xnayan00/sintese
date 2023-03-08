export function useConvertDate(value){
  const convertedDate = value.slice(0, 10).split('-').reverse().join('/')

  return convertedDate
}