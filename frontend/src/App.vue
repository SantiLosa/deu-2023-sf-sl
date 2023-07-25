<script>
import LogInForm from "./components/LogIn/LogInForm.vue"
import UsersTable from "./components/Users/Users.vue"
import CalendarCompo from "./components/Calendar/Calendar.vue"
import ViewExercise from "./components/Exercises/ViewExercise.vue"
import NewExerciseForm from "./components/Exercises/NewExerciseForm.vue"
import PreferencesForm from "./components/Config/PreferencesForm.vue"
import HomeScreen from "./components/Home/Home.vue"
import ExerciseList from "./components/Exercises/ExerciseList.vue"

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

export default {
  data() {
    return {
      theme: (this.$cookies.get("theme") != null) ? this.$cookies.get("theme"): "light",
      currentPath: window.location.hash,
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
		}),
    document.documentElement.setAttribute(
      'data-bs-theme', (this.$cookies.get("theme") != null) ? this.$cookies.get("theme"): "light"
    )
  }
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#/home">NOMBRE APP</a>
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
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                      <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div>
                              <i class="icon material-icons">person</i>
                            </div>
                            <div class="ms-2">
                              Nombre Usuario
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
                              <a class="dropdown-item d-flex align-items-center" href="#/">
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