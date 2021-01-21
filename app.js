const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const getNasaImage = require('./src/nasaImages')
const getImageOfTheDay = require('./src/imageOfTheDay')
const corMassEject = require('./src/coronalMassEjection')
const starChart = require('./src/starChart')
const getMoon = require('./src/moonPhase')

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

// API que pesquisa imagens com base nos dados fornecidos
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


// API que retorna a imagem do dia caso não seja especificada data
// ou retorna as imagens no intervalo especificado
app.get('/imgday/:startDate?/:endDate?', (req, res) => {
    getImageOfTheDay(req.query.startDate, req.query.endDate, (error, result) => {
        if (error) {
            return res.send(error)
        }

        res.send(result)
    })
})

// API que retorna se houve ejeção de massa coronaria no período fornecido
// caso não seja informada data será retornado dos ultimos 30 dias
app.get('/corMassEject/:startDate?/:endDate?', (req, res) => {
    corMassEject(req.query.startDate, req.query.endDate, (error, result) => {
        
        if (error) {
            return res.send(error)
        } else if (!result.length){
            return res.send('Não houve ejeção de massa coronaria nesse período!')
        }

        res.send(result)
    })
})

// Retorna o Chart da constelação de acordo com os dados fornecidos
app.get('/starChart', (req, res) => {
    starChart(req.query.style, req.query.lat, req.query.long, req.query.date, req.query.constellation, (error, result) => {
        if (error){
           return res.send(error)
        }

        res.send(result)
    })
})

// Retorna uma imagem da lua, de acordo com os dados informados
app.get('/moonPhase', (req, res) => {
    getMoon(req.query.style, req.query.lat, req.query.long, req.query.date, (error, result) => {
        if (error){
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