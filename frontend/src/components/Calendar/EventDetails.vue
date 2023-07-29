<!-- EventDetails.vue -->
<template>
    <div class="event-details">
      <h3>{{ event.title }}</h3>
      <p>Start: {{ event.start }}</p>
      <p>End: {{ event.end }}</p>
      <div class="button-group">
        <button class="btn btn-danger" @click="deleteEvent">Delete Eventooooo</button>
        <router-link :to="{ name: 'ViewEvent', params: { eventId: event.id } }">
          <button class="btn btn-primary">View Event</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: Object,
    },
    methods: {
      deleteEvent() {
        // Emit a custom event to notify the parent component to delete the event
        this.$emit('delete', this.event.id);
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom styling for the event details component here */
  </style>
  