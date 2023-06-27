const { verifyJwt } = require('../helpers/jwt')

const admin = (req, res, next) => {
  const token = req.headers['x-auth']

  if (!token) {
    return res
      .status(401)
      .send("Missing token, couldn't authenticate")
  }
  try {
    const user = verifyJwt(token)
    if (!user.isAdmin) {
      throw new Error('User is not an admin')
    }
    req.user = user
  } catch (err) {
    return res
      .status(401)
      .send("Invalid token, couldn't authenticate")
  }
  return next()
}

module.exports = admin
