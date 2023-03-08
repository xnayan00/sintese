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
              v-model="student.parent.name"
              label="Nome do responsável"
              outlined
              rounded
            />
          </div>
          <div v-if="ageCalculator < 18" class="col-6">
            <q-input
              v-model="student.parent.contact"
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
          <div class="col-5">
            <q-select
              v-model="team.teamId"
              :options="teams"
              option-value="_id"
              outlined
              rounded
              dense
              label="Turmas"  
            >
              <template v-slot:selected-item="{ opt }">
                {{ opt.modality.name + ' - ' + opt.teacher.name }}
              </template>
              <template v-slot:option="{ opt, toggleOption, selected }">
                <q-item :class="{'bg-red-1': selected}" @click="toggleOption(opt)" clickable>
                  <q-item-section>
                    <q-item-label>
                      <q-icon color="primary">
                        <MainIcon name="account-tie" />
                      </q-icon>
                      {{ opt.teacher.name }}
                    </q-item-label>
                    <q-item-label caption>
                      <q-chip size="sm" outline class="text-weight-bold" color="primary">
                        {{ opt.modality.name }}
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    {{ opt.startTime + ' - ' + opt.endTime }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-3">
            <q-input
              v-model="team.currency"
              outlined
              rounded
              dense
              label="Valor da mensalidade"  
            />
          </div>
          <div class="col-3">
            <q-select
              v-model="team.dueDate"
              :options="['05', '10', '15']"
              outlined
              rounded
              dense
              label="Vencimento"  
            />
          </div>
          <div class="col-1">
            <q-btn v-if="isEditingTeam" @click="updateTeam" round outline color="positive">
              <q-icon>
                <MainIcon name="check-circle" />
              </q-icon>
            </q-btn>
            <q-btn v-else @click="addTeam(team)" round outline color="primary">
              <q-icon>
                <MainIcon name="plus-circle" />
              </q-icon>
            </q-btn>
          </div>
          <div class="col-12">
            <q-table
              class="q-my-md"
              :rows="student.teams"
              :columns="columns"
              dense
              row-key="name"
              no-data-label="Nenhuma turma adicionada"
              hide-pagination
            >
              <template v-slot:body-cell-actions="{ row, rowIndex }">
                <q-td align="right">
                  <q-btn
                    @click="editTeam(row)"
                    size="sm"
                    round
                    flat
                    :disable="isEditingTeam"
                  >
                    <q-icon color="grey-7">
                      <MainIcon name="edit" />
                    </q-icon>
                  </q-btn>
                  <q-btn
                    @click="REMOVE_TEAM(rowIndex)"
                    size="sm"
                    round
                    flat
                    :disable="isEditingTeam"
                  >
                    <q-icon color="negative">
                      <MainIcon name="trash" />
                    </q-icon>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
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
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    },
    data: () => ({
      team: {
        teamId: null,
        currency: null,
        dueDate: null
      },
      isEditingTeam: false,
      columns: [
        {
          name: 'modality',
          label: 'Modalidade',
          align: 'left',
          field: row => row.teamId && row.teamId.modality.name,
        },
        {
          name: 'period',
          label: 'Período',
          align: 'left',
          field: row => row.teamId ? row.teamId.startTime + ' - ' + row.teamId.endTime : '',
        },
        {
          name: 'teacher',
          label: 'Professor',
          align: 'left',
          field: row => row.teamId ? row.teamId.teacher.name : '',
        },
        {
          name: 'currency',
          label: 'Mensalidade',
          align: 'center',
          field: row => row.currency ? row.currency : '',
        },
        {
          name: 'dueDate',
          label: 'Vencimento',
          align: 'center',
          field: row => row.dueDate ? row.dueDate : '',
        },
        {
          name: 'actions',
          label: 'Ações',
          align: 'right',
        },
      ]
    }),
    computed: {
      ...mapGetters('students', {
        student: 'GET_STUDENT'
      }),
      ...mapGetters('teams', {
        teams: 'GET_TEAMS'
      }),
      ageCalculator(){
        if(!this.student.birthday) return 'xx'

        let currentYear = new Date().getFullYear()
        let birthdayYear = this.student.birthday.split('/')[2]

        return currentYear - birthdayYear
      }
    },
    methods: {
      resetTeam(){
        this.team = {
          teamId: null,
          currency: null,
          dueDate: null
        }
      },
      addTeam(item) {
        this.ADD_TEAM(item)
        this.resetTeam()
      },
      updateTeam(){
        this.isEditingTeam = false
        this.resetTeam()
      },
      editTeam(item){
        this.team = item
        this.isEditingTeam = true
      },
      ...mapMutations('students', [
        'ADD_TEAM',
        'REMOVE_TEAM'
      ]),
      ...mapActions('students', [
        'SET_STUDENT',
        'UPDATE_STUDENT'
      ]),
      ...mapActions('teams', [
        'SET_TEAMS'
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
    created(){
      this.SET_TEAMS()
    }
  }
</script>

<style>
  .btn-max-width {
    max-width: 160px;
    z-index: 1;
  }
</style>