const express = require('express')
const User = require('../src/models/user')
const captcha = require("captcha-plus")
const fs = require('fs')

const router = new express.Router()

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

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
       
        //const captchaGerado = await Geracaptcha(user._id)
        if(user.status && user.status != 200) {
           return res.status(user.status).send(user.error)
        }

        res.status(200).send(user)
    }catch (e) {
        console.log(e)
       res.status(400).send(e)
    }
})

module.exports = router