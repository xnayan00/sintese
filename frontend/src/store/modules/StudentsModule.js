import {
  SET_STUDENTS,
  SET_STUDENT,
  GET_STUDENTS,
  GET_STUDENT,
  MUTATE_STUDENTS,
  MUTATE_STUDENT
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
    [GET_STUDENTS] (state) {
      return state.all
    },
    [GET_STUDENT] (state) {
      return state.current
    },
  },
  mutations: {
    [MUTATE_STUDENTS] (state, value) {
      state.all = value
    },
    [MUTATE_STUDENT] (state, value) {
      state.current = value
    }
  },
  actions: {
    [SET_STUDENTS] ({ commit }, value) {
      commit('MUTATE_STUDENTS', value)
    },
    [SET_STUDENT] ({ commit }, value) {
      commit('MUTATE_STUDENT', value)
    },
  }
}