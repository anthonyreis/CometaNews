const axios = require('axios')

const apiKey = require('../utils/apiKey')

const coronalMassEjection = (startDate, endDate, callback) => {
    const url = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`

    axios.get(url).then((response) => {
        if (response.data.length){
            var results = response.data.map((item) => {
                return {
                    beginTime: item.beginTime,
                    peakTime: item.peakTime,
                    classType: item.classType,
                    link: item.link
                }
            })
        } else if (response.data != ''){
            var results = {
                beginTime: item.beginTime,
                peakTime: item.peakTime,
                classType: item.classType,
                link: item.link
            }
        } else {
            var results = {}
        }

        callback(undefined, results)
    }).catch(error => {
        callback('Não foi possivel acessar a API!', undefined)
    })
}

module.exports = coronalMassEjection