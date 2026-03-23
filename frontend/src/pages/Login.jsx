import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (err) {
      setError('Invalid email or password!')
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
        <h2 style={{ marginBottom: '25px', color: '#1a1a2e' }}>Login 👋</h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
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
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '12px',
            background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >Login</button>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Account இல்லையா? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}