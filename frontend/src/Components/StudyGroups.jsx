import React, { useEffect, useState } from 'react';
import api from './api'; // Clientul Axios configurat

const StudyGroups = ({ studentId }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const studentId = sessionStorage.getItem('studentId');

    if (!studentId) {
      console.error('Student ID nu este salvat în sessionStorage. Asigură-te că utilizatorul este autentificat.');
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
        <ul>
          {groups.map((group) => (
            <li key={group.group_id}>{group.group_name}</li>
          ))}
        </ul>
      ) : (
        !error && <p>Nu ești înscris în niciun grup de studiu.</p>
      )}
    </div>
  );
};

export default StudyGroups;
