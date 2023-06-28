const mongoose = require('mongoose')
const { Tags } = require('../../models')

const findAll = async (req, res) => {
  const tags = await Tags.find({ userId: req.user.id })

  res.status(200).json({ tags })
}

const findOne = async (req, res) => {
  const tag = await Tags.findOne({ _id: req.params.id, userId: req.user.id })

  if (!tag) return res.status(404).json({ message: 'Tag not found' })

  res.status(200).json({ tag })
}

const create = (req, res) => {
  const tag = new Tags({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    comment: req.body.comment
  })

  tag.save().then(() => res.status(201).json(tag))
}

const update = async (req, res) => {
  Tags.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { comment: req.body.comment })
    .then((tag) => res.status(201).json(tag))
}

module.exports = { findAll, findOne, create, update }
