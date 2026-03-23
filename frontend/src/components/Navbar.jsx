import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ background: '#1a1a2e', padding: '15px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#e94560', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          KK Job Portal
        </Link>
        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none', border: 'none',
            color: '#fff', fontSize: '24px', cursor: 'pointer'
          }}
          className="hamburger"
        >☰</button>
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Jobs</Link>
          <Link to="/post-job" style={{ color: '#fff', textDecoration: 'none' }}>Post Job</Link>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '15px', marginTop: '15px',
          padding: '10px 0'
        }}>
          <Link to="/" onClick={() => setOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Jobs</Link>
          <Link to="/post-job" onClick={() => setOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Post Job</Link>
          <Link to="/login" onClick={() => setOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" onClick={() => setOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          <Link to="/profile" onClick={() => setOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}