// admin.js

console.log("Admin JavaScript loaded");


//themeing
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

}

// =========================
// LOAD EVENTS
// =========================

let events = JSON.parse(localStorage.getItem("events"));

if (events === null) {
    events = [];
}



// =========================
// GET FORM ELEMENTS
// =========================

const eventForm = document.getElementById("eventForm");

const titleInput =
    document.getElementById("title");

const categoryInput =
    document.getElementById("eventCategory");

const speakerInput =
    document.getElementById("speaker");

const dateInput =
    document.getElementById("eventDate");

const timeInput =
    document.getElementById("eventtime");

const seatsInput =
    document.getElementById("seats");

const descriptionInput =
    document.getElementById("description");

const formMessage =
    document.getElementById("formMessage");



// =========================
// TODAY DATE
// =========================

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
)
.toISOString()
.split("T")[0];


// Cannot select past date
dateInput.min = localToday;



// =========================
// ADD EVENT
// =========================

eventForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // =========================
    // GET + CLEAN DATA
    // =========================

    const title =
        titleInput.value.trim();

    const category =
        categoryInput.value;

    const speaker =
        speakerInput.value.trim();

    const date =
        dateInput.value;

    const time =
        timeInput.value;

    const seats =
        Number(seatsInput.value);

    const description =
        descriptionInput.value.trim();


    // Clear old message
    formMessage.textContent = "";



    // =========================
    // VALIDATION - TITLE
    // =========================

    if (title === "") {

        formMessage.textContent =
            "Please enter an event name.";

        return;
    }


    if (title.length < 3) {

        formMessage.textContent =
            "Event name must contain at least 3 characters.";

        return;
    }


    if (title.length > 100) {

        formMessage.textContent =
            "Event name cannot exceed 100 characters.";

        return;
    }



    // =========================
    // VALIDATION - CATEGORY
    // =========================

    const allowedCategories = [
        "Tech",
        "Design",
        "Business",
        "General"
    ];


    if (!allowedCategories.includes(category)) {

        formMessage.textContent =
            "Invalid event category.";

        return;
    }



    // =========================
    // VALIDATION - SPEAKER
    // =========================

    if (speaker === "") {

        formMessage.textContent =
            "Please enter an event organizer.";

        return;
    }


    if (speaker.length < 2) {

        formMessage.textContent =
            "Organizer name must contain at least 2 characters.";

        return;
    }


    if (speaker.length > 80) {

        formMessage.textContent =
            "Organizer name cannot exceed 80 characters.";

        return;
    }



    // =========================
    // VALIDATION - DATE
    // =========================

    if (date === "") {

        formMessage.textContent =
            "Please select an event date.";

        return;
    }


    if (date < localToday) {

        formMessage.textContent =
            "Event date cannot be in the past.";

        return;
    }



    // =========================
    // VALIDATION - SEATS
    // =========================

    if (seatsInput.value === "") {

        formMessage.textContent =
            "Please enter event capacity.";

        return;
    }


    if (!Number.isInteger(seats)) {

        formMessage.textContent =
            "Event capacity must be a whole number.";

        return;
    }


    if (seats < 1) {

        formMessage.textContent =
            "Event capacity must be at least 1.";

        return;
    }


    if (seats > 1000) {

        formMessage.textContent =
            "Event capacity cannot exceed 1000.";

        return;
    }



    // =========================
    // VALIDATION - DESCRIPTION
    // =========================

    if (description.length > 300) {

        formMessage.textContent =
            "Event description cannot exceed 300 characters.";

        return;
    }



    // =========================
    // CHECK DUPLICATE EVENT
    // =========================

    const duplicateEvent = events.some(function(item) {

        return (
            item.title.toLowerCase() ===
                title.toLowerCase()
            &&
            item.date === date
        );

    });


    if (duplicateEvent === true) {

        formMessage.textContent =
            "An event with the same name and date already exists.";

        return;
    }



    // =========================
    // CREATE NEW EVENT
    // =========================

    const newEvent = {

        id: Date.now(),

        title: title,

        category: category,

        speaker: speaker,

        date: date,

        time: time,

        seats: seats,

        description: description,

        isRegistered: false

    };



    // =========================
    // ADD EVENT
    // =========================

    events.push(newEvent);



    // =========================
    // SAVE TO LOCAL STORAGE
    // =========================

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    console.log("New event added:", newEvent);

    console.log("All events:", events);



    // =========================
    // SUCCESS MESSAGE
    // =========================

    formMessage.textContent =
        "Event added successfully.";



    // Clear form
    eventForm.reset();


    // Put minimum date back
    dateInput.min = localToday;


    // Update statistics
    updateStatistics();

});



