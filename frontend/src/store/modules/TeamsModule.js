import {
  SET_TEAMS,
  SET_TEAM,
  GET_TEAMS,
  GET_TEAM,
  MUTATE_TEAMS,
  MUTATE_TEAM
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
      commit('MUTATE_TEAMS', value)
    },
    [SET_TEAM] ({ commit }, value) {
      commit('MUTATE_TEAM', value)
    },
  }
}