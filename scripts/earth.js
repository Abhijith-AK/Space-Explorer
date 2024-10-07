const apiKey = 'tLchwqkGNgTVfHC32f3VEEDuOlrJldtirfZA9bfP';
const gallery = document.getElementById('image-gallery');
const eventDashboard = document.getElementById('event-dashboard');

// Function to Load Satellite Images
async function  loadSatelliteImages() {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    let latitude;
    let longitude;
    const location = await fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
             latitude = data.latitude;
             longitude = data.longitude;
             const loc = `${data.city}, ${data.region}`
             document.getElementById('loc').textContent = loc
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        })
        .catch(error => console.error('Error fetching geolocation:', error));


    const earthAPI = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${formattedDate}&dim=0.1&api_key=${apiKey}`;

    fetch(earthAPI)
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = 'Satellite Image';
                gallery.appendChild(img);
            } else {
                console.error("No image found for the specified parameters.");
            }
        })
        .catch(err => console.error("Error fetching data:", err));
}

// Function to Load Natural Events from EONET API
function loadNaturalEvents() {
    const eonetAPI = `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=12`;
    const eventDashboard = document.getElementById('event-dashboard'); // Ensure this is defined in your HTML

    // Clear previous entries before loading new ones
    eventDashboard.innerHTML = 'Loading...';

    fetch(eonetAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            eventDashboard.innerHTML = ''; // Clear loading text

            // If no events found
            if (!data.events.length) {
                eventDashboard.innerHTML = '<p>No current natural events found.</p>';
                return;
            }

            // Display events
            data.events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');

                // Check if geometries and date exist
                const geometry = event.geometries;
                const startDate = geometry ? new Date(geometry.date).toLocaleDateString() : 'Date not available';

                eventCard.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>Category: ${event.categories[0].title}</p>
                    <p>Start Date: ${event.geometry[0].date}</p>
                `;
                eventDashboard.appendChild(eventCard);
                const source = document.createElement('a');
                source.textContent = 'Source Download'
                source.href = `${event.sources[0].url}`
                source.classList.add('source');
                eventCard.appendChild(source);
            });
        })
        .catch(err => {
            console.error(err);
            eventDashboard.innerHTML = `<p>Failed to load natural events: ${err.message}</p>`;
        });
}

// Call the function to load events
loadNaturalEvents();


// Load images and events when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSatelliteImages();
    loadNaturalEvents();
});
