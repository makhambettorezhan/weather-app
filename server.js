const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page'
    });
});

app.post('/submit', (req, res) => {
    let address = req.body.address;
    let temperature;
    let actualTemperature;
    geocode.geocodeAddress(address, (errorMessage, results) => {
        if(errorMessage) {
          console.log(errorMessage);
        } else {
      
          weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) {
              console.log(errorMessage);
            } else {
                temperature = weatherResults.temperature;
                actualTemperature = weatherResults.apparentTemperature;
                res.render('submit.hbs', {
                    address,
                    temperature,
                    actualTemperature
                });
            }
          });    
        }
    });
    
});

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
app.listen(port, () => {
    console.log('Server is up for port ' + port);
});