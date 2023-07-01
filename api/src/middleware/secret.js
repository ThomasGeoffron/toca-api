const { Users } = require('../models')
const bcrypt = require('bcryptjs')

const secret = async (req, res, next) => {
  const appId = req.body.credentials.appId
  const appSecret = req.body.credentials.appSecret

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
      req.user = user
      return next()
    }
    return res.status(404).json({ message: 'User not found' })
  })
}

module.exports = secret
