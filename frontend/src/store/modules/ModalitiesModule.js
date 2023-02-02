import {
  SET_MODALITIES,
  SET_MODALITY,
  GET_MODALITIES,
  GET_MODALITY,
  MUTATE_MODALITIES,
  MUTATE_MODALITY
} from '../mutation-types.js'

export default {
  namespaced: true,
  state () {
    return {
      all: [],
      current: {},
    }
  },
  getters: {
    [GET_MODALITIES] (state) {
      return state.all
    },
    [GET_MODALITY] (state) {
      return state.current
    },
  },
  mutations: {
    [MUTATE_MODALITIES] (state, value) {
      state.all = value
    },
    [MUTATE_MODALITY] (state, value) {
      state.current = value
    }
  },
  actions: {
    [SET_MODALITIES] ({ commit }, value) {
      commit('MUTATE_MODALITIES', value)
    },
    [SET_MODALITY] ({ commit }, value) {
      commit('MUTATE_MODALITY', value)
    },
  }
}