const mongoose = require('mongoose')
const { TrackingEvents } = require('../../models')

const findAll = async (req, res) => {
  const trackings = await TrackingEvents.find({ appId: req.user._id })

  res.status(200).json(trackings)
}

const findOne = async (req, res) => {
  const tracking = await TrackingEvents.findOne({ _id: req.params.id, appId: req.user._id })

  if (!tracking) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(tracking)
}

const create = async (req, res) => {
  if (!['click', 'hover', 'submit', 'change', 'focus', 'blur'].includes(req.body.data.eventType)) {
    return res.status(400).json({ message: 'EventType isn\'t compliant to available event types' })
  }

  const tracking = new TrackingEvents({
    appId: new mongoose.mongo.ObjectId(req.user._id),
    name: req.body.data.name,
    eventType: req.body.data.eventType,
    timestamp: req.body.data.timestamp
  })

  tracking.save().then((tracking) => res.status(201).json(tracking))
}

module.exports = { findAll, findOne, create }
