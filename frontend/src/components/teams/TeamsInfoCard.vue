<template>
  <q-card>
    <q-card-section class="justify-center text-center">
      <h6>{{ GET_TEAM.code + ' - ' + GET_TEAM.modality }}</h6>
      <small class="text-uppercase text-overline">
        {{ GET_TEAM.teacher }}
      </small>
    </q-card-section>
    <q-card-section>
      <div class="column items-center">

        <!-- <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="cake-variant" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_TEAM.birthday }}
          </span>
        </div>

        <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="email" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_TEAM.email }}
          </span>
        </div>

        <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="phone" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_TEAM.contact }}
          </span>
        </div> -->

        <div class="column items-center q-pa-md">
          <span class="text-caption">
            {{ 'Cadastrado em: ' + GET_TEAM.createdAt }}
          </span>
        </div>

      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  import MainIcon from '@/components/icons/MainIcon.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      MainIcon
    },
    computed: {
      ...mapGetters('teams', [
        'GET_TEAM'
      ]),
    },
  }
</script>