const axios = require('axios')

const getNasaImage = (params, callback) => {
    const url = `https://images-api.nasa.gov/search?q=${params}&media_type=image`

    axios.get(url).then( (response) => {
        const imgLinks = response.data.collection.items.map((item) => item.links[0].href)
        
        callback (undefined, imgLinks)
    }).catch ((e) => {
        callback('Unable to get the images from the API', undefined)
    })
}

module.exports = getNasaImage