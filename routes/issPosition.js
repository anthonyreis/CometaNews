const axios = require('axios')
const { issPositionKey } = require('../utils/apiKey')

const url = 'https://api.wheretheiss.at/v1/satellites/25544'

const mapIss = (lat, lon, callback) => {
    const headers = {'responseType': 'stream'}
    const urlMap = `https://www.mapquestapi.com/staticmap/v5/map?key=${issPositionKey}&shape=radius:10km|${lat},${lon}&format=jpg&zoom=8&size=800,800&scalebar=true`

    axios.get(urlMap, headers).then( (response) => {
        callback(undefined, response.data)
    }).catch(error => {
        callback(error, undefined)
    })
}

const issPosition = (callback) => {
    axios.get(url).then((response) => {
        mapIss(response.data.latitude, response.data.longitude, callback)
    }).catch((error) => {
        callback(error, undefined)
    })
}

module.exports = issPosition