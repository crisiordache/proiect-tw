import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [student_id, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/login', { student_id, email, password });
      const student = response.data.student; // Obține datele studentului din răspuns
      console.log('Răspuns autentificare:', student);
  
      // Debugging pentru a verifica structura răspunsului
      if (student) {
        const studentId = student.student_id || student.id; // Adaptează în funcție de structura API
        if (studentId) {
          sessionStorage.setItem('studentId', studentId);
          console.log(`Student ID salvat în sessionStorage: ${studentId}`);
          setError('');
          setIsLoggedIn(true);
          navigate('/'); // Redirecționează utilizatorul la pagina principală
        } else {
          console.error('Student ID nu a fost găsit în răspunsul API!');
          setError('Datele de autentificare sunt incomplete!');
        }
      } else {
        console.error('Răspuns invalid de la server: student null sau undefined.');
        setError('Autentificare eșuată!');
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
