<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    name: 'CalendarCompo',
    components: { VueCal },
    data() {
		return {
            events: [
                {
                    start: '2023-06-12 10:00', // Required.
                    end: '2023-06-12 12:00', // Required.
                    title: 'Entrenamiento de Fuerza', // Optional.
                    class: 'strength'
                },
                {
                    start: '2023-06-13 11:00', // Required.
                    end: '2023-06-13 13:0', // Required.
                    title: 'Entrenamiento de Resistencia', // Optional.
                    class: 'resistance'
                },
                {
                    start: '2023-06-14 08:30', // Required.
                    end: '2023-06-14 11:30', // Required.
                    title: 'Entrenamiento de Velocidad', // Optional.
                    class: 'speed'
                },
                {
                    start: '2023-06-15 08:00', // Required.
                    end: '2023-06-15 14:00', // Required.
                    title: 'Entrenamiento de Cadencia', // Optional.
                    class: 'cadency'
                },
                {
                    start: '2023-06-17 08:00', // Required.
                    end: '2023-06-17 16:00', // Required.
                    title: 'Entrenamiento de resistencia', // Optional.
                    class: 'resistance'
                },
                {
                    start: '2023-06-18 07:00', // Required.
                    end: '2023-06-18 13:00', // Required.
                    title: 'Entrenamiento de velocidad', // Optional.
                    class: 'speed'
                },
            ]
        }
    },
    methods: {
        onEventClick (event, e) {
            this.selectedEvent = event
            this.showDialog = true

            // Redirect to /ejercicio/ejemplo
            window.location.href = '#/ejercicio/ejemplo';

            // Prevent navigating to narrower view (default vue-cal behavior).
            e.stopPropagation()
        },
        toTrainingForm (event) {
            this.selectedEvent = event
            this.showDialog = true

            // Redirect to /ejercicio/ejemplo
            window.location.href = '#/ejercicio/new';
        }  
    }
}
</script>
<template>
    <vue-cal
    locale="es"
    :disable-views="['day']"
    :events="events"
    :on-event-click="onEventClick"
    @cell-dblclick="toTrainingForm($event)" />
</template>
<style>
/* Different color for different event types. */
.vuecal__event.speed {background-color: rgba(13, 110, 253);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.strength {background-color: rgba(220, 53, 69);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.cadency {background-color: rgba(25, 135, 84);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.resistance {background-color: rgba(255, 193, 7);border: 1px solid rgb(235, 82, 82);color: #fff;}
</style>