<template>
  <q-form>
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-select
          v-model="student.name"
          outlined
          rounded
          label="Usuário"
        />
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
      ...mapGetters('students', {
        student: 'GET_STUDENT'
      }),
      ageCalculator(){
        if(!this.student.birthday) return 'xx'

        let currentYear = new Date().getFullYear()
        let birthdayYear = this.student.birthday.split('/')[2]

        return currentYear - birthdayYear
      }
    },
  }
</script>

<style>
  .btn-max-width {
    max-width: 160px;
    z-index: 1;
  }
</style>