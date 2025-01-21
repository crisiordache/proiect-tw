import React, { useState } from 'react';
import api from './api'; // Importăm Axios configurat
import './Register.css'; // Stilurile pentru componentă

const Register = () => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Trimitem cererea POST către backend
      const response = await api.post('/register', {
        student_name: studentName,
        email,
        password,
      });

      if (response.status === 201) {
        // Înregistrare reușită
        setSuccess('Înregistrare reușită!');
        setError('');
        setStudentName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      // Afișăm eroarea în caz de eșec
      setError(err.response?.data?.error || 'Eroare la înregistrare!');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h2>Înregistrare</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Nume:</label>
          <input
            type="text"
            id="name"
            placeholder="Introdu numele tău"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
