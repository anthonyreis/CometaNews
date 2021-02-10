require('./db/mongoose.js')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const getNasaImage = require('./routes/nasaImages')
const getImageOfTheDay = require('./routes/imageOfTheDay')
const corMassEject = require('./routes/coronalMassEjection')
const starChart = require('./routes/starChart')
const getMoon = require('./routes/moonPhase')
const moonCalc = require('./routes/moonCalc')
const getNews = require('./routes/spaceNews')
const issPosition = require('./routes/issPosition')
const getHubbleNews = require('./routes/hubbleNews')
const getDefinition = require('./routes/glossary')
const login = require('./routes/login')
const register = require('./routes/registerNewsLetter')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '/public')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(publicDirectoryPath))
const viewsPath = path.join(__dirname, '/templates/views')
const imgPath = path.resolve(__dirname, 'public/issMapImg', 'issImg.jpg')


app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('/', (req, res) => {
    res.send('Cometa News')
})

// API que pesquisa imagens com base nos dados fornecidos
app.get('/search', (req, res) => {
    if (!req.query.q){
        return res.status(400).send({
            error: 'Você deve fornecer alguma informação a ser pesquisada!'
        })
    }

    getNasaImage(req.query.q, (error, links) => {
        if (error) {
           return res.status(500).send(error)
        }

        res.status(200).send(links)
    })
   
})

// API que retorna a imagem do dia caso não seja especificada data
// ou retorna as imagens no intervalo especificado
app.get('/imgday/:startDate?/:endDate?', (req, res) => {
    getImageOfTheDay(req.query.startDate, req.query.endDate, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})

// API que retorna se houve ejeção de massa coronaria no período fornecido
// caso não seja informada data será retornado dos ultimos 30 dias
app.get('/corMassEject/:startDate?/:endDate?', (req, res) => {
    corMassEject(req.query.startDate, req.query.endDate, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        } else if (!result.length){
            return res.status(200).send('Não houve ejeção de massa coronaria nesse período!')
        }

        res.status(200).send(result)
    })
})

// Retorna o Chart da constelação de acordo com os dados fornecidos
app.get('/starChart', (req, res) => {
    if (!req.query.style || !req.query.lat || !req.query.long || !req.query.date || !req.query.constellation) {
        return res.status(400).send({ error: 'Está faltando algum parâmetro!' })
    }

    starChart(req.query.style, req.query.lat, req.query.long, req.query.date, req.query.constellation, (error, result) => {
        if (error){
           return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})

// Retorna uma imagem da lua, de acordo com os dados informados
app.get('/moonPhase', (req, res) => {
    if (!req.query.style || !req.query.lat || !req.query.long || !req.query.date) {
        return res.status(400).send({ error: 'Está faltando algum parâmetro!' })
    }

    getMoon(req.query.style, req.query.lat, req.query.long, req.query.date, (error, result) => {
        if (error){
           return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})


// Retorna uma página html com as informações sobre a posição da lua
app.get('/moonCalc', (req, res) => {
    if (!req.query.lat || !req.query.long || !req.query.zoom || !req.query.date || !req.query.time || !req.query.objectlevel || !req.query.maptype){
        return res.status(400).send({ error: 'Está faltando algum parâmetro!' })
    }

    moonCalc(req.query.lat, req.query.long, req.query.zoom, req.query.date, req.query.time, req.query.objectlevel, req.query.maptype, (error, result) => {
        if (error){
            return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})

// Retorna resumos de noticias, com link para a materia completa
app.get('/spacenews', (req, res) => {
    getNews((error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})

// Retorna um mapa que mostra a posição da ISS naquele momento
app.get('/issPosition', (req, res) => {
    issPosition( async (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }
        await result.pipe(fs.createWriteStream(imgPath))
        res.render('main', {
            image: './issMapImg/issImg.jpg'
        })
    })
})

// Traz uma coleção de noticias com resumo, imagem e link para a matéria completa
app.get('/hubbleNews', (req, res) => {
    getHubbleNews((error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        res.status(200).send(result)
    })
})

// Traz a definição de algum termo relacionado a astronomia
app.get('/glossary/:term', (req, res) => {
    getDefinition(req.params.term, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }
        res.status(200).send(result)
    })
})

app.get('/login', (req, res) => {
    return res.render('login')
})

app.post('/login', (req, res) => {
    login(req.body.email, req.body.password, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        if (result.status && result.status != 200){
            return res.status(result.status).send(result.error)
        }     

        return res.status(200).send(result)
    })
      
   
})

app.get('/registerNewsLetter', (req, res) => {
    return res.render('registerNewsLetter')
})

app.post('/registerNewsLetter', async (req, res) => {
   register({ email: req.body.email }, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        if (result.status && result.status != 200){
            return res.status(result.status).send(result.error)
        }     

        return res.status(200).send(result)
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