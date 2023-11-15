const request = require("postman-request")

const getMapBoxDetails = (address, callback) => {
    const mapboxKey = "pk.eyJ1IjoiZGFnYXdpIiwiYSI6ImNsbmphczh4dzF5eWsyeHJsd3g5cGk3OXAifQ.-CBXpw9uwpyQRwP1ihOAmQ"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxKey}&limit=1`
    request ({
        url,
        json: true,
    }, (error, { body }) => {
        const formattedResponse = {}
        let errorMessage = "";
        if(error){
            errorMessage =  "Error - unable to connect";
        } else if(body.message){
            errorMessage = "Error - invalid query parameters"
        } else {
            const { features } = body
            if(features.length === 0){
               errorMessage = "Couldn't find details - try searching again"
            } else {
               formattedResponse.latitude = features[0].center[1]
               formattedResponse.longitude = features[0].center[0]
               formattedResponse.coords = features[0].center.join(", ")
               formattedResponse.location = features[0].place_name
            }
        }
        callback(errorMessage, formattedResponse)
    })
}

module.exports = {
    geolocation: getMapBoxDetails
}