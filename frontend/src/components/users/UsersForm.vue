<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">{{ user.name ? user.name : 'Novo Usuário' }}</span>
    </q-card-section>

    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input
              v-model="user.name"
              outlined
              rounded
              label="Nome completo"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="user.email"
              outlined
              rounded
              label="Email"
              placeholder="sintese@exemplo.com.br"
            />
          </div>
          <div class="col-6">
            <div class="relative-position">
              <q-input
                v-model="user.contact"
                outlined
                rounded
                mask="(##) #####-####"
                placeholder="(xx) xxxxx-xxxx"
                label="Telefone"  
              />
              <q-btn
                @click.stop="user.contactIsWpp = !user.contactIsWpp"
                class="btn-max-width absolute-right"
                size="large"
                unelevated
                :ripple="false"
                rounded
                :outline="!user.contactIsWpp"
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
              v-model="user.birthday"
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
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">
      <q-btn @click="$emit('close')" label="cancelar" rounded flat color="primary" />
      <q-btn
        v-if="user._id"
        class="form-modal__action-btn"
        rounded
        label="Salvar alterações"
        @click="updateUser"
        color="primary"
      />
      <q-btn
        v-else
        class="form-modal__action-btn"
        rounded
        label="Cadastrar"
        @click="createUser"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    },
    computed: {
      ...mapGetters('users', {
        user: 'GET_USER'
      }),
      ageCalculator(){
        if(!this.user.birthday) return 'xx'

        let currentYear = new Date().getFullYear()
        let birthdayYear = this.user.birthday.split('/')[2]

        return currentYear - birthdayYear
      }
    },
    methods: {
      ...mapActions('users', [
        'SET_USER',
        'UPDATE_USER'
      ]),
      createUser(){
        this.SET_USER(this.user)
        this.$emit('close')
      },
      updateUser(){
        this.UPDATE_USER(this.user)
        this.$emit('close')
      }
    },
  }
</script>