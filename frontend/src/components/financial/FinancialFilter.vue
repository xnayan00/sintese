<template>
  <q-toolbar class="bg-primary pill">
    <!-- <q-btn :disable="currentMonth == 0" @click="prevMonth" size="sm" color="white" flat round>
      <q-icon>
        <MainIcon name="arrow-left" />
      </q-icon>
    </q-btn> -->

    <q-toolbar-title class="text-center text-white">
      {{ convertMonth(currentMonth) }}
      <div class="text-caption">{{ new Date().getFullYear() }}</div>
    </q-toolbar-title>

    <!-- <q-btn :disable="currentMonth == 11" @click="nextMonth" size="sm" color="white" flat round>
      <q-icon>
        <MainIcon name="arrow-right" />
      </q-icon>
    </q-btn> -->
  </q-toolbar>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    components: {
      MainIcon
    },
    data(){
      return {
        currentMonth: null,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      }
    },
    watch: {
      currentMonth: {
        handler(newvalue){
          if(newvalue === null){
            let idx = new Date(Date.now()).getMonth()
            this.currentMonth = idx
          }else{
            this.currentMonth = newvalue
          }
        },
        immediate: true
      },
    },
    methods: {
      prevMonth(){
        if(this.currentMonth == 0) return
        this.currentMonth--
      },
      nextMonth(){
        if(this.currentMonth == 11) return
        this.currentMonth++
      },
      convertMonth(month){
        return this.months[month]
      }
    }
  }
</script>