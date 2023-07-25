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
