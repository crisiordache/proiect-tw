import React, { useState } from 'react';
import './JoinStudyGroup.css';

const JoinStudyGroup = () => {
  const [groupCode, setGroupCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [groups] = useState([
    { id: 1, name: 'Algebra Liniara' },
    { id: 2, name: 'Tehnologii Web' },
    { id: 3, name: 'POO' },
  ]);

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (groupCode) {
      setSuccessMessage(`Te-ai înscris cu succes în grupul ${groupCode}!`);
      setErrorMessage('');
      setGroupCode('');
      setGroupName('');
    } else
    
    if(groupName) {

        setSuccessMessage(`Te-ai înscris cu succes în grupul ${groupName}!`);
        setErrorMessage('');
        setGroupCode('');
        setGroupName('');
    }
    else {
      setErrorMessage('Te rugăm să introduci un cod de grup sau să selectezi un grup!');
      setSuccessMessage('');
    }
  };

  return (
    <div className="new-join-group-container">
      <div className="join-group-card">
        <h2>Înscriere într-un grup de studiu</h2>
        <p>Alege un grup existent sau înscrie-te cu un cod personalizat!</p>
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
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            >
              <option value="">-- Selectează un grup --</option>
              {groups.map((group) => (
                <option key={group.id} value={group.name}>
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
