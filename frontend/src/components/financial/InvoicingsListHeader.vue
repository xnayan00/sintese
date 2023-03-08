<template>
  <q-item>
    <q-item-section avatar>              
      <q-icon size="md" color="positive">
        <MainIcon name="plus-circle" />
      </q-icon>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-grey-7 text-h6">
        Entradas
      </q-item-label>
      <q-item-label class="text-subtitle2 text-positive text-weight-bold">
        {{ convertMoney(GET_TOTAL) }}
      </q-item-label>
    </q-item-section>

    <q-item-section side center>
      <q-btn
        @click="dialog = true"
        color="positive"
        outline
        rounded
      >
        Nova entrada
      </q-btn>
      <q-dialog
        v-model="dialog"
        persistent
      >
        <InvoicingsForm />
      </q-dialog>
    </q-item-section>
  </q-item>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import InvoicingsForm from './InvoicingsForm.vue'
  import { useConvertMoney } from '@/filters/ConvertMoney.js'
  import { mapGetters } from 'vuex'

  export default {
    setup(){
      const convertMoney = useConvertMoney

      return { convertMoney }
    },
    components: {
      MainIcon,
      InvoicingsForm
    },
    data(){
      return {
        dialog: false,
      }
    },
    computed: {
      ...mapGetters('invoicings', [
        'GET_TOTAL'
      ])
    }
  }
</script>