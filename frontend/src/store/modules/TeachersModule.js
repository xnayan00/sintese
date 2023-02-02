import {
  SET_TEACHERS,
  SET_TEACHER,
  GET_TEACHERS,
  GET_TEACHER,
  MUTATE_TEACHERS,
  MUTATE_TEACHER
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
    [GET_TEACHERS] (state) {
      return state.all
    },
    [GET_TEACHER] (state) {
      return state.current
    },
  },
  mutations: {
    [MUTATE_TEACHERS] (state, value) {
      state.all = value
    },
    [MUTATE_TEACHER] (state, value) {
      state.current = value
    }
  },
  actions: {
    [SET_TEACHERS] ({ commit }, value) {
      commit('MUTATE_STUDENTS', value)
    },
    [SET_TEACHER] ({ commit }, value) {
      commit('MUTATE_STUDENT', value)
    },
  }
}