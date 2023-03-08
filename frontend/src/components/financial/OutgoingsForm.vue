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
              v-model="outgoing.type"
              :options="types"
              option-value="id"
              option-label="text"
              label="Tipo"
              outlined
              rounded
              emit-value
              map-options
            />
          </div>
          <div class="col-4">
            <q-input
              v-model.number="outgoing.price"
              label="Valor"
              outlined
              rounded
            />
          </div>          
          <div v-if="outgoing.type == 1" class="col-12">
            <q-select
              v-model="outgoing.team"
              :options="teams"
              :option-label="team => team.modality.name + ' | ' + team.startTime + ' - ' + team.endTime"
              option-value="_id"
              label="Turma"
              outlined
              rounded
            />
          </div>
          <div class="col-12">
            <q-select
              v-if="outgoing.type == 1 || outgoing.type == 2"
              v-model="outgoing.receiver"
              :options="receivers"
              option-value="_id"
              option-label="name"
              label="Destinatário"
              outlined
              rounded
            />
            <q-input
              v-else
              v-model="outgoing.customReceiver"
              label="Destinatário"
              outlined
              rounded
            />
          </div>
          <div v-if="outgoing.type == 4" class="col-12">
            <q-input
              v-model="outgoing.description"
              label="Descrição"
              outlined
              type="textarea"
              rounded
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">        
      <q-btn
        label="cancelar"
        color="primary"
        rounded
        flat
        v-close-popup
      />
      <q-btn
        @click="SET_OUTGOING(outgoing)"
        class="form-modal__action-btn"
        label="Salvar"
        color="primary"
        rounded
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {
        outgoing: {},
        types: [
          { id: 1, text: 'Turma' },
          { id: 2, text: 'Pagamento de salário' },
          { id: 3, text: 'Despesas fixas' },
          { id: 4, text: 'Outros' }
        ],
      }
    },
    watch: {
      'outgoing.type'(newvalue){
        if (this.teams.length == 0 && newvalue == 1) this.SET_TEAMS()
        if(newvalue == 1) this.outgoing.receiverModel = 'Teachers'
        if(newvalue == 2) this.outgoing.receiverModel = 'Users'
      }
    },
    computed: {
      ...mapGetters('teachers', [
        'GET_TEACHERS'
      ]),
      ...mapGetters('users', [
        'GET_USERS'
      ]),
      ...mapGetters('teams', {
        teams: 'GET_TEAMS'
      }),
      receivers(){
        var receivers = []

        if(this.outgoing.type == 1){
          receivers = [...this.GET_TEACHERS]
        }else if(this.outgoing.type == 2){
          receivers = [...this.GET_USERS]
        }

        return receivers
      }
    },
    methods: {
      ...mapActions('outgoings', [
        'SET_OUTGOING'
      ]),
      ...mapActions('teachers', [
        'SET_TEACHERS'
      ]),
      ...mapActions('users', [
        'SET_USERS'
      ]),
      ...mapActions('teams', [
        'SET_TEAMS'
      ])
    },
    created(){
      this.SET_TEACHERS()
      this.SET_USERS()
    }
  }
</script>