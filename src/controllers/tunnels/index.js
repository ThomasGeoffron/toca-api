const mongoose = require('mongoose')
const { Tunnels, Tags } = require('../../models')

const findAll = async (req, res) => {
  const tunnels = await Tunnels.find({ userId: req.user.id })

  res.status(200).json(tunnels)
}

const findOne = async (req, res) => {
  const tunnel = await Tunnels.findOne({ _id: req.params.id, userId: req.user.id })

  if (!tunnel) return res.status(404).json({ message: 'Tunnel not found' })

  res.status(200).json(tunnel)
}

const create = async (req, res) => {
  const tags = await Tags.find({ _id: { $in: req.body.tags }, userId: req.user.id })

  const tunnel = new Tunnels({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    comment: req.body.comment,
    tags: tags.map((tag) => tag.id)
  })

  tunnel.save().then((tunnel) => res.status(201).json(tunnel))
}

const update = async (req, res) => {
  Tunnels.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { comment: req.body.comment })
    .then((tag) => res.status(201).json(tag))
}

module.exports = { findAll, findOne, create, update }
