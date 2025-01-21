import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook pentru navigare

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });

      if (response.status === 200) {
        alert('Autentificare reușită!');
        setError('');
        setIsLoggedIn(true);
        navigate('/'); // Redirecționează la pagina "Home"
      }
    } catch (err) {
      console.error('Eroare la autentificare:', err);
      setError(err.response?.data?.error || 'Autentificare eșuată!');
    }
  };

  return (
    <div className="login-container">
      <h2>Autentificare</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="exemplu@stud.ase.ro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parolă:</label>
          <input
            type="password"
            id="password"
            placeholder="Introdu parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
