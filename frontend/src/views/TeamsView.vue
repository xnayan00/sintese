<template>
  <DataTable
    title="Turmas"
    :columns="columns"
    :rows="$store.state.teams.all"
    @updateStatus="updateTeamStatus"
    @deleteItem="deleteTeam"
    @newItem="openModal"
    @editItem="openModal"
  >
    <template v-slot:actions="{ item }">
      <q-item clickable @click="viewTeam(item)">
        <q-item-section side>
          <q-icon>
            <MainIcon name="eye" />
          </q-icon>
        </q-item-section>
        <q-item-section side>Ver turma</q-item-section>
      </q-item>
    </template>
  </DataTable>
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
            name: 'code',
            label: 'Código',
            align: 'left',
            field: row => row.code,
            sortable: true
          },
          {
            name: 'modality',
            label: 'Modalidade',
            align: 'left',
            field: row => row.modality,
            sortable: true
          },
          {
            name: 'teacher',
            label: 'Professor',
            align: 'left',
            field: row => row.teacher,
            sortable: true
          },
          {
            name: 'workload',
            label: 'Horário',
            align: 'left',
            field: row => row.time_start + ' / ' + row.time_end,
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
      viewTeam(item) {
        this.MUTATE_TEAM(item)
        this.TOGGLE_DRAWER()
      },
      updateTeamStatus(id){
        console.log(id);
      },
      deleteTeam(id){
        console.log(id);
      },
      openModal(item){
        this.MUTATE_MODAL_TITLE(item.code ? item.code + ' - ' + item.modality : 'Nova Turma')
        this.MUTATE_TEAM(item)
        this.TOGGLE_MODAL()
      },
      ...mapMutations('widgets', [
        'TOGGLE_MODAL',
        'TOGGLE_DRAWER',
        'MUTATE_MODAL_TITLE',
      ]),
      ...mapMutations('teams', [
        'MUTATE_TEAMS',
        'MUTATE_TEAM'
      ]),
    },
    created(){
      let team = {
        _id: 80,
        code: "#01",
        teacher: 'Mari',
        modality: 'Ballet Adulto',
        time_start: "15:30",
        time_end: "16:30",
        status: true,
        createdAt: '26/01/2023'
      }
      this.MUTATE_TEAMS([team])
    },
  }
</script>