<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">{{ student.name ? student.name : 'Novo Aluno' }}</span>
    </q-card-section>

    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input
              v-model="student.name"
              outlined
              rounded
              label="Nome completo"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="student.email"
              outlined
              rounded
              label="Email"
              placeholder="sintese@exemplo.com.br"
            />
          </div>
          <div class="col-6">
            <div class="relative-position">
              <q-input
                v-model="student.contact"
                outlined
                rounded
                mask="(##) #####-####"
                placeholder="(xx) xxxxx-xxxx"
                label="Telefone"  
              />
              <q-btn
                @click.stop="student.contact_isWpp = !student.contact_isWpp"
                class="btn-max-width absolute-right"
                size="large"
                unelevated
                :ripple="false"
                rounded
                :outline="!student.contact_isWpp"
                color="primary"
              >
                <q-icon>
                  <MainIcon name="whatsapp" />
                </q-icon>
                <span class="text-caption">Tem whatsapp?</span>
              </q-btn>
            </div>
          </div>
          <div class="col-6">
            <q-input
              label="Data de nascimento"
              v-model="student.birthday"
              mask="##/##/####"
              outlined
              rounded
              placeholder="xx/xx/xxxx"
              :suffix="ageCalculator + ' anos'"
            >
              <template v-slot:prepend>
                <q-icon>
                  <MainIcon name="calendar" />
                </q-icon>
              </template>
            </q-input>
          </div>
          <div v-if="ageCalculator < 18" class="col-6">
            <q-input
              label="Nome do responsável"
              outlined
              rounded
            />
          </div>
          <div v-if="ageCalculator < 18" class="col-6">
            <q-input
              label="Contato do responsável"
              mask="(##) #####-####"
              placeholder="(xx) xxxxx-xxxx"
              outlined
              rounded
            />
          </div>
          <div class="col-12">
            <q-separator class="q-my-md" />
          </div>
          <div class="col-6">
            <q-select
              outlined
              rounded
              dense
              label="Turmas"  
            />
          </div>
          <div class="col-5">
            <q-input
              outlined
              rounded
              dense
              label="Valor da mensalidade"  
            />
          </div>
          <div class="col-1">
            <q-btn round outline color="primary">
              <q-icon>
                <MainIcon name="plus-circle" />
              </q-icon>
            </q-btn>
          </div>
          <div class="col-12">
            <q-table
              class="q-my-md"
              :rows="teams"
              :columns="columns"
              dense
              row-key="name"
              no-data-label="Nenhuma turma adicionada"
              hide-pagination
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">
      <q-btn @click="$emit('close')" label="cancelar" rounded flat color="primary" />
      <q-btn
        v-if="student._id"
        class="form-modal__action-btn"
        rounded
        label="Salvar alterações"
        @click="updateStudent"
        color="primary"
      />
      <q-btn
        v-else
        class="form-modal__action-btn"
        rounded
        label="Cadastrar"
        @click="createStudent"
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
    data: () => ({
      teams: [],
      columns: [
        {
          name: 'studentClass',
          label: 'Turma',
          align: 'left',
          field: row => row.studentClass,
        },
        {
          name: 'workload',
          label: 'Período',
          align: 'left',
          field: row => row.studentClass,
        },
        {
          name: 'studentClass',
          label: 'Professor',
          align: 'left',
          field: row => row.studentClass,
        },
        {
          name: 'classPrice',
          label: 'Mensalidade',
          align: 'center',
          field: row => row.studentClass,
        },
      ]
    }),
    computed: {
      ...mapGetters('students', {
        student: 'GET_STUDENT'
      }),
      ageCalculator(){
        if(!this.student.birthday) return 'xx'

        let currentYear = new Date().getFullYear()
        let birthdayYear = this.student.birthday.split('/')[2]

        return currentYear - birthdayYear
      }
    },
    methods: {
      ...mapActions('students', [
        'SET_STUDENT',
        'UPDATE_STUDENT'
      ]),
      createStudent(){
        this.SET_STUDENT(this.student)
        this.$emit('close')
      },
      updateStudent(){
        this.UPDATE_STUDENT(this.student)
        this.$emit('close')
      }
    },
  }
</script>

<style>
  .btn-max-width {
    max-width: 160px;
    z-index: 1;
  }
</style>