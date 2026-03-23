const router = require('express').Router()
const Application = require('../models/Application')
const auth = require('../middleware/authMiddleware')

router.post('/', auth, async (req, res) => {
  try {
    const { jobId } = req.body
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    })
    if (existing) return res.status(400).json({ message: 'Already applied!' })
    const application = new Application({
      job: jobId,
      applicant: req.user.id
    })
    await application.save()
    res.status(201).json({ message: 'Applied successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location type')
    res.json(applications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router