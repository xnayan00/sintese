<template>
  <q-form>
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-select
          v-model="team.modality"
          outlined
          rounded
          label="Modalidade"
        />
      </div>
      <div class="col-6">
        <q-select
          v-model="team.teacher"
          outlined
          rounded
          label="Professor"
        />
      </div>
      <div class="col-6">
        <q-input
          v-model="team.time_start"
          outlined
          rounded
          mask="##:##"
          label="Horário de início"
        />
      </div>
      <div class="col-6">
        <q-input
          v-model="team.time_end"
          outlined
          rounded
          mask="##:##"
          label="Horário de término"
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
      ...mapGetters('teams', {
        team: 'GET_TEAM'
      }),
    },
  }
</script>