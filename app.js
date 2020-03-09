const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

let key = 'd2ef74fe70755e3ed04791794c38fff0';
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
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});