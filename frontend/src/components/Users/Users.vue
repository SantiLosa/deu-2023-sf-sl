<template>
    <div class="container">
      <h3>Users:</h3>
      <div class="mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Busca usuarios...">
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Ejercicios</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" v-bind:key="user.id"> 
            <th scope="row">{{user.id}}</th>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.city}}</td>
            <!--<td><a class="nav-link" href="#/calendar"><button type="button" class="btn btn-primary">Ver</button></a></td>-->
            <td><button @click="viewUser(user.id)" type="button" class="btn btn-primary">Ver</button></td>
          </tr>
        </tbody>
      </table> 
    </div> 
  </template>
<script>
//import axios from 'axios';
export default {
  name: 'UsersTable',
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Juan Perez",
          email: "juan@perez.com",
          city: "La Plata"
        },
        {
          id: 2,
          name: "Julieta Gonzales",
          email: "juli@gonzales.com",
          city: "Ciudad Autonoma de Buenos Aires"
        },
        {
          id: 3,
          name: "Miguel Gutierrez",
          email: "miguel@gutierrez.com",
          city: "Bahia Blanca"
        },
        {
          id: 4,
          name: "Micaela Garcia",
          email: "micaela@garcia.com",
          city: "La Plata"
        },
        {
          id: 5,
          name: "Lautaro Goizueta",
          email: "lautaro@goizueta.com",
          city: "Córdoba"
        },
        {
          id: 6,
          name: "Laura Martinez",
          email: "laura@martinez.com",
          city: "Mar Del Plata"
        },
        {
          id: 7,
          name: "Pablo Ferreira",
          email: "pablo@ferreira.com",
          city: "San Martín de los Andes"
        },
        {
          id: 8,
          name: "Paula Alvarez",
          email: "paula@alvarez.com",
          city: "Ciudad Autonoma de Buenos Aires"
        },
        {
          id: 9,
          name: "Santiago Pereyra",
          email: "santiago@pereyra.com",
          city: "La Plata"
        },
        {
          id: 10,
          name: "Sara Visconti",
          email: "sara@visconti.com",
          city: "Ushuaia"
        },
        {
          id: 11,
          name: "Jorge Iglesias",
          email: "jorge@iglesias.com",
          city: "Bahia Blanca"
        },
        {
          id: 12,
          name: "Josefina Martinez",
          email: "josefina@martinez.com",
          city: "Tandil"
        },
        {
          id: 13,
          name: "Lorenzo Martinez",
          email: "lorenzo@martinez.com",
          city: "Tandil"
        },
        {
          id: 14,
          name: "Lorena Rosas",
          email: "lorena@rosas.com",
          city: "Viedma"
        },
        {
          id: 15,
          name: "Federico Carreras",
          email: "federico@carreras.com",
          city: "Rio Gallegos"
        },
        {
          id: 16,
          name: "Florencia Alonso",
          email: "florencia@alonso.com",
          city: "La Plata"
        },
        {
          id: 17,
          name: "Walter Rodriguez",
          email: "walter@rodriguez.com",
          city: "Tandil"
        },
        {
          id: 18,
          name: "Wendy Tevez",
          email: "wendy@tevez.com",
          city: "Necochea"
        },
        {
          id: 19,
          name: "Tobias Puentes",
          email: "tobias@puentes.com",
          city: "Ciudad Autonoma de Buenos Aires"
        },
        {
          id: 20,
          name: "Teresa Caballero",
          email: "teresa@caballero.com",
          city: "La Plata"
        },
      ],
      searchQuery: '',
    };
  },
  created() {
    /*
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        this.users = res.data;
      });
    */
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => {
        return (
          user.id.toString().includes(query) ||
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          //user.address.city.toLowerCase().includes(query)
          user.city.toLowerCase().includes(query)
        );
      });
    }
  },
  watch: {
    searchQuery() {
      // When the searchQuery changes, the filteredUsers will be updated automatically.
    }
  },
  methods: {
    viewUser(id) {
      if (id == 9) {
        this.$router.push("/calendar");
      }
      else {
        alert("Este usuario no era!")
      }
    }
  }
}
</script>
  <style scoped>
    h3 {
      margin-bottom: 5%;
    }
  </style>