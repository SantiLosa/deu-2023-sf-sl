<template>
    <div class="container">
        <div class="row">
        <!-- <h2>Nuevo entrenamiento para Pedro Lopez</h2> -->
            <h3>Nueva rutina</h3>
        </div>
        <form>
            <div class="row">
                <div class="col align-self-center left-entry">
                    <fieldset class="border rounded p-2">
                        <legend>Elegir el tipo de ejercicio:</legend>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="strengthRadio" value="strength" checked>
                            <label class="form-check-label" for="strengthRadio">
                                <span class="badge text-bg-danger">
                                    <i class="icon material-icons">fitness_center</i>Fuerza</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="cadenceRadio" value="cadence">
                            <label class="form-check-label" for="cadenceRadio">
                                <span class="badge text-bg-success">
                                    <i class="icon material-icons">timer</i>Cadencia</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="speedRadio" value="speed">
                            <label class="form-check-label" for="speedRadio">
                                <span class="badge text-bg-info">
                                    <i class="icon material-icons">bolt</i>Velocidad</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="resistanceRadio" value="resistance">
                            <label class="form-check-label" for="resistanceRadio">
                                <span class="badge text-bg-warning">
                                    <i class="icon material-icons">directions_run</i>Resistencia</span>
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div class="col right-entry">
                    <div class="form-group mb-3">
                        <label for="nombreRutina" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombreRutina">
                    </div>
                    <div class="form-group mb-3">
                        <label for="descripcionRutina" class="form-label">Descripcion</label>
                        <textarea class="form-control" id="descripcionRutina"></textarea>
                    </div>
                    <!-- Display the total duration -->
                    <div class="input-group mb-3">
                    <label for="cantidadTiempoTotal" class="input-group-text">Cantidad de tiempo total: {{ totalDuration }}</label>
                    <!--
                    <input
                        type="text"
                        class="input-group-text"
                        id="cantidadTiempoTotal"
                        v-model="totalDuration"
                        readonly
                    >
                    -->
                    </div>
                </div>
            </div>
            <div class="mb-3">
            <h5>Segmentos</h5>
            <!-- Loop through segments and render cards -->
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Orden</th>
                        <th scope="col">Duracion</th>
                        <th scope="col">Pulsaciones esperadas</th>
                        <th scope="col">Cadencia media esperada</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(segment, index) in segments" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ segment.segmentDuration }} minutos</td>
                        <td>{{ segment.beatsPerMinute }} por minuto</td>
                        <td>{{ segment.cadence }} RPM</td>
                        <td><button @click="removeSegment(index)" class="btn btn-warning align-self-center" style="float:right"><b>X</b></button></td>
                    </tr>
                </tbody>
            </table>
            

            <!-- Input fields for adding new segment -->
            <div class="row row-cols-lg-auto">
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Duracion: </div>
                    <input v-model="newSegment.segmentDuration" type="number" class="form-control" id="duracionSegmento">
                    <div class="input-group-text">minutos.</div>
                    </div>
                </div>
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Pulsaciones por minuto: </div>
                    <input v-model="newSegment.beatsPerMinute" type="number" class="form-control" id="pulsacionesSegmento">
                    </div>
                </div>
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Cadencia media: </div>
                    <input v-model="newSegment.cadence" type="number" class="form-control" id="cadenciaSegmento">
                    <div class="input-group-text">RPM</div>
                    </div>
                </div>
                <div class="col-12">
                    <!-- Use :disabled to dynamically enable/disable the button -->
                    <button @click="addSegment" class="btn btn-info" :disabled="!isFormValid">Agregar Segmento</button>
                </div>
            </div>
        </div>
            <div class="row">
                <div class="col-auto">
                    <!--<button type="submit" @click="success" class="btn btn-primary" :disabled="(totalDuration<=0)">Confirmar</button>-->
                    <button @click="success" class="btn btn-primary" :disabled="(totalDuration<=0)">Confirmar</button>
                </div>
                <div class="col">
                    <!--<button type="cancel" class="btn btn-danger">Cancelar</button>-->
                    <!--<a href="#/ejercicio/list"><button class="btn btn-danger">Cancelar</button></a>-->
                    <button type="cancel" @click="cancelar" class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  name: 'NewExerciseForm',
  props: {
    msg: String
  },
  data() {
    return {
      segments: [], // Array to store segments
      newSegment: { // Object to hold data for the new segment
        segmentDuration: '',
        beatsPerMinute: '',
        cadence: ''
      },
      presetExercises: []
    }
  },
  created() {
    // Retrieve data from Local Storage when the component is created
    const savedData = localStorage.getItem('presetExercises');
    if (savedData) {
        this.presetExercises = JSON.parse(savedData);
    }
  },
  computed: {
    isFormValid() {
      // Check if all the required fields have values
      return (
        this.newSegment.segmentDuration !== '' &&
        this.newSegment.beatsPerMinute !== '' &&
        this.newSegment.cadence !== '' &&
        this.newSegment.segmentDuration > 0 &&
        this.newSegment.beatsPerMinute > 0 &&
        this.newSegment.cadence > 0
      );
    },
    totalDuration() {
      // Calculate the total duration by summing up the durations of all segments
      return this.segments.reduce((total, segment) => total + parseInt(segment.segmentDuration), 0);
    }
  },
  methods: {
    addSegment() {
      // Push the new segment data to the segments array
      this.segments.push({
        segmentDuration: this.newSegment.segmentDuration,
        beatsPerMinute: this.newSegment.beatsPerMinute,
        cadence: this.newSegment.cadence
      });

      // Clear the input fields for the next segment
      this.newSegment.segmentDuration = '';
      this.newSegment.beatsPerMinute = '';
      this.newSegment.cadence = '';
    },
    removeSegment(index) {
      // Remove the segment from the array based on its index
      this.segments.splice(index, 1);
    },
    success() {
        // Create a new exercise object with segments
        const description = document.getElementById('descripcionRutina').value;
        // Calculate the total duration of all segments
        const totalDuration = this.segments.reduce((total, segment) => total + parseInt(segment.segmentDuration), 0);
        const name = document.getElementById('nombreRutina').value;
        var newTitle = ''
        var newClass = ''
        var exerciseType = ''
        const selectedExerciseType = document.querySelector('input[name="excerciseRadio"]:checked').value;
        switch (selectedExerciseType) {
            case 'strength':
                //code
                newTitle='<i class="icon material-icons">fitness_center</i> '+name
                newClass='strength'
                exerciseType='Fuerza'
                break
            case 'cadence':
                //code
                newTitle= '<i class="icon material-icons">timer</i> '+name
                newClass= 'cadence'
                exerciseType='Cadencia'
                break
            case 'speed':
                //code
                newTitle='<i class="icon material-icons">bolt</i> '+name
                newClass= 'speed'
                exerciseType='Velocidad'
                break
            case 'resistance':
                //code
                newTitle='<i class="icon material-icons">directions_run</i> '+name
                newClass= 'resistance'
                exerciseType='Resistencia'
                break
        }
      const newExercise = {
        id: this.generateUniqueId(),
        name: name, // Set the name from the form
        description: description, // Set the description from the form
        segments: this.segments,
        duration: totalDuration,
        title: newTitle,
        exerciseType: exerciseType,
        class: newClass
      };

      // Add the new exercise to the presetExercises list
      this.presetExercises.push(newExercise);

      // Save the updated presetExercises list to Local Storage
      localStorage.setItem('presetExercises', JSON.stringify(this.presetExercises));

      alert("Rutina nueva creada con exito");
      this.$router.push("/ejercicio/list");
    },
    generateUniqueId() {
      // Find the last exercise in the list and increment its ID by 1
      const lastExercise = this.presetExercises[this.presetExercises.length - 1];
      return lastExercise ? lastExercise.id + 1 : 1;
    },
    cancelar() {
        this.$router.push("/ejercicio/list");
    }
  }
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .left-entry{
        width: 45%;
        float: left;
    }
    .right-entry {
        width: 45%;
        float: right;
    }
    .form-check-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    }

    .form-check-label .badge {
    font-size: 14px;
    line-height: 1.2;
    margin-left: 5px;
    }

    .form-check-label .badge .icon {
    font-size: 14px;
    vertical-align: middle;
    margin-right: 3px;
    }
</style>
