import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation(); // Obține ruta curentă
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Stare pentru panoul glisant

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Te-ai deconectat!');
  };

  return (
    <>
      <nav className="navbar">
        {/* Titlul se schimbă în funcție de ruta curentă */}
        <div className="navbar-logo">
          {location.pathname === '/groups' ? 'Grupuri de Studiu' : 'HOME'}
        </div>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              {location.pathname !== '/notes' && ( // Ascunde dacă ești pe /notes
                <Link to="/notes" className="navbar-link">
                  Notițe
                </Link>
              )}
              {location.pathname !== '/groups' && ( // Ascunde dacă ești pe /groups
                <Link to="/groups" className="navbar-link">
                  Grupuri de Studiu
                </Link>
              )}
              {location.pathname === '/groups' && ( // Arată doar pe pagina grupurilor
                <button
                  className="navbar-link add-btn"
                  onClick={() => setIsPanelOpen(true)}
                >
                  Adaugă Grup
                </button>
              )}
              <button onClick={handleLogout} className="navbar-link register-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link register-btn">
                Înregistrare
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Panoul glisant pentru adăugarea unui grup */}
      {isPanelOpen && (
        <div className="slide-out-panel open">
          <button
            className="close-panel-btn"
            onClick={() => setIsPanelOpen(false)}
          >
            &times;
          </button>
          <h2>Adaugă un Grup Nou</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Grup adăugat cu succes!');
              setIsPanelOpen(false); // Închide panoul după adăugare
            }}
          >
            <div className="form-group">
              <label htmlFor="newGroupName">Nume Grup:</label>
              <input
                type="text"
                id="newGroupName"
                placeholder="Introdu numele grupului"
              />
            </div>
            <button type="submit">Adaugă Grup</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
