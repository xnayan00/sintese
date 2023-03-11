<template>
  <q-table
    title="Entradas previstas"
    :rows="rows"
    :columns="columns"
    row-key="name"
  />
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Contribuinte',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Turma', field: 'calories', sortable: true },
  { name: 'fat', align: 'center', label: 'Vencimento', field: 'fat', sortable: true },
  { name: 'carbs', align: 'center', label: 'Valor', field: 'carbs' },
  { name: 'protein', label: 'Ações', field: 'protein' },
]

const rows = []

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>