/* eslint-disable new-cap */
const mongoose = require('mongoose')

const Users = new mongoose.model('Users', new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  kbis: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  }
}))

const UsersSessions = new mongoose.model('UsersSessions', new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  startsAt: {
    type: Date,
    required: true
  },
  endedAt: {
    type: Date,
    required: true
  }
}))

const PageViews = new mongoose.model('PageViews', new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
}))

const TrackingEvents = new mongoose.model('TrackingEvents', new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['click', 'hover', 'submit', 'change', 'focus', 'blur'],
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
}))

const MouseMovementEvents = new mongoose.model('MouseMovementEvents', new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  timestamp: {
    type: Date,
    required: true
  },
  position: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  url: {
    type: String,
    required: true
  }
}))

module.exports = { Users, UsersSessions, PageViews, TrackingEvents, MouseMovementEvents }
