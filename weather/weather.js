const request = require('request');
let apiKey = 'd2ef74fe70755e3ed04791794c38fff0';

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: convertF2C(body.currently.temperature),
                apparentTemperature: convertF2C(body.currently.apparentTemperature),
                summary: body.currently.summary,
                humidity: body.currently.humidity * 100,
                pressure: body.currently.pressure,
                visibility: body.currently.visibility
            });
        } else if(response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else {
            callback('Unable to connect to Forecast.io servers');
        }
    });
};



const convertF2C = (temperature) => {
    return Number(((temperature - 32) * 5/9).toPrecision(3));
};

module.exports.getWeather = getWeather;