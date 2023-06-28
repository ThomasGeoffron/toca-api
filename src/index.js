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
  // eslint-disable-next-line no-unused-vars
  const { Users, Tags, Tunnels, Filters, Kpi, UsersSessions, PageViews, TrackingEvents, MouseMovementEvents } = require('./models')

  const auth = require('./middleware/auth')
  const admin = require('./middleware/admin')

  // Auth

  const authController = require('./controllers/auth')

  app.post('/register', authController.register)

  app.post('/login', authController.login)

  // Users

  const users = require('./controllers/users')

  app.get('/users', admin, users.findAll)

  app.get('/users/:id', admin, users.findOne)

  app.patch('/users/:id', admin, users.activate)

  // Tags

  const tags = require('./controllers/tags')

  app.get('/tags', auth, tags.findAll)

  app.get('/tags/:id', auth, tags.findOne)

  app.post('/tags', auth, tags.create)

  app.patch('/tags/:id', auth, tags.update)

  app.listen(5002, () => console.log('API listening on port 5002'))
})
