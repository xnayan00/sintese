import {
  SET_INVOICINGS,
  SET_INVOICING,
  GET_INVOICINGS,
  GET_INVOICING,
  MUTATE_INVOICINGS,
  MUTATE_INVOICING,
  DELETE_INVOICING,
  ADD_INVOICING,
  REMOVE_INVOICING,
  GET_TOTAL
} from '../mutation-types.js'

import http from '@/http'

export default {
  namespaced: true,
  state () {
    return {
      all: [],
      current: {},
      total: 0
    }
  },
  getters: {
    [GET_INVOICINGS] (state) {
      return state.all
    },
    [GET_INVOICING] (state) {
      return state.current
    },
    [GET_TOTAL] (state) {
      return state.all.reduce((accumulator, current) => accumulator + current.price, 0)
    }
  },
  mutations: {
    [MUTATE_INVOICINGS] (state, value) {
      state.all = value
    },
    [MUTATE_INVOICING] (state, value) {
      state.current = value
    },
    [ADD_INVOICING] (state, value) {
      if(state.current.teams){
        state.current.teams.push(value)
      } else {
        state.current.teams = [value]
      }
    },
    [REMOVE_INVOICING] (state, idx) {
      state.current.teams.splice(idx, 1)
    },
  },
  actions: {
    [SET_INVOICINGS] ({ commit }, value) {
      http.get('invoicings')
        .then(res => {
          commit('MUTATE_INVOICINGS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_INVOICING] ({ state }, value) {
      http.post('/invoicings', value)
        .then(res => {
          var data = res.data.data
          state.all.unshift({ ...value, createdAt: data.createdAt, updatedAt: data.updatedAt })
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_INVOICING] ({ state }) {
      http.delete(`/invoicings/${state.current._id}`)
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