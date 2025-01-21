import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('studentId');
    //alert('Te-ai deconectat!');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {location.pathname === '/groups' ? 'Grupuri de Studiu' : 'HOME'}
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            {location.pathname !== '/notes' && (
              <Link to="/notes" className="navbar-link-notes">
                Notițe
              </Link>
            )}
            {location.pathname !== '/groups' && (
              <Link to="/groups" className="navbar-link">
                Grupuri de Studiu
              </Link>
            )}
            {location.pathname === '/groups' && (
              <button
                className="navbar-link-add-btn"
                onClick={() => navigate('/join-group')}
              >
                Adaugă Grup
              </button>
            )}
            <button onClick={handleLogout} className="register-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="register-btn">
              Înregistrare
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
