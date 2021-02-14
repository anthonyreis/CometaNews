const axios = require('axios')
const b64 = require('base-64')
const { moonPhaseKey } = require('../utils/apiKey')

const applicationId = moonPhaseKey.applicationId
const applicationSecret = moonPhaseKey.applicationSecret

const url = 'https://api.astronomyapi.com/api/v2/studio/moon-phase'
const hash = b64.encode(`${applicationId}:${applicationSecret}`)

const getMoon = (style = "default",latitude, longitude, date, callback) => {
   
    const headers = {
        headers: {
            'Authorization': `Basic ${hash}`,
            "Content-Type": "application/json"
        }
    }

    const postData = {
        "format": "png",
        "style": {
            "moonStyle": style,
            "backgroundStyle": "stars",
            "backgroundColor": "red",
            "headingColor": "white",
            "textColor": "red"
        },
        "observer": {
            "latitude": Number(latitude),
            "longitude": Number(longitude),
            "date": date
        },
        "view": {
            "type": "landscape-simple"
        }
    }
    
    axios.post(url, postData, headers)
    .then((response) => {
        callback(undefined, response.data.data.imageUrl)
    }).catch(error => {
        callback(error, undefined)
    })
}

module.exports = getMoon