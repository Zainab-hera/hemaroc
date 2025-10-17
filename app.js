// -----------------------------
// DONATIONS PAGE
// -----------------------------
const eventsContainer = document.getElementById("eventsContainer");

function renderDonationEvents() {
  if(!eventsContainer) return;

  const donationEvents = JSON.parse(localStorage.getItem("events")) || [];
  eventsContainer.innerHTML = "";

  if(donationEvents.length === 0){
    eventsContainer.innerHTML = "<p>No donation events available yet.</p>";
    return;
  }

  donationEvents.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${event.location}</h4>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Start Time:</strong> ${event.time}</p>
      <p><strong>End Time:</strong> ${event.time2}</p>
    `;
    eventsContainer.appendChild(card);
  });
}

// Render events on page load
renderDonationEvents();

// -----------------------------
// APPOINTMENT BOOKING
// -----------------------------
const appointmentForm = document.getElementById("appointmentForm");
if(appointmentForm){
  appointmentForm.addEventListener("submit", function(e){
    e.preventDefault();

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const newAppointment = {
      name: appointmentForm["name"].value,
      email: appointmentForm["email"].value,
      phone: appointmentForm["phone"].value,
      date: appointmentForm["date"].value,
      time: appointmentForm["time"].value, // NEW
      location: appointmentForm["location"].value,
      bloodType: appointmentForm["bloodType"].value
    };
    

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");
    appointmentForm.reset();
  });
}
