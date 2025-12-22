import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/itinerary', label: 'Itinerary' },
  { to: '/trips', label: 'Saved Trips' },
]

export default function NavBar() {
  const navigate = useNavigate()
  if (location.pathname === "/auth") { 
    return null
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link text-decoration-none" type="button" onClick={() => navigate('/')}>
          JapanHatsu
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.to}>
                <Link className="nav-link" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-dark" to="/auth">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}