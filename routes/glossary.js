const axios = require('axios')

const getDefinition = (term, callback) => {
    const url = `https://hubblesite.org/api/v3/glossary/${term}`

    axios.get(url).then((response) => {
        callback(undefined, response.data)
    }).catch(error => {
        callback(error, undefined)
    })
}

module.exports = getDefinition