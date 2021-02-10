const axios = require('axios')

const moonCalc = (lat, lon, zoom, date, time, objectlevel, maptype, callback) => {
    const url = `https://mooncalc.org/#/${lat},${lon},${zoom}/${date}/${time}/${objectlevel}/${maptype}`

    axios.get(url).then((response) => {
        let re = /rel="stylesheet"/gi
        removedPage = response.data.replace(re, '')
        
        return removedPage
    }).then( (removedPage) => {
        callback(undefined, removedPage)
    }).catch((error) => {
        callback(error, undefined)
    })
}

module.exports = moonCalc