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
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                        <label class="form-check-label" for="exampleRadios1">
                            <span class="badge bg-danger">Fuerza (1)</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
                        <label class="form-check-label" for="exampleRadios2">
                            <span class="badge bg-success">Cadencia</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3">
                        <label class="form-check-label" for="exampleRadios3">
                            <span class="badge bg-info black-text">Velocidad</span>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4">
                        <label class="form-check-label" for="exampleRadios4">
                            <span class="badge bg-warning black-text">Resistencia</span>
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
  </style>