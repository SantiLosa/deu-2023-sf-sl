<template>
    <div class="container">
        <div class="row">
            <h3>Bici dura con pausas</h3>
        </div>
        <div class="row">
            <p>Alternar entre cadencia baja con bici dura y cadencia alta con bici floja.</p>
        </div>
        <div class="row">
            <div class="col">
                <h3>Tipo de entrenamiento: <span class="badge bg-danger">Fuerza</span></h3>
            </div>
            <div class="col">
                <h3>Tiempo total: 1 hora, 20 minutos</h3>
            </div>
            <div class="col">
                <h3>Comienzo: 14/2/2023 a las 14:00</h3>
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
                <tr>
                    <td>20 minutos</td>
                    <td>120</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>20 minutos</td>
                    <td>180</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>20 minutos</td>
                    <td>120</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>20 minutos</td>
                    <td>180</td>
                    <td>30</td>
                </tr>
            </tbody>
        </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViewExercise',
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