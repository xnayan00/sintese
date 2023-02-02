<template>
  <q-drawer :width="200" show-if-above side="left" bordered>
    <q-list>
      <q-item>
        <div class="bg-transparent column items-center full-width">
          <q-avatar size="56px" class="q-mb-sm" color="primary">
            <!-- <img src=""> -->
            <q-icon color="white">
              <MainIcon name="account" />
            </q-icon>
          </q-avatar>
          <div class="text-weight-bold">Pietra Trovo</div>
          <div>Administrador</div>
        </div>
      </q-item>

      <q-separator />

      <q-item
        v-for="(item, idx) in items"
        :key="idx"
        clickable
        @click="$router.push({name: item.route})"
        v-ripple
        active-class="active-item"
        :active="$route.name === item.route"
      >
        <q-item-section side>
          <q-icon :color="$route.name === item.route ? 'primary' : ''">
            <MainIcon :name="item.icon" />
          </q-icon>
        </q-item-section>
        <q-item-section>{{ item.title }}</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
  import MainIcon from '../components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    },
    data(){
      return {
        items: [
          { title: 'Início', icon: 'home', route: 'home' },
          { title: 'Usuários', icon: 'account-group', route: 'users' },
          { title: 'Professores', icon: 'account-tie', route: 'teachers' },
          { title: 'Alunos', icon: 'account-school', route: 'students' },
          { title: 'Turmas', icon: 'class-room', route: 'teams' },
          { title: 'Modalidades', icon: 'dance-ballroom', route: 'modalities' },
          { title: 'Financeiro', icon: 'hand-coin', route: 'financial' },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .active-item {
    border-left: 5px solid $primary;
    padding-left: calc(16px - 5px);
    color: $primary;
  }
</style>