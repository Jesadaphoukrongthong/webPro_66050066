// app.js

console.log("JavaScript loaded");

// Initial Mock Data Structure
const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];


let events = JSON.parse(localStorage.getItem("events"));

if (events === null) {
    events = initialEvents;
}



//Code Na Ja

const form = document.getElementById("searchForm");

form.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    const titleInput = document.getElementById("title");

    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
        categorySelect.addEventListener("change", function() {
            searchFilterSort();
        });
    const dateInput = document.getElementById("date");
        dateInput.addEventListener("change", function() {
            searchFilterSort();
        });

    // Clean search text
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;
    const selectedDate = dateInput.value;

    const eventsSearch = {
        search: searchValue,
        category: selectedCategory,
        date: selectedDate
    };

    localStorage.setItem(
        "eventsSearch",
        JSON.stringify(eventsSearch)
    );

    console.log("Search data saved:", eventsSearch);

        const filteredEvents = events.filter(function(item) {

        const matchSearch =
            item.title.toLowerCase().includes(searchValue);

        const matchCategory =
            selectedCategory === "all" ||
            item.category === selectedCategory;

        const matchDate =
            selectedDate === "" ||
            item.date === selectedDate;

        return matchSearch && matchCategory && matchDate;
    });

    console.log("Search result:", filteredEvents);

    showEvents(filteredEvents);

});

form.addEventListener("reset", function(event) {
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const dateInput = document.getElementById("date");
    searchInput.value = "";
    categorySelect.value = "all";
    dateInput.value = "";

    localStorage.removeItem("eventsSearch");
});

//Event List Rendering
function showEvents(eventData) {

    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    if (eventData.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
        return;
    }

    eventData.forEach(function(item) {

        let buttonText = "Register";
        let buttonDisabled = "";

        if (item.isRegistered === true) {
            buttonText = "Registered";
            buttonDisabled = "disabled";
        }

        if (item.seats <= 0) {
            buttonText = "Full";
            buttonDisabled = "disabled";
        }


        eventList.innerHTML += `
            <div class="eventcard">

                <h3>${item.title}</h3>

                Category: ${item.category}<br>
                Speaker: ${item.speaker}<br>
                Date: ${item.date}<br>
                Seats: ${item.seats}<br>
                Description: ${item.description}<br>

                <button
                    onclick="registerEvent(${item.id})"
                    ${buttonDisabled}
                >
                    ${buttonText}
                </button>

            </div>

            <br>
        `;
    });
}


//themeing
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");
});

//fillter show
function searchFilterSort() {

    const searchValue =
        document.getElementById("search").value
        .trim()
        .toLowerCase();

    const selectedCategory =
        document.getElementById("category").value;

    const selectedDate =
        document.getElementById("date").value;

    const sortValue =
        document.getElementById("sort").value;


    // SEARCH + FILTER
    let filteredEvents = events.filter(function(item) {

        const matchSearch =
            item.title.toLowerCase().includes(searchValue) ||
            item.speaker.toLowerCase().includes(searchValue);

        const matchCategory =
            selectedCategory === "all" ||
            item.category === selectedCategory;

        const matchDate =
            selectedDate === "" ||
            item.date === selectedDate;

        return matchSearch && matchCategory && matchDate;
    });


    // SORT
    if (sortValue === "date") {

        filteredEvents.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });

    }

    if (sortValue === "seats") {

        filteredEvents.sort(function(a, b) {
            return b.seats - a.seats;
        });

    }


    showEvents(filteredEvents);
}

// Add Event Form Handling

const eventForm = document.getElementById("eventForm");


eventForm.addEventListener("submit", function(event) {

    event.preventDefault();
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const speakerInput = document.getElementById("speaker");
    const dateInput = document.getElementById("date");
    const seatsInput = document.getElementById("seats");
    const descriptionInput = document.getElementById("description");

    const newEvent = {
        id: initialEvents.length + 1,
        title: titleInput.value.trim(),
        category: categoryInput.value,
        speaker: speakerInput.value.trim(),
        date: dateInput.value,
        seats: parseInt(seatsInput.value),
        description: descriptionInput.value.trim(),
        isRegistered: false
    };

    events.push(newEvent);

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    console.log("New event added:", newEvent);
    console.log("All events:", events);

    eventForm.reset();
});

function registerEvent(id) {

    const eventItem = events.find(function(item) {
        return item.id === id;
    });


    if (eventItem === undefined) {
        return;
    }


    if (eventItem.seats <= 0) {
        return;
    }


    if (eventItem.isRegistered === true) {
        return;
    }


    // decrease seat
    eventItem.seats = eventItem.seats - 1;

    // registered
    eventItem.isRegistered = true;


    // save
    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    // show again
    searchFilterSort();
}