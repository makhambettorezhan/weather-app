const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB23C1b5amqRnI0TV0rROZg6hXts0__87o&address=3110%20lombard%20street%20Philadelphia',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});