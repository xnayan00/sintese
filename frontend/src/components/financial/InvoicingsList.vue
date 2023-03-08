<template>

  <h5 v-if="invoicings.length == 0" class="text-center text-grey-5 q-py-xl">Nenhuma entrada cadastrada</h5>

  <q-list v-else padding>
    <q-item
      v-for="(item, idx) in invoicings"
      :key="idx"
      class="list-item"
    >
      <q-item-section>
        <q-item-label class="text-weight-bold text-grey-7">{{ item.contributor.name }}</q-item-label>
        <q-item-label overline>{{ convertDate(item.createdAt) }}</q-item-label>
        <q-item-label>
          <q-chip class="q-ml-none" size="12px" color="green-2">{{ item.reference.modality.name }}</q-chip>
        </q-item-label>
      </q-item-section>

      <q-item-section side center>
        <q-item-label class="text-h5 text-positive">{{ convertMoney(item.price) }}</q-item-label>
      </q-item-section>
      
      <q-item-section class="absolute-right" side top>
        <q-btn @click="deleteInvoicing(item)" round flat size="sm">
          <q-icon color="negative">
            <MainIcon name="close" />
          </q-icon>
        </q-btn>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script>
  import MainIcon from "@/components/icons/MainIcon.vue"
  import { useConvertDate } from '@/filters/ConvertDate.js'
  import { useConvertMoney } from '@/filters/ConvertMoney.js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    setup(){
      const convertDate = useConvertDate
      const convertMoney = useConvertMoney

      return { convertDate, convertMoney }
    },
    components: {
      MainIcon
    },
    computed: {
      ...mapGetters('invoicings', {
        invoicings: 'GET_INVOICINGS'
      })
    },
    methods: {
      ...mapActions('invoicings', [
        'SET_INVOICINGS',
        'DELETE_INVOICING'
      ]),
      ...mapMutations('invoicings', [
        'MUTATE_INVOICING'
      ]),
      deleteInvoicing(item){
        this.MUTATE_INVOICING(item)
        this.DELETE_INVOICING()
      },
    },
    created(){
      this.SET_INVOICINGS()
    }
  }
</script>