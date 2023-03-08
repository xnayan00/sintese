<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">Nova saída</span>
    </q-card-section>
    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-md">
          <div class="col-8">
            <q-select
              :options="receivers"
              option-value="_id"
              option-label="name"
              label="Destinatário"
              outlined
              rounded
            />
          </div>
          <div class="col-4">
            <q-input
              label="Valor"
              outlined
              rounded
            />
          </div>
          <div class="col-6">
            <q-select
              :options="types"
              option-value="id"
              option-label="text"
              label="Tipo"
              outlined
              rounded
            />
          </div>
          <div class="col-6">
            <q-select
              label="Referência"
              outlined
              rounded
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">        
      <q-btn v-close-popup label="cancelar" rounded flat color="primary" />
      <q-btn class="form-modal__action-btn" rounded label="Salvar" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
  export default {
    data(){
      return {
        types: [
          { id: 1, text: 'Turma' },
          { id: 2, text: 'Pagamento de salário' },
          { id: 3, text: 'Despesas fixas' },
          { id: 4, text: 'Outros' }
        ],
        teachers: [],
        users: [],
      }
    },
    computed: {
      receivers(){
        return [...this.teachers, ...this.users]
      }
    },
    methods: {
      getTeachers(){
        http.get('/teachers')
          .then(res => {
            this.teachers = res.data.data
          })
          .catch(e => {
            console.error(e);
          })
      },
      getUsers(){
        http.get('/users')
          .then(res => {
            this.users = res.data.data
          })
          .catch(e => {
            console.error(e);
          })
      },
    }
  }
</script>