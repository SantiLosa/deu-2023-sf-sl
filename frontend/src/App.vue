<script>
import LogInForm from "./components/LogIn/LogInForm.vue"
import UsersTable from "./components/Users/Users.vue"
import CalendarCompo from "./components/Calendar/Calendar.vue"
import ViewExercise from "./components/Exercises/ViewExercise.vue"
import NewExerciseForm from "./components/Exercises/NewExerciseForm.vue"
import PreferencesForm from "./components/Config/PreferencesForm.vue"

const routes = {
  '/': LogInForm,
  '/users': UsersTable,
  '/calendar': CalendarCompo,
  '/ejercicio/ejemplo': ViewExercise,
  '/ejercicio/new': NewExerciseForm,
  '/preferencias': PreferencesForm
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
  <!-- <div :style="{'font-size': fontSize}"> -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="">NOMBRE APP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/users">Alumnos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/calendar">Test Calendario</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/ejercicio/ejemplo">Test Ejercicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/ejercicio/new">Test Nuevo Ejercicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/preferencias">Configuracion</a>
                    </li>
                </ul>
            </div>
        </div>
  </nav>
  <component :is="currentView" />
<!-- </div> -->
</template>