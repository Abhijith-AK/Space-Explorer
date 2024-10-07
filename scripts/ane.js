const apikey = 'tLchwqkGNgTVfHC32f3VEEDuOlrJldtirfZA9bfP';

const API = `https://api.nasa.gov/planetary/apod?api_key=${apikey}`;

let imgCont = document.getElementById('image');
let infoCont = document.getElementById('info');
let date = document.getElementById('date');
let title = document.getElementById('title');


fetch(API).then(response => response.json()).then(data => {
    console.log(data);

    const img = document.createElement('img');
    img.src = data.hdurl;
    img.width = 1000;
    img.classList.add('image');
    imgCont.appendChild(img)
    infoCont.textContent = data.explanation;
    date.textContent = `(${data.date})`    
    title.textContent = data.title;
})