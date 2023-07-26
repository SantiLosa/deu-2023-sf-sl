<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <img src="https://images-ext-2.discordapp.net/external/AyguSinmxxWYhc9n7dOJp7Z-WY0_Erix2U-UaZVuqsA/https/freevector-images.s3.amazonaws.com/uploads/vector/preview/31159/cyclist_high.png?width=467&height=468" alt="Logo de Pagina">
            </div>
            <div class="col align-self-center">
                <form>
                    <div class="mb-3">
                        <label for="emailField" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="emailField" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Nunca compartiremos tu Email con nadie mas.</div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordField" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordField">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberSessionCheck">
                        <label class="form-check-label" for="rememberSessionCheck">Mantener sesion</label>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                    <a href="#/home"><button type="button" class="btn btn-primary">Submit</button></a>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'LogInForm',
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