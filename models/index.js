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
  active: {
    type: Boolean,
    required: true
  }
}))

const Tags = new mongoose.model('Tags', new mongoose.Schema({
  comment: {
    type: String,
    required: true
  }
}))

const Tunnels = new mongoose.model('Tunnel', new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tags'
    }
  ]
}))

const Filters = new mongoose.model('Filters', new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}))

const Kpi = new mongoose.model('Kpi', new mongoose.Schema({
  filters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Filters',
      required: true
    }
  ],
  startsAt: {
    type: Date,
    required: false
  },
  endedAt: {
    type: Date,
    required: false
  },
  step: {
    type: Number,
    required: false
  },
  dataType: {
    type: String,
    enum: ['number', 'rate'],
    required: true
  },
  visualType: {
    type: String,
    enum: ['KPI', 'Graph', 'Heatmap'],
    required: true
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
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  ]
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
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  ]
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
  }
}))

module.exports = { Users, Tags, Tunnels, Filters, Kpi, UsersSessions, PageViews, TrackingEvents, MouseMovementEvents }
