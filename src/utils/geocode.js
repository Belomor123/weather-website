const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmVsb21vcjEyMyIsImEiOiJjazlraDgycnQwMmE5M2htbDdwdmRldGtvIn0.hLM2wr3SXBIOEJtiERlvMA&limit=1'
  request ({url, json:true}, (error={}, {body=undefined}) => {
    if (error) {
      callback(error, body)
    } else if (!body.features[0]){
      error = {
        error: 'Unable to get location data, try a different search'
      }
      callback(error, body)
    } else {
      callback(error, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

//Non destructured code
// const geocode = (address, callback) => {
//   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmVsb21vcjEyMyIsImEiOiJjazlraDgycnQwMmE5M2htbDdwdmRldGtvIn0.hLM2wr3SXBIOEJtiERlvMA&limit=1'
//   request ({url: url, json:true}, (error, response) => {
//     if (error) {
//       callback('Unable to connect to location services!', undefined)
//     } else if (!response.body.features[0]){
//       callback('Unable to get location data! Try different search', undefined)
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name
//       })
//     }
//   })
// }

module.exports = geocode