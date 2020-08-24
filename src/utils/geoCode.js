const request = require('postman-request')
/** 
 * here geocode recives the adress which is the name of the city that we're looking for, that will be put into the URL
 * so we get back the body with all the information we need, in this case: Longitude, Latitude and Location.
 * We also receive te callback from the request module, which in the best case scenario will be an object with the data we need,
 * in case the location doesn't exist or the location data provider is unreachable, it will send a string with an error
*/
const geoCode = (address, callback) => { 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXJvamFzZSIsImEiOiJja2UxZWRmM3UwZDl1MnFydWx5ZWY2cnQ4In0.vYzy_ajxKN69WTb2ukxkkA&limit=1'
    request({ url, json: true }, (error, { body }) => { // here the request module takes an options object with the url and json:true is to parse json into an object
        if (error) {                                    // the function we're going to perform after taking the url and parsing the json takes error and and response(decosntructed)
            callback('Unable to connect to location services', undefined) // send this string to callback if the response is an error instead of a response/body 
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined) // send this string to callback if the body of the url shows the attribute "error"
        } else {
            callback(undefined, { //send this object if there are no errors, this information will feed the weather function vbia the callback
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geoCode