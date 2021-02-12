const express = require('express')
const NewsLetter = require('../src/models/newsletter')

const router = new express.Router()

router.get('/registerNewsLetter', (req, res) => {
    res.render('registerNewsLetter')
})

router.post('/registerNewsLetter', async (req, res) => {
    try {
        const newsLetter = await NewsLetter.findByCredentials(req.body.email)
        
        if (newsLetter.status && newsLetter.status == 404) {
            const cadastro = new NewsLetter({email: req.body.email})
            await cadastro.save()
            return res.status(200).send(cadastro)
        }

        res.status(newsLetter.status).send(newsLetter.error)
    }catch (e) {
       res.status(500).send(e)
    }
})      

module.exports = router