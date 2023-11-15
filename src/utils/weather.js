const request = require("postman-request")

const getWeather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6e61ee8ab17a4f2fda3b4723437e1ec4&query=${latitude},${longitude}&units=m`
    request({
        url,
        json: true,
     }, (e, {body}) => {
        if(e) {
            callback("Unable to connect - please check your connection", undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body)
        }
     })
}

module.exports = {
    forecast: getWeather
}