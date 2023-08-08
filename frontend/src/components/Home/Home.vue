<template>
    <div class="container">
        <div class="row align-items-start">

            <div v-if="isAllowed" class="col">
                <div class="my-4 card" style="width: 18rem;">
                    <!--<img src="..." class="card-img-top" alt="...">-->
                    <div class="card-body">
                        <h5 class="card-title">Listado de Alumnos</h5>
                        <p class="card-text">Acceder al listado actual de alumnos registrados para ver sus detalles, registrar alumnos nuevos, ver los ejercicios de alumnos registrados, o planificar los ejercicios de un alumno.</p>
                        <router-link to="/users" class="btn btn-primary">Ver alumnos</router-link>
                    </div>
                </div>
            </div>
            <div v-else class="col">
                <div class="my-4 card" style="width: 18rem;">
                    <!--<img src="..." class="card-img-top" alt="...">-->
                    <div class="card-body">
                        <h5 class="card-title">Ver Calendario</h5>
                        <p class="card-text">Acceder al calendario personal de rutinas para revisar los ejercicios de la semana o ver tu historial.</p>
                        <router-link to="/calendar/9" class="btn btn-primary">Ver Calendario</router-link> <!-- todo: parametrizar ruta/id -->
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="my-4 card" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">Ejercicios</h5>
                        <p class="card-text">Ver los ejercicios pre-cargados que hay en el sistema hasta ahora, o crear una plantilla de ejercicio nuevo.</p>
                        <router-link to="/ejercicio/list" class="btn btn-warning">Ver ejercicios</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
  export default {
    name: 'HomeScreen',
    props: {
      msg: String
    },
  data() {
    return {
        user: ''
    }
  },
  created() {
    // Retrieve data from Local Storage when the component is created
    this.user = this.$store.getters.user
  },
  computed: {
    isAllowed() {
        return (this.user == 'profesor') //todo: implement actual role checking lmao
    }
  }
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
