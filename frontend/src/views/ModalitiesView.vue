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
  import { mapMutations } from 'vuex'

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
            field: row => row.modality,
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
      updateModalityStatus(id){
        console.log(id);
      },
      deleteModality(id){
        console.log(id);
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
    },
    created(){
      let modality = {
        _id: 150,
        modality: 'Danças Urbanas',
        status: true,
        createdAt: '05/01/2023'
      }
      this.MUTATE_MODALITIES([modality])
    },
  }
</script>