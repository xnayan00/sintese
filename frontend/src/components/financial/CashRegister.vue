<template>
  <q-card flat>
    <div class="d-flex row align-center justify-center">
      <q-card-section>
        <h4 class="text-center text-h6 text-grey-7">Caixa</h4>
        <h3 class="text-center text-primary">{{ convertMoney(currentCash) }}</h3>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { useConvertMoney } from '@/filters/ConvertMoney.js'

  export default {
    setup(){
      const convertMoney = useConvertMoney

      return { convertMoney }
    },
    computed: {
      currentCash() {
        return this.totalInvoicings - this.totalOutgoings
      },
      ...mapGetters('invoicings', {
        totalInvoicings: 'GET_TOTAL'
      }),
      ...mapGetters('outgoings', {
        totalOutgoings: 'GET_TOTAL'
      }),
    }  
  }
</script>