// =========================
// STATISTICS
// =========================

function updateStatistics() {


    // =========================
    // TOTAL EVENTS
    // =========================

    const totalEvents =
        events.length;



    // =========================
    // TOTAL SEATS
    // =========================

    let totalSeats = 0;


    events.forEach(function(item) {

        totalSeats =
            totalSeats + item.seats;

    });



    // =========================
    // AVAILABLE EVENTS
    // =========================

    const availableEvents =
        events.filter(function(item) {

            return item.seats > 0;

        }).length;



    // =========================
    // FULL EVENTS
    // =========================

    const fullEvents =
        events.filter(function(item) {

            return item.seats <= 0;

        }).length;



    // =========================
    // REGISTERED EVENTS
    // =========================

    const registeredEvents =
        events.filter(function(item) {

            return item.isRegistered === true;

        }).length;



    // =========================
    // CATEGORY COUNTS
    // =========================

    const techEvents =
        events.filter(function(item) {

            return item.category === "Tech";

        }).length;


    const designEvents =
        events.filter(function(item) {

            return item.category === "Design";

        }).length;


    const businessEvents =
        events.filter(function(item) {

            return item.category === "Business";

        }).length;


    const generalEvents =
        events.filter(function(item) {

            return item.category === "General";

        }).length;



    // =========================
    // NEXT EVENT
    // =========================

    let nextEvent = "-";


    const upcomingEvents =
        events
        .filter(function(item) {

            return item.date >= localToday;

        })
        .sort(function(a, b) {

            return new Date(a.date) -
                   new Date(b.date);

        });


    if (upcomingEvents.length > 0) {

        nextEvent =
            upcomingEvents[0].title;

    }



    // =========================
    // SHOW MAIN STATISTICS
    // =========================

    document.getElementById("totalEvents").textContent =
        totalEvents;


    document.getElementById("availableEvents").textContent =
        availableEvents;


    document.getElementById("fullEvents").textContent =
        fullEvents;


    document.getElementById("totalSeats").textContent =
        totalSeats;


    document.getElementById("registeredEvents").textContent =
        registeredEvents;


    document.getElementById("nextEvent").textContent =
        nextEvent;



    // =========================
    // SHOW CATEGORY COUNTS
    // =========================

    document.getElementById("techEvents").textContent =
        techEvents;


    document.getElementById("designEvents").textContent =
        designEvents;


    document.getElementById("businessEvents").textContent =
        businessEvents;


    document.getElementById("generalEvents").textContent =
        generalEvents;



    // =========================
    // CATEGORY BAR
    // =========================

    let techPercent = 0;
    let designPercent = 0;
    let businessPercent = 0;
    let generalPercent = 0;


    if (totalEvents > 0) {

        techPercent =
            (techEvents / totalEvents) * 100;

        designPercent =
            (designEvents / totalEvents) * 100;

        businessPercent =
            (businessEvents / totalEvents) * 100;

        generalPercent =
            (generalEvents / totalEvents) * 100;

    }

    


    document.getElementById("techBar").style.width =
        techPercent + "%";


    document.getElementById("designBar").style.width =
        designPercent + "%";


    document.getElementById("businessBar").style.width =
        businessPercent + "%";


    document.getElementById("generalBar").style.width =
        generalPercent + "%";

}

function showEventSeatDetails() {

    const eventSeatBody =
        document.getElementById("eventSeatBody");


    eventSeatBody.innerHTML = "";


    events.forEach(function(item) {


        let status = "Available";


        if (item.seats <= 0) {

            status = "Full";

        }


        eventSeatBody.innerHTML += `

            <tr>

                <td>${item.title}</td>

                <td>${item.category}</td>

                <td>${item.date}</td>

                <td>${item.seats}</td>

                <td>${status}</td>

            </tr>

        `;

    });

}



// =========================
// FIRST PAGE LOAD
// =========================

updateStatistics();

showEventSeatDetails();