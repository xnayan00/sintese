import {
  SET_TEACHERS,
  SET_TEACHER,
  GET_TEACHERS,
  GET_TEACHER,
  MUTATE_TEACHERS,
  MUTATE_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER
} from '../mutation-types.js'
import http from "@/http"

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
      http.get('teachers')
        .then(res => {
          commit('MUTATE_TEACHERS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_TEACHER] ({ state }, value) {
      http.post('/teachers', value)
        .then(res => {
          state.all.unshift(res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [UPDATE_TEACHER] ({ state }, value) {
      http.patch(`/teachers/${state.current._id}`, value)
        .then(() => {
          // 
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_TEACHER] ({ state }) {
      http.delete(`/teachers/${state.current._id}`)
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