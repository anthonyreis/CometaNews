const axios = require('axios')

const apiKey = 'oaWnTtGm6tSiUIvgdLIWzB3zMeFFsCwNr9JOcYHL'

const getNasaImage = (params, callback) => {
    const url = `https://images-api.nasa.gov/search?q=${params}&media_type=image`

    axios.get(url).then(async (response) => {
        const imgLinks = await response.data.collection.items.map((item) => item.links[0].href)
        
        callback (undefined, imgLinks)
    }).catch ((e) => {
        callback('Unable to get the images from the API', undefined)
    })
}

module.exports = getNasaImage