const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios')
const app = express()
const https = require('https')

// Setup logger
app.use(morgan('dev'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// Always return the main index.html, so react-router render the route in the client

// get nearby restaurants
app.get('/places/lat/:lat/lng/:lng', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=500&types=food&key=${process.env.GOOGLE_API_KEY}`, (places) => places.pipe(res))
  .on('error', next)
})

// get image for restaurant
// app.get('/places/lat/:lat/lng/:lng', (req, res, next) => {
//   https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=500&types=food&key=${process.env.GOOGLE_API_KEY}`, (places) => places.pipe(res))
//   .on('error', next)
// })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;


