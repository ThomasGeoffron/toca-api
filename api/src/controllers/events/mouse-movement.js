const mongoose = require('mongoose')
const { MouseMovementEvents } = require('../../models')

const findAll = async (req, res) => {
  const mouseMovements = await MouseMovementEvents.find({ userId: req.user.id })

  res.status(200).json(mouseMovements)
}

const findOne = async (req, res) => {
  const mouseMovement = await MouseMovementEvents.findOne({ _id: req.params.id, userId: req.user.id })

  if (!mouseMovement) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(mouseMovement)
}

const create = (req, res) => {
  const mouseMovement = new MouseMovementEvents({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    timestamp: req.body.timestamp,
    position: {
      x: req.body.x,
      y: req.body.y
    },
    url: req.body.url
  })

  mouseMovement.save().then((mouseMovement) => res.status(201).json(mouseMovement))
}

module.exports = { findAll, findOne, create }
