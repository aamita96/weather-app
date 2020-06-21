const axios = require('axios').default;
const CONFIG = require('../../config/env');

const geocode = (address, cb) => {
    const GEOLOCATION_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${CONFIG.MAPBOX_KEY}&limit=1`;

    axios.get(GEOLOCATION_URL).then(({ data }) => {
        // instead of res.data we use destructuring.
        cb(undefined, {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
        });
    }).catch((err) => {
        if (err.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            cb({ code: err.response.status, error: err.response.statusText }, undefined);
        } else if (err.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            cb({ error: 'Unable to connect to MapBox Service!' }, undefined);
        } else {
            // Something happened in setting up the request and triggered an Error
            cb({ error: err.message }, undefined);
        }
    })
};

module.exports = geocode;