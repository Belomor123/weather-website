const request = require('request')

const wxGet = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0952c030a1bfa4bbb98507c3f8efbfd4&query='+latitude+','+longitude+'&units=m'
  request ({url, json: true}, (error, {body=undefined}) => {
    if (error) {
      callback(error, body)
    } else if (body.error) {
      callback(body.error.info, body)
    } else {
      callback(error, {
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        weatherType: body.current.weather_descriptions[0]
      })
    }
  })
}

module.exports = wxGet