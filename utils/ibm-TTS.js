const path = require('path')
const fs = require('fs')
const player = require('play-sound')(opts = {})
var mp3Duration = require('mp3-duration');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: '67-EljzaI3Wij7h0h2Q01aTT_zdE1B7Ds_51RGF_WkvP',
    }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/64652127-c10f-4be8-84f4-bdaf1d667b14'
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
        console.log('error:', err)  
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

module.exports = GeraTTS
