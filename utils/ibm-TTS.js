const path = require('path')
const fs = require('fs')
const player = require('play-sound')(opts = {})
var mp3Duration = require('mp3-duration');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const { IamAuthenticator } = require('ibm-watson/auth')
const { ibmKey } = require('./apiKey')

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: ibmKey.apikey,
    }),
    serviceUrl: ibmKey.serviceUrl
  })

const GeraTTS = (synthesizeParams) => {
    textToSpeech.synthesize(synthesizeParams).then(response => {
        return textToSpeech.repairWavHeaderStream(response.result)
    }).then(buffer => {
        fs.writeFileSync('audio.mp3', buffer)
        try {
            playAudio()
        } catch (err) {
            throw err
        }
    }).catch(err => {
        return({ error: err })  
    })
}

const playAudio = () => {
    const filePath = path.join(__dirname, '../audio.mp3')

    player.play(filePath, function(err){
        if (err) throw err
    })
    
    mp3Duration(filePath, function (err, duration) {
        if (err) return err.message
        setTimeout(() => { fs.unlinkSync(filePath) }, duration*1000)
    })
}

module.exports = {
    GeraTTS
} 
