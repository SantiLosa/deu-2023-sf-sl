<script>
import LogInForm from "./components/LogIn/LogInForm.vue"
import UsersTable from "./components/Users/Users.vue"
import CalendarCompo from "./components/Calendar/Calendar.vue"
import ViewExercise from "./components/Exercises/ViewExercise.vue"
import NewExerciseForm from "./components/Exercises/NewExerciseForm.vue"
import PreferencesForm from "./components/Config/PreferencesForm.vue"
import HomeScreen from "./components/Home/Home.vue"
import ExerciseList from "./components/Exercises/ExerciseList.vue"
import presetExercises from "./components/exerciseData.js";
import users from "./components/userData.js";
import allUserEvents from "./components/calendarData.js";

const routes = {
  '/': LogInForm,
  '/users': UsersTable,
  '/calendar': CalendarCompo,
  '/ejercicio/ejemplo': ViewExercise,
  '/ejercicio/new': NewExerciseForm,
  '/ejercicio/list': ExerciseList,
  '/preferencias': PreferencesForm,
  '/home': HomeScreen
}

// Check if the 'presetExercises' item is already in Local Storage
const savedPresetExercises = localStorage.getItem('presetExercises');
const savedUsers = localStorage.getItem('users');
const savedEvents = localStorage.getItem('userEvents');

// If 'presetExercises' item is not present, set the initial value in Local Storage
if (!savedPresetExercises || !savedUsers || !savedEvents) {
  const exercisedData = presetExercises;
  const usersData = users;
  const userEvents = allUserEvents;

  if (!savedPresetExercises) {
    localStorage.setItem('presetExercises', JSON.stringify(exercisedData));
  }

  if (!savedUsers) {
    localStorage.setItem('users', JSON.stringify(usersData));
  }

  if (!savedEvents) {
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  }
}

export default {
  data() {
    return {
      theme: (this.$cookies.get("theme") != null)
        ? this.$cookies.get("theme")
        : "light",
      loggedIn: false, //only for prototype
      user: '',
    };
  },
  created() {
    // Check the 'loggedIn' cookie as soon as the component is created
    this.checkCredentials();

    // Set the theme using the 'theme' cookie (if available)
    document.documentElement.setAttribute(
      "data-bs-theme",
      this.$cookies.get("theme") || "light"
    );
  },
  methods: {
    logOut() {
      this.$cookies.set("loggedIn", false);
      this.loggedIn = false; // Update the loggedIn state when logging out
      this.$store.dispatch('setLoggedIn', false);
      this.$cookies.set('user', '');
      this.user = '';
      this.$store.dispatch('setUser', '');
      this.$router.push("/");
    },
    checkCredentials(){ //only for prototype
      var loggedIn = (this.$cookies.get("loggedIn") != null) ? this.$cookies.get("loggedIn"): "false"
      this.loggedIn = (loggedIn == "true") //turns string "true" into boolean true and string "false" into boolean false
      this.$store.dispatch('setLoggedIn', this.loggedIn)

      var username = (this.$cookies.get("user") != null) ? this.$cookies.get("user") : ''
      this.user = username
      this.$store.dispatch('setUser', username)

      if ((this.currentPath == "/" || this.currentPath == "") && loggedIn == "true") {
        this.$router.push("/home");
      }
      else if ((this.currentPath != "/" && this.currentPath != "") && loggedIn == "false") {
        this.$router.push("/");
      }
    }
  },
  computed: {
    currentView() {
      return routes[this.$route.path] || LogInForm;
    },
    isLoggedIn() {
      console.log("App: "+this.user)
      // Use the getter from Vuex to get the loggedIn state
      return this.$store.getters.isLoggedIn; // Update to this.$store.getters.isLoggedIn
    },
    userName() {
      return this.$store.getters.user;
    }
  },
  components: {
    LogInForm, // Register the login form component
  },
  /*
  beforeUpdate(){
    console.log("before")
  },
  */
  /*mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
      //console.log("llama check cred de mounted")
      this.checkCredentials()
		}),
    document.documentElement.setAttribute(
      'data-bs-theme', (this.$cookies.get("theme") != null) ? this.$cookies.get("theme"): "light"
    ),
    //console.log("llama de spues de documen.Element")
    this.checkCredentials()
  }*/
}

</script>

<template>
  <div>
    <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
              <router-link class="navbar-brand" to="/home">BiciApp</router-link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                      <router-link class="nav-link d-flex align-items-center" to="/home">
                            <div>
                                <i class="icon material-icons">home</i>
                            </div>
                            <div class="ms-2">
                                Inicio
                            </div>
                        </router-link>
                    </li>
                    <!--
                      <li class="nav-item">
                          <a class="nav-link d-flex align-items-center" href="#/ejercicio/new">
                            <div>
                              <i class="icon material-icons">edit</i>
                            </div>
                            <div class="ms-2">
                              Nuevo Ejercicio
                            </div>
                          </a>
                      </li>
                      -->
                      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav">
                          <li class="nav-item dropdown">
                            <router-link class="nav-link dropdown-toggle d-flex align-items-center" to="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <div>
                                <i class="icon material-icons">person</i>
                              </div>
                              <div v-if="userName == 'profesor'" class="ms-2"> <!-- only for prototype, real app should just get the name from the user data-->
                                Profesor
                              </div>
                              <div v-else class="ms-2">
                                Santiago
                              </div>
                            </router-link>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                              <li>
                              <router-link class="dropdown-item d-flex align-items-center" to="/preferencias">
                                  <div>
                                    Configuración
                                  </div>
                                  <div class="ms-2">
                                    <i class="icon material-icons">settings</i>
                                  </div>
                                </router-link>
                              </li>
                              <li><hr class="dropdown-divider"></li>
                              <li>
                                <div @click="logOut" class="dropdown-item d-flex align-items-center">
                                  <div>
                                    Cerrar sesión
                                  </div>
                                  <div class="ms-2">
                                    <i class="icon material-icons">logout</i>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                  </ul>
              </div>
          </div>
    </nav>
    <template v-if="isLoggedIn">
      <router-view></router-view>
    </template>
    <template v-else>
      <LogInForm />
    </template>
  </div>
</template>
