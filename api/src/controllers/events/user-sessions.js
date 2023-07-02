const mongoose = require('mongoose')
const { UserSessionsEvents } = require('../../models')

const findAll = async (req, res) => {
  const userSessions = await UserSessionsEvents.find({ appId: req.user._id })

  res.status(200).json(userSessions)
}

const findOne = async (req, res) => {
  const userSession = await UserSessionsEvents.findOne({ _id: req.params.id, appId: req.user._id })

  if (!userSession) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(userSession)
}

const create = async (req, res) => {
  const userSession = new UserSessionsEvents({
    appId: new mongoose.mongo.ObjectId(req.user._id),
    startsAt: req.body.data.startsAt,
    endedAt: req.body.data.endedAt
  })

  userSession.save().then((userSession) => res.status(201).json(userSession))
}

module.exports = { findAll, findOne, create }
