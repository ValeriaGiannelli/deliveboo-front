import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
/* import { scrollMixin } from './scrollMixin'; */

import 'typeface-roboto'    //font
import '@fortawesome/fontawesome-free/css/all.css';     //fontawesome
// Crea l'app
const app = createApp(App);

/* // Registra il mixin globalmente
app.mixin(scrollMixin); */

// Usa il router
app.use(router);

// Monta l'app
app.mount('#app');

