<template>
  <q-dialog :model-value="GET_MODAL" persistent>
    <component
      :is="$route.name + '-form'"
      @close="TOGGLE_MODAL"
    />
  </q-dialog>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import StudentsForm from '@/components/students/StudentsForm.vue'
  import TeachersForm from '@/components/teachers/TeachersForm.vue'
  import UsersForm from '@/components/users/UsersForm.vue'
  import ModalitiesForm from '@/components/modalities/ModalitiesForm.vue'
  import TeamsForm from '@/components/teams/TeamsForm.vue'
  import InvoicingForm from '@/components/financial/InvoicingForm.vue'
  import OutgoingForm from '@/components/financial/OutgoingForm.vue'
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      StudentsForm,
      TeachersForm,
      UsersForm,
      MainIcon,
      ModalitiesForm,
      TeamsForm,
      InvoicingForm,
      OutgoingForm
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

<style lang="scss">
  .form-modal{
    &-width {
      min-width: 800px;
      max-width: 1200px;
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
      max-width: 350px;
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