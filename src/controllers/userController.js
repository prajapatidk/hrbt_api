const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'USERAPI'

// Sign Up
const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username
    })

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)
    res.status(200).json({ user: result, token: token })
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

//Sign In
const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchPassword) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    )
    res.status(201).json({ user: existingUser, token: token })
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

module.exports = { signup, signin }
