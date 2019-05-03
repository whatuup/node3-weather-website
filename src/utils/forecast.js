const request = require('request')

const forecast = (longitutde, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6d6caa1c507be175f1782bd7bf545d8a/' + latitude + ',' + longitutde

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
            body.daily.data[0].summary + " It is currently "+ body.currently.apparentTemperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain."
            + "The Highest temperature is " + body.daily.data[0].temperatureHigh + " degree and the lowest is " + body.daily.data[0].temperatureLow + ".")
        }
    })
}

module.exports = forecast