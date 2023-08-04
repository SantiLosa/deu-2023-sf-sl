<template>
    <div class="container">
        <div class="row">
            <h3>{{ exerciseData.name }}</h3>
        </div>
        <div class="row">
            <p>{{ exerciseData.description }}</p>
        </div>
        <div class="row">
            <div class="col">
                <h3>Tipo de entrenamiento: <span :class="exerciseTypeToCSS(exerciseData.exerciseType)">{{ exerciseData.exerciseType }}</span></h3>
            </div>
            <div class="col">
                <h3>Tiempo total: {{ parseMinutes(exerciseData.duration) }}</h3> <!-- TODO: duracion total deberia ser basada en suma de duraciones de segmento-->
            </div>
            <div class="col">
                <h3>Comienzo: {{ exerciseData.startDate }}</h3>
            </div>
        </div>
    </div>
    <div class="container">
        <table class="table table-striped">
            <thead>
                <th scope="col">Duracion segmento</th>
                <th scope="col">Pulsaciones media</th>
                <th scope="col">Cadencia media</th>
            </thead>
            <tbody>
                <tr v-for="segment in exerciseData.segments" v-bind:key="segment.id">
                    <td>{{ segment.segmentDuration }} minutos</td>
                    <td>{{ segment.cadence }}</td>
                    <td>{{ segment.beatsPerMinute }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViewExercise',
    props: ['exerciseId'],
    data() {
        return {
        exerciseData: null,
        presetExercises: []
        };
    },
    created() {
        const savedData = localStorage.getItem('presetExercises');
        if (savedData) {
            this.presetExercises = JSON.parse(savedData);
        }
        console.log("creation")
        console.log(this.presetExercises)
        // Find the exercise object based on the ID passed in the route params
        console.log(this.$route.params.exerciseId)
        this.exerciseData = this.findExerciseById(parseInt(this.$route.params.exerciseId));
    },
    methods: {
        findExerciseById(id) {
            return this.presetExercises.find((exercise) => exercise.id === id);
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
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>