<template>
    <div class="container">
        <div class="row">
            <h2>Nuevo entrenamiento para Pedro Lopez</h2>
        </div>
        <div class="row">
            <div class="col">
                <form>
                    <div class="mb-3">
                        <label for="cantidadTiempoTotal" class="form-label">Cantidad de tiempo total</label>
                        <input type="number" class="form-control" id="cantidadTiempoTotal">
                    </div>
                    <div class="mb-3">
                        <label for="pulsacionesMedia" class="form-label">Pulsaciones Media</label>
                        <input type="number" class="form-control" id="pulsacionesMedia">
                    </div>
                    <div class="mb-3">
                        <label for="cadenciaMedia" class="form-label">Cadencia Media Deseada</label>
                        <input type="number" class="form-control" id="cadenciaMedia">
                    </div>
                    <div class="row">
                        <div class="col">
                            <button type="submit" class="btn btn-primary">Confirmar</button>
                        </div>
                        <div class="col">
                            <button type="cancel" class="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col align-self-center">
                <fieldset class="border rounded p-2">
                    <legend>Elegir el tipo de ejercicio:</legend>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="excerciseRadio" id="strenghtRadio" value="strenght" checked>
                        <label class="form-check-label" for="strenghtRadio">
                            <span class="badge bg-danger">
                                <i class="icon material-icons">fitness_center</i>Fuerza (1)</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="excerciseRadio" id="cadencyRadio" value="cadency">
                        <label class="form-check-label" for="cadencyRadio">
                            <span class="badge bg-success">
                                <i class="icon material-icons">timer</i>Cadencia</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="excerciseRadio" id="speedRadio" value="speed">
                        <label class="form-check-label" for="speedRadio">
                            <span class="badge bg-info black-text">
                                <i class="icon material-icons">bolt</i>Velocidad</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="excerciseRadio" id="resistanceRadio" value="resistance">
                        <label class="form-check-label" for="resistanceRadio">
                            <span class="badge bg-warning black-text">
                                <i class="icon material-icons">directions_run</i>Resistencia</span>
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'NewExerciseForm',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .black-text{
        color:black
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