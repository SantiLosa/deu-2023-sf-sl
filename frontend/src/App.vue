<script>
import HelloWorld from "./components/Home/HelloWorld.vue"
import UsersTable from "./components/Users/Users.vue"
import CalendarCompo from "./components/Calendar/Calendar.vue"
import ViewExercise from "./components/Exercises/ViewExercise.vue"

const routes = {
  '/': HelloWorld,
  '/users': UsersTable,
  '/calendar': CalendarCompo,
  '/ejercicio/ejemplo': ViewExercise
}

export default {
  data() {
    return {
      currentPath: window.location.hash
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
		})
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/users">About</a> |
  <a href="#/non-existent-path">Broken Link</a> |
  <a href="#/calendar">Calendario</a> |
  <a href="#/ejercicio/ejemplo">Ejemplo de Ejercicio</a>
  <component :is="currentView" />
</template>