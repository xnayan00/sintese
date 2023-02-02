<template>
  <q-card class="delete-modal-width text-center q-pa-md">
    <q-card-section class="q-pa-none" align="right">
      <q-btn round flat>
        <MainIcon name="close" @click="$emit('closeModal')" />
      </q-btn>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-icon color="negative"  size="100px">
        <MainIcon name="alert-circle" />
      </q-icon>
      <h4>Atenção!</h4>
      <span class="text-body1">Tem certeza que deseja excluir este registro?</span>
    </q-card-section>

    <q-card-section>
      <q-table
        :rows="[modalData]"
        :columns="columns"
        row-key="name"
        hide-pagination
        dense
        flat
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status ? 'positive' : 'negative'"
              rounded
            >
              <q-tooltip>
                <span class="text-uppercase">
                  {{ props.row.status ? 'Ativo' : 'Inativo' }}
                </span>
              </q-tooltip>
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        @click="$emit('clicked')"
        class="delete-modal-btn-width"
        label="excluir registro"
        color="negative"
        rounded
      />
    </q-card-actions>
  </q-card>
</template>

<script>  
  import MainIcon from '@/components/icons/MainIcon.vue'

  export default {
    props: {
      modalData: Object,
      columns: Array
    },
    components: {
      MainIcon
    }
  }
</script>

<style lang="scss" scoped>
  .delete-modal{
    &-width {
      min-width: 500px;
      max-width: 1200px;
    }
    &-btn-width {
      width: 200px;
    }
  }
</style>