const request = require('postman-request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5da2234dc9b740cd506e601783525cdf&query='+ latitude +',' + longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to weather api",undefined)
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports={
    forecast:forecast
}