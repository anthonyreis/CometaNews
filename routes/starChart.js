const axios = require('axios')
const b64 = require('base-64')
const { starChartKey } = require('../utils/apiKey')

const applicationId = starChartKey.applicationId
const applicationSecret = starChartKey.applicationSecret

const url = 'https://api.astronomyapi.com/api/v2/studio/star-chart'
const hash = b64.encode(`${applicationId}:${applicationSecret}`)

const getChart = (style = "default",latitude, longitude, date, constellation, callback) => {
   
    const headers = {
        headers: {
            'Authorization': `Basic ${hash}`,
            "Content-Type": "application/json"
        }
    }

    const postData = {
        "style": style,
        "observer": {
            "latitude": Number(latitude),
            "longitude": Number(longitude),
            "date": date
        },
        "view": {
            "type": "constellation",
            "parameters": {
                "constellation": constellation
                
            }
        }
    }
    
    axios.post(url, postData, headers)
    .then((response) => {
        callback(undefined, response.data.data.imageUrl)
    }).catch(error => {
        callback(error, undefined)
    })
}

module.exports = getChart