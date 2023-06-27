const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')

const env = require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connected succesfully !'))
  .catch((error) => console.error(error))

mongoose.connection.once('open', () => {
  console.log('connected !')

  const { Users, Tags, Tunnels, Filters, Kpi, UsersSessions, PageViews, TrackingEvents, MouseMovementEvents } = require('./models')

  app.listen(5002, () => console.log('API listening on port 5002'))
})
