import './assets/main.css'
import './assets/styl.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import '../api'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAMazjxBwsAsOwl0_ZOm_L7_9G7UTiWeEg',
  authDomain: 'gm-cars-1c273.firebaseapp.com',
  projectId: 'gm-cars-1c273',
  storageBucket: 'gm-cars-1c273.appspot.com',
  messagingSenderId: '669983037273',
  appId: '1:669983037273:web:c2db214cda3e77d8d41e48'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
