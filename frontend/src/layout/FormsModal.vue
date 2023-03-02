<template>
  <q-dialog :model-value="GET_MODAL" persistent>
    <q-card flat class="form-modal-width bg-transparent q-pt-xl">
      <q-card-section class="bg-primary text-white form-modal__title">
        <span class="text-h6">{{ GET_TITLE }}</span>
      </q-card-section>

      <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
        <component :is="$route.name + '-form'" />
      </q-card-section>

      <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">        
        <q-btn @click="TOGGLE_MODAL" label="cancelar" rounded flat color="primary" />
        <q-btn class="form-modal__action-btn" rounded label="Salvar" color="primary" />
      </q-card-actions>      
    </q-card>
  </q-dialog>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import StudentsForm from '@/components/students/StudentsForm.vue'
  import TeachersForm from '@/components/teachers/TeachersForm.vue'
  import UsersForm from '@/components/users/UsersForm.vue'
  import ModalitiesForm from '@/components/modalities/ModalitiesForm.vue'
  import TeamsForm from '@/components/teams/TeamsForm.vue'
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      StudentsForm,
      TeachersForm,
      UsersForm,
      MainIcon,
      ModalitiesForm,
      TeamsForm,
    },
    computed: mapGetters('widgets', [
      'GET_MODAL',
      'GET_TITLE',
    ]),
    methods: {
      ...mapMutations('widgets', [
        'TOGGLE_MODAL'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .form-modal{
    &-width {
      min-width: 600px;
      max-width: 800px;
    }
    &__action-btn {
      width: 100px;
    }
    &__title {
      border-radius: 25px!important;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 300px;
      height: 50px;
      left: 50%;
      top: 25px;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
  .rounded-top {
    border-radius: 15px 15px 0 0!important;
  }
  .rounded-bottom {
    border-radius: 0 0 15px 15px!important;
  }
</style>