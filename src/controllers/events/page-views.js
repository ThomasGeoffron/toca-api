const mongoose = require('mongoose')
const { PageViews, Tags } = require('../../models')

const findAll = async (req, res) => {
  const pageViews = await PageViews.find({ userId: req.user.id })

  res.status(200).json(pageViews)
}

const findOne = async (req, res) => {
  const pageView = await PageViews.findOne({ _id: req.params.id, userId: req.user.id })

  if (!pageView) return res.status(404).json({ message: 'PageView not found' })

  res.status(200).json(pageView)
}

const create = async (req, res) => {
  const exists = await PageViews.findOne({ url: req.body.url, userId: req.user.id })

  if (exists) return res.status(400).json({ message: 'PageView already exists' })

  const tags = await Tags.find({ _id: { $in: req.body.tags }, userId: req.user.id })

  const pageView = new PageViews({
    userId: new mongoose.mongo.ObjectId(req.user.id),
    title: req.body.title,
    url: req.body.url,
    views: 1,
    tags: tags.map((tag) => tag.id)
  })

  pageView.save().then((pageView) => res.status(201).json(pageView))
}

const addView = async (req, res) => {
  PageViews.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $inc: { views: 1 } })
    .then((tag) => res.status(201).json(tag))
    .catch(() => res.status(400).json({ message: 'An error occured' }))
}

module.exports = { findAll, findOne, create, addView }