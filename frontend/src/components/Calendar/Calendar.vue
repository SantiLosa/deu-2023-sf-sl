<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
    name: 'CalendarCompo',
    components: { VueCal },
    data() {
		return {
            events: [],
            presetExercises: [
                {
                    id: 1,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Velocidad Ligero',
                    description: 'Entrenamiento enfocado en velocidad para principiantes',
                    duration: 60, //minutos
                    title: '<i class="icon material-icons">bolt</i> Velocidad Ligero'
                },
                {
                    id: 2,
                    class: 'resistance',
                    exerciseType: 'Resistencia',
                    name: 'Resistencia Ligero',
                    description: 'Entrenamiento enfocado en resistencia para principiantes',
                    duration: 90, //minutos
                    title: '<i class="icon material-icons">directions_run</i> Resistencia Ligero'
                },
                {
                    id: 3,
                    class: 'cadency',
                    exerciseType: 'Cadencia',
                    name: 'Cadencia Ligero',
                    description: 'Entrenamiento enfocado en cadencia para principiantes',
                    duration: 60, //minutos
                    title: '<i class="icon material-icons">timer</i> Cadencia Ligero'
                },
                {
                    id: 4,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Fuerza Ligero',
                    description: 'Entrenamiento enfocado en fuerza para principiantes',
                    duration: 30, //minutos
                    title: '<i class="icon material-icons">fitness_center</i> Fuerza Ligero'
                },
                {
                    id: 5,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Fuerza Intenso',
                    description: 'Entrenamiento colina arriba para practicar fuerza. No apto para principiantes',
                    duration: 45,
                    title: '<i class="icon material-icons">fitness_center</i> Fuerza Intenso'
                },
                {
                    id: 6,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Fuerza Intenso con Pausa',
                    description: 'Similar a Fuerza Intenso pero con pausas mas largas entre segmentos',
                    duration: 65,
                    title: '<i class="icon material-icons">fitness_center</i> Fuerza Intenso con Pausa'
                },
                {
                    id: 7,
                    class: 'resistance',
                    exerciseType: 'Resistencia',
                    name: 'Tour de France',
                    description: 'Entrenamiento extremo de aguante',
                    duration: 430,
                    title: '<i class="icon material-icons">directions_run</i> Tour de France'
                },
                {
                    id: 8,
                    class: 'resistance',
                    exerciseType: 'Resistencia',
                    name: 'Vuelta al Mundo',
                    description: 'Recorrido por todo el cuadrado de la plata',
                    duration: 300,
                    title: '<i class="icon material-icons">directions_run</i> Vuelta al Mundo'
                },
                {
                    id: 9,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Carrera Alterna',
                    description: 'Camino por el bosque a máxima velocidad',
                    duration: 40,
                    title: '<i class="icon material-icons">bolt</i> Carrera Alterna'
                },
                {
                    id: 10,
                    class: 'cadency',
                    exerciseType: 'Cadencia',
                    name: 'Bici Fija RPM',
                    description: '20 minutos de calentamiento, ejercicio, 20 minutos para bajar.',
                    duration: 180,
                    title: '<i class="icon material-icons">timer</i> Bici Fija RPM'
                },
                {
                    id: 11,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Bici en Cambio Duro',
                    description: '10 minutos de calentamiento en configuración tranquila, luego cambio a duro sin parar',
                    duration: 40,
                    title: '<i class="icon material-icons">fitness_center</i> Bici en Cambio Duro'
                },
                {
                    id: 12,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Flash Special',
                    description: 'Ejercicio para intentar empujar la velocidad máxima del ciclista',
                    duration: 90,
                    title: '<i class="icon material-icons">bolt</i> Flash Special'
                },
                {
                    id: 13,
                    class: 'resistance',
                    exerciseType: 'Resistencia',
                    name: 'Aguante en Alta Cadencia',
                    description: 'Mantener una cadencia decente durante mucho tiempo en bici fija, con pausas',
                    duration: 180,
                    title: '<i class="icon material-icons">directions_run</i> Aguante en Alta Cadencia'
                },
                {
                    id: 14,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Resistencia',
                    description: 'Resistencia mediana',
                    duration: 30,
                    title: '<i class="icon material-icons">fitness_center</i> Resistencia'
                },
                {
                    id: 15,
                    class: 'cadency',
                    exerciseType: 'Cadencia',
                    name: 'Calentamiento',
                    description: 'Unos minutos de cadencia media para calentar',
                    duration: 20,
                    title: '<i class="icon material-icons">timer</i> Calentamiento'
                },
                {
                    id: 16,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Bici Dura con Pausas',
                    description: 'Alternar entre cadencia baja con bici dura y cadencia alta con bici floja.',
                    duration: 80,
                    title: '<i class="icon material-icons">fitness_center</i> Bici Dura con Pausas'
                },
                {
                    id: 17,
                    class: 'strength',
                    exerciseType: 'Fuerza',
                    name: 'Michelin Special',
                    description: 'En bicicleta con rueda atada atrás.',
                    duration: 60,
                    title: '<i class="icon material-icons">fitness_center</i> Michelin Special'
                },
                {
                    id: 18,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Cardio Básico',
                    description: 'Ejercicio de velocidad alta para entrenar cardio',
                    duration: 55,
                    title: '<i class="icon material-icons">bolt</i> Cardio Básico'
                },
                {
                    id: 19,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Burst',
                    description: 'Ejercicio de aceleración, estrechos cortos de alta velocidad',
                    duration: 40,
                    title: '<i class="icon material-icons">bolt</i> Burst'
                },
                {
                    id: 20,
                    class: 'speed',
                    exerciseType: 'Velocidad',
                    name: 'Burst Intenso',
                    description: 'Muchos estrechos cortos de alta velocidad',
                    duration: 100,
                    title: '<i class="icon material-icons">bolt</i> Burst Intenso'
                }
            ],
            showDialog: false,
            startTime: '',
            selectedPresetExercise: null,
            searchTitle: '',
            showEventDetailsModal: false,
            selectedEvent: null,
            selectedDay: null,
        }
    },
    computed: {
    // Filter the preset exercises based on the searchTitle input
    computedFilteredPresetExercises() {
        if (!this.searchTitle) {
          return this.presetExercises;
        }
        const query = this.searchTitle.toLowerCase();
        return this.presetExercises.filter(exercise => {
          return (
            exercise.name.toLowerCase().includes(query) ||
            exercise.description.toLowerCase().includes(query) ||
            exercise.exerciseType.toLowerCase().includes(query)
          );
        });
      }
    },
    methods: {
        filterPresetExercises() {
            // No need to do anything here. The computed property "filteredPresetExercises" handles the filtering.
        },
        onEventClick(event, e) {
            // Show the event details modal
            this.selectedEvent = event;
            this.showEventDetailsModal = true;
            e.stopPropagation();
        },
        closeEventDetailsModal() {
            // Close the event details modal
            this.showEventDetailsModal = false;
            this.selectedEvent = null;
        },
        deleteEvent() {
            // Find the index of the selected event by its id
            const index = this.events.findIndex(event => event.id === this.selectedEvent.id);
            if (index !== -1) {
                // Remove the event from the events list
                this.events.splice(index, 1);
                // Save the updated events list to localStorage
                try {
                    const userId = parseInt(this.$route.params.userId);
                    const storedUserEvents = localStorage.getItem('userEvents');
                    if (storedUserEvents) {
                        const parsedUserEvents = JSON.parse(storedUserEvents);
                        const updatedUserEvents = parsedUserEvents.map(userEvent => {
                            if (userEvent.userId === userId) {
                                // Update the events list for the specific user
                                userEvent.events = this.events;
                            }
                            return userEvent;
                        });
                        localStorage.setItem('userEvents', JSON.stringify(updatedUserEvents));
                    }
                } catch (error) {
                    console.error('Error while saving userEvents to localStorage:', error);
                }
            }
            this.closeEventDetailsModal(); // Close the modal after deleting the event
        },
        onCellDblClick(clickedCell) {

            if (clickedCell && clickedCell.startDate) {
                // The cell object exists and has a valid startDate property, proceed with toTrainingForm
                this.toTrainingForm(clickedCell);
            } else {
                // The cell object or startDate property is missing
                console.log(" ondouble clik Cell or startDate property is missing.");
            }
        },
        toTrainingForm(clickedCell) {
            // Get the startDate from the clicked cell object
            const clickedDate = new Date(clickedCell)
            this.clickedDate = clickedDate;
            // const hour = clickedDate.getHours()
            const hour = this.clickedDate.getHours().toString().padStart(2, '0'); // Get the hours (formatted with leading zeros)
            const minutes = this.clickedDate.getMinutes().toString().padStart(2, '0'); // Get the minutes (formatted with leading zeros)
            this.startTime = `${hour}:${minutes}`; // Set the start time input value
            // Set the selected day for the event
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.selectedDay = clickedDate.toLocaleDateString('es', options);
            
            this.showDialog = true;
        },
        addPresetExercise(presetExercise) {
            if (this.showDialog && this.clickedDate && this.startTime) {
                const currentDate = new Date(this.clickedDate);
                const selectedTime = this.startTime.split(':');
                currentDate.setHours(parseInt(selectedTime[0], 10));
                currentDate.setMinutes(parseInt(selectedTime[1], 10));

                const endTime = new Date(currentDate);
                endTime.setHours(currentDate.getHours() + 2);

                const newEvent = {
                    start: currentDate,
                    end: endTime,
                    title: presetExercise.title,
                    class: presetExercise.class,
                };

                this.events.push(newEvent);
            }
            this.showDialog = false;
            this.clickedDate = null;
            this.startTime = ''; // Reset the selected start time
        },
        closeDialog() {
            // Close the dialog.
            this.showDialog = false;

            // Clear the clickedDate and startTime data properties
            this.clickedDate = null;
            this.startTime = '';

            // Reset the selected preset exercise and clear the searchTitle
            this.selectedPresetExercise = null;
            this.searchTitle = '';
        },
        confirmSelection() {
            if (this.showDialog && this.clickedDate && this.startTime && this.selectedPresetExercise) {
            const currentDate = new Date(this.clickedDate);
            const selectedTime = this.startTime.split(':');
            currentDate.setHours(parseInt(selectedTime[0], 10));
            currentDate.setMinutes(parseInt(selectedTime[1], 10));

            const endTime = new Date(currentDate);
            endTime.setMinutes(currentDate.getMinutes() + this.selectedPresetExercise.duration);

            // Generate a unique ID for the new event
            const newEventId = this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1;

            const newEvent = {
                id: newEventId,
                start: currentDate,
                end: endTime,
                title: this.selectedPresetExercise.title,
                class: this.selectedPresetExercise.class,
            };

            // Push the new event to the events array
            this.events.push(newEvent);

                // Get the user ID from the route parameters (if available)
                const userId = parseInt(this.$route.params.userId);

                // Fetch the stored user events from localStorage
                const storedUserEvents = localStorage.getItem('userEvents');
                let userEvents = storedUserEvents ? JSON.parse(storedUserEvents) : [];

                // Check if user events already exist for the user
                const userEventsIndex = userEvents.findIndex((userEvent) => userEvent.userId === userId);
                if (userEventsIndex !== -1) {
                    // Update the existing user events with the new events array
                    userEvents[userEventsIndex].events = this.events;
                } else {
                    // Create a new user events entry if not already present
                    const newUserEvents = {
                        userId,
                        events: this.events,
                    };
                    userEvents.push(newUserEvents);
                }

                // Save the updated user events to localStorage
                localStorage.setItem('userEvents', JSON.stringify(userEvents));
            }

            // Clear the dialog state and reset selectedPresetExercise
            this.searchTitle = '';
            this.showDialog = false;
            this.clickedDate = null;
            this.startTime = '';
            this.selectedPresetExercise = null;
        },
        // Convert ISO date string to custom format 'YYYY-MM-DD HH:mm'
        convertToCustomFormat(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        parseMinutes(minutes){ //transforma una cantidad x de minutos en algo como '2 horas, 50 minutos'
            var horas = Math.floor(minutes / 60)
            var horaString = ''
            if (horas > 0) { 
            horaString = (''+horas+' hora')
            if (horas > 1) { horaString = horaString+'s'}
            }
            var minutos = minutes % 60
            var minutoString =''
            if (minutos > 0) { 
            minutoString = (''+minutos+' minuto')
            if (minutos > 1) { minutoString = minutoString+'s'}
            if (horaString) { minutoString = ', '+minutoString}
            }
            return (horaString+minutoString)
        },
    },
    mounted() {
        setTimeout(() => {
        const htmlElement = document.querySelector('html')
        const theme = htmlElement.getAttribute('data-bs-theme')

        if (theme === 'light') {
            const timeColumnCells = document.querySelectorAll('.vuecal__time-column .vuecal__time-cell')
            const noEventElements = document.querySelectorAll('.vuecal__no-event')

            Array.from(timeColumnCells).forEach(cell => {
            cell.style.color = '#020202'
            })

            Array.from(noEventElements).forEach(element => {
            element.style.color = '#0c0c0c'
            })
        }
        }, 0)
        // Loop through the events and convert their start and end date strings
        this.events.forEach((event) => {
        event.start = this.convertToCustomFormat(event.start);
        event.end = this.convertToCustomFormat(event.end);
        });
    },
    created(){
        try {
        // Fetch the userEvents data from localStorage
        const storedUserEvents = localStorage.getItem('userEvents');
        
        if (storedUserEvents) {
            const parsedUserEvents = JSON.parse(storedUserEvents);

            // Get the userId from the route params
            const userId = parseInt(this.$route.params.userId);

            // Find the userEvents by userId
            const userEvents = parsedUserEvents.find((userEvent) => userEvent.userId === userId);

            if (userEvents) {
            // Set the events list from the found userEvents
            this.events = userEvents.events;
            } else {
            console.error(`User events not found for userId: ${userId}`);
            }
        } else {
            console.error('userEvents not found in localStorage');
        }
        } catch (error) {
        console.error('Error while fetching and setting userEvents:', error);
        }
    }
}
</script>
<template>
    <div class="container">
        <vue-cal
        locale="es"
        :disable-views="['day']"
        :events="events"
        :on-event-dblclick="onEventClick"
        @cell-dblclick="toTrainingForm($event)"    
        />
  
        <!-- Preset Exercises Dialog -->
        <div v-if="showDialog" class="preset-exercises-dialog card sticky-top">
            <div class="card-body">
                <h5 class="card-title">Elija una rutina para {{ selectedDay }}</h5>
                
                <!-- Search by title filter -->
                <div class="mb-3">
                <label for="searchTitle">Buscar:</label>
                <input type="text" id="searchTitle" v-model="searchTitle" @input="filterPresetExercises" />
                </div>

            <!-- Scrollable list with radio buttons for preset exercises -->
            <div class="scrollable-list">
            <label v-for="exercise in computedFilteredPresetExercises" :key="exercise.id" class="col-12">
                <input type="radio" v-model="selectedPresetExercise" :value="exercise" />
                <span v-html="exercise.title"></span>
                <p class="fst-italic fw-light"> ({{this.parseMinutes(exercise.duration)}}) </p>
            </label>
            </div>
                <!-- Input form to set the start time for the selected preset event -->
                <div v-if="clickedDate">
                <label for="startTime">Hora de comienzo:</label>
                <input type="time" id="startTime" v-model="startTime" />
                </div>

                <!-- Add the "Aceptar" button to confirm the selection -->
                <div class="button-group">
                <button class="btn btn-primary" @click="confirmSelection">Aceptar</button>
                <button class="btn btn-secondary" @click="closeDialog">Cancelar</button>
                </div>
            </div>
        </div>
    <!-- Event Details Dialog -->
    <div v-if="showEventDetailsModal" class="modal fade show" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- Display the title with icons using a span tag -->
                    <h5 class="modal-title">
                        <span v-html="selectedEvent.title"></span>
                    </h5>
                    <button type="button" class="btn-close" @click="closeEventDetailsModal"></button>
                </div>
                <div class="modal-body">
                    <!-- Format the start and end dates using toLocaleString method -->
                    <p>Inicio: {{ selectedEvent.start.toLocaleString('es', { dateStyle: 'full', timeStyle: 'short' }) }}</p>
                    <p>Fin: {{ selectedEvent.end.toLocaleString('es', { dateStyle: 'full', timeStyle: 'short' }) }}</p>
                    <!-- Display the duration of the exercise using the parseMinutes method -->
                    <p>Duración: {{ parseMinutes((selectedEvent.end - selectedEvent.start) / 60000) }}</p>
                </div>
                <div class="modal-footer">
                    <!-- Remove passing of eventId to deleteEvent -->
                    <button class="btn btn-danger" @click="deleteEvent">Eliminar</button>
                    <!-- <router-link :to="{ name: 'ViewEvent', params: { eventId: selectedEvent.id } }">
                        <button class="btn btn-primary">Ver detalle</button>
                    </router-link> -->
                    <button class="btn btn-secondary" @click="closeEventDetailsModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style>
