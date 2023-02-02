<template>
  <q-layout view="lHr Lpr fFr" class="shadow-2">
    <FormsModal />

    <AppBar />

    <NavigationMenu />

    <InfoDrawer />

    <q-page-container padding>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  import NavigationMenu from './NavigationMenu.vue'
  import AppBar from './AppBar.vue'
  import InfoDrawer from './InfoDrawer.vue'
  import FormsModal from './FormsModal.vue'

  export default {
    components: {
      NavigationMenu,
      AppBar,
      InfoDrawer,
      FormsModal
    },
  }
</script>