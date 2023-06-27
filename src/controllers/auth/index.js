const { Users } = require('../../models')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../../helpers/jwt')

const register = async (req, res) => {
  console.log(req)
  const company = req.body.company
  const kbis = req.body.kbis
  const email = req.body.email
  const password = bcrypt.hashSync(req.body.password, 10)
  const url = req.body.url

  const exists = await Users.findOne({ email })

  if (exists) return res.status(400).json({ message: 'Account already exists' })

  const user = new Users({
    company,
    kbis,
    email,
    password,
    url
  })

  // TODO : send mail in .then()

  user.save().then((user) => res.status(201).json(user))
}

const login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  Users.findOne({ email, active: true }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (_, result) {
        if (result) {
          const token = generateToken(user)
          return res.status(200).json({ message: 'Logged in succesfully', token })
        }
        res.status(404).json({ message: 'User not found' })
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  })
}

module.exports = { register, login }
