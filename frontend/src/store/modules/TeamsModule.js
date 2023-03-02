import {
  SET_TEAMS,
  SET_TEAM,
  GET_TEAMS,
  GET_TEAM,
  MUTATE_TEAMS,
  MUTATE_TEAM,
  DELETE_TEAM,
  UPDATE_TEAM
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
    [GET_TEAMS] (state) {
      return state.all
    },
    [GET_TEAM] (state) {
      return state.current
    },
  },
  mutations: {
    [MUTATE_TEAMS] (state, value) {
      state.all = value
    },
    [MUTATE_TEAM] (state, value) {
      state.current = value
    }
  },
  actions: {
    [SET_TEAMS] ({ commit }, value) {
      http.get('teams')
        .then(res => {
          commit('MUTATE_TEAMS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_TEAM] ({ state }, value) {
      http.post('/teams', value)
        .then(res => {
          state.all.unshift(res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [UPDATE_TEAM] ({ state }, value) {
      http.patch(`/teams/${state.current._id}`, value)
        .then(() => {
          // 
        })
        .catch(err => {
          console.error(err);
        })
    },
    [DELETE_TEAM] ({ state }) {
      http.delete(`/teams/${state.current._id}`)
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