// ================== Main Elements ===================
const plantsList = document.getElementById('plantsList');
const plantDetails = document.getElementById('plantDetails');
const userSelect = document.getElementById('userSelect');
const plantSearch = document.getElementById('plantSearch');
const reminderSummary = document.getElementById('reminderSummary');
const totalRemindersEl = document.getElementById('totalReminders');
const upcomingReminders = document.getElementById('upcomingReminders');

// Elements for plant details
const plantName = document.getElementById('plantName');
const plantType = document.getElementById('plantType');
const seasonalGrowth = document.getElementById('seasonalGrowth');
const soilRequirements = document.getElementById('soilRequirements');
const fertilizerInfo = document.getElementById('fertilizerInfo');
const companionPlanting = document.getElementById('companionPlanting');
const pestsAndDiseases = document.getElementById('pestsAndDiseases');
const plantImage = document.getElementById('plantImage');

let allPlants = [];

const plantImages = {
    "Tomato": "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    "Basil": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Basil-Basilico-Ocimum_basilicum-albahaca.jpg",
    "Rose": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Rose_Flower_Pink.jpg"
};

// ================== Fetch Plants ===================
fetch('http://localhost:8080/plants')
    .then(res => res.json())
    .then(plants => {
        allPlants = plants;
        renderPlants(allPlants);
    })
    .catch(err => console.error('Error fetching plants:', err));

// ================== Filter Plants ===================
plantSearch.addEventListener('input', () => {
    const term = plantSearch.value.toLowerCase();
    const filtered = allPlants.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
    );
    renderPlants(filtered);
});

function renderPlants(plants) {
    plantsList.innerHTML = '';
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        const image = plantImages[plant.name]
            ? `<img src="${plantImages[plant.name]}" style="width:100%; height:150px; object-fit:cover;" />`
            : '';
        card.innerHTML = `${image}<h3>${plant.name}</h3><p>Type: ${plant.type}</p>`;
        card.addEventListener('click', () => showPlantDetails(plant));
        plantsList.appendChild(card);
    });
}

// ================== User Dropdown ===================
function refreshUserDropdown() {
    userSelect.innerHTML = '<option value="">Select User</option>';
    fetch('http://localhost:8080/api/users')
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.username;
                userSelect.appendChild(option);
            });
        });
}
refreshUserDropdown();

