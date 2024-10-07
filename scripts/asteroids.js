const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

function loadNearEarthObjects() {
    const neoAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-03&api_key=tLchwqkGNgTVfHC32f3VEEDuOlrJldtirfZA9bfP`;

    fetch(neoAPI)
        .then(response => response.json())
        .then(data => {
            const nearEarthObjects = data.near_earth_objects;

            Object.keys(nearEarthObjects).forEach(date => {
                nearEarthObjects[date].forEach(neo => {
                    const neoCard = document.createElement('div');
                    neoCard.classList.add('neo-card');
                    neoCard.innerHTML = `
                        <h3>${neo.name}</h3>
                        <p>Approach Date: ${neo.close_approach_data[0].close_approach_date}</p>
                        <p>Estimated Diameter (miles): ${neo.estimated_diameter.miles.estimated_diameter_max.toFixed(2)}</p>
                        <p>Potentially Hazardous: ${neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                    `;
                    neo.is_potentially_hazardous_asteroid ? neoCard.style.backgroundColor = "#f94449" : neoCard.style.backgroundColor = "#abf7b1";
                    neo.is_potentially_hazardous_asteroid ? neoCard.style.color = "#ffff" : null;
                    document.getElementById('neoDashboard').appendChild(neoCard);
                });
            });
        })
        .catch(err => console.error(err));
}
loadNearEarthObjects();