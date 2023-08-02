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
const savedData = localStorage.getItem('presetExercises');

// If 'presetExercises' item is not present, set the initial value in Local Storage
if (!savedData) {
  const initialData = presetExercises;

  localStorage.setItem('presetExercises', JSON.stringify(initialData));
}

export default {
  data() {
    return {
      theme: (this.$cookies.get("theme") != null) ? this.$cookies.get("theme"): "light",
      loggedIn: false, //only for prototype
      currentPath: window.location.hash,
    }
  },
  methods: {
    logOut() {
      this.$cookies.set("loggedIn", false)
      this.loggedIn = false // only for prototype
    },
    checkCredentials(){ //only for prototype
      var loggedIn = (this.$cookies.get("loggedIn") != null) ? this.$cookies.get("loggedIn"): "false"
      this.loggedIn = (loggedIn == "true") //turns string "true" into boolean true and string "false" into boolean false
      if ((this.currentPath == "#/" || this.currentPath == "") && loggedIn == "true") {
        window.location.href = "#/home"
      }
      else if (this.currentPath != "#/" && loggedIn == "false") {
        window.location.href = "#/"
      }
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
      this.checkCredentials()
		}),
    document.documentElement.setAttribute(
      'data-bs-theme', (this.$cookies.get("theme") != null) ? this.$cookies.get("theme"): "light"
    ),
    this.checkCredentials()
  }
}

</script>

<template>
  <nav v-if="loggedIn" class="navbar navbar-expand-lg navbar-dark bg-dark"> <!--este v-if esconde la nav-bar si no estas loggeado-->
        <div class="container">
            <a class="navbar-brand" href="#/home">BiciApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link d-flex align-items-center" href="#/home">
                          <div>
                              <i class="icon material-icons">home</i>
                          </div>
                          <div class="ms-2">
                              Inicio
                          </div>
                      </a>
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
                          <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div>
                              <i class="icon material-icons">person</i>
                            </div>
                            <div class="ms-2">
                              Profesor
                            </div>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li>
                              <a class="dropdown-item d-flex align-items-center" href="#/preferencias">
                                <div>
                                  Configuración
                                </div>
                                <div class="ms-2">
                                  <i class="icon material-icons">settings</i>
                                </div>
                              </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                              <a @click="logOut" class="dropdown-item d-flex align-items-center" href="#/">
                                <div>
                                  Cerrar sesión
                                </div>
                                <div class="ms-2">
                                  <i class="icon material-icons">logout</i>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                </ul>
            </div>
        </div>
  </nav>
  <component :is="currentView" />
<!-- </div> -->
</template>
