import {
  SET_STUDENTS,
  SET_STUDENT,
  GET_STUDENTS,
  GET_STUDENT,
  MUTATE_STUDENTS,
  MUTATE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT
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
      http.get('students')
        .then(res => {
          commit('MUTATE_STUDENTS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_STUDENT] ({ state }, value) {
      http.post('/students', value)
        .then(res => {
          state.all.unshift(res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [UPDATE_STUDENT] ({ state }, value) {
      http.patch(`/students/${state.current._id}`, value)
        .then(() => {
          // 
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_STUDENT] ({ state }) {
      http.delete(`/students/${state.current._id}`)
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