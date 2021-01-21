const axios = require('axios')
const b64 = require('base-64');

const applicationId = 'c3b0e18c-6a38-4a76-99bc-474e00e43e3c'
const applicationSecret = '1ef1aa71d0eabf2ff20e5250226e7c929d55830ac357189bfb8ae20d9abc9736cc470caf6f4130d40d28bcbf33c319e382a62cde42ac468fc290fd234c15c8c65def1a0f955e00718927e67b21ccba93e0f933ba71064b121e93d85ffbf627f630d07290a39fa0808de07c957d4da13f'

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