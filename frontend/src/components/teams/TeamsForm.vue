<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">Nova Turma</span>
    </q-card-section>

    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-select
              v-model="team.modality"
              :options="modalities"
              option-value="_id"
              option-label="name"
              outlined
              rounded
              label="Modalidade"
            />
          </div>
          <div class="col-6">
            <q-select
              v-model="team.teacher"
              :options="teachers"
              option-value="_id"
              option-label="name"
              outlined
              rounded
              label="Professor"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="team.startTime"
              outlined
              rounded
              mask="##:##"
              label="Horário de início"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="team.endTime"
              outlined
              rounded
              mask="##:##"
              label="Horário de término"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">
      <q-btn @click="$emit('close')" label="cancelar" rounded flat color="primary" />
      <q-btn
        v-if="team._id"
        class="form-modal__action-btn"
        rounded
        label="Salvar alterações"
        @click="updateTeam"
        color="primary"
      />
      <q-btn
        v-else
        class="form-modal__action-btn"
        rounded
        label="Cadastrar"
        @click="createTeam"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    },
    computed: {
      ...mapGetters('teams', {
        team: 'GET_TEAM'
      }),
      ...mapGetters('modalities', {
        modalities: 'GET_MODALITIES'
      }),
      ...mapGetters('teachers', {
        teachers: 'GET_TEACHERS'
      })
    },
    methods: {
      ...mapActions('teams', [
        'SET_TEAM',
        'UPDATE_TEAM'
      ]),
      ...mapActions('modalities', [
        'SET_MODALITIES'
      ]),
      ...mapActions('teachers', [
        'SET_TEACHERS'
      ]),
      createTeam(){
        this.SET_TEAM(this.team)
        this.$emit('close')
      },
      updateTeam(){
        this.UPDATE_TEAM(this.team)
        this.$emit('close')
      }
    },
    created(){
      this.SET_MODALITIES()
      this.SET_TEACHERS()
    }
  }
</script>