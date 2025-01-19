import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificăm dacă email-ul are formatul corect
    if (email.endsWith('@stud.ase.ro')) {
      alert('Autentificare reușită!');
      setError(''); // Resetăm mesajele de eroare
    } else {
      setError('Email-ul trebuie să fie cel constituțional!'); // Mesaj de eroare
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
