import React from 'react';

const StudyGroups = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Grupuri de Studiu</h1>
      <p>Aici vei vedea lista grupurilor de studiu disponibile.</p>
      {/* Exemplu de afișare a grupurilor */}
      <ul>
        <li>Grup 1 - Matematică</li>
        <li>Grup 2 - Informatică</li>
        <li>Grup 3 - Istorie</li>
      </ul>
    </div>
  );
};

export default StudyGroups;
