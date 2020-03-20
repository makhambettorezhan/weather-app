const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results.address));

    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}C. It feels like ${weatherResults.apparentTemperature}C.`);
      }
    });    
  }
});


