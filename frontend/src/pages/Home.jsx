import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [search, location, type])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API}/api/jobs`, {
        params: { search, location, type }
      })
      setJobs(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const typeColor = (type) => {
    if (type === 'full-time') return '#1565c0'
    if (type === 'part-time') return '#6a1b9a'
    if (type === 'remote') return '#2e7d32'
    return '#0277bd'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #e3f2fd 0%, #f5f5f5 100%)',
      padding: '30px 20px'
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 42px)',
          fontWeight: '800',
          color: '#0d47a1',
          margin: '0 0 8px 0',
          animation: 'fadeDown 0.6s ease'
        }}>
          Find Your Dream Job 🚀
        </h1>
        <p style={{ color: '#546e7a', fontSize: '16px' }}>
          Thousands of jobs waiting for you!
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '35px',
        flexWrap: 'wrap',
        maxWidth: '900px',
        margin: '0 auto 35px auto',
        animation: 'fadeUp 0.6s ease'
      }}>
        <input
          placeholder="🔍 Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '12px 16px',
            flex: 1,
            minWidth: '200px',
            borderRadius: '12px',
            border: '2px solid #90caf9',
            fontSize: '15px',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(13,71,161,0.08)',
            transition: 'border 0.3s'
          }}
        />
        <input
          placeholder="📍 Location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={{
            padding: '12px 16px',
            width: '180px',
            borderRadius: '12px',
            border: '2px solid #90caf9',
            fontSize: '15px',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(13,71,161,0.08)'
          }}
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid #90caf9',
            fontSize: '15px',
            outline: 'none',
            background: '#fff',
            cursor: 'pointer'
          }}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div className="spinner"></div>
          <p style={{ color: '#1565c0', marginTop: '15px', fontSize: '16px' }}>Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#90a4ae' }}>
          <p style={{ fontSize: '18px' }}>No jobs found 😔</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {jobs.map((job, i) => (
            <div
              key={job._id}
              onMouseEnter={() => setHoveredId(job._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: hoveredId === job._id
                  ? '0 12px 32px rgba(13,71,161,0.2)'
                  : '0 4px 12px rgba(0,0,0,0.08)',
                transform: hoveredId === job._id ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                borderTop: '4px solid #1565c0',
                animation: `fadeUp 0.4s ease ${i * 0.05}s both`
              }}
            >
              <h3 style={{
                color: '#0d47a1',
                marginBottom: '8px',
                fontSize: '18px',
                fontWeight: '700'
              }}>{job.title}</h3>

              <p style={{
                color: '#455a64',
                fontWeight: '600',
                marginBottom: '6px'
              }}>🏢 {job.company}</p>

              <p style={{ color: '#78909c', marginBottom: '6px' }}>
                📍 {job.location}
              </p>

              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '20px',
                background: typeColor(job.type) + '15',
                color: typeColor(job.type),
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '16px',
                border: `1px solid ${typeColor(job.type)}40`
              }}>
                💼 {job.type}
              </span>

              <br />
              <Link to={`/job/${job._id}`} style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(13,71,161,0.3)'
              }}>View Details →</Link>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid #e3f2fd;
          border-top: 5px solid #1565c0;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: #1565c0 !important;
          box-shadow: 0 0 0 3px rgba(21,101,192,0.15) !important;
        }
      `}</style>
    </div>
  )
}