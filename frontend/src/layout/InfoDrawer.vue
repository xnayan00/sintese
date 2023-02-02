<template>
  <q-dialog
    :model-value="GET_DRAWER"
    @update:model-value="TOGGLE_DRAWER"
    position="right"
    maximized
  >
    <component
      class="info-card-width bg-primary text-white overflow-hidden"
      :is="$route.name + '-info-card'"
    />
  </q-dialog>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import StudentsInfoCard from '@/components/students/StudentsInfoCard.vue'
  import TeachersInfoCard from '@/components/teachers/TeachersInfoCard.vue'
  import UsersInfoCard from '@/components/users/UsersInfoCard.vue'
  import TeamsInfoCard from '@/components/teams/TeamsInfoCard.vue'

  export default {
    components: {
      StudentsInfoCard,
      TeachersInfoCard,
      UsersInfoCard,
      TeamsInfoCard,
    },
    computed: {
      ...mapGetters('widgets', [
        'GET_DRAWER'
      ]),
    },
    methods: {
      ...mapMutations('widgets', [
        'TOGGLE_DRAWER'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .info-card-width {
    width: 300px;
  }
</style>