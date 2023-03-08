<template>
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
</template>

<script>
  export default {
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
      }
    },
    computed: {
      currentDate(){
        let fromDate = this.proxyDate.from.split('/').reverse().join('/')
        let toDate = this.proxyDate.to.split('/').reverse().join('/')
        
        if(fromDate === toDate) return toDate

        return fromDate + ' - ' + toDate
      },
    }
  }
</script>