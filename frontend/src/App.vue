<script>
import LogInForm from "./components/LogIn/LogInForm.vue"
import UsersTable from "./components/Users/Users.vue"
import CalendarCompo from "./components/Calendar/Calendar.vue"
import ViewExercise from "./components/Exercises/ViewExercise.vue"
import NewExerciseForm from "./components/Exercises/NewExerciseForm.vue"
import PreferencesForm from "./components/Config/PreferencesForm.vue"
import HomeScreen from "./components/Home/Home.vue"

const routes = {
  '/': LogInForm,
  '/users': UsersTable,
  '/calendar': CalendarCompo,
  '/ejercicio/ejemplo': ViewExercise,
  '/ejercicio/new': NewExerciseForm,
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
                        <a class="nav-link" href="#/home">
                          <i class="icon material-icons">home</i>
                          Inicio
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/ejercicio/new">
                          <i class="icon material-icons">edit</i>
                          Nuevo Ejercicio
                        </a>
                    </li>
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                      <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="icon material-icons">person</i>
                            Nombre Usuario
                          </a>
                          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li>
                              <a class="dropdown-item" href="#/preferencias">
                                Configuración
                                <i class="icon material-icons">settings</i>
                              </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li class="nav-item">
                              <a class="nav-link" href="#/">Cerrar sesión
                                <i class="icon material-icons">logout</i>
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