// ================== Show Plant Details ===================
function showPlantDetails(plant) {
    plantDetails.classList.remove('hidden');
    plantName.textContent = plant.name;
    plantType.textContent = plant.type;
    seasonalGrowth.textContent = formatObj(plant.seasonalGrowth);
    soilRequirements.textContent = formatObj(plant.soilRequirements);
    fertilizerInfo.textContent = formatObj(plant.fertilizerInfo);
    companionPlanting.textContent = formatObj(plant.companionPlanting);
    pestsAndDiseases.textContent = formatObj(plant.pestsAndDiseases);

    if (plantImages[plant.name]) {
        plantImage.src = plantImages[plant.name];
        plantImage.classList.remove('hidden');
    } else {
        plantImage.classList.add('hidden');
    }

    const reminderForm = document.getElementById('reminderForm');
    reminderForm.onsubmit = function (e) {
        e.preventDefault();
        const userId = userSelect.value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;

        const reminder = {
            title: title,
            description: `${description} (Plant: ${plant.name})`,
            date: date
        };

        fetch(`http://localhost:8080/api/reminders/user/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reminder)
        })
            .then(res => {
                if (res.ok) {
                    alert('Reminder added successfully!');
                    reminderForm.reset();
                    fetchReminders();
                } else {
                    alert('Error adding reminder.');
                }
            })
            .catch(err => console.error('Error posting reminder:', err));
    };
}

function formatObj(obj) {
    if (!obj) return 'N/A';
    return Object.entries(obj).map(([key, val]) => `${key}: ${val}`).join(', ');
}

// ================== Crop Suggestion ===================
const suggestForm = document.getElementById('suggestForm');
const suggestionsResult = document.getElementById('suggestionsResult');

suggestForm.onsubmit = function (e) {
    e.preventDefault();
    const soil = document.getElementById('soilType').value;
    const season = document.getElementById('season').value;

    const suggestions = allPlants.filter(plant => {
        const soilMatch = plant.soilRequirements?.type?.toLowerCase() === soil.toLowerCase();
        const seasonMatch = plant.seasonalGrowth?.bestSeason?.toLowerCase() === season.toLowerCase();
        return soilMatch && seasonMatch;
    });

    if (suggestions.length > 0) {
        suggestionsResult.innerHTML = '<h4>Recommended Crops:</h4><ul>' +
            suggestions.map(p => `<li>${p.name}</li>`).join('') + '</ul>';
    } else {
        suggestionsResult.innerHTML = '<p>No suggestions found for this combination.</p>';
    }
};

// ================== Reminder Summary ===================
function fetchReminders() {
    fetch('http://localhost:8080/api/reminders')
        .then(res => res.json())
        .then(reminders => {
            totalRemindersEl.textContent = `You have ${reminders.length} reminders.`;
            const sorted = reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
            upcomingReminders.innerHTML = sorted.slice(0, 3)
                .map(r => `<li>${r.title} - ${new Date(r.date).toLocaleString()}</li>`).join('');
        });
}
fetchReminders();

// ================== Create User ===================
const userForm = document.getElementById('userForm');
const userCreateMessage = document.getElementById('userCreateMessage');

userForm.onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;

    const newUser = { username: username, email: email };

    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            if (res.ok) {
                userCreateMessage.textContent = '✅ User created successfully!';
                userForm.reset();
                refreshUserDropdown();
            } else {
                userCreateMessage.textContent = '⚠️ Failed to create user.';
            }
        })
        .catch(err => {
            console.error('Error creating user:', err);
            userCreateMessage.textContent = '❌ Error occurred.';
        });
};

// ================== Navigation ===================
const navHome = document.getElementById('navHome');
const navPlants = document.getElementById('navPlants');
const navSuggest = document.getElementById('navSuggest');
const navReminders = document.getElementById('navReminders');

const sections = [
    document.getElementById('searchSection'),
    document.getElementById('plants'),
    document.getElementById('suggestion'),
    document.getElementById('plantDetails'),
    document.getElementById('reminderSummary'),
    document.getElementById('createUser'),
    document.getElementById('soilDetail'),
    document.getElementById('weatherDetail'),
    document.getElementById('pestDetail')
];

function hideAllSections() {
    sections.forEach(sec => {
        if (sec) sec.classList.add('hidden');
    });
}

navHome.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
});

navPlants.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    document.getElementById('searchSection').classList.remove('hidden');
    document.getElementById('plants').classList.remove('hidden');
});

navSuggest.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    document.getElementById('suggestion').classList.remove('hidden');
});

navReminders.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    document.getElementById('reminderSummary').classList.remove('hidden');
    document.getElementById('createUser').classList.remove('hidden');
});

// Initially hide all sections on page load
hideAllSections();

// ================== Show Weather Detail & Fetch Live Weather ===================
function showWeatherDetail() {
    document.getElementById('weatherDetail').classList.remove('hidden');
    fetchWeatherInDetail();
}

function fetchWeatherInDetail() {
    const liveWeather = document.getElementById('liveWeather');
    const apiKey = '360f5c141e96efcd813db25cc14572f7';  // <-- replace with your actual OpenWeatherMap API key

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.main) {
                        const city = data.name;
                        const temp = data.main.temp;
                        const condition = data.weather[0].description;
                        const humidity = data.main.humidity;
                        const wind = data.wind.speed;
                        liveWeather.textContent = `Location: ${city}, Temp: ${temp}°C, ${condition}, Humidity: ${humidity}%, Wind: ${wind} m/s`;
                    } else {
                        liveWeather.textContent = 'Unable to retrieve weather data. Please try again later.';
                    }
                })
                .catch(err => {
                    console.error('Weather fetch error:', err);
                    liveWeather.textContent = 'Weather data unavailable at the moment.';
                });
        }, () => {
            liveWeather.textContent = 'Geolocation permission denied.';
        });
    } else {
        liveWeather.textContent = 'Geolocation is not supported by this browser.';
    }
}