const yargs = require('yargs');
const axios = require('axios');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const apiGeoKey = 'AIzaSyB23C1b5amqRnI0TV0rROZg6hXts0__87o';
const apiWeatherKey = 'd2ef74fe70755e3ed04791794c38fff0';

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Fetching the address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiGeoKey}&address=${encodedAddress}`;



axios.get(geocodeUrl).then(response => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    } else {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.darksky.net/forecast/${apiWeatherKey}/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }
}).then(response => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}C. It feels like ${apparentTemperature}C.`);
}).catch(error => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(error.message);
    }
});