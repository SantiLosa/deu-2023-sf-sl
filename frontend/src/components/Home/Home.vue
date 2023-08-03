<template>
    <div class="container">
        <div class="row align-items-start">
            <div class="col">
                <div class="my-4 card" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">Listado de Alumnos</h5>
                        <p class="card-text">Acceder al listado actual de alumnos registrados para ver sus detalles, registrar alumnos nuevos, ver los ejercicios de alumnos registrados, o planificar los ejercicios de un alumno.</p>
                        <router-link to="/users" class="btn btn-primary">Ver alumnos</router-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="my-4 card" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">Rutinas</h5>
                        <p class="card-text">Ver las rutinas pre-cargadas que hay en el sistema hasta ahora, o crear una plantilla de rutina nueva.</p>
                        <router-link to="/ejercicio/list" class="btn btn-warning">Ver rutinas</router-link>
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
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>