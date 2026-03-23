import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', company: '', location: '',
    type: 'full-time', description: '', salary: ''
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    try {
      await axios.post(`${API}/api/jobs`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Job Posted Successfully!')
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setMessage('❌ Failed! Login பண்ணி try பண்ணு.')
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      padding: '40px', background: '#f5f5f5',
      minHeight: '90vh'
    }}>
      <div style={{
        background: '#fff', padding: '40px',
        borderRadius: '12px', width: '600px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        height: 'fit-content'
      }}>
        <h2 style={{ marginBottom: '25px', color: '#1a1a2e' }}>Post a Job 📝</h2>
        {message && <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{message}</p>}

        <input
          placeholder="Job Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Company Name"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Salary (eg: 50000)"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
        </select>
        <textarea
          placeholder="Job Description..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={5}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}
        />
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '12px',
            background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >Post Job 🚀</button>
      </div>
    </div>
  )
}