const request = require('request');

const geocodeAddress = address => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB23C1b5amqRnI0TV0rROZg6hXts0__87o&address=${encodedAddress}`,
            json: true
            }, (error, response, body) => {
            if(error) {
                reject('Unable to connect Google servers');
            } else if( body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else {
                resolve( {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
            
        });
    });
};

geocodeAddress('Aktobe').then(location => {
    console.log(JSON.stringify(location, undefined, 2));
}, errorMessage => {
    console.log(errorMessage);
})