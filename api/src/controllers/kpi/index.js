const mongoose = require('mongoose')
const { Filters, Kpi } = require('../../models')

const findAll = async (req, res) => {
  const kpis = await Kpi.find({ userId: req.user.id })

  res.status(200).json(kpis)
}

const findOne = async (req, res) => {
  const kpi = await Kpi.findOne({ _id: req.params.id, userId: req.user.id })

  if (!kpi) return res.status(404).json({ message: 'Kpi not found' })

  res.status(200).json(kpi)
}

const create = async (req, res) => {
  if (!['number', 'rate'].includes(req.body.dataType) || !['KPI', 'Graph', 'Heatmap'].includes(req.body.visualType)) {
    return res.status(400).json({ message: 'Please provide the right informations' })
  }

  const filters = await Filters.find({ _id: { $in: req.body.filters }, userId: req.user.id })

  const kpi = new Kpi({
    userId: mongoose.mongo.ObjectId(req.user.id),
    filter: filters.map((filter) => filter.id),
    startsAt: req.body.startsAt,
    endedAt: req.body.endedAt,
    step: req.body.step,
    dataType: req.body.dataType,
    visualType: req.body.visualType
  })

  kpi.save().then((kpi) => res.status(201).json(kpi))
}

const update = async (req, res) => {
  if ((req.body.dataType && !['number', 'rate'].includes(req.body.dataType)) || (req.body.visualType && !['KPI', 'Graph', 'Heatmap'].includes(req.body.visualType))) {
    return res.status(400).json({ message: 'Please provide the right informations' })
  }

  const kpi = await Kpi.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true })

  res.status(200).json(kpi)
}

const remove = async (req, res) => {
  const kpi = await Kpi.findOneAndRemove({ _id: req.params.id, userId: req.user.id })

  res.status(200).json(kpi)
}

module.exports = { findAll, findOne, create, update, remove }
