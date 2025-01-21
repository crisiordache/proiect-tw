import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Notes from './Components/NotesApp';
import StudyGroups from './Components/StudyGroups';
import Home from './Components/Home';
import JoinStudyGroup from './Components/JoinStudyGroup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Obține `studentId` din sessionStorage
  const studentId = sessionStorage.getItem('studentId');

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('studentId');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/groups" element={<StudyGroups studentId={studentId} />} />
              <Route path="/join-group" element={<JoinStudyGroup studentId={studentId} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
