<template>  
  <q-card class="form-card shadow-15 q-px-md">
    <q-card-section>
      <h6 class="text-center text-primary text-bold">
        Faça seu login
      </h6>
    </q-card-section>
    <q-card-section>
      <q-form>
        <q-input
          label="Usuário"
          class="q-my-sm"
          outlined
          rounded
        >
          <template v-slot:prepend>
            <q-icon size="sm">
              <MainIcon name="account" />
            </q-icon>
          </template>
        </q-input>
        <q-input
          label="Senha"
          type="password"
          class="q-my-sm"
          outlined
          rounded
        >
          <template v-slot:prepend>
            <q-icon>
              <MainIcon name="lock" />
            </q-icon>
          </template>
        </q-input>
        <q-btn
          color="primary"
          class="full-width"
          size="lg"
          rounded
        >
          entrar
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  
  export default {
    components: {
      MainIcon
    }
  }
</script>

<style lang="scss" scoped>
  $card-width: 300px;

  .form-card {
    border-radius: 15px;
    width: $card-width;
    height: $card-width;
  }
</style>