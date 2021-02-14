const axios = require('axios')
const { imageOfTheDayKey } = require('../utils/apiKey')

const getImageOfTheDay = (dateStart, dateEnd, callback) => {
    
    const url = dateStart ? `https://api.nasa.gov/planetary/apod?api_key=${imageOfTheDayKey}&start_date=${dateStart}&end_date=${dateEnd}` 
                            : `https://api.nasa.gov/planetary/apod?api_key=${imageOfTheDayKey}`
   
    axios.get(url).then( (response) => {

        if (response.data.length){
            var results = response.data.map((item) => {
                return {
                    title: item.title,
                    explanation: item.explanation,
                    imgUrl: item.url
                }
            })
        } else {
            var results = {
                title: response.data.title,
                explanation: response.data.explanation,
                imgUrl: response.data.url
            }
        }
        
        callback(undefined, results)

    }).catch ((error) => {
        callback('Houve um erro ao acessar a API!', undefined)
    })
}

module.exports = getImageOfTheDay