<template>
    <div class="container">
      <h3>Ejercicios:</h3>
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
          <tr> 
            <th scope="row">1</th>
            <td>Ejemplo 1</td>
            <td>Fuerza</td>
            <td>1 hora 20 minutos</td>
            <td>Descripcion aqui</td>
            <td><a class="nav-link" href="#/ejercicio/ejemplo"><button type="button" class="btn btn-primary">Ver</button></a></td>
            <td><button class="btn btn-danger">Borrar</button></td>
          </tr>
        </tbody>
      </table> 
      <a href="#/ejercicio/new"><button class="btn btn-info">Nueva rutina</button></a>
      
    </div>
    
  </template>
  <script>
  export default {
    name: 'ExerciseList',
    props: {
      msg: String
    }
  }
  </script>
  <style scoped>
    h3 {
      margin-bottom: 5%;
    }
  </style>