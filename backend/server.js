const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')  // ✅ Top la
require('dotenv').config()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))
app.use(express.json())

// API Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/apply', require('./routes/applyRoutes'))

// ✅ Static Files - API routes kazhichu
app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err))

// ✅ app.listen - Kela
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))