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
                    start: '2023-06-12 07:00', // Required.
                    end: '2023-06-12 19:00', // Required.
                    title: 'Entrenamiento 1', // Optional.
                    class: 'sport'
                },
                {
                    start: new Date(2023, 6 - 1, 14, 12, 0), // Required.
                    end: new Date(2023, 6 - 1, 14, 20, 0), // Required.
                    title: "hola evento", // Optional.
                    class: 'sport'
                }
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
    :disable-views="['day']"
    :events="events"
    :on-event-click="onEventClick"
    @cell-dblclick="toTrainingForm($event)" />
</template>
<style>
/* Different color for different event types. */
.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</style>