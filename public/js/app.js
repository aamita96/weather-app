console.log('Client side javascript!');

function fetchWeather(location) {
    fetch('/weather?location=' + location).then((res) => {
        res.json().then(data => {
            if (data.error) {
                console.error(data.error);
                message.innerHTML = data.error;
            } else {
                enteredLocation.innerHTML = `Location: ${data.location}`;
                message.innerHTML = ` Forecast: ${data.forecastRes} `;
            }
        })
    }).catch(err => {
        console.error(err);
    });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const enteredLocation = document.querySelector('#location');
const message = document.querySelector('#message');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    enteredLocation.textContent = '';
    message.textContent = 'Loading....';
    
    const location = search.value;
    fetchWeather(location);
});