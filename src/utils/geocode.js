const request = require('request');
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFzaGk3IiwiYSI6ImNsNWZlMGdkaDBqbXAzam8zeXc2ZTZpY3YifQ.obNr40S0MLOvdpL5D_i9IA'
    request({url, json: true}, (error, { body }) =>{
        //const data = JSON.parse(response.body)
       // console.log(response.body.current);
       if(error)
       {
        callback("Unable to connect to weather service!", undefined);
       }
       else if(body.features.length==0)
       {
        callback("Unable to find location. Try another search!", undefined);
       }
       else{
        callback(undefined, {
            location:  body.features[0].place_name,
            longitude: body.features[0].center[0],
            latitude:  body.features[0].center[1]

            })
        }
    })

}
module.exports = geocode