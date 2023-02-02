<template>
  <DataTable
    title="Usuários"
    :columns="columns"
    :rows="$store.state.users.all"
    @updateStatus="updateUserStatus"
    @deleteItem="deleteUser"
    @newItem="openModal"
    @editItem="openModal"
  >
    <template v-slot:actions="{ item }">
      <q-item clickable @click="viewUser(item)">
        <q-item-section side>
          <q-icon>
            <MainIcon name="eye" />
          </q-icon>
        </q-item-section>
        <q-item-section side>Ver usuário</q-item-section>
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
      viewUser(item) {
        this.MUTATE_USER(item)
        this.TOGGLE_DRAWER()
      },
      updateUserStatus(id){
        console.log(id);
      },
      deleteUser(id){
        console.log(id);
      },
      openModal(item){
        this.MUTATE_MODAL_TITLE(item.name ? item.name : 'Novo Usuário')
        this.MUTATE_USER(item)
        this.TOGGLE_MODAL()
      },
      ...mapMutations('widgets', [
        'TOGGLE_MODAL',
        'TOGGLE_DRAWER',
        'MUTATE_MODAL_TITLE',
      ]),
      ...mapMutations('users', [
        'MUTATE_USERS',
        'MUTATE_USER'
      ]),
    },
    created(){
      let user = {
        _id: 77,
        name: 'Pietra F. Trovo',
        contact: '(41) 99155-0203',
        birthday: '15/10/1990',
        email: 'pietra.trovo@gmail.com',
        status: true,
        createdAt: '01/01/2023'
      }
      this.MUTATE_USERS([user])
    },
  }
</script>