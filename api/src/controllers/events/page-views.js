const mongoose = require('mongoose')
const { PageViews } = require('../../models')

const findAll = async (req, res) => {
  const pageViews = await PageViews.find({ appId: req.user.id })

  res.status(200).json(pageViews)
}

const findOne = async (req, res) => {
  const pageView = await PageViews.findOne({ _id: req.params.id, appId: req.user.id })

  if (!pageView) return res.status(404).json({ message: 'PageView not found' })

  res.status(200).json(pageView)
}

const create = async (req, res) => {
  const pageView = new PageViews({
    appId: new mongoose.mongo.ObjectId(req.user._id),
    title: req.body.data.title,
    url: req.body.data.url,
    timestamp: req.body.data.timestamp
  })

  pageView.save().then((pageView) => res.status(201).json(pageView))
}

module.exports = { findAll, findOne, create }
