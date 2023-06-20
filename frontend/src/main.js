import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
const app = createApp(App)

app.use(require('vue-cookies'))
// default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
app.use(VueCookies, { expires: '7d'})

app.mount('#app')