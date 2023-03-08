<template>
  
  <h5 v-if="outgoings.length == 0" class="text-center text-grey-5 q-py-xl">Nenhuma saída cadastrada</h5>

  <q-list v-else padding>
    <q-item
      v-for="n in outgoings"
      :key="n"
      class="list-item"
    >
      <q-item-section>
        <q-item-label class="text-weight-bold text-grey-7">Thiago D. Stuart</q-item-label>
        <q-item-label overline>11/01/2023</q-item-label>
      </q-item-section>

      <q-item-section side center>
        <q-item-label class="text-h5 text-negative">R$ 50,00</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    data(){
      return {
        outgoings: [],
        totalOutgoings: null
      }
    },
    methods: {
      getOutgoings(){
        http.get('/getOutgoings')
          .then(res => {
            this.totalOutgoings = res.data.data.total
            this.outgoings = res.data.data.outgoings
          })
          .catch(e => {
            console.error(e);
          })
      },
    }
  }
</script>