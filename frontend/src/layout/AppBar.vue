<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-space />
      <q-btn flat dense>
        <div>Sair</div>
        <q-icon right>
          <MainIcon name="exit" />
        </q-icon>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    }
  }
</script>