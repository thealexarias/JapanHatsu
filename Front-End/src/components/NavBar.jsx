import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/itinerary", label: "Itinerary" },
  { to: "/trips", label: "Saved Trips" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, isAuthenticated, logout } = useAuth();

  // hide navbar on auth page
  if (location.pathname === "/auth") return null;

  const handleLogout = async () => {
    // hit backend to delete token serverside
    await axios.post(
      "http://127.0.0.1:8000/users/logout/",
      {},
      { headers: { Authorization: `Token ${token}` } }
    );

    // clear local auth state
    logout();

    // send user to auth page 
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid">
        <button
          className="navbar-brand btn btn-link text-decoration-none"
          type="button"
          onClick={() => navigate("/")}
        >
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
            {!isAuthenticated ? (
              <Link className="btn btn-outline-dark" to="/auth">
                Login / Sign Up
              </Link>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
