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
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="strenghtRadio" value="strenght" checked>
                            <label class="form-check-label" for="strenghtRadio">
                                <span class="badge text-bg-danger">
                                    <i class="icon material-icons">fitness_center</i>Fuerza</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="excerciseRadio" id="cadencyRadio" value="cadency">
                            <label class="form-check-label" for="cadencyRadio">
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
                    <label for="cantidadTiempoTotal" class="input-group-text">Cantidad de tiempo total:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="cantidadTiempoTotal"
                        v-model="totalDuration"
                        readonly
                    >
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
                        <td>{{ segment.duracion }} minutos</td>
                        <td>{{ segment.pulsaciones }} por minuto</td>
                        <td>{{ segment.cadencia }} RPM</td>
                        <td><button @click="removeSegment(index)" class="btn btn-warning align-self-center" style="float:right"><b>X</b></button></td>
                    </tr>
                </tbody>
            </table>
            

            <!-- Input fields for adding new segment -->
            <div class="row row-cols-lg-auto">
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Duracion: </div>
                    <input v-model="newSegment.duracion" type="number" class="form-control" id="duracionSegmento">
                    <div class="input-group-text">minutos.</div>
                    </div>
                </div>
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Pulsaciones por minuto: </div>
                    <input v-model="newSegment.pulsaciones" type="number" class="form-control" id="pulsacionesSegmento">
                    </div>
                </div>
                <div class="col-12 w-25">
                    <div class="input-group">
                    <div class="input-group-text">Cadencia media: </div>
                    <input v-model="newSegment.cadencia" type="number" class="form-control" id="cadenciaSegmento">
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
                    <button type="submit" @click="success" class="btn btn-primary" :disabled="(totalDuration<=0)">Confirmar</button>
                </div>
                <div class="col">
                    <a href="#/ejercicio/list"><button type="cancel" class="btn btn-danger">Cancelar</button></a>
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
        duracion: '',
        pulsaciones: '',
        cadencia: ''
      }
    }
  },
  computed: {
    isFormValid() {
      // Check if all the required fields have values
      return (
        this.newSegment.duracion !== '' &&
        this.newSegment.pulsaciones !== '' &&
        this.newSegment.cadencia !== '' &&
        this.newSegment.duracion > 0 &&
        this.newSegment.pulsaciones > 0 &&
        this.newSegment.cadencia > 0
      );
    },
    totalDuration() {
      // Calculate the total duration by summing up the durations of all segments
      return this.segments.reduce((total, segment) => total + parseInt(segment.duracion), 0);
    }
  },
  methods: {
    addSegment() {
      // Push the new segment data to the segments array
      this.segments.push({
        duracion: this.newSegment.duracion,
        pulsaciones: this.newSegment.pulsaciones,
        cadencia: this.newSegment.cadencia
      });

      // Clear the input fields for the next segment
      this.newSegment.duracion = '';
      this.newSegment.pulsaciones = '';
      this.newSegment.cadencia = '';
    },
    removeSegment(index) {
      // Remove the segment from the array based on its index
      this.segments.splice(index, 1);
    },
    success() {
        alert("Rutina nueva creada con exito")
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
