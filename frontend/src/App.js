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

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          {/* Rute pentru autentificare */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />

          {/* Rute protejate pentru utilizatori autentificați */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/groups" element={<StudyGroups />} />
              <Route path="/join-group" element={<JoinStudyGroup />} />
            </>
          ) : (
            <>
              {/* Redirecționează toate rutele neautorizate către login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