/* Different color for different event types. */
.vuecal__event.speed {background-color: rgba(13, 110, 253);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.strength {background-color: rgba(220, 53, 69);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.cadency {background-color: rgba(25, 135, 84);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.resistance {background-color: rgba(255, 193, 7);border: 1px solid rgb(235, 82, 82);color: #000000;}
.vuecal__cell:hover {
  background-color: rgba(33, 129, 184, 0.3); /* Change the color to your preferred highlight color */
  box-shadow: 0 5px 15px rgba(145, 92, 182, .4); 
  cursor: pointer; /* Set the cursor to a pointer to indicate it's clickable */
}
/* Set a higher z-index to make the dialog appear above other elements */
.preset-exercises-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 9999; /* Adjust the value as needed */
}

.scrollable-list {
  max-height: 300px; /* Adjust the height as needed */
  overflow-y: auto;
}

/* Add styles for dark mode */
[data-bs-theme="dark"] .preset-exercises-dialog {
  background-color: #333; /* Adjust the background color for dark mode */
  color: #fff; /* Adjust the text color for dark mode */
  border-color: #888; /* Adjust the border color for dark mode */
}

[data-bs-theme="dark"] .preset-exercises-dialog label {
  color: #fff; /* Adjust the label color for dark mode */
}

[data-bs-theme="dark"] .preset-exercises-dialog input[type="text"],
[data-bs-theme="dark"] .preset-exercises-dialog input[type="time"] {
  background-color: #444; /* Adjust the input background color for dark mode */
  color: #fff; /* Adjust the input text color for dark mode */
  border: 1px solid #888; /* Adjust the input border for dark mode */
}
</style>
