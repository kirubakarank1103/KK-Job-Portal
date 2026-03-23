import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/api/auth/register`, form)
      setSuccess('Account created! Login பண்ணு!')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError('Registration failed! Try again.')
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', minHeight: '90vh',
      background: '#f5f5f5'
    }}>
      <div style={{
        background: '#fff', padding: '40px',
        borderRadius: '12px', width: '400px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '25px', color: '#1a1a2e' }}>Register ✍️</h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '12px',
            background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >Register</button>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Already account இருக்கா? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}