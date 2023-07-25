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
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Exercises</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" v-bind:key="user.id"> 
            <th scope="row">{{user.id}}</th>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.address.city}}</td>
            <td><a class="nav-link" href="#/calendar"><button type="button" class="btn btn-primary">Ejercicios</button></a></td>
          </tr>
        </tbody>
      </table> 
    </div> 
  </template>
<script>
import axios from 'axios';
export default {
  name: 'UsersTable',
  data() {
    return {
      users: null,
      searchQuery: '',
    };
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        this.users = res.data;
      });
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
          user.address.city.toLowerCase().includes(query)
        );
      });
    }
  },
  watch: {
    searchQuery() {
      // When the searchQuery changes, the filteredUsers will be updated automatically.
    }
  }
}
</script>
  <style scoped>
    h3 {
      margin-bottom: 5%;
    }
  </style>