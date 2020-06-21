const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// Required Weather Modules to fetch weather data
const geocode = require('./utils/geocode');
const weatherForecast = require('./utils/weather');

// Path setup
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
        res.render('index', {
                title: 'Weather',
                author: 'Amit Khatri'
        })
});
app.get('/weather', (req, res) => {

        const { location } = req.query;
        // console.log(location);
        if (!location) {
                return res.send({
                        error: 'You must provide a location!',
                        author: 'Amit Khatri'
                });
        }

        geocode(location, (err, { latitude, longitude, location } = {}) => {
                if (err) {
                        return res.send(err);
                }

                weatherForecast(latitude, longitude, (err, forecastRes) => {
                        if (err) {
                                return res.send(err);
                        }
                        res.send({
                                title: 'Weather',
                                location,
                                latitude,
                                longitude,
                                forecastRes,
                                author: 'Amit Khatri'
                        });
                });
        });
});

app.get('/about', (req, res) => {
        res.render('about', {
                title: 'About',
                author: 'Amit Khatri'
        });
});

app.get('*', (req, res) => {
        res.render('404', {
                error: 'page does not found!',
                author: 'Amit Khatri'
        });
});

app.listen(3000, () => {
        console.log('Server is up and running!');
});