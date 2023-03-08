import { createStore } from 'vuex'
import widgets from './modules/WidgetsModule.js'
import students from './modules/StudentsModule.js'
import teachers from './modules/TeachersModule.js'
import users from './modules/UsersModule.js'
import modalities from './modules/ModalitiesModule.js'
import teams from './modules/TeamsModule.js'
import invoicings from './modules/InvoicingsModule.js'

const store = createStore({
  modules: {
    widgets,
    students,
    teachers,
    users,
    modalities,
    teams,
    invoicings
  }
})

export default store