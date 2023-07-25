<template>
    <div class="container">
        <div class="row">
        <!-- <h2>Nuevo entrenamiento para Pedro Lopez</h2> -->
            <h3>Nueva rutina</h3>
        </div>
        <form>
            <div class="row">
                <div class="col left-entry">
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
                <div class="col right-entry">
                    <div class="form-group mb-3">
                        <label for="nombreRutina" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombreRutina">
                    </div>
                    <div class="form-group mb-3">
                        <label for="descripcionRutina" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="descripcionRutina">
                    </div>
                    <div class="form-group mb-3">
                        <label for="cantidadTiempoTotal" class="form-label">Cantidad de tiempo total</label>
                        <input type="text" class="form-control" id="cantidadTiempoTotal" readonly>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <h5>Segmentos</h5>
                <div class="row row-cols-lg-auto">
                    <div class="col-12 w-25">
                        <div class="input-group">
                            <div class="input-group-text">Duracion: </div>
                            <input type="number" class="form-control" id="duracionSegmento">
                            <div class="input-group-text">minutos.</div>
                        </div>
                    </div>
                    <div class="col-12 w-25">
                        <div class="input-group">
                            <div class="input-group-text">Pulsaciones por minuto: </div>
                            <input type="number" class="form-control" id="pulsacionesSegmento">
                        </div>
                    </div>
                    <div class="col-12 w-25">
                        <div class="input-group">
                            <div class="input-group-text">Cadencia media: </div>
                            <input type="number" class="form-control" id="cadenciaSegmento">
                        </div>
                    </div>
                    <div class="col-12 align-self-center">
                        <button class="btn btn-warning black-text">X</button>
                    </div>
                </div>
                <button class="btn btn-info mt-3">Agregar Segmento</button>
            </div>

            <div class="row">
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary">Confirmar</button>
                </div>
                <div class="col">
                    <button type="cancel" class="btn btn-danger">Cancelar</button>
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
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .black-text{
        color:black
    }
    .left-entry{
        width: 45%;
        float: left;
    }
    .right-entry {
        width: 45%;
        float: right;
    }
  </style>