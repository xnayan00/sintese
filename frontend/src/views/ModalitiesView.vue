<template>
  <DataTable
    title="Modalidades"
    :columns="columns"
    :rows="$store.state.modalities.all"
    @updateStatus="updateModalityStatus"
    @deleteItem="deleteModality"
    @newItem="openModal"
    @editItem="openModal"
  />
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import DataTable from '@/components/data-table/DataTable.vue'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      MainIcon,
      DataTable
    },
    data() {
      return {       
        columns: [
          {
            name: 'modality',
            label: 'Modalidade',
            align: 'left',
            field: row => row.name,
            sortable: true
          },
          {
            name: 'status',
            label: 'Status',
            align: 'center',
            field: row => row.status,
            sortable: false
          },
          {
            name: 'actions',
            label: '',
            align: 'right',
            field: row => row.actions,
            sortable: false
          },
        ],
      }
    },
    methods: {
      viewStudent(item) {
        this.MUTATE_MODALITY(item)
        this.TOGGLE_DRAWER()
      },
      updateModalityStatus(item){
        item.status = !item.status
        this.MUTATE_MODALITY(item)
        this.UPDATE_MODALITY({status: item.status})
      },
      deleteModality(item){
        this.MUTATE_MODALITY(item)
        this.DELETE_MODALITY()
      },
      openModal(item){
        this.MUTATE_MODAL_TITLE(item.modality ? item.modality : 'Nova Modalidade')
        this.MUTATE_MODALITY(item)
        this.TOGGLE_MODAL()
      },
      ...mapMutations('widgets', [
        'TOGGLE_MODAL',
        'TOGGLE_DRAWER',
        'MUTATE_MODAL_TITLE',
      ]),
      ...mapMutations('modalities', [
        'MUTATE_MODALITIES',
        'MUTATE_MODALITY'
      ]),
      ...mapActions('modalities', [
        'SET_MODALITIES',
        'UPDATE_MODALITY',
        'DELETE_MODALITY'
      ])
    },
    created(){
      this.SET_MODALITIES()
    },
  }
</script>