<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    name: 'CalendarCompo',
    components: { VueCal },
    data() {
		return {
            events: [],
            presetExercises: [],
            showDialog: false,
            startTime: '',
            selectedPresetExercise: 'CUSTOM',
            searchTitle: '',
            showEventDetailsModal: false,
            showCustomExerciseModal: false,
            selectedEvent: null,
            selectedDay: null,
            user: '', //usuario profesor o santiago
            segmentsCustomExercise: [], // Array to store segments
            newSegmentCustomExercise: { // Object to hold data for the new segment
                duracion: '',
                pulsaciones: '',
                cadencia: ''
            },
            customExerciseType: 'strength',
            customExerciseName: '',
            customExerciseDescription: '',
            customExerciseSelectedDay: null,
            customExerciseStartTime: null,
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
        },
        isAllowed() {
            return (this.user == 'profesor') //todo: implement actual role checking lmao
        },
        totalDurationCustomExercise() {
            // Calculate the total duration by summing up the durations of all segments
            return this.segmentsCustomExercise.reduce((total, segment) => total + parseInt(segment.duracion), 0);
        },
        isFormValid() {
            // Check if all the required fields have values
            return (
                this.newSegmentCustomExercise.duracion !== '' &&
                this.newSegmentCustomExercise.pulsaciones !== '' &&
                this.newSegmentCustomExercise.cadencia !== '' &&
                this.newSegmentCustomExercise.duracion > 0 &&
                this.newSegmentCustomExercise.pulsaciones > 0 &&
                this.newSegmentCustomExercise.cadencia > 0
            );
            },
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
        /* Seems like this method isn't used anywhere? uncomment if something breaks
        onCellDblClick(clickedCell) {
            console.log("on cell db click")
            if (this.user == 'profesor'){ 
                console.log("user IS profesor")
                if (clickedCell && clickedCell.startDate) {
                    // The cell object exists and has a valid startDate property, proceed with toTrainingForm
                    this.toTrainingForm(clickedCell);
                } else {
                    // The cell object or startDate property is missing
                    console.log(" ondouble clik Cell or startDate property is missing.");
                }
            }
        },
        */
        toTrainingForm(clickedCell) {
            if (this.user == 'profesor'){ //if the user has permission. TODO: turn into a real permission checker
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
            }
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
            this.selectedPresetExercise = 'CUSTOM';
            this.searchTitle = '';
        },
        confirmSelection() {
            if (this.selectedPresetExercise == "CUSTOM"){
                this.showCustomExerciseModal = true
                this.customExerciseStartTime = this.startTime
                this.customExerciseSelectedDay = this.clickedDate
            } else if (this.showDialog && this.clickedDate && this.startTime && this.selectedPresetExercise) {
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
            this.selectedPresetExercise = "CUSTOM";
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
        cancelarCustomExercise(){
            this.showCustomExerciseModal = false
            this.customExerciseStartTime = null
            this.customExerciseSelectedDay = null
        },
        confirmarCustomExercise(){
            if (this.customExerciseSelectedDay && this.customExerciseStartTime) {
            const currentDate = new Date(this.customExerciseSelectedDay);
            const selectedTime = this.customExerciseStartTime.split(':');
            currentDate.setHours(parseInt(selectedTime[0], 10));
            currentDate.setMinutes(parseInt(selectedTime[1], 10));

            const endTime = new Date(currentDate);
            endTime.setMinutes(currentDate.getMinutes() + this.totalDurationCustomExercise);

            // Generate a unique ID for the new event
            const newEventId = this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1;

            var newTitle = ''
            var newClass = ''
            switch (this.customExerciseType) {
                case 'strength':
                    //code
                    newTitle='<i class="icon material-icons">fitness_center</i> '+this.customExerciseName
                    newClass='strength'
                    break
                case 'cadence':
                    //code
                    newTitle= '<i class="icon material-icons">timer</i> '+this.customExerciseName
                    newClass= 'cadency'
                    break
                case 'speed':
                    //code
                    newTitle='<i class="icon material-icons">directions_bike</i> '+this.customExerciseName
                    newClass= 'speed'
                    break
                case 'resistance':
                    //code
                    newTitle='<i class="icon material-icons">directions_run</i> '+this.customExerciseName
                    newClass= 'resistance'
                    break
            }

            const newEvent = {
                id: newEventId,
                start: currentDate,
                end: endTime,
                title: newTitle,
                class: newClass,
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
            
            this.segmentsCustomExercise= [] // Array to store segments
            this.newSegmentCustomExercise= { // Object to hold data for the new segment
                duracion: '',
                pulsaciones: '',
                cadencia: ''
            },
            this.customExerciseType= 'strength'
            this.customExerciseName= ''
            this.customExerciseDescription= ''
            this.showCustomExerciseModal = false
            this.customExerciseStartTime = this.startTime
            this.customExerciseSelectedDay = this.selectedDay
        },
        addSegmentCustomExercise() {
        // Push the new segment data to the segments array
        this.segmentsCustomExercise.push({
            duracion: this.newSegmentCustomExercise.duracion,
            pulsaciones: this.newSegmentCustomExercise.pulsaciones,
            cadencia: this.newSegmentCustomExercise.cadencia
        });

        // Clear the input fields for the next segment
        this.newSegmentCustomExercise.duracion = '';
        this.newSegmentCustomExercise.pulsaciones = '';
        this.newSegmentCustomExercise.cadencia = '';
        },
        removeSegmentCustomExercise(index) {
        // Remove the segment from the array based on its index
        this.segmentsCustomExercise.splice(index, 1);
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
        // Retrieve data from Local Storage when the component is created
        const presetExercisesData = localStorage.getItem('presetExercises');
        if (presetExercisesData) {
            this.presetExercises = JSON.parse(presetExercisesData);
        }

        this.user = this.$store.getters.user
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
                <div class="form-check">
                    <input class="form-check-input" type="radio" v-model="selectedPresetExercise" value="CUSTOM" checked id="customOption"/>
                    <label class="form-check-label" for="customOption">
                        <span class="badge text-bg-primary"><i class="icon material-icons">add</i>CREAR NUEVO</span>
                    </label>
                </div>
                <div v-for="exercise in computedFilteredPresetExercises" :key="exercise.id" class="form-check">
                    <input class="form-check-input" type="radio" v-model="selectedPresetExercise" :value="exercise" :id="'option'+exercise.id"/>
                    <label class="form-check-label" :for="'option'+exercise.id">
                        <span v-html="exercise.title"></span>
                        <p class="fst-italic fw-light"> ({{this.parseMinutes(exercise.duration)}}) </p>
                    </label>
                </div>
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
                    <button v-if="isAllowed" class="btn btn-danger" @click="deleteEvent">Eliminar</button>
                    <div v-else></div>
                    <!-- <router-link :to="{ name: 'ViewEvent', params: { eventId: selectedEvent.id } }">
                        <button class="btn btn-primary">Ver detalle</button>
                    </router-link> -->
                    <button class="btn btn-secondary" @click="closeEventDetailsModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
    <!-- Event Details Dialog -->
    <div v-if="showCustomExerciseModal" class="modal fade show" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="row">
                    <!-- <h2>Nuevo entrenamiento para Pedro Lopez</h2> -->
                        <h6>Ejercicio Personalizado</h6>
                    </div>
                    <div class="row">
                        <div class="col align-self-center left-entry">
                            <fieldset class="border rounded p-2">
                                <legend>Elegir el tipo de ejercicio:</legend>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="customExerciseType" name="excerciseRadio" id="strengthRadio" value="strength" checked>
                                    <label class="form-check-label" for="strengthRadio">
                                        <span class="badge text-bg-danger">
                                            <i class="icon material-icons">fitness_center</i>Fuerza</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="customExerciseType" name="excerciseRadio" id="cadenceRadio" value="cadence">
                                    <label class="form-check-label" for="cadenceRadio">
                                        <span class="badge text-bg-success">
                                            <i class="icon material-icons">timer</i>Cadencia</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="customExerciseType" name="excerciseRadio" id="speedRadio" value="speed">
                                    <label class="form-check-label" for="speedRadio">
                                        <span class="badge text-bg-info">
                                            <i class="icon material-icons">bolt</i>Velocidad</span>
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" v-model="customExerciseType" name="excerciseRadio" id="resistanceRadio" value="resistance">
                                    <label class="form-check-label" for="resistanceRadio">
                                        <span class="badge text-bg-warning">
                                            <i class="icon material-icons">directions_run</i>Resistencia</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <div class="col right-entry">
                            <div class="form-group mb-3">
                                <label for="nombreRutina" class="form-label">Nombre</label>
                                <input type="text" class="form-control" v-model="customExerciseName" id="nombreRutina">
                            </div>
                            <div class="form-group mb-3">
                                <label for="descripcionRutina" class="form-label">Descripcion</label>
                                <textarea class="form-control" v-model="customExerciseDescription" id="descripcionRutina"></textarea>
                            </div>
                            <!-- Display the total duration -->
                            <div class="input-group mb-3">
                            <label for="cantidadTiempoTotal" class="input-group-text">Cantidad de tiempo total:</label>
                            <input
                                type="text"
                                class="form-control"
                                id="cantidadTiempoTotal"
                                v-model="totalDurationCustomExercise"
                                readonly
                            >
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                    <h5>Segmentos</h5>
                    <!-- Loop through segments and render cards -->
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Orden</th>
                                <th scope="col">Duracion</th>
                                <th scope="col">Pulsaciones esperadas</th>
                                <th scope="col">Cadencia media esperada</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(segment, index) in segmentsCustomExercise" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ segment.duracion }} minutos</td>
                                <td>{{ segment.pulsaciones }} por minuto</td>
                                <td>{{ segment.cadencia }} RPM</td>
                                <td><button @click="removeSegmentCustomExercise(index)" class="btn btn-warning align-self-center" style="float:right"><b>X</b></button></td>
                            </tr>
                        </tbody>
                    </table>
                    

                    <!-- Input fields for adding new segment -->
                    <div class="row row-cols-lg-auto">
                        <div class="col-12 w-25">
                            <div class="input-group">
                            <div class="input-group-text">Duracion: </div>
                            <input v-model="newSegmentCustomExercise.duracion" type="number" class="form-control" id="duracionSegmento">
                            <div class="input-group-text">minutos.</div>
                            </div>
                        </div>
                        <div class="col-12 w-25">
                            <div class="input-group">
                            <div class="input-group-text">Pulsaciones por minuto: </div>
                            <input v-model="newSegmentCustomExercise.pulsaciones" type="number" class="form-control" id="pulsacionesSegmento">
                            </div>
                        </div>
                        <div class="col-12 w-25">
                            <div class="input-group">
                            <div class="input-group-text">Cadencia media: </div>
                            <input v-model="newSegmentCustomExercise.cadencia" type="number" class="form-control" id="cadenciaSegmento">
                            <div class="input-group-text">RPM</div>
                            </div>
                        </div>
                        <div class="col-12">
                            <!-- Use :disabled to dynamically enable/disable the button -->
                            <button @click="addSegmentCustomExercise" class="btn btn-info" :disabled="!isFormValid">Agregar Segmento</button>
                        </div>
                    </div>
                </div>
                    <div class="row">
                        <div class="col-auto">
                            <!--<button type="submit" @click="success" class="btn btn-primary" :disabled="(totalDuration<=0)">Confirmar</button>-->
                            <button @click="confirmarCustomExercise" class="btn btn-primary" :disabled="(totalDurationCustomExercise<=0)">Confirmar</button>
                        </div>
                        <div class="col">
                            <!--<button type="cancel" class="btn btn-danger">Cancelar</button>-->
                        
                            <button type="cancel" @click="cancelarCustomExercise" class="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
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
