const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./helpers/error-handler')

// eslint-disable-next-line no-unused-vars
const env = require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connected succesfully !'))
  .catch((error) => console.error(error))

mongoose.connection.once('open', () => {
  console.log('connected !')

  // eslint-disable-next-line no-unused-vars
  const { Users, Tags, Tunnels, Filters, Kpi, UsersSessions, PageViews, TrackingEvents, MouseMovementEvents } = require('./models')

  const { register, login } = require('./controllers/auth')

  app.post('/register', register)

  app.post('/login', login)

  app.listen(5002, () => console.log('API listening on port 5002'))
})
