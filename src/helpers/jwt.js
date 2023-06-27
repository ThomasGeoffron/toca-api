const jwt = require('jsonwebtoken')

const generateToken = (jwtProps) => {
  const token = jwt.sign(
    {
      company: jwtProps.company,
      email: jwtProps.email,
      isAdmin: jwtProps.isAdmin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  )
  return token
}

const verifyJwt = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}

module.exports = { generateToken, verifyJwt }
