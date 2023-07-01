const mongoose = require('mongoose')
const { TrackingEvents, Tags } = require('../../models')

const findAll = async (req, res) => {
  const trackings = await TrackingEvents.find({ userId: req.user.id })

  res.status(200).json(trackings)
}

const findOne = async (req, res) => {
  const tracking = await TrackingEvents.findOne({ _id: req.params.id, userId: req.user.id })

  if (!tracking) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(tracking)
}

const create = async (req, res) => {
  if (!['click', 'hover', 'submit', 'change', 'focus', 'blur'].includes(req.body.eventType)) {
    return res.status(400).json({ message: 'EventType isn\'t compliant to available event types' })
  }

  const tags = await Tags.find({ _id: { $in: req.body.tags }, userId: req.user.id })

  const tracking = new TrackingEvents({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    name: req.body.name,
    eventType: req.body.eventType,
    timestamp: req.body.timestamp,
    tags: tags.map((tag) => tag.id)
  })

  tracking.save().then((tracking) => res.status(201).json(tracking))
}

module.exports = { findAll, findOne, create }
