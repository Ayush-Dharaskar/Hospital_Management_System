// script.js

document.addEventListener('DOMContentLoaded', async function () {
    const appointmentCardsContainer = document.querySelector('.appointment-cards');

    // Fetch appointment requests from the server
    const appointmentRequests = await fetchAppointmentRequests(); // Implement this function to fetch data from your server

    // Create appointment cards
    appointmentRequests.forEach(appointment => {
        const card = createAppointmentCard(appointment);
        appointmentCardsContainer.appendChild(card);
    });
});

function createAppointmentCard(appointment) {
    const card = document.createElement('div');
    card.classList.add('appointment-card');

    const patientName = document.createElement('p');
    patientName.textContent = `Patient: ${appointment.patientName}`;

    const doctorName = document.createElement('p');
    doctorName.textContent = `Doctor: ${appointment.doctorName}`;

    const appointmentDate = document.createElement('p');
    appointmentDate.textContent = `Date: ${appointment.date}`;

    const department = document.createElement('p');
    department.textContent = `Department: ${appointment.department}`;

    const statusDropdown = document.createElement('select');
    const options = ['Accepted', 'Rejected', 'Pending'];
    options.forEach(option => {
        const statusOption = document.createElement('option');
        statusOption.value = option.toLowerCase();
        statusOption.textContent = option;
        statusDropdown.appendChild(statusOption);
    });

    card.appendChild(patientName);
    card.appendChild(doctorName);
    card.appendChild(appointmentDate);
    card.appendChild(department);
    card.appendChild(statusDropdown);

    return card;
}
