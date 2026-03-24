import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Jobs' },
    { to: '/post-job', label: 'Post Job' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
    { to: '/profile', label: 'Profile' },
  ]

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        padding: '15px 30px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{
            color: '#4fc3f7',
            fontSize: '22px',
            fontWeight: 'bold',
            textDecoration: 'none',
            letterSpacing: '1px'
          }}>
            💼 KK Job Portal
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'flex', gap: '10px' }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: location.pathname === link.to ? '#4fc3f7' : '#fff',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: location.pathname === link.to ? 'rgba(79,195,247,0.15)' : 'transparent',
                  border: location.pathname === link.to ? '1px solid #4fc3f7' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
              >{link.label}</Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid #4fc3f7',
              color: '#4fc3f7',
              fontSize: '20px',
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '5px 10px'
            }}
          >{open ? '✕' : '☰'}</button>
        </div>

        {/* Mobile Drawer */}
        <div style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                style={{
                  color: location.pathname === link.to ? '#4fc3f7' : '#fff',
                  textDecoration: 'none',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  background: location.pathname === link.to ? 'rgba(79,195,247,0.15)' : 'transparent',
                  transition: 'all 0.3s ease',
                  fontSize: '15px'
                }}
              >{link.label}</Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          .desktop-menu { display: none !important; }
        }
        a:hover {
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}