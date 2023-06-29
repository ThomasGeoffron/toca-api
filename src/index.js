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

  app.post('/login/secret', authController.loginViaSecret)

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

  // Tunnels

  const tunnels = require('./controllers/tunnels')

  app.get('/tunnels', auth, tunnels.findAll)

  app.get('/tunnels/:id', auth, tunnels.findOne)

  app.post('/tunnels', auth, tunnels.create)

  app.patch('/tunnels/:id', auth, tunnels.update)

  // Events

  // MouseMovements

  const mouseMovements = require('./controllers/events/mouse-movement')

  app.get('/events/mouse-movements', auth, mouseMovements.findAll)

  app.get('/events/mouse-movements/:id', auth, mouseMovements.findOne)

  app.post('/events/mouse-movements', auth, mouseMovements.create)

  // PageViews

  const pageViews = require('./controllers/events/page-views')

  app.get('/events/page-views', auth, pageViews.findAll)

  app.get('/events/page-views/:id', auth, pageViews.findOne)

  app.post('/events/page-views', auth, pageViews.create)

  app.patch('/events/page-views/:id', auth, pageViews.addView)

  // Tracking

  const tracking = require('./controllers/events/tracking')

  app.get('/events/tracking', auth, tracking.findAll)

  app.get('/events/tracking/:id', auth, tracking.findOne)

  app.post('/events/tracking', auth, tracking.create)

  // UserSessions

  const userSessions = require('./controllers/events/user-sessions')

  app.get('/events/user-sessions', auth, userSessions.findAll)

  app.get('/events/user-sessions/:id', auth, userSessions.findOne)

  app.post('/events/user-sessions', auth, userSessions.create)

  app.listen(5002, () => console.log('API listening on port 5002'))

  // KPIs

  const kpis = require('./controllers/kpi')

  app.get('/kpis', auth, kpis.findAll)

  app.get('/kpis/:id', auth, kpis.findOne)

  app.post('/kpis', auth, kpis.create)

  app.patch('/kpis/:id', auth, kpis.update)

  app.delete('/kpis/:id', auth, kpis.remove)
})
