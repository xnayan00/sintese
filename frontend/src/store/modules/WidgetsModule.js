import {
  GET_DRAWER,
  GET_MODAL,
  GET_TITLE,
  TOGGLE_DRAWER,
  TOGGLE_MODAL,
  MUTATE_MODAL_TITLE
} from '../mutation-types'

export default {
  namespaced: true,
  state(){
    return {
      isOpened: {
        modal: false,
        modalTitle: '',
        drawer: false
      }
    }
  },
  getters: {
    [GET_DRAWER] (state) {
      return state.isOpened.drawer
    },
    [GET_MODAL] (state) {
      return state.isOpened.modal
    },
    [GET_TITLE] (state) {
      return state.isOpened.modalTitle
    },
  },
  mutations: {
    [TOGGLE_DRAWER] (state) {
      state.isOpened.drawer = !state.isOpened.drawer
    },
    [TOGGLE_MODAL] (state) {
      state.isOpened.modal = !state.isOpened.modal
    },
    [MUTATE_MODAL_TITLE] (state, value) {
      state.isOpened.modalTitle = value
    },
  },
}