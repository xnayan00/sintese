<template>
  <q-card class="q-pa-lg" flat>
    <div class="row">
      <div class="q-mb-xl col-12">
        <q-card flat>
          <div class="d-flex row align-center justify-center">
            <q-card-section>
              <h4 class="text-center text-h6 text-grey-7">Caixa</h4>
              <h3 class="text-center text-primary">R$ 1.250,00</h3>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-xl">
      <div class="col-12">
        <q-toolbar class="bg-primary text-white pill">
          <q-toolbar-title>{{ currentDate }}</q-toolbar-title>

          <q-btn icon="event" round color="white" flat>
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date range :locale="locale" v-model="proxyDate" minimal>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancelar" color="primary" flat v-close-popup />
                  <q-btn label="Filtrar" color="primary" rounded @click="save" v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>

        </q-toolbar>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <q-list>
          <q-item :ripple="false">
            <q-item-section avatar>              
              <q-icon size="md" color="positive">
                <MainIcon name="plus-circle" />
              </q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-grey-7 text-h6">
                Entradas
              </q-item-label>
              <q-item-label class="text-subtitle2 text-positive text-weight-bold">
                {{ convertMoney(totalInvoicings) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-btn
                @click="invoicingForm = true"
                color="positive"
                outline
                rounded
              >
                Nova entrada
              </q-btn>
              <q-dialog v-model="invoicingForm" persistent>
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
                    <q-btn v-close-popup label="cancelar" rounded flat color="primary" />
                    <q-btn @click="createInvoicing" class="form-modal__action-btn" rounded label="Salvar" color="primary" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-item-section>
          </q-item>
        </q-list>
        
        <h6 v-if="invoicings.length == 0" class="text-center text-grey-5">Nenhuma entrada</h6>

        <q-scroll-area style="height: 65vh">
        <q-list padding>
            <q-item v-for="(item, idx) in invoicings" class="list-item" :key="idx">
              <q-item-section>
                <q-item-label class="text-weight-bold text-grey-7">{{ item.contributor.name }}</q-item-label>
                <q-item-label overline>{{ convertDate(item.createdAt) }}</q-item-label>
                <q-item-label>
                  <q-chip class="q-ml-none" size="12px" color="green-11">{{ item.reference.modality.name }}</q-chip>
                </q-item-label>
              </q-item-section>

              <q-item-section side center>
                <q-item-label class="text-h5 text-positive">{{ convertMoney(item.price) }}</q-item-label>
              </q-item-section>
              
              <q-item-section class="absolute-right" side top>
                <q-btn @click="removeInvoicing(item._id, idx)" round flat size="sm">
                  <q-icon color="negative">
                    <MainIcon name="close" />
                  </q-icon>
                </q-btn>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </div>
      
      <div class="col-12 col-md-6">        
        <q-list>
          <q-item :ripple="false">
            <q-item-section avatar>              
              <q-icon size="md" color="negative">
                <MainIcon name="minus-circle" />
              </q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-grey-7 text-h6">
                Saídas
              </q-item-label>
              <q-item-label class="text-subtitle2 text-negative text-weight-bold">
                R$ 987,33
              </q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-btn
                @click="outgoingForm = true"
                color="negative"
                outline
                rounded
              >
                Nova saída
              </q-btn>              
              <q-dialog v-model="outgoingForm" persistent>
                <q-card flat class="form-modal-width bg-transparent q-pt-xl">
                  <q-card-section class="bg-primary text-white form-modal__title">
                    <span class="text-h6">Nova saída</span>
                  </q-card-section>
                  <q-card-section class="rounded-top bg-white q-pt-xl q-px-lg">
                    <q-form>
                      <div class="row q-col-gutter-md">
                        <div class="col-12">
                          <q-select
                            label="Destinatário"
                            outlined
                            rounded
                          />
                        </div>
                        <div class="col-8">
                          <q-select
                            label="Referência"
                            outlined
                            rounded
                          />
                        </div>
                        <div class="col-4">
                          <q-input
                            label="Valor"
                            outlined
                            rounded
                          />
                        </div>
                      </div>
                    </q-form>
                  </q-card-section>

                  <q-card-actions class="bg-white rounded-bottom q-px-lg" align="right">        
                    <q-btn v-close-popup label="cancelar" rounded flat color="primary" />
                    <q-btn class="form-modal__action-btn" rounded label="Salvar" color="primary" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-item-section>
          </q-item>
        </q-list>  

        <h6 v-if="invoicings.length == 0" class="text-center text-grey-5">Nenhuma saída</h6>

        <q-scroll-area
          style="height: 65vh"
        >
          <q-list v-for="n in outgoings" :key="n" padding>
            <q-item class="list-item">
              <q-item-section>
                <q-item-label class="text-weight-bold text-grey-7">Thiago D. Stuart</q-item-label>
                <q-item-label overline>11/01/2023</q-item-label>
              </q-item-section>
      
              <q-item-section side center>
                <q-item-label class="text-h5 text-negative">R$ 50,00</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>

  </q-card>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import http from "@/http"
  import { useConvertDate } from '@/filters/ConvertDate.js'
  import { useConvertMoney } from '@/filters/ConvertMoney.js'
  export default {
    setup(){
      const convertDate = useConvertDate
      const convertMoney = useConvertMoney

      return { convertDate, convertMoney }
    },
    components: {
      MainIcon
    },
    data(){
      return {
        locale: {
          days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        proxyDate: {
          from: new Date(Date.now()).toISOString().slice(0, 10).split('-').join('/'),
          to: new Date(Date.now()).toISOString().slice(0, 10).split('-').join('/'),
        },
        invoicing: {},
        totalInvoicings: 0,
        invoicings: [],
        outgoings: [],
        contributors: [],
        references: [],
        invoicingForm: false,
        outgoingForm: false,
      }
    },
    computed: {
      currentDate(){
        let fromDate = this.proxyDate.from.split('/').reverse().join('/')
        let toDate = this.proxyDate.to.split('/').reverse().join('/')
        
        if(fromDate === toDate) return toDate

        return fromDate + ' - ' + toDate
      }
    },
    methods: {
      removeInvoicing(id, idx){
        http.delete(`/invoicings/${id}`)
          .then(() => {
            this.invoicings.splice(idx, 1)
          })
          .catch(e => {
            console.error(e);
          })
      },
      createInvoicing(){
        http.post('/invoicings', this.invoicing)
          .then(res => {
            const data = res.data.data
            this.totalInvoicings += parseInt(this.invoicing.price) 
            this.invoicings.unshift({...this.invoicing, createdAt: data.createdAt, updatedAt: data.updatedAt})
          })
          .catch(e => {
            console.error(e);
          })
          .finally(() => {
            this.invoicingForm = false
          })
      },
      getStudents(){
        http.get('/students')
          .then(res => {
            this.contributors = res.data.data
          })
          .catch(e => {
            console.error(e);
          })
      },
      getTeams(){
        http.get('/teams')
          .then(res => {
            this.references = res.data.data
          })
          .catch(e => {
            console.error(e);
          })
      },
      getInvoicings(){
        http.get('/invoicings')
          .then(res => {
            this.totalInvoicings = res.data.data.total
            this.invoicings = res.data.data.invoicings
          })
          .catch(e => {
            console.error(e);
          })
      },
    },
    created(){
      this.getStudents()
      this.getTeams()
      this.getInvoicings()
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    border-radius: 7px;
    padding: 1em 2em;
    margin: 0 1.5em;
    min-height: 80px;
    box-shadow: 0 3px 7px rgba(0,0,0,.1);
  }

  .pill {
    border-radius: 7px;
  }
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