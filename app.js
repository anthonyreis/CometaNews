const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const getNasaImage = require('./src/nasaImages')
const getImageOfTheDay = require('./src/imageOfTheDay')


// api key = oaWnTtGm6tSiUIvgdLIWzB3zMeFFsCwNr9JOcYHL

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

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

app.get('/imgday/:startDate?/:endDate?', (req, res) => {
    getImageOfTheDay(req.query.startDate, req.query.endDate, (error, result) => {
        if (error) {
            return res.send(error)
        }

        res.send(result)
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