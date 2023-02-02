<template>
  <div class="window-height row items-center justify-center login-container">
    <div class="column login__image-column col-6 items-end">
      <LoginImageCard />
    </div>
    <div class="col-6 login__form-column">
      <LoginFormCard />
    </div>
  </div>
</template>

<script>
  import LoginFormCard from '@/components/login/LoginFormCard.vue'
  import LoginImageCard from '@/components/login/LoginImageCard.vue'

  export default {
    components: {
      LoginFormCard,
      LoginImageCard
    },
  }
</script>

<style lang="scss" scoped>
  $negative-margin: -40px;

  .login{
    &-container {
      background: $dark-gradient;
    }

    &__image-column {
      margin-right: $negative-margin;
    }

    &__form-column {
      margin-left: $negative-margin;
    }
  }
</style>
