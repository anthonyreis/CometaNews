const User = require('../src/models/user')
const captcha = require("captcha-plus")
const fs = require('fs')

const Geracaptcha = async (id) => {
    const code = captcha.convert(captcha.user(id).user).buffer
    
    const path = `./public/captcha/${id}.png`
    
    fs.writeFileSync(path, code)
    
    captcha.check(id, code).then(response => {
        return response
    }).catch(e => {
       return e
    })
}

const login = async (email, password, callback) => {
    try {
        const user = await User.findByCredentials(email, password)
        const captchaGerado = await Geracaptcha(user._id)

        callback(undefined, user)
    }catch (e) {
       callback(e, undefined)
    }
}

module.exports = login