import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import store from './store'

import './css/reset.scss'
import './css/fonts.scss'

const app = createApp(App)

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

app.use(router)
app.use(store)
app.use(Quasar, {
  plugins: {},
})

app.mount('#app')
