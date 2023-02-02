<template>
  <q-form>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-input
          v-model="modality.modality"
          outlined
          rounded
          label="Nome da modalidade"
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
      ...mapGetters('modalities', {
        modality: 'GET_MODALITY'
      }),
    },
  }
</script>