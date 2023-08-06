import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import store from './store'// Import the Vuex store
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import LogInForm from './components/LogIn/LogInForm.vue';
import UsersTable from './components/Users/Users.vue';
import CalendarCompo from './components/Calendar/Calendar.vue';
import ViewExercise from './components/Exercises/ViewExercise.vue';
import NewExerciseForm from './components/Exercises/NewExerciseForm.vue';
import PreferencesForm from './components/Config/PreferencesForm.vue';
import HomeScreen from './components/Home/Home.vue';
import ExerciseList from './components/Exercises/ExerciseList.vue';

const routes = [
  { path: '/', component: LogInForm },
  { path: '/users', component: UsersTable },
  { path: '/calendar/:userId', component: CalendarCompo },
  { path: '/ejercicio/ejemplo/:exerciseId', component: ViewExercise },
  { path: '/ejercicio/new', component: NewExerciseForm },
  { path: '/ejercicio/list', component: ExerciseList },
  { path: '/preferencias', component: PreferencesForm },
  { path: '/home', component: HomeScreen }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

const app = createApp(App)

app.use(store)
app.use(router)
app.use(require('vue-cookies'))
// default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
app.use(VueCookies, { expires: '7d'})

app.mount('#app')