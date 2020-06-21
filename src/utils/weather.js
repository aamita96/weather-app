const axios = require('axios').default;
const CONFIG = require('../../config/env');
const LANGUAGE = require('../../config/langconfig');

const weatherForecast = (latitude, longitude, cb) => {
    const WEATHERBIT_URL =
        'https://api.weatherbit.io/v2.0/current?&lat=' + latitude + '&lon=' + longitude + `&key=${CONFIG.WEATHERBIT_KEY}&lang=${LANGUAGE.en}`;

    axios.get(WEATHERBIT_URL).then(({ data }) => {
        const tempData = data.data[0];

        cb(undefined, 'It is currently ' + tempData.temp + ' degree celcius. There is ' + tempData.precip + ' % chance of rain.');
    }).catch(err => {
        if (err.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            cb({ status: err.response.status, error: err.response.data.error }, undefined);
        } else if (err.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            cb({ error: 'Unable to connect to Weather.io service.' }, undefined);
        } else {
            // Something happened in setting up the request and triggered an Error
            cb({ error: err.message }, undefined);
        }
    });
}

module.exports = weatherForecast;