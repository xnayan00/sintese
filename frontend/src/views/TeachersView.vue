<template>
  <DataTable
    title="Professores"
    :columns="columns"
    :rows="$store.state.teachers.all"
    @updateStatus="updateTeacherStatus"
    @deleteItem="deleteTeacher"
    @newItem="openModal"
    @editItem="openModal"
  >
    <template v-slot:actions="{ item }">
      <q-item clickable @click="viewTeacher(item)">
        <q-item-section side>
          <q-icon>
            <MainIcon name="eye" />
          </q-icon>
        </q-item-section>
        <q-item-section side>Ver professor</q-item-section>
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
            name: 'name',
            label: 'Nome',
            align: 'left',
            field: row => row.name,
            sortable: true
          },
          {
            name: 'contact',
            label: 'Contato',
            align: 'left',
            field: row => row.contact,
            sortable: true
          },
          {
            name: 'email',
            label: 'Email',
            align: 'left',
            field: row => row.email,
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
      viewTeacher(item) {
        this.MUTATE_TEACHER(item)
        this.TOGGLE_DRAWER()
      },
      updateTeacherStatus(id){
        console.log(id);
      },
      deleteTeacher(id){
        console.log(id);
      },
      openModal(item){
        this.MUTATE_MODAL_TITLE(item.name ? item.name : 'Novo Professor')
        this.MUTATE_TEACHER(item)
        this.TOGGLE_MODAL()
      },
      ...mapMutations('widgets', [
        'TOGGLE_MODAL',
        'TOGGLE_DRAWER',
        'MUTATE_MODAL_TITLE',
      ]),
      ...mapMutations('teachers', [
        'MUTATE_TEACHERS',
        'MUTATE_TEACHER'
      ]),
    },
    created(){
      let teacher = {
        _id: 20,
        name: 'Thiago Dina Stuart',
        contact: '(41) 99465-2201',
        birthday: '20/04/1993',
        email: 'thiago_dina@gmail.com',
        status: true,
        createdAt: '26/01/2023'
      }
      this.MUTATE_TEACHERS([teacher])
    },
  }
</script>