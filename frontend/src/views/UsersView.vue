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
      updateUserStatus(item){
        item.status = !item.status
        this.MUTATE_USER(item)
        this.UPDATE_USER({status: item.status})
      },
      deleteUser(item){
        this.MUTATE_USER(item)
        this.DELETE_USER()
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
        'MUTATE_USER'
      ]),
      ...mapActions('users', [
        'SET_USERS',
        'UPDATE_USER',
        'DELETE_USER'
      ])
    },
    created(){
      this.SET_USERS()
    },
  }
</script>