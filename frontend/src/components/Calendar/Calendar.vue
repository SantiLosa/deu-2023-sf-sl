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
                    title: '<i class="icon material-icons">fitness_center</i> Entrenamiento de Fuerza', // Optional.
                    class: 'strength'
                },
                {
                    start: '2023-06-13 11:00', // Required.
                    end: '2023-06-13 13:0', // Required.
                    title: '<i class="icon material-icons">directions_run</i> Entrenamiento de Resistencia', // Optional.
                    class: 'resistance'
                },
                {
                    start: '2023-06-14 08:30', // Required.
                    end: '2023-06-14 11:30', // Required.
                    title: '<i class="icon material-icons">bolt</i> Entrenamiento de Velocidad', // Optional.
                    class: 'speed'
                },
                {
                    start: '2023-06-15 08:00', // Required.
                    end: '2023-06-15 14:00', // Required.
                    title: '<i class="icon material-icons">timer</i> Entrenamiento de Cadencia', // Optional.
                    class: 'cadency'
                },
                {
                    start: '2023-06-17 08:00', // Required.
                    end: '2023-06-17 16:00', // Required.
                    title: '<i class="icon material-icons">directions_run</i> Entrenamiento de resistencia', // Optional.
                    class: 'resistance'
                },
                {
                    start: '2023-06-18 07:00', // Required.
                    end: '2023-06-18 13:00', // Required.
                    title: '<i class="icon material-icons">bolt</i> Entrenamiento de velocidad', // Optional.
                    class: 'speed'
                },
            ],
            presetExercises: [
                { 
                    class: 'speed',
                    name: 'Entrenamiento 1',
                    title: '<i class="icon material-icons">bolt</i> Entrenamiento 1',
                    duration: 10
                },
                {
                    class: 'resistance',
                    name: 'Entrenamiento 2',
                    title: '<i class="icon material-icons">directions_run</i> Entrenamiento 2', 
                    duration: 5
                },
                {
                    class: 'strength',
                    name: 'Entrenamiento 3',
                    title: '<i class="icon material-icons">fitness_center</i> Entrenamiento 3', // Optional.
                    duration: 6
                },
                {
                    class: 'strength',
                    name: 'Entrenamiento 4',
                    title: '<i class="icon material-icons">fitness_center</i> Entrenamiento 4', // Optional.
                    duration: 8
                },
                {
                    class: 'strength',
                    name: 'Entrenamiento 5',
                    title: '<i class="icon material-icons">fitness_center</i> Entrenamiento 5', // Optional.
                    duration: 2
                },
                // Add more preset exercises as needed...
            ],
            showDialog: false,
            startTime: '',
            selectedPresetExercise: null,
            searchTitle: '',
            filteredPresetExercises: [],
        }
    },
    computed: {
    // Filter the preset exercises based on the searchTitle input
    computedFilteredPresetExercises() {
        return this.presetExercises.filter((exercise) => {
            return exercise.title.toLowerCase().includes(this.searchTitle.toLowerCase());
        });
        },
    },
    methods: {
        filterPresetExercises() {
            // No need to do anything here. The computed property "filteredPresetExercises" handles the filtering.
        },
        onEventClick(event, e) {
            this.selectedEvent = event;
            this.showDialog = true;
            e.stopPropagation();
        },
        showPresetExercises(event) {
            // Handle the double-click event to show the preset exercises dialog.
            this.showDialog = true;

            // Get the mouse click position
            const clickX = event.clientX;
            const clickY = event.clientY;
            this.filteredPresetExercises = this.computedFilteredPresetExercises;

            // Get the scroll position
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;

            // Set the position of the dialog based on the mouse click position and scroll position
            const dialogElement = document.querySelector('.preset-exercises-dialog');
            dialogElement.style.left = `${clickX + scrollX}px`;
            dialogElement.style.top = `${clickY + scrollY}px`;
            console.log("AAAAA",this.clickedDate)
            // Set the start time input to the clicked cell time
            const hour = this.clickedDate.getHours().toString().padStart(2, '0'); // Get the hours (formatted with leading zeros)
            const minutes = this.clickedDate.getMinutes().toString().padStart(2, '0'); // Get the minutes (formatted with leading zeros)
            this.startTime = `${hour}:${minutes}`; // Set the start time input value
        },
        onCellDblClick(clickedCell) {
            console.log(clickedCell); // Log the clicked cell object for debugging purposes

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
            console.log("CLIKED CELL",clickedCell)
            const clickedDate = new Date(clickedCell)
            const hour = clickedDate.getHours()
            console.log("start_hour", hour)

            this.showDialog = true;
            this.clickedDate = clickedDate;
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
            this.filteredPresetExercises = []; // Clear the filtered list
        },
        confirmSelection() {
            if (this.showDialog && this.clickedDate && this.startTime && this.selectedPresetExercise) {
                const currentDate = new Date(this.clickedDate);
                const selectedTime = this.startTime.split(':');
                currentDate.setHours(parseInt(selectedTime[0], 10));
                currentDate.setMinutes(parseInt(selectedTime[1], 10));

                const endTime = new Date(currentDate);
                endTime.setHours(currentDate.getHours() + this.selectedPresetExercise.duration); // Use duration attribute

                const newEvent = {
                    start: currentDate,
                    end: endTime,
                    title: this.selectedPresetExercise.title,
                    class: this.selectedPresetExercise.class,
                };

                this.events.push(newEvent);
            }

            this.showDialog = false;
            this.clickedDate = null;
            this.startTime = ''; // Reset the selected start time
            this.selectedPresetExercise = null; // Reset the selected preset exercise
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
    }
}
</script>
<template>
    <div class="container">
      <vue-cal
        locale="es"
        :disable-views="['day']"
        :events="events"
        :on-event-click="onEventClick"
        @cell-dblclick="toTrainingForm($event)"
        @dblclick="showPresetExercises($event)"
      />
  
      <!-- Preset Exercises Dialog -->
      <div v-if="showDialog" class="preset-exercises-dialog card">
        <div class="card-body">
          <h3 class="card-title">Select a Preset Exercise Routine</h3>
          
          <!-- Search by title filter -->
          <div class="mb-3">
            <label for="searchTitle">Search by Title:</label>
            <input type="text" id="searchTitle" v-model="searchTitle" @input="filterPresetExercises" />
          </div>
  
        <!-- Scrollable list with radio buttons for preset exercises -->
        <div class="scrollable-list">
        <label v-for="exercise in computedFilteredPresetExercises" :key="exercise.class">
            <input type="radio" v-model="selectedPresetExercise" :value="exercise" />
            <span v-html="exercise.title"></span>
            <span>Duration: {{ exercise.duration }} hours</span>
        </label>
        </div>
  
          <!-- Input form to set the start time for the selected preset event -->
          <div v-if="clickedDate">
            <label for="startTime">Start Time:</label>
            <input type="time" id="startTime" v-model="startTime" />
          </div>
  
          <!-- Add the "Aceptar" button to confirm the selection -->
          <div class="button-group">
            <button class="btn btn-primary" @click="confirmSelection">Aceptar</button>
            <button class="btn btn-secondary" @click="closeDialog">Cancel</button>
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
/* Set a higher z-index to make the dialog appear above other elements */
.preset-exercises-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 9999; /* Adjust the value as needed */
}
</style>
