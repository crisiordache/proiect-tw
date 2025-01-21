
import React, { useState, useEffect } from 'react';
import api from './api'; // Clientul Axios configurat
import './JoinStudyGroup.css';

const JoinStudyGroup = ({ studentId }) => {
  const [groupCode, setGroupCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(`Student ID primit în JoinStudyGroup din sessionStorage: ${studentId}`);
  }, [studentId]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupName) {
      setErrorMessage('Te rugăm să introduci un nume pentru grup!');
      return;
    }

    try {
      const response = await api.post('/group', { group_name: groupName }); // Creează grupul
      const groupId = response.data.id; // Obține ID-ul grupului creat
      setSuccessMessage(`Grupul "${groupName}" a fost creat cu succes!`);
      setErrorMessage('');
      setGroupName('');
    } catch (error) {
      console.error('Eroare la crearea grupului:', error);
      setErrorMessage('A apărut o eroare la crearea grupului.');
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!groupCode) {
      setErrorMessage('Te rugăm să introduci codul grupului!');
      return;
    }

    try {
      console.log(`Înscriere în grup: Student ID: ${studentId || 'Neidentificat'}, Group Code: ${groupCode}`);
      await api.post(`/group/${groupCode}/student/${studentId}`);
      setSuccessMessage(`Te-ai înscris cu succes în grupul cu codul ${groupCode}!`);
      setErrorMessage('');
      setGroupCode('');
    } catch (error) {
      console.error('Eroare la înscrierea în grup:', error);
      setErrorMessage('A apărut o eroare la înscrierea în grup.');
    }
  };

  return (
    <div className="new-join-group-container">
      <div className="messages-container">
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="cards-container">
        <div className="create-group-card">
          <h2>Creează un grup de studiu</h2>
          <form onSubmit={handleCreateGroup}>
            <div className="form-group">
              <label htmlFor="groupName">Nume grup:</label>
              <input
                type="text"
                id="groupName"
                placeholder="Introdu numele grupului"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <button type="submit">Creează Grup</button>
          </form>
        </div>

        <div className="join-group-card">
          <h2>Înscrie-te într-un grup de studiu</h2>
          <form onSubmit={handleJoinGroup}>
            <div className="form-group">
              <label htmlFor="groupCode">Cod grup:</label>
              <input
                type="text"
                id="groupCode"
                placeholder="Introdu codul grupului"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
              />
            </div>
            <button type="submit">Înscrie-mă</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinStudyGroup;

