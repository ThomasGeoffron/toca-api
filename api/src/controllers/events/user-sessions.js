const mongoose = require('mongoose')
const { UsersSessions } = require('../../models')

const findAll = async (req, res) => {
  const userSessions = await UsersSessions.find({ appId: req.user.id })

  res.status(200).json(userSessions)
}

const findOne = async (req, res) => {
  const userSession = await UsersSessions.findOne({ _id: req.params.id, appId: req.user._id })

  if (!userSession) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(userSession)
}

const create = async (req, res) => {
  const userSession = new UsersSessions({
    appId: new mongoose.mongo.ObjectId(req.user._id),
    startsAt: req.body.data.startsAt,
    endedAt: req.body.data.endedAt
  })

  userSession.save().then((userSession) => res.status(201).json(userSession))
}

module.exports = { findAll, findOne, create }
