<template>
    <div class="container">
      <h3>Ejercicios:</h3>
      <div class="mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Filtrar rutinas...">
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Duracion</th>
            <th scope="col">Descripcion</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exercise in filteredExercises" v-bind:key="exercise.id"> 
            <th scope="row">{{ exercise.id }}</th>
            <td>{{ exercise.name }}</td>
            <td>
              <span v-bind:class=this.exerciseTypeToCSS(exercise.exerciseType)>
              <i class="icon material-icons">{{this.exerciseTypeToImg(exercise.exerciseType)}}</i>{{exercise.exerciseType}}</span></td>
            <td>{{this.parseMinutes(exercise.duration)}}</td> <!--TODO: duracion total deberia ser suma de duraciones de segmentos-->
            <td>{{exercise.description}}</td>
            <!--<td><a class="nav-link" href="#/ejercicio/ejemplo"><button type="button" class="btn btn-primary">Ver</button></a></td>-->
            <td><button @click="verRutina(exercise)" type="button" class="btn btn-primary">Ver</button></td>
            <!-- <td><button @click="verRutina(exercise.id)" type="button" class="btn btn-primary">Ver</button></td> -->
            <td><button @click="borrarRutina(exercise)" class="btn btn-danger">Borrar</button></td>
          </tr>
        </tbody>
      </table> 
      <router-link to="/ejercicio/new"><button class="btn btn-info mb-3">Nueva rutina</button></router-link>
    </div>
  </template>

<script>
  export default {
    name: 'ExerciseList',
    props: {
      msg: String
    },
    data() {
      return {
        presetExercises: [],
        searchQuery: '',
      }
    },
    created() {
    // Retrieve data from Local Storage when the component is created
    const savedData = localStorage.getItem('presetExercises');
    if (savedData) {
      this.presetExercises = JSON.parse(savedData);
    }
  },
    methods: {
      parseMinutes(minutes){ //transforma una cantidad x de minutos en algo como '2 horas, 50 minutos'
        var horas = Math.floor(minutes / 60)
        var horaString = ''
        if (horas > 0) { 
          horaString = (''+horas+' hora')
          if (horas > 1) { horaString = horaString+'s'}
        }
        var minutos = minutes % 60
        var minutoString =''
        if (minutos > 0) { 
          minutoString = (''+minutos+' minuto')
          if (minutos > 1) { minutoString = minutoString+'s'}
          if (horaString) { minutoString = ', '+minutoString}
        }
        return (horaString+minutoString)
      },
      exerciseTypeToCSS(exerciseType) {
        if (exerciseType == 'Fuerza') {
          console.log(exerciseType)
          return ('badge text-bg-danger')
        }
        else if (exerciseType == 'Cadencia') {
          return ('badge text-bg-success')
        }
        else if (exerciseType == 'Velocidad') {
          return ('badge text-bg-info')
        }
        else {
          return ('badge text-bg-warning')
        }
      },
      exerciseTypeToImg(exerciseType) {
        if (exerciseType == 'Fuerza') {
          return ('fitness_center')
        }
        else if (exerciseType == 'Cadencia') {
          return ('timer')
        }
        else if (exerciseType == 'Velocidad') {
          return ('bolt')
        }
        else {
          return ('directions_run')
        }
      },
      borrarRutina(rutina) {
        const index = this.presetExercises.indexOf(rutina);
        if (index > -1) {
          this.presetExercises.splice(index, 1);
          alert("Elemento borrado con exito.");
          this.updateExerciseDataFile(); // Call the function to update exerciseData.js
        }
      },
      updateExerciseDataFile() {
        const updatedData = JSON.stringify(this.presetExercises, null, 2);

        // Save the data to Local Storage
        localStorage.setItem('presetExercises', updatedData);

        console.log('exerciseData.js updated successfully.');
      },
      verRutina(exercise) {
        try {
          console.log("Ver rutina button clicked.");
          console.log(exercise);

          // Access the $router object directly
          this.$router.push({
            path: '/ejercicio/ejemplo/' + exercise.id,
          });
        } catch (error) {
          console.error('Error in verRutina:', error);
        }
      },
    },
    computed: {
      filteredExercises() {
        if (!this.searchQuery) {
          return this.presetExercises;
        }
        const query = this.searchQuery.toLowerCase();
        return this.presetExercises.filter(exercise => {
          return (
            exercise.name.toLowerCase().includes(query) ||
            exercise.description.toLowerCase().includes(query) ||
            exercise.exerciseType.toLowerCase().includes(query)
          );
        });
      }
    },
    watch: {
    searchQuery() {
      // When the searchQuery changes, the filteredExercises will be updated automatically.
    }
  }
  }
  </script>
  <style scoped>
    h3 {
      margin-bottom: 5%;
    }
    .badge {
    font-size: 14px;
    line-height: 1.2;
    margin-left: 5px;
    }

    .badge .icon {
    font-size: 14px;
    vertical-align: middle;
    margin-right: 3px;
    }
  </style>
