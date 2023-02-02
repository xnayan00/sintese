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
            <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
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
                R$ 1.500,00
              </q-item-label>
            </q-item-section>

            <q-item-section side center>
              <q-btn @click="" color="positive" outline rounded>Nova entrada</q-btn>
            </q-item-section>
          </q-item>
        </q-list>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 65vh"
        >
          <q-list v-for="n in 15" :key="n" padding>
            <q-item class="list-item">
              <q-item-section>
                <q-item-label class="text-weight-bold text-grey-7">Yan Ricardo Mendes</q-item-label>
                <q-item-label overline>11/01/2023</q-item-label>
                <q-item-label>
                  <q-chip class="q-ml-none" size="12px" color="green-11">Hip-Hop</q-chip>
                </q-item-label>
              </q-item-section>

              
              <q-item-section side center>
                <q-item-label class="text-h5 text-positive">R$ 90,00</q-item-label>
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
              <q-btn color="negative" outline rounded>Nova saída</q-btn>
            </q-item-section>
          </q-item>
        </q-list>  

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 65vh"
        >
          <q-list v-for="n in 15" :key="n" padding>
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
  export default {
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
        }
      }
    },
    computed: {
      currentDate(){
        let fromDate = this.proxyDate.from.split('/').reverse().join('/')
        let toDate = this.proxyDate.to.split('/').reverse().join('/')
        
        if(fromDate === toDate) return toDate

        return fromDate + ' - ' + toDate
      }
    }
  }
</script>

<style scoped>
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
</style>