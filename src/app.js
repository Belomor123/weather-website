const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'YES IM BECOMING ALIVE',
    body: 'Time to get some weather!',
    name: 'Mike'
  })
})

const a = 1984 * 234

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'Lets do some math',
    number: a,
    name: 'Meg'
  })
})

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'HELPING YOU EVERY DAY',
    body: 'Its okay you can do it yourself',
    name: 'Yoda'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  } else {  
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send(error)
    } else {
      weather(latitude, longitude, (error, {weatherType, temperature, feelsLike} = {}) => {
        if (error) {
          return res.send(error)
        } else {
          res.send({
            weather: 'Currently it is ' + weatherType,
            temperature: temperature,
            feelsLike: feelsLike,
            location: location,
            latitude: latitude,
            longitude: longitude,
            address: req.query.address
          })
        }
        })
    }
    })
  }
})

app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  // console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Developer',
    message: 'The help article you are looking for cannot be found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    name: 'Another Developer',
    message: 'Cannot find the page you are looking for'
  })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})