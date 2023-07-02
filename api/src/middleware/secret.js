const { Users } = require('../models')

const secret = async (req, res, next) => {
  console.log(req.body)

  const appId = req.body.credentials.appId
  const appSecret = req.body.credentials.appSecret

  if (!appId || !appSecret) {
    return res
      .status(401)
      .send('Missing app informations, could not authenticate')
  }

  const user = await Users.findOne({ _id: appId, appSecret, active: true })

  if (!user) {
    return res
      .status(401)
      .send('Invalid credentials, could not authenticate')
  }

  req.user = user
  next()
}

module.exports = secret
