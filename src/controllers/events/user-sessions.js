const mongoose = require('mongoose')
const { UserSessionsEvents, Tags } = require('../../models')

const findAll = async (req, res) => {
  const userSessions = await UserSessionsEvents.find({ userId: req.user.id })

  res.status(200).json(userSessions)
}

const findOne = async (req, res) => {
  const userSession = await UserSessionsEvents.findOne({ _id: req.params.id, userId: req.user.id })

  if (!userSession) return res.status(404).json({ message: 'MouseMovement not found' })

  res.status(200).json(userSession)
}

const create = async (req, res) => {
  const tags = await Tags.find({ _id: { $in: req.body.tags }, userId: req.user.id })

  const userSession = new UserSessionsEvents({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    startsAt: req.body.startsAt,
    endedAt: req.body.endedAt,
    tags: tags.map((tag) => tag.id)
  })

  userSession.save().then((userSession) => res.status(201).json(userSession))
}

module.exports = { findAll, findOne, create }
