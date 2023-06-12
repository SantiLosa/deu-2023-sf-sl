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
                        <input type="number" class="form-control" id="cantidadTiempoTotal" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="pulsacionesMedia" class="form-label">Pulsaciones Media</label>
                        <input type="number" class="form-control" id="pulsacionesMedia" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="cadenciaMedia" class="form-label">Cadencia Media Deseada</label>
                        <input type="number" class="form-control" id="cadenciaMedia" aria-describedby="emailHelp">
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
                        <span class="badge bg-info">Velocidad</span>
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4">
                    <label class="form-check-label" for="exampleRadios4">
                        <span class="badge bg-warning">Resistencia</span>
                    </label>
                </div>
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