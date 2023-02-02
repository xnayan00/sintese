<template>
  <DataTable
    title="Alunos"
    :columns="columns"
    :rows="$store.state.students.all"
    @updateStatus="updateStudentStatus"
    @deleteItem="deleteStudent"
    @newItem="openModal"
    @editItem="openModal"
  >
    <template v-slot:actions="{ item }">
      <q-item clickable @click="viewStudent(item)">
        <q-item-section side>
          <q-icon>
            <MainIcon name="eye" />
          </q-icon>
        </q-item-section>
        <q-item-section side>Ver aluno</q-item-section>
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
      viewStudent(item) {
        this.MUTATE_STUDENT(item)
        this.TOGGLE_DRAWER()
      },
      updateStudentStatus(id){
        console.log(id);
      },
      deleteStudent(id){
        console.log(id);
      },
      openModal(item){
        this.MUTATE_MODAL_TITLE(item.name ? item.name : 'Novo Aluno')
        this.MUTATE_STUDENT(item)
        this.TOGGLE_MODAL()
      },
      ...mapMutations('widgets', [
        'TOGGLE_MODAL',
        'TOGGLE_DRAWER',
        'MUTATE_MODAL_TITLE',
      ]),
      ...mapMutations('students', [
        'MUTATE_STUDENTS',
        'MUTATE_STUDENT'
      ]),
    },
    created(){
      let student = {
        _id: 15,
        name: 'Yan Ricardo Mendes',
        contact: '(41) 99878-8765',
        birthday: '15/02/1997',
        email: 'yan_mendes.18@outlook.com',
        currentClass: 'danças urbanas',
        status: true,
        createdAt: '25/10/2020'
      }
      this.MUTATE_STUDENTS([student])
    },
  }
</script>