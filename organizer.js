// Load events and appointments
let events = JSON.parse(localStorage.getItem("events")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// DOM Elements
const eventForm = document.getElementById("eventForm");
const eventsDashboard = document.getElementById("eventsDashboard");
const appointmentsList = document.getElementById("appointmentsList");
const appointmentForm = document.getElementById("appointmentForm");
const locationSelect = document.getElementById("appointmentLocation"); // dropdown for locations

// -----------------------------
// ADD NEW EVENT
// -----------------------------
if(eventForm){
  eventForm.addEventListener("submit", function(e){
    e.preventDefault();
    const location = document.getElementById("eventLocation").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const time2 = document.getElementById("eventTime2").value;

    events.push({location, date, time,time2});
    localStorage.setItem("events", JSON.stringify(events));
    eventForm.reset();
    renderEvents();
    populateLocations(); // update appointment location options
  });
}

// -----------------------------
// RENDER EVENTS
// -----------------------------
function renderEvents(){
 

  if(!eventsDashboard) return;
  eventsDashboard.innerHTML = "";
  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${event.location}</h4>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Start Time:</strong> ${event.time}</p>
       <p><strong>End Time:</strong> ${event.time2}</p>
      <button onclick="editEvent(${index})">Edit</button>
      <button onclick="deleteEvent(${index})">Delete</button>
    `;
    eventsDashboard.appendChild(card);
    
  });
}

// -----------------------------
// EDIT EVENT
// -----------------------------
function editEvent(index){
  const newLocation = prompt("Edit location:", events[index].location);
  const newDate = prompt("Edit date:", events[index].date);
  const newTime = prompt("Edit Start time:", events[index].time);
  const newTime2 = prompt("Edit End time:", events[index].time2);

  if(newLocation && newDate && newTime &&newTime2){
    events[index] = {location: newLocation, date: newDate, time: newTime, time2:newTime2};
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
    populateLocations(); // update appointment location options after edit
  }
}

// -----------------------------
// DELETE EVENT
// -----------------------------
function deleteEvent(index){
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  renderEvents();
  populateLocations(); // update appointment location options after delete
}

// -----------------------------
// RENDER APPOINTMENTS
// -----------------------------
function renderAppointments(){
  if(!appointmentsList) return;

  appointmentsList.innerHTML = "";
  if(appointments.length === 0){
    appointmentsList.innerHTML = "<p>No appointments booked yet.</p>";
    return;
  }

  appointments.forEach(app => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p><strong>Name:</strong> ${app.name}</p>
      <p><strong>Email:</strong> ${app.email}</p>
      <p><strong>Phone:</strong> ${app.phone}</p>
      <p><strong>Date:</strong> ${app.date}</p>
      <p><strong>Time:</strong> ${app.time}</p> <!-- NEW -->
      <p><strong>Location:</strong> ${app.location}</p>
      <p>${app.bloodType}</p>
    `;
    appointmentsList.appendChild(div);
  });
  
}

// -----------------------------
// POPULATE LOCATIONS FOR APPOINTMENT FORM
// -----------------------------
function populateLocations() {
  if (!locationSelect) return;

  // Clear existing options
  locationSelect.innerHTML = `<option value="">Select a location</option>`;

  const today = new Date();
  const upcomingLocations = events
    .filter(event => new Date(event.date) >= today) // only future events
    .map(event => event.location);

  const uniqueLocations = [...new Set(upcomingLocations)];

  uniqueLocations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    locationSelect.appendChild(option);
  });
}

// Call it initially
populateLocations();

// -----------------------------
// HANDLE APPOINTMENT FORM (PUBLIC PAGE)
// -----------------------------
if(appointmentForm){
  appointmentForm.addEventListener("submit", function(e){
    e.preventDefault();

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const newAppointment = {
      name: appointmentForm["name"].value,
      email: appointmentForm["email"].value,
      phone: appointmentForm["phone"].value,
      date: appointmentForm["date"].value,
      time: appointmentForm["startTime"].value, // <-- combine start and end
      location: appointmentForm["location"].value,
      bloodType: appointmentForm["bloodType"].value
    };
    

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");
    appointmentForm.reset();
  });
}

// -----------------------------
// INITIALIZE DASHBOARD
// -----------------------------
renderEvents();
renderAppointments();

// -----------------------------
// PROTECT DASHBOARD PAGE
// -----------------------------
if(localStorage.getItem("loggedIn") !== "true"){
  alert("You must log in first!");
  window.location.href = "organizer-login.html";
}

// -----------------------------
// LOGOUT FUNCTION
// -----------------------------
function logout(){
  localStorage.removeItem("loggedIn");
  window.location.href = "organizer-login.html";
}
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
