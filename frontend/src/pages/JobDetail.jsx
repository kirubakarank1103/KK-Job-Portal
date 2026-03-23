import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchJob()
  }, [])

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${API}/api/jobs/${id}`)
      setJob(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleApply = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    try {
      await axios.post(`${API}/api/apply`,
        { jobId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Successfully Applied!')
    } catch (err) {
      setMessage('❌ Already applied or error!')
    }
  }

  if (!job) return <p style={{ padding: '30px' }}>Loading...</p>

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: '#fff', padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '10px' }}>{job.title}</h2>
        <h3 style={{ color: '#666', marginBottom: '20px' }}>{job.company}</h3>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <span style={{
            background: '#f0f0f0', padding: '6px 14px',
            borderRadius: '20px', fontSize: '14px'
          }}>📍 {job.location}</span>
          <span style={{
            background: '#ffe0e6', padding: '6px 14px',
            borderRadius: '20px', fontSize: '14px', color: '#e94560'
          }}>💼 {job.type}</span>
          {job.salary && (
            <span style={{
              background: '#e0ffe6', padding: '6px 14px',
              borderRadius: '20px', fontSize: '14px', color: '#2ecc71'
            }}>💰 {job.salary}</span>
          )}
        </div>

        <h4 style={{ marginBottom: '10px' }}>Job Description:</h4>
        <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
          {job.description}
        </p>

        {message && (
          <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{message}</p>
        )}

        <button
          onClick={handleApply}
          style={{
            padding: '14px 40px',
            background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >Apply Now 🚀</button>

        <button
          onClick={() => navigate('/')}
          style={{
            marginLeft: '15px',
            padding: '14px 40px',
            background: '#1a1a2e', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >← Back</button>
      </div>
    </div>
  )
}