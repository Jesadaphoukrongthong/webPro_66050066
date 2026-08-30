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


// Load Events from localStorage
let events = JSON.parse(localStorage.getItem("events"));

if (events === null) {

    events = initialEvents;

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );
}



//Code Na Ja

const form = document.getElementById("searchForm");

form.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const dateInput = document.getElementById("date");

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

    // Search + Filter + Sort
    searchFilterSort();

});



form.addEventListener("reset", function(event) {

    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const dateInput = document.getElementById("date");
    const sortSelect = document.getElementById("sort");

    searchInput.value = "";
    categorySelect.value = "all";
    dateInput.value = "";
    sortSelect.value = "none";

    localStorage.removeItem("eventsSearch");

    // Show all events again
    showEvents(events);
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
        `;
    });
}



//themeing
const themeToggle = document.getElementById("themeToggle");


// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

}


// Change theme
themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-theme");


    // Save theme
    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

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


    // SORT DATE
    if (sortValue === "date") {

        filteredEvents.sort(function(a, b) {

            return new Date(a.date) - new Date(b.date);

        });

    }


    // SORT SEATS
    if (sortValue === "seats") {

        filteredEvents.sort(function(a, b) {

            return b.seats - a.seats;

        });

    }


    showEvents(filteredEvents);
}



// Real-time Search
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function() {

    searchFilterSort();

});



// Category Filter
const categorySelect = document.getElementById("category");

categorySelect.addEventListener("change", function() {

    searchFilterSort();

});



// Date Filter
const dateInput = document.getElementById("date");

dateInput.addEventListener("change", function() {

    searchFilterSort();

});



// Sort
const sortSelect = document.getElementById("sort");

sortSelect.addEventListener("change", function() {

    searchFilterSort();

});







// Register Event
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


// Admin Login Popup

const openAdmin = document.getElementById("openAdmin");
const closeAdmin = document.getElementById("closeAdmin");
const adminModal = document.getElementById("adminModal");
const adminLoginButton = document.getElementById("adminLoginButton");

openAdmin.addEventListener("click", function() {

    adminModal.classList.add("show");

});


closeAdmin.addEventListener("click", function() {

    adminModal.classList.remove("show");

});


// No real login yet
adminLoginButton.addEventListener("click", function() {

    window.location.href = "admin.html";

});

// Click blank background = close popup
adminModal.addEventListener("click", function() {

    adminModal.classList.remove("show");

});




// Show Events when website first loads
showEvents(events);
adminModal.classList.remove("show");