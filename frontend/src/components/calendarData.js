import presetExercises from "./exerciseData.js";

function getRandomDateWithinNextWeek() {
    const now = new Date();
    const nextWeek = now.getTime() + 7 * 24 * 60 * 60 * 1000; // Adding one week in milliseconds
    return new Date(now.getTime() + Math.random() * (nextWeek - now.getTime()));
  }
  
  const generateUserEvents = (userId) => {
    const events = [];
  
    // Generate events for each day of the next week
    for (let i = 0; i < 7; i++) {
      const start = getRandomDateWithinNextWeek();
      const exercise = presetExercises[Math.floor(Math.random() * presetExercises.length)];
      const durationInMilliseconds = exercise.duration * 60 * 1000;
      const startDate = new Date(start);
      const end = new Date(startDate.getTime() + durationInMilliseconds);
  
      const formattedStart = start.toISOString().substr(0, 16).replace('T', ' '); // Format start date
      const formattedEnd = end.toISOString().substr(0, 16).replace('T', ' '); // Format end date
  
      events.push({
        start: formattedStart,
        end: formattedEnd,
        ...exercise,
      });
    }
  
    return {
      userId,
      events,
    };
  };
  
  const usersCount = 20;
  const allUserEvents = [];
  
  // Generate events for 20 users
  for (let i = 1; i <= usersCount; i++) {
    const userEventsData = generateUserEvents(i);
    allUserEvents.push(userEventsData);
  }
  
  console.log(allUserEvents);
export default allUserEvents;