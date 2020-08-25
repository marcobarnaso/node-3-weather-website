const request = require('postman-request')

const weather = (longitude, latitude, callback) => { // this function will receibe a long, lat and the callback with a string with the temperature and sky conditions
    // we pass long and lat to the url, we get them from geoCode function 
    const url = 'http://api.weatherstack.com/current?access_key=4a10059e068ddf4bcba41c5b28f678f1&query= ' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=m'
    // here we receive the object with the url and json options, the json true parses the response body into an object  
    //the function that we are going to execute after receiving the url will receive an error or a body, which we will deconstruct into the body
    request({ url, json: true }, (error, { body: { current: { temperature } }, body: { current: { weather_descriptions } }, body: { success }, body: {current: {weather_icons}} }) => {
        if (error) {
            callback('Cant reach weather app', undefined) //the callback function will return this string when the service cant be reached
        } else if (success === false) {
            callback(undefined, 'Cant find the requested location') //the callback function will return this string when the location entered isn't found
        } else {     
            callback(undefined, {
                temperature,
                weather_descriptions, 
                weather_icons
            }) //if everything works, the callback will return the string with the temperature and sky conditions    
        }
    })
}

module.exports = weather