const router = require('express').Router()
const Job = require('../models/Job')
const auth = require('../middleware/authMiddleware')

router.get('/', async (req, res) => {
  try {
    const { search, location, type } = req.query
    const query = {}
    if (search)   query.title    = { $regex: search,   $options: 'i' }
    if (location) query.location = { $regex: location, $options: 'i' }
    if (type)     query.type = type
    const jobs = await Job.find(query).sort({ createdAt: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email')
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id })
    await job.save()
    res.status(201).json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id)
    res.json({ message: 'Job deleted!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router