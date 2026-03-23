import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [search, location, type])

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${API}/api/jobs`, {
        params: { search, location, type }
      })
      setJobs(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Find Your Dream Job 🚀</h2>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px', flex: 1, borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <input
          placeholder="Location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={{ padding: '10px', width: '200px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* Job Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {jobs.length === 0 ? (
          <p>No jobs found. Backend connect ஆனதும் jobs வரும்!</p>
        ) : (
          jobs.map(job => (
            <div key={job._id} style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#1a1a2e' }}>{job.title}</h3>
              <p style={{ color: '#666' }}>{job.company}</p>
              <p style={{ color: '#888' }}>📍 {job.location}</p>
              <p style={{ color: '#e94560' }}>💼 {job.type}</p>
              <Link to={`/job/${job._id}`} style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 16px',
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none'
              }}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}