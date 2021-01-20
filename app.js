const express = require('express')
const path = require('path')
const getNasaImage = require('./src/nasaImages')


// api key = oaWnTtGm6tSiUIvgdLIWzB3zMeFFsCwNr9JOcYHL

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.send('Olá, Mundo')
})

app.get('/search', (req, res) => {
    if (!req.query.q){
        return res.send({
            error: 'Você deve fornecer alguma informação a ser pesquisada!'
        })
    }

    getNasaImage(req.query.q, (error, links) => {
        if (error) {
           return res.send(error)
        }

        res.send(links)
    })
   
})
/*
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found'
    })
})*/

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})