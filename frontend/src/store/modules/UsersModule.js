import {
  SET_USERS,
  SET_USER,
  GET_USERS,
  GET_USER,
  MUTATE_USERS,
  MUTATE_USER
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
    [GET_USERS] (state) {
      return state.all
    },
    [GET_USER] (state) {
      return state.current
    },
  },
  mutations: {
    [MUTATE_USERS] (state, value) {
      state.all = value
    },
    [MUTATE_USER] (state, value) {
      state.current = value
    }
  },
  actions: {
    [SET_USERS] ({ commit }, value) {
      commit('MUTATE_USERS', value)
    },
    [SET_USER] ({ commit }, value) {
      commit('MUTATE_USER', value)
    },
  }
}