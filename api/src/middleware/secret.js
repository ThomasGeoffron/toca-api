const { Users } = require('../models')
const bcrypt = require('bcryptjs')

const secret = async (req, res, next) => {
  const appId = req.headers['x-app-id']
  const appSecret = req.headers['x-app-secret']

  if (!appId || !appSecret) {
    return res
      .status(401)
      .send("Missing app informations, couldn't authenticate")
  }

  const user = await Users.findOne({ appId, active: true })

  if (!user) {
    return res
      .status(401)
      .send("Invalid appId, couldn't authenticate")
  }

  bcrypt.compare(appId, appSecret, function (_, result) {
    if (result) {
      return next()
    }
    return res.status(404).json({ message: 'User not found' })
  })
}

module.exports = secret
