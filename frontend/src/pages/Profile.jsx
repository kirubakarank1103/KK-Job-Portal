import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return <p style={{ padding: '30px' }}>Loading...</p>

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      padding: '40px', background: '#f5f5f5',
      minHeight: '90vh'
    }}>
      <div style={{
        background: '#fff', padding: '40px',
        borderRadius: '12px', width: '500px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        height: 'fit-content'
      }}>
        {/* Avatar */}
        <div style={{
          width: '80px', height: '80px',
          background: '#e94560', borderRadius: '50%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '32px',
          margin: '0 auto 20px'
        }}>
          👤
        </div>

        <h2 style={{ textAlign: 'center', color: '#1a1a2e', marginBottom: '5px' }}>
          {user.name}
        </h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
          {user.role === 'employer' ? '🏢 Employer' : '🔍 Job Seeker'}
        </p>

        {/* Info Cards */}
        <div style={{
          background: '#f9f9f9', padding: '20px',
          borderRadius: '10px', marginBottom: '15px'
        }}>
          <p style={{ color: '#666', fontSize: '13px' }}>USER ID</p>
          <p style={{ color: '#1a1a2e', fontWeight: 'bold' }}>{user.id}</p>
        </div>

        <div style={{
          background: '#f9f9f9', padding: '20px',
          borderRadius: '10px', marginBottom: '15px'
        }}>
          <p style={{ color: '#666', fontSize: '13px' }}>ROLE</p>
          <p style={{ color: '#1a1a2e', fontWeight: 'bold' }}>
            {user.role === 'employer' ? 'Employer' : 'Job Seeker'}
          </p>
        </div>

        <div style={{
          background: '#fff3f5', padding: '20px',
          borderRadius: '10px', marginBottom: '25px',
          border: '1px solid #ffe0e6'
        }}>
          <p style={{ color: '#666', fontSize: '13px' }}>STATUS</p>
          <p style={{ color: '#e94560', fontWeight: 'bold' }}>✅ Active</p>
        </div>

        {user.role === 'employer' && (
          <button
            onClick={() => navigate('/post-job')}
            style={{
              width: '100%', padding: '12px',
              background: '#1a1a2e', color: '#fff',
              border: 'none', borderRadius: '8px',
              fontSize: '16px', cursor: 'pointer',
              marginBottom: '10px'
            }}
          >Post a New Job 📝</button>
        )}

        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '12px',
            background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', cursor: 'pointer'
          }}
        >Logout 🚪</button>
      </div>
    </div>
  )
}