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
                        <input v-model="credentials.email" type="email" class="form-control" id="emailField" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">Nunca compartiremos tu Email con nadie mas.</div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordField" class="form-label">Contraseña</label>
                        <input v-model="credentials.password" type="password" class="form-control" id="passwordField">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberSessionCheck">
                        <label class="form-check-label" for="rememberSessionCheck">Mantener sesion</label>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                    <!--<a href="#/home"><button type="button" class="btn btn-primary">Submit</button></a>-->
                    <button @click="logIn" type="button" class="btn btn-primary">Iniciar Sesion</button>
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
    },
    data() {
      return {
        credentials: { //ONLY for prototype, DELETE for actual app
          email: '',
          password:''
        }
      }
    },
    methods: {
      logIn() {
        if (this.credentials.email === 'profesor@gmail.com' && this.credentials.password === 'ciclismo123') {
          this.$cookies.set('loggedIn', true);
          this.$store.dispatch('setLoggedIn', true);
          this.$router.push('/home');
        } else {
          alert("¡Email o contraseña incorrectos!");
          console.log("Usuario: profesor@gmail.com");
          console.log("Contraseña: ciclismo123");
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