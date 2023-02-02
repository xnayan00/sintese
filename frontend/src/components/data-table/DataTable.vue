<template>
  <q-card class="q-pa-lg" flat>
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
      :filter="filter"
    >
      <!-------------------------------------------
        Input de busca no cabeçalho da tabela
      -------------------------------------------->
      <template v-slot:top-right>
        <q-input
          rounded
          outlined
          dense
          v-model="filter"
          placeholder="Buscar..."
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          @click="$emit('newItem', {})"
          class="q-ml-md"
          color="primary"
          rounded
        >
          Cadastrar Novo
        </q-btn>
      </template>

      <!-------------------------------------------
        Renderização de status com CHIPS
      -------------------------------------------->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div>
            <q-chip
              class="text-uppercase text-overline"
              size="md"
              :ripple="false"
              :color="props.row.status ? 'positive' : 'negative'"
              text-color="white"
              :label="props.row.status ? 'Ativo' : 'Inativo'"
            />
          </div>
        </q-td>
      </template>

      <!-------------------------------------------
        Renderização do menu de ações
        Renderiza por padrão: EDITAR, ATIVAR / DESATIVAR e EXCLUIR
        Caso Tenha alguma outra opção, passar por SLOT
      -------------------------------------------->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn round flat>
            <q-icon color="grey-7">
              <MainIcon name="dots-vertical" />
            </q-icon>
            <q-menu auto-close>
              <q-list style="min-width: 200px">

                <q-item clickable @click="$emit('editItem', props.row)"> <!-- Opção EDITAR (padrão) -->
                  <q-item-section side>
                    <q-icon>
                      <MainIcon name="pencil" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section side>Editar</q-item-section>
                </q-item>

                <slot name="actions" :item="props.row" /> <!-- Slot que recebe as opções customizadas -->

                <q-separator />

                <q-item clickable @click="$emit('updateStatus', props.row._id)"> <!-- Opção ATIVAR / DESATIVAR (padrão) -->
                  <q-item-section side>
                    <q-icon :color="props.row.status ? 'negative' : 'positive'">
                      <MainIcon :name="props.row.status ? 'close-circle' : 'check-circle'" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section
                    :class="props.row.status ? 'text-negative' : 'text-positive'"
                    side
                  >
                    {{ props.row.status ? 'Desativar' : 'Ativar' }}
                  </q-item-section>
                </q-item>

                <q-item clickable @click="openDeleteModal(props.row)"> <!-- Opção EXCLUIR (padrão) -->
                  <q-item-section side>
                    <q-icon color="negative">
                      <MainIcon name="trash" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section class="text-negative" side>Excluir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:no-data="{ icon }">
        <div class="full-width row flex-center text-grey-5 q-gutter-sm">
          <q-icon size="2em" :name="icon" />
          <span class="text-bold">
            Nenhum dado encontrado
          </span>
        </div>
      </template>
    </q-table>

    <!-------------------------------------------
      Renderização da paginação
    -------------------------------------------->
    <div v-if="pagination.pagesNumber > 1" class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-7"
        active-color="primary"
        rounded
        :max="pagination.pagesNumber"
        :max-pages="6"
        :boundary-numbers="false"
      />
    </div>

    <!-------------------------------------------
      Modal de confirmação de deleção
    -------------------------------------------->
    <q-dialog v-model="deleteModal" persistent>
      <DeleteModal
        @closeModal="deleteModal = false"
        @clicked="$emit('deleteItem', modalData._id)"
        :modalData="modalData"
        :columns="columns"
      />
    </q-dialog>
  </q-card>
</template>

<script>
  import { mapMutations } from 'vuex'
  import MainIcon from '@/components/icons/MainIcon.vue'
  import DeleteModal from './DeleteModal.vue'

  export default {
    props: {
      rows: Array,
      columns: Array,
      title: String
    },
    components: {
      MainIcon,
      DeleteModal
    },
    data(){
      return {
        filter: '',
        deleteModal: false,
        modalData: {},
        pagination: {
          page: 1,
          rowsPerPage: 10,
          pagesNumber: 2
        },
      }
    },
    methods: {
      openDeleteModal(item){
        this.modalData = item
        this.deleteModal = true
      },
      ...mapMutations('students', [
        'MUTATE_STUDENT'
      ]),
    }
  }
</script>