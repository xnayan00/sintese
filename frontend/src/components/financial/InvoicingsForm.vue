<template>
  <q-card flat class="form-modal-width bg-transparent q-pt-xl">
    <q-card-section class="bg-primary text-white form-modal__title">
      <span class="text-h6">Nova entrada</span>
    </q-card-section>

    <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
      <q-form>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-select
              v-model="invoicing.contributor"
              label="Contribuinte"
              :options="contributors"
              option-value="_id"
              option-label="name"
              outlined
              rounded
            />
          </div>
          <div class="col-8">
            <q-select
              v-model="invoicing.reference"
              label="Referência"
              :options="references"
              option-value="_id"
              outlined
              rounded
            >
            <template v-slot:selected-item="{ opt }">
              {{ opt.modality.name + ' - ' + opt.teacher.name }}
            </template>
            <template v-slot:option="{ opt, toggleOption, selected }">
              <q-item :class="{'bg-red-1': selected}" @click="toggleOption(opt)" clickable>
                <q-item-section>
                  <q-item-label>
                    <q-icon color="primary">
                      <MainIcon name="account-tie" />
                    </q-icon>
                    {{ opt.teacher.name }}
                  </q-item-label>
                  <q-item-label caption>
                    <q-chip size="sm" outline class="text-weight-bold" color="primary">
                      {{ opt.modality.name }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  {{ opt.startTime + ' - ' + opt.endTime }}
                </q-item-section>
              </q-item>
            </template>
            </q-select>
          </div>
          <div class="col-4">
            <q-input
              v-model.number="invoicing.price"
              label="Valor R$"
              outlined
              rounded
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">        
      <q-btn
        v-close-popup
        label="cancelar"
        rounded
        flat
        color="primary"
      />
      <q-btn
        @click="SET_INVOICING(invoicing)"
        class="form-modal__action-btn"
        label="Salvar"
        color="primary"
        rounded
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      MainIcon
    },
    data(){
      return {
        invoicing: {}
      }
    },
    computed: {
      ...mapGetters('students', {
        contributors: 'GET_STUDENTS'
      }),
      ...mapGetters('teams', {
        references: 'GET_TEAMS'
      })
    },
    methods: {
      ...mapActions('invoicings', [
        'SET_INVOICING'
      ]),
      ...mapActions('students', [
        'SET_STUDENTS'
      ]),
      ...mapActions('teams', [
        'SET_TEAMS'
      ]),
    },
    created(){
      this.SET_STUDENTS()
      this.SET_TEAMS()
    }
  }
</script>