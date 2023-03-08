<template>
  <q-item>
    <q-item-section avatar>              
      <q-icon size="md" color="negative">
        <MainIcon name="minus-circle" />
      </q-icon>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-grey-7 text-h6">
        Saídas
      </q-item-label>
      <q-item-label class="text-subtitle2 text-negative text-weight-bold">
        {{ convertMoney(GET_TOTAL) }}
      </q-item-label>
    </q-item-section>

    <q-item-section side center>
      <q-btn
        @click="dialog = true"
        color="negative"
        outline
        rounded
      >
        Nova saída
      </q-btn>
      <q-dialog
        v-model="dialog"
        persistent
      >
        <OutgoingsForm />
      </q-dialog>
    </q-item-section>
  </q-item>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import OutgoingsForm from './OutgoingsForm.vue'
  import { useConvertMoney } from '@/filters/ConvertMoney.js'
  import { mapGetters } from 'vuex'

  export default {
    setup(){
      const convertMoney = useConvertMoney

      return { convertMoney }
    },
    components: {
      MainIcon,
      OutgoingsForm
    },
    data(){
      return {
        dialog: false,
      }
    },
    computed: {
      ...mapGetters('outgoings', [
        'GET_TOTAL'
      ])
    }
  }
</script>