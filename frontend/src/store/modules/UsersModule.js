import {
  SET_USERS,
  SET_USER,
  UPDATE_USER,
  GET_USERS,
  GET_USER,
  MUTATE_USERS,
  MUTATE_USER
} from '../mutation-types.js'

import http from "../../http"

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
      var { birthday, createdAt, updatedAt } = value
      
      function formatDate(item){
        item = Date.parse(item)
        item = item - 3*60*60*1000
        item = new Date(item).toISOString()
        return item.slice(0, 10).split('-').reverse().join('/')
      }

      if(birthday){
        value.birthday = formatDate(birthday)
      }
      if(createdAt){
        value.createdAt = formatDate(createdAt)
      }
      if(updatedAt){
        value.updatedAt = formatDate(updatedAt)
      }

      state.current = value
    }
  },
  actions: {
    [SET_USERS] ({ commit }, value) {
      http.get('users')
        .then(res => {
          commit('MUTATE_USERS', res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [SET_USER] ({ state }, value) {
      http.post('/users', value)
        .then(res => {
          state.all.unshift(res.data.data)
        })
        .catch(err => {
          console.error(err);
        })
    },
    [UPDATE_USER] ({ state }, value) {
      console.log(value);
      http.patch(`/users/${state.current._id}`, value)
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}