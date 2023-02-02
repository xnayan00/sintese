<template>
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
            @click.stop="user.contact_isWpp = !user.contact_isWpp"
            class="btn-max-width absolute-right"
            size="large"
            unelevated
            :ripple="false"
            rounded
            :outline="!user.contact_isWpp"
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
</template>

<script>
  import { mapGetters } from 'vuex'
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
  }
</script>