const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already exists!' })
    const hash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hash, role })
    await user.save()
    res.status(201).json({ message: 'User created successfully!' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found!' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Wrong password!' })
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router