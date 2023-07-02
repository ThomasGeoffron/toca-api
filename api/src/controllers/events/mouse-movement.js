const mongoose = require('mongoose')
const { MouseMovementEvents } = require('../../models')

const findAll = async (req, res) => {
  const mouseMovements = await MouseMovementEvents.find({ appId: req.user._id })

  res.status(200).json(mouseMovements)
}

const findOne = async (req, res) => {
  const mouseMovement = await MouseMovementEvents.findOne({ _id: req.params.id, appId: req.user._id })

  if (!mouseMovement) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(mouseMovement)
}

const create = (req, res) => {
  const mouseMovement = new MouseMovementEvents({
    appId: new mongoose.mongo.ObjectId(req.user._id),
    timestamp: req.body.data.timestamp,
    position: {
      x: req.body.data.x,
      y: req.body.data.y
    },
    url: req.body.data.url
  })

  mouseMovement.save().then((mouseMovement) => res.status(201).json(mouseMovement))
}

module.exports = { findAll, findOne, create }
