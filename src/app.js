
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geoCode = require('../src/utils/geoCode')
const weather = require('../src/utils/weather')

const partialsPath = path.join(__dirname, '../templates/partials')

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

//setup handlebars engine vews path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: ' Marvin Rojas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Marvin Rojas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: ' Marvin Rojas',
        tip: 'Go to the home page and input a location or zip code.',
        tip2: 'If you run into any issues or have to report a bug contact the site administrator.'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        weather(longitude, latitude, (error, {temperature, weather_descriptions, weather_icons} = {} ) => {
            if(error) {
                return res.send({
                    error
                })
            }

            const weatherData = 'Temperature is currently ' + temperature + 'c' + ' and the sky is ' + weather_descriptions 
            res.send({
                forecast: weatherData,
                location: location,
                address: req.query.address,
                weather_icons
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpMissing', {
        title: 'Help article not found',
        error: 'Please click home to go back to the home page',
        name: ' Marvin Rojas'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        error: 'Error, page not found',
        name: ' Marvin Rojas'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})