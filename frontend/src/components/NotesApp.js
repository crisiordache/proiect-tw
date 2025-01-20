import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './NotesApp.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [course, setCourse] = useState('');
  const [title, setTitle] = useState(''); 
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null); // Indexul notiței în editare

  const addNote = () => {
    if (noteText.trim() !== '' && course.trim() !== '' && title.trim() !== '') {
      setNotes([...notes, { title, text: noteText, course }]);
      setNoteText(''); 
      setCourse(''); 
      setTitle(''); // Resetarea campurilor de text
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const startEditing = (index) => {
    setNoteText(notes[index].text);
    setCourse(notes[index].course);
    setTitle(notes[index].title);
    setIsEditing(true);
    setCurrentEditIndex(index);
  };

  const saveEdit = () => {
    if (noteText.trim() !== '' && course.trim() !== '' && title.trim() !== '' && currentEditIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === currentEditIndex ? { title, text: noteText, course } : note
      );
      setNotes(updatedNotes);
      setNoteText('');
      setCourse('');
      setTitle('');
      setIsEditing(false);
      setCurrentEditIndex(null);
    }
  };

  // Lista de cursuri existente in notite introduse
  const uniqueCourses = Array.from(new Set(notes.map(note => note.course)));

  // Filtrarea notițelor în funcție de cursul selectat
  const filteredNotes = selectedCourse
    ? notes.filter(note => note.course === selectedCourse)
    : notes;

  return (
    <div className="container">
      <h1 className="title">Notițele Mele</h1>

      <div className="inputContainer">
        <div className="row_header">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu"
            className="input"
          />
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Curs"
            className="input"
          />
        </div>
        <div className="row">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Scrie o notiță... (Markdown suportat)"
            className="textarea largeTextarea"
          ></textarea>
        </div>
        <div className="row">
          {isEditing ? (
            <button onClick={saveEdit} className="addButton">Salvează</button>
          ) : (
            <button onClick={addNote} className="addButton">Adaugă</button>
          )}
        </div>
      </div>

      <div className="filterContainer">
        <label htmlFor="courseFilter">Filtrează după curs:</label>
        <select
          id="courseFilter"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="select"
        >
          <option value="">Toate</option>
          {uniqueCourses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <ul className="notesList">
        {filteredNotes.map((note, index) => (
          <li key={index} className="noteItem">
            <ReactMarkdown>
              {`**[(${note.course}) ${note.title}]**  \n${note.text}`}
            </ReactMarkdown>
            <div>
              <button onClick={() => startEditing(index)} className="editButton">Editează</button>
              <button onClick={() => deleteNote(index)} className="deleteButton">Șterge</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;
