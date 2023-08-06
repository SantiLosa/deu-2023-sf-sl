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
      users: [],
      searchQuery: '',
    };
  },
  created() {
    // Retrieve data from Local Storage when the component is created
    const savedData = localStorage.getItem('users');
    if (savedData) {
      this.users = JSON.parse(savedData);
    }
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