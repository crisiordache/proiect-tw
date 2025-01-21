import React, { useState, useEffect, useRef } from 'react';
import api from './api';
import './JoinStudyGroup.css';

const JoinStudyGroup = ({ studentId, onClose }) => {
  const [groups, setGroups] = useState([]);
  const [groupCode, setGroupCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const joinGroupRef = useRef(null);

  // Preluarea grupurilor disponibile
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('/group');
        setGroups(response.data);
      } catch (error) {
        console.error('Eroare la preluarea grupurilor:', error);
        setErrorMessage('Nu am putut încărca grupurile de studiu.');
      }
    };

    fetchGroups();

    // Închidere la click în afara componentei
    const handleClickOutside = (event) => {
      if (joinGroupRef.current && !joinGroupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Gestionarea înscrierii într-un grup
  const handleJoinGroup = async (e) => {
    e.preventDefault();

    if (!groupCode && !selectedGroup) {
      setErrorMessage('Te rugăm să introduci un cod de grup sau să selectezi un grup!');
      return;
    }

    const groupId = groupCode || selectedGroup;

    try {
      const response = await api.post(`/group/${groupId}/student/${studentId}`);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(`Te-ai înscris cu succes în grupul "${groupId}"!`);
        setErrorMessage('');
        setGroupCode('');
        setSelectedGroup('');
      }
    } catch (error) {
      console.error('Eroare la înscrierea în grup:', error);
      setErrorMessage(
        error.response?.data?.error || 'A apărut o eroare la înscrierea în grup.'
      );
    }
  };

  return (
    <div className="join-group-container">
      <div className="join-group-card" ref={joinGroupRef}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Înscriere într-un grup de studiu</h2>
        <p>Alege un grup existent sau înscrie-te cu un cod personalizat!</p>

        {/* Mesaje */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
          <div className="form-group">
            <label htmlFor="groupSelect">Selectează un grup:</label>
            <select
              id="groupSelect"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">-- Selectează un grup --</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Înscrie-mă</button>
        </form>
      </div>
    </div>
  );
};

export default JoinStudyGroup;
