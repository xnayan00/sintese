<template>
  <q-card class="q-pa-lg" flat>
    
    <section class="row">
      <div class="col-12">
        <FinancialFilter />
      </div>
    </section>
    
    <section class="row">
      <div class="q-mb-lg col-12">
        <CashRegister />
      </div>
    </section>
    
    <div class="row">
      <div class="col-12 col-md-6">
        <InvoicingsListHeader />

        <q-scroll-area style="height: 65vh">
          <InvoicingsList />
        </q-scroll-area>
      </div>
      
      <div class="col-12 col-md-6">
        <OutgoingsListHeader />

        <q-scroll-area style="height: 65vh">
          <OutgoingsList />
        </q-scroll-area>
      </div>
    </div>
  </q-card>
</template>

<script>
  import CashRegister from '@/components/financial/CashRegister.vue'
  import FinancialFilter from '@/components/financial/FinancialFilter.vue'
  import InvoicingsListHeader from '@/components/financial/InvoicingsListHeader.vue'
  import InvoicingsList from '@/components/financial/InvoicingsList.vue'
  import OutgoingsListHeader from '@/components/financial/OutgoingsListHeader.vue'
  import OutgoingsList from '@/components/financial/OutgoingsList.vue'

  export default {
    components: {
      CashRegister,
      FinancialFilter,
      InvoicingsList,
      InvoicingsListHeader,
      OutgoingsList,
      OutgoingsListHeader,
    },
  }
</script>

<style lang="scss">
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