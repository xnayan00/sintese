import {
  SET_MODALITIES,
  SET_MODALITY,
  GET_MODALITIES,
  GET_MODALITY,
  MUTATE_MODALITIES,
  MUTATE_MODALITY,
  UPDATE_MODALITY,
  DELETE_MODALITY
} from '../mutation-types.js'

import http from '@/http'

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
      http.get('modalities')
        .then(res => {
          commit('MUTATE_MODALITIES', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_MODALITY] ({ state }, value) {
      http.post('/modalities', value)
        .then(res => {
          state.all.unshift(res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [UPDATE_MODALITY] ({ state }, value) {
      http.patch(`/modalities/${state.current._id}`, value)
        .then(() => {
          // 
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_MODALITY] ({ state }) {
      http.delete(`/modalities/${state.current._id}`)
        .then(() => {
          let idx = state.all.indexOf(state.current)
          state.all.splice(idx, 1)
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}