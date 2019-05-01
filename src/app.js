const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()       // generates new instance of application

//  CONFIGURATIONS
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')    // setting up handlebars
app.set('views', viewsPath)     // customizing the views directory
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {       // find 'index' in /view file -> converts it into html. -> return back
        title: 'Weather',
        name: 'Hyojin Kim'
    })         // render dynamic webpage view source in /view folder's file. 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hyojin Kim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text. ',
        title: 'Help',
        name: 'Hyojin Kim'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must type an address'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
        
    })

    // res.send({
    //     forecast: forecastData,
    //     location: req.query.address,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {        // creating an endpoint that sends back products to be displayed in the browser on our ecommerce site
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
    res.render('404', {
        title: '404',
        name: 'Hyojin Kim',
        errorMessage: 'Help article not found. '
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hyojin Kim',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})