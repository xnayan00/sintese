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
            field: row => row.modality ? row.modality.name : '',
            sortable: true
          },
          {
            name: 'teacher',
            label: 'Professor',
            align: 'left',
            field: row => row.teacher ? row.teacher.name : '',
            sortable: true
          },
          {
            name: 'workload',
            label: 'Horário',
            align: 'center',
            field: row => row.startTime + ' / ' + row.endTime,
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
      updateTeamStatus(item){
        item.status = !item.status
        this.MUTATE_TEAM(item)
        this.UPDATE_TEAM({status: item.status})
      },
      deleteTeam(item){
        this.MUTATE_TEAM(item)
        this.DELETE_TEAM()
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
      ...mapActions('teams', [
        'SET_TEAMS',
        'UPDATE_TEAM',
        'DELETE_TEAM'
      ])
    },
    created(){
      this.SET_TEAMS()
    },
  }
</script>