import React, { useEffect, useState } from 'react';
import api from './api'; // Clientul Axios configurat
import './StudyGroups.css'; // Importă fișierul CSS

const StudyGroups = ({ studentId }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!studentId) {
      setError('Student ID nu este valid. Te rugăm să te autentifici din nou.');
      return;
    }

    const fetchGroups = async () => {
      try {
        const response = await api.get(`/group/student/${studentId}`);
        setGroups(response.data);
      } catch (err) {
        console.error('Eroare la obținerea grupurilor:', err);
        setError('Nu am putut încărca grupurile. Te rugăm să încerci din nou.');
      }
    };

    fetchGroups();
  }, [studentId]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Grupuri de Studiu</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && groups.length > 0 ? (
        <div className="groups-container">
          {groups.map((group) => (
            <div key={group.group_id} className="group-card">
              <h2>{group.group_name}</h2>
              <p>CHEIE ACCES: {group.group_id}</p>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Nu ești înscris în niciun grup de studiu.</p>
      )}
    </div>
  );
};

export default StudyGroups;
