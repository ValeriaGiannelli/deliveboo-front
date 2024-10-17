import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

import 'typeface-roboto'    //font
import '@fortawesome/fontawesome-free/css/all.css';     //fontawesome

createApp(App).use(router).mount('#app')
