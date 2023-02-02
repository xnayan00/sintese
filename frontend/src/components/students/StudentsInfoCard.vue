<template>
  <q-card>
    <q-card-section class="row items-center justify-center no-wrap">
      <q-avatar class="info-card-avatar" size="120px">
        <q-img
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        />
        <q-avatar
          v-for="n in sizes()"
          :key="n"
          class="absolute info-card-avatar__outline-effect"
          :size="n"
        />
      </q-avatar>
    </q-card-section>
    <q-card-section class="justify-center text-center">
      <h6>{{ GET_STUDENT.name }}</h6>
      <small class="text-uppercase text-overline">
        {{ GET_STUDENT.currentClass }}
      </small>
    </q-card-section>
    <q-card-section>
      <div class="column items-center">

        <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="cake-variant" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_STUDENT.birthday }}
          </span>
        </div>

        <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="email" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_STUDENT.email }}
          </span>
        </div>

        <div class="column items-center q-pa-md">
          <q-icon class="q-mr-sm" size="20px">
            <MainIcon name="phone" />
          </q-icon>
          <span class="text-subtitle1">
            {{ GET_STUDENT.contact }}
          </span>
        </div>

        <div class="column items-center q-pa-md">
          <span class="text-caption">
            {{ 'Cadastrado em: ' + GET_STUDENT.createdAt }}
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
      ...mapGetters('students', [
        'GET_STUDENT'
      ]),
    },
    methods: {          
      sizes() {
        var sizesArr = []
        for (let i = 1; i < 30; i++) {
          sizesArr.push(120 + (60 * i) + 'px')
        }
        return sizesArr
      }
    }
  }
</script>

<style lang="scss" scoped>
  .info-card{
    &-avatar{
      outline: 1px solid #ccc;
      outline-offset: 10px;

      &__outline-effect{
        outline: 1px solid #ccc;
        opacity: .1;
        outline-offset: 10px;
      }
    }
  }
</style>