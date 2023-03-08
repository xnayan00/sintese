<template>

  <h5 v-if="outgoings.length == 0" class="text-center text-grey-5 q-py-xl">Nenhuma saída cadastrada</h5>

  <q-list v-else padding>
    <q-item
      v-for="(item, idx) in outgoings"
      :key="idx"
      class="list-item"
    >
      <q-item-section>
        <q-item-label class="text-weight-bold text-grey-7">
          {{ item.receiver ? item.receiver.name : item.customReceiver }}
        </q-item-label>
        <q-item-label overline>{{ convertDate(item.createdAt) }}</q-item-label>
        <q-item-label>
          <q-chip class="q-ml-none" size="12px" color="red-2">
            {{ item.team ? item.team.modality.name : convertOutgoingsType(item.type) }}
          </q-chip>
        </q-item-label>
      </q-item-section>

      <q-item-section side center>
        <q-item-label class="text-h5 text-negative">{{ convertMoney(item.price) }}</q-item-label>
      </q-item-section>
      
      <q-item-section class="absolute-right" side top>
        <q-btn @click="deleteOutgoing(item)" round flat size="sm">
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
  import { useConvertOutgoingsType } from '@/filters/ConvertOutgoingsType.js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    setup(){
      const convertDate = useConvertDate
      const convertMoney = useConvertMoney
      const convertOutgoingsType = useConvertOutgoingsType

      return { convertDate, convertMoney, convertOutgoingsType }
    },
    components: {
      MainIcon
    },
    computed: {
      ...mapGetters('outgoings', {
        outgoings: 'GET_OUTGOINGS'
      })
    },
    methods: {
      ...mapActions('outgoings', [
        'SET_OUTGOINGS',
        'DELETE_OUTGOING'
      ]),
      ...mapMutations('outgoings', [
        'MUTATE_OUTGOING'
      ]),
      deleteOutgoing(item){
        this.MUTATE_OUTGOING(item)
        this.DELETE_OUTGOING()
      },
    },
    created(){
      this.SET_OUTGOINGS()
    }
  }
</script>