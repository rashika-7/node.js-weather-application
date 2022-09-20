
const request = require('request');
const forecast=( latitude, longitude, callback) =>{
    const url ="http://api.weatherstack.com/current?access_key=ccf39ce4f8e47ab78375cbee6077c7d3&query=" + latitude +"," + longitude
    request({url, json: true}, (error, { body}) =>{
        //const data = JSON.parse(response.body)
       // console.log(response.body.current);
       if(error)
       {
        callback("Unable to connect to weather service!", undefined);
       }
       else if (body.error)
       {
        callback('Unable to find location!', undefined)
       }
       else
       {
        callback(undefined, body.current.weather_descriptions[0] + " it is " + body.current.temperature + " degrees out. "+" it feels like " + body.current.feelslike  + " degrees out! "+ "Humidity is " + body.current.humidity + "%");
        
        
       }
    })
}
module.exports = forecast
