<template>
    <div class="container">
        <div class="row">
            <h2>Preferencias</h2>
        </div>
        <div class="row">
            <div class="col">
                <h3 class ="p-2">Modo oscuro</h3>
                <select class="form-select" @change="onChange($event)" aria-label="Default select example">
                <option selected>Seleccione una opcion</option>
                <option value="dark">Oscuro</option>
                <option value="light">Normal</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'PreferencesForm',
    props: {
      msg: String
    },
    methods: {
        onChange(event) {
            if (event.target.value != "Seleccione una opcion"){
                this.$cookies.set("theme", event.target.value)
                document.documentElement.setAttribute(
                    'data-bs-theme', event.target.value
                )
            }
        }
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