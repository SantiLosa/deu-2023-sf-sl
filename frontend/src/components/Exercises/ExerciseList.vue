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
            <td>{{this.parseMinutes(exercise.duration)}}</td>
            <td>{{exercise.description}}</td>
            <!--<td><a class="nav-link" href="#/ejercicio/ejemplo"><button type="button" class="btn btn-primary">Ver</button></a></td>-->
            <td><button @click="verRutina(exercise.id)" type="button" class="btn btn-primary">Ver</button></td>
            <td><button @click="borrarRutina(exercise)" class="btn btn-danger">Borrar</button></td>
          </tr>
        </tbody>
      </table> 
      <a href="#/ejercicio/new"><button class="btn btn-info mb-3">Nueva rutina</button></a>
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
        presetExercises: [
          { 
            id: 1,
            exerciseType: 'Velocidad',
            name: 'Velocidad Ligero',
            description: 'Entrenamiento enfocado en velocidad para principiantes',
            duration: 60 //minutos
          },
          {
            id: 2,
            exerciseType: 'Resistencia',
            name: 'Resistencia Ligero',
            description: 'Entrenamiento enfocado en resistencia para principiantes',
            duration: 90 //minutos
          },
          {
            id: 3,
            exerciseType: 'Cadencia',
            name: 'Cadencia Ligero',
            description: 'Entrenamiento enfocado en cadencia para principiantes',
            duration: 60 //minutos
          },
          {
            id: 4,
            exerciseType: 'Fuerza',
            name: 'Fuerza Ligero',
            description: 'Entrenamiento enfocado en fuerza para principiantes',
            duration: 30 //minutos
          },
          {
            id: 5,
            exerciseType: 'Fuerza',
            name: 'Fuerza Intenso',
            description: 'Entrenamiento colina arriba para practicar fuerza. No apto para principiantes',
            duration: 45
          },
          {
            id: 6,
            exerciseType: 'Fuerza',
            name: 'Fuerza Intenso con Pausa',
            description: 'Similar a Fuerza Intenso pero con pausas mas largas entre segmentos',
            duration: 65
          },
          {
            id: 7,
            exerciseType: 'Resistencia',
            name: 'Tour de france',
            description: 'Entrenamiento extremo de aguante',
            duration: 430
          },
          {
            id: 8,
            exerciseType: 'Resistencia',
            name: 'Vuelta al mundo',
            description: 'Recorrido por todo el cuadrado de la plata',
            duration: 300
          },
          {
            id: 9,
            exerciseType: 'Velocidad',
            name: 'Carrera alterna',
            description: 'Camino por el bosque a maxima velocidad',
            duration: 40
          },
          {
            id: 10,
            exerciseType: 'Cadencia',
            name: 'Bici fija rpm',
            description: '20 minutos de calentamiento, ejercicio, 20 mins para bajar.',
            duration: 180
          },
          {
            id: 11,
            exerciseType: 'Fuerza',
            name: 'Bici en cambio duro',
            description: '10 minutos de calentamiento en configuracion tranqui, luego cambio a duro sin parar',
            duration: 40
          },
          {
            id: 12,
            exerciseType: 'Velocidad',
            name: 'Flash special',
            description: 'Ejercicio para intentar empujar la velocidad maxima del ciclista',
            duration: 90
          },
          {
            id: 13,
            exerciseType: 'Resistencia',
            name: 'Aguante en alta cadencia',
            description: 'Mantener una cadencia decente durante mucho tiempo en bici fija, con pausas',
            duration: 180
          },
          {
            id: 14,
            exerciseType: 'Fuerza',
            name: 'Resistencia',
            description: 'Resistencia mediano',
            duration: 30
          },
          {
            id: 15,
            exerciseType: 'Cadencia',
            name: 'Calentamiento',
            description: 'Unos minutos de cadencia media para calentar',
            duration: 20
          },
          {
            id: 16,
            exerciseType: 'Fuerza',
            name: 'Bici dura con pausas',
            description: 'Alternar entre cadencia baja con bici dura y cadencia alta con bici floja.',
            duration: 80
          },
          {
            id: 17,
            exerciseType: 'Fuerza',
            name: 'Michelin special',
            description: 'En bicicleta con rueda atada atras. ',
            duration: 60
          },
          {
            id: 18,
            exerciseType: 'Velocidad',
            name: 'Cardio basico',
            description: 'Ejercicio de velocidad alta para entrenar cardio',
            duration: 55
          },
          {
            id: 19,
            exerciseType: 'Velocidad',
            name: 'Burst',
            description: 'Ejercicio de aceleracion, estrechos cortos de alta velocidad',
            duration: 40
          },
          {
            id: 20,
            exerciseType: 'Velocidad',
            name: 'Burst intenso',
            description: 'Muchos estrechos cortos de alta velocidad',
            duration: 100
          },
          // Add more preset exercises as needed...
        ],
        searchQuery: '',
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
      borrarRutina(rutina){
        const index = this.presetExercises.indexOf(rutina)
        if (index > -1) {
          this.presetExercises.splice(index,1)
          alert("Elemento borrado con exito.")
        }
      },
      verRutina(id) {
        if (id == 16) {
          window.location.href="#/ejercicio/ejemplo"
        }
        else {
          alert("Rutina incorrecta")
        }
      }
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
