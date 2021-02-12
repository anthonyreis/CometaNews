const { GeraTTS } = require('../../utils/ibm-TTS.js')

function playSound(params) {
    GeraTTS(params)
}

module.exports = playSound