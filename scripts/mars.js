const apiKey = 'tLchwqkGNgTVfHC32f3VEEDuOlrJldtirfZA9bfP'

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

let weather = document.getElementById('weather');
let gallery = document.getElementById('gallery');
let options = document.getElementsByClassName('options');

const weatherAPI = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

const rovers = {
    curiosity: 'curiosity',
    perseverance: 'perseverance'
};

let selectedRovers = ['curiosity', 'perseverance'];

fetch(weatherAPI).then(response => response.json()).then(data => {
    // console.log(data);

    const sol = data.sol_keys[data.sol_keys.length - 1];

    let weatherData = data[sol];

    weather.innerHTML = `
      <h2>WEATHER ON MARS (Sol ${sol})</h2>
      <dl>
        <dt><u>TEMPERATURE</u></dt>
            <dd>Average temperature: ${weatherData.AT.av}°C</dd>
            <dd>Maximum temperature: ${weatherData.AT.mx}°C</dd>
            <dd>Minimum temperature: ${weatherData.AT.mn}°C</dd>
        <dt><u>WIND SPEED</u></dt>
            <dd>Average speed: ${weatherData.HWS.av} m/s</dd> 
            <dd>Maximum speed: ${weatherData.HWS.mx} m/s</dd> 
            <dd>Minimum speed: ${weatherData.HWS.mn} m/s</dd> 
        <dt><u>PRESSURE</u></dt>
            <dd>Average pressure: ${weatherData.PRE.av} Pa</dd>
            <dd>Maximum pressure: ${weatherData.PRE.mx} Pa</dd>
            <dd>Minimum pressure: ${weatherData.PRE.mn} Pa</dd>
      </dl>
    `
}).catch(error => console.error(error))

function addSelections(value) {
    if (value == rovers[value] && !selectedRovers.includes(value)) {
        selectedRovers.push(value)
        document.getElementById(value).classList.toggle('clicked');
        imageLoader();
    } else {
        selectedRovers = selectedRovers.filter(item => item !== value);
        document.getElementById(value).classList.toggle('clicked');
        imageLoader();
    }
    console.log(selectedRovers);
    if (selectedRovers.length == 0) gallery.innerHTML = 'Please select a rover'
};

function imageLoader() {
    // Clear the gallery and show a loading message
    gallery.innerHTML = 'Loading .....';
    
    // Loop through the selected rovers
    let imagesLoaded = 0;
    const totalRovers = selectedRovers.length;

    selectedRovers.forEach(rover => {
        const roverAPI = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${apiKey}`;
        fetch(roverAPI)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if (imagesLoaded === 0) {
                    gallery.innerHTML = '';  // Clear loading text only after the first API call returns
                }
                data.photos.slice(0, 20).forEach(photo => {
                    const img = document.createElement('img');
                    img.src = photo.img_src;
                    img.alt = `Image from ${rover}`;
                    img.classList.add('roverImg');
                    img.width = 400;
                    img.height = 450;
                    gallery.appendChild(img);
                });
                imagesLoaded++;
            })
            .catch(error => {
                console.error(error);
                imagesLoaded++;
                if (imagesLoaded === totalRovers && gallery.innerHTML === 'Loading .....') {
                    gallery.innerHTML = 'No images found for the selected rover(s).';
                }
            });
    });
}


imageLoader();