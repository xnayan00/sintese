import {
  SET_OUTGOINGS,
  SET_OUTGOING,
  GET_OUTGOINGS,
  GET_OUTGOING,
  MUTATE_OUTGOINGS,
  MUTATE_OUTGOING,
  DELETE_OUTGOING,
  ADD_OUTGOING,
  REMOVE_OUTGOING,
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
    [GET_OUTGOINGS] (state) {
      return state.all
    },
    [GET_OUTGOING] (state) {
      return state.current
    },
    [GET_TOTAL] (state) {
      return state.all.reduce((accumulator, current) => accumulator + current.price, 0)
    }
  },
  mutations: {
    [MUTATE_OUTGOINGS] (state, value) {
      state.all = value
    },
    [MUTATE_OUTGOING] (state, value) {
      console.log(value);
      state.current = value
    },
    [ADD_OUTGOING] (state, value) {
      if(state.current.teams){
        state.current.teams.push(value)
      } else {
        state.current.teams = [value]
      }
    },
    [REMOVE_OUTGOING] (state, idx) {
      state.current.teams.splice(idx, 1)
    },
  },
  actions: {
    [SET_OUTGOINGS] ({ commit }) {
      http.get('outgoings')
        .then(res => {
          commit('MUTATE_OUTGOINGS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_OUTGOING] ({ state }, value) {
      http.post('/outgoings', value)
        .then(res => {
          var data = res.data.data
          state.all.unshift({ ...value, createdAt: data.createdAt, updatedAt: data.updatedAt })
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_OUTGOING] ({ state }) {
      http.delete(`/outgoings/${state.current._id}`)
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