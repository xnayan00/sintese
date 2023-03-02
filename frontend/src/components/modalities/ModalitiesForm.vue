<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">Nova Modalidade</span>
    </q-card-section>

    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-input
              v-model="modality.name"
              outlined
              rounded
              label="Nome"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="modality.description"
              outlined
              rounded
              type="textarea"
              label="Descrição"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">
      <q-btn @click="$emit('close')" label="cancelar" rounded flat color="primary" />
      <q-btn
        v-if="modality._id"
        class="form-modal__action-btn"
        rounded
        label="Salvar alterações"
        @click="updateModality"
        color="primary"
      />
      <q-btn
        v-else
        class="form-modal__action-btn"
        rounded
        label="Cadastrar"
        @click="createModality"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
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
    methods: {
      ...mapActions('modalities', [
        'SET_MODALITY',
        'UPDATE_MODALITY'
      ]),
      createModality(){
        this.SET_MODALITY(this.modality)
        this.$emit('close')
      },
      updateModality(){
        this.UPDATE_MODALITY(this.modality)
        this.$emit('close')
      }
    },
  }
</script>