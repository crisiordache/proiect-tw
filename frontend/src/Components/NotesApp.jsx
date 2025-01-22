import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import api from './api.js';
import './NotesApp.css';

const NotesApp = ({studentId}) => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]); 
  const [noteText, setNoteText] = useState(''); 
  const [subject, setSubject] = useState(''); 
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState(''); 
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // preluare din backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get(`/note/student/${studentId}`);
        if (response.status !== 200) {
          console.error('Eroare la obținerea notițelor:', response.statusText);
          return;
        }
        const data = response.data;
        if (data && data.length > 0) {
          // tags
          const notesWithTags = await Promise.all(
            data.map(async (note) => {
              const tagsResponse = await api.get(`/note/${note.note_id}/tags`);
              const tagsData = tagsResponse.data;
              return { ...note, tags: (tagsData.length > 0 ? tagsData.map(tag => tag.tag_name) : []) };
            })
          );
          setNotes(notesWithTags);
        }
      } catch (error) {
        console.error('Eroare la fetchNotes:', error);
      }
    };
  
    const fetchSubjects = async () => {
      try {
        const response = await api.get(`subject/`);
        if (response.status !== 200) {
          console.error('Eroare la obținerea cursurilor:', response.statusText);
          return;
        }
        const data = response.data;
        setSubjects(data);
      } catch (error) {
        console.error('Eroare la fetchSubjects:', error);
      }
    };
  
    fetchNotes();
    fetchSubjects();
  }, []);

  const handleTags = async (noteId, tagList) => {
    for (const tagName of tagList) {
      try {
        // check daca exista deja tagul
        const tagResponse = await api.get(`tag`); // tag/search?name=NUME e broken
        let tagData;

        if (tagResponse.status === 200 || tagResponse.status === 201) {
          tagData = tagResponse.data;
        }
        let foundTag = tagData.find(item => item.tag_name === tagName)
        if(!foundTag) {
          const createTagResponse = await api.post(`tag/`, {
            tag_name: tagName
          });
          foundTag = createTagResponse.data;
        }
        await api.post(`note/${noteId}/tag`, foundTag);

      } catch (error) {
        console.error(`Eroare la procesarea tag-ului "${tagName}":`, error);
      }
    }
  };

  const addNote = async () => {
    if (noteText.trim() !== '' && subject.trim() !== '' && title.trim() !== '') {
      const tagList = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const response = await api.post(`note/`, {
        title,
        content: noteText,
        subject_id: parseInt(subject, 10),
        student_id: studentId
      });

      if (response.status === 200 || response.status === 201) {
        const createdNote = response.data;
        setNotes([...notes, { ...createdNote, tags: tagList }]);
        setNoteText('');
        setSubject('');
        setTitle('');
        setTags('');

        // asociere de taguri
        if (tagList.length > 0) {
          await Promise.all(
            tagList.map(async (tagName) => {
              try {
                const tagResponse = await api.get(`tag`); // tag/search?name=NUME e broken
                console.log(tagResponse);
                let tagData;

                if (tagResponse.status === 200 || tagResponse.status === 201) {
                  tagData = tagResponse.data;
                }
                let foundTag = tagData.find(item => item.tag_name === tagName)
                if(!foundTag) {
                  const createTagResponse = await api.post(`tag/`, {
                    tag_name: tagName
                  });
                  foundTag = createTagResponse.data;
                }
                await api.post(`note/${createdNote.note_id}/tag`, foundTag);

              } catch (error) {
                console.error(`Eroare la procesarea tag-ului ${tagName}:`, error);
              }
            })
          );
        }
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await api.delete(`note/${id}/`);

      if (response.status === 200 || response.status === 201) {
        setNotes(notes.filter(note => note.note_id !== id));
      } else {
        console.error('Eroare la ștergerea notiței:', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la ștergerea notiței:', error);
    }
  };

  const startEditing = (id) => {
    const noteToEdit = notes.find(note => note.note_id === id);
    if (noteToEdit) {
      setNoteText(noteToEdit.content);
      setSubject(noteToEdit.subject_id.toString());
      setTitle(noteToEdit.title);
      setTags(noteToEdit.tags.join(', '));
      setIsEditing(true);
      setCurrentEditId(id);
    }
  };

  const saveEdit = async () => {
    if (noteText.trim() !== '' && subject.trim() !== '' && title.trim() !== '' && currentEditId !== null) {
    const tagList = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== ''); 

    const response = await api.put(`note/${currentEditId}/`, {
      title,
      content: noteText,
      subject_id: parseInt(subject, 10),
    });

    if (response.status === 200 || response.status === 201) {
      const updatedNote = response.data;
      if (tagList.length > 0) {
        await handleTags(currentEditId, tagList);
      }
      const updatedNotes = notes.map(note =>
        note.note_id === currentEditId ? { ...note, ...updatedNote, tags: tagList } :{ ...note }
      ); 
      setNotes(updatedNotes);
      setNoteText('');
      setSubject('');
      setTitle('');
      setTags('');
      setIsEditing(false);
      setCurrentEditId(null);
      alert('Notița a fost actualizată cu succes! Te rog să re-accesezi pagina pentru a vedea schimbările.') //React nu vrea sa actualizeze notita in lista indiferent ce am incercat, asa ca trebuie reincarcata pagina de notite pentru a vedeaschimbari la titlu/continut
    }
  }
};


  const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject ? note.subject_id === parseInt(selectedSubject, 10) : true;
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return matchesSubject && matchesTag;
  });

  const getSubjectName = (subjectId) => {
    const subject = subjects.find((sub) => sub.subject_id === subjectId);
    return subject ? subject.subject_name : 'Subiect necunoscut';
  };

  return (
    <div className="mainContainer">
      <h1 className="title">Notițele Mele</h1>
      <div className="container">
        {/* Partea pentru adăugare și editare notițe */}
        <div className="noteForm">
          <h2>Adaugă/Editează Notiță</h2>
          <div className="inputContainer">
            <div className="row_header">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titlul notiței..."
                className="input"
              />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input"
              >
                <option value="">Selectează un curs...</option>
                {subjects.map((subject) => (
                  <option key={subject.subject_id} value={subject.subject_id}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Scrie o notiță... (Markdown suportat)"
                className="textarea"
              ></textarea>
            </div>
            <div className="row">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Taguri (separate prin virgulă)..."
                className="input"
              />
            </div>
            <div className="row">
              {isEditing ? (
                <button onClick={saveEdit} className="addButton">Salvează</button>
              ) : (
                <button onClick={addNote} className="addButton">Adaugă</button>
              )}
            </div>
          </div>
        </div>
  
        {/* Partea pentru listarea notițelor */}
        <div className="noteList">
          <h2>Notițele Mele</h2>
          <div className="filterContainer">
            <label htmlFor="courseFilter">Filtrează după curs:</label>
            <select
              id="courseFilter"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="select"
            >
              <option value="">Toate</option>
              {subjects.map((subject) => (
                <option key={subject.subject_id} value={subject.subject_id}>
                  {subject.subject_name}
                </option>
              ))}
            </select>
  
            <label htmlFor="tagFilter">Filtrează după tag:</label>
            <select
              id="tagFilter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="select"
            >
              <option value="">Toate</option>
              {uniqueTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
  
          <ul className="notesList">
            {filteredNotes.map((note) => (
              <li key={note.note_id} className="noteItem">
                <ReactMarkdown>
                  {`**${note.title}** (${getSubjectName(note.subject_id)})  \n  \n${note.content}`}
                </ReactMarkdown>
                <p className="tags">Taguri: {note.tags.join(', ')}</p>
                <div>
                  <button onClick={() => startEditing(note.note_id)} className="editButton">Editează</button>
                  <button onClick={() => deleteNote(note.note_id)} className="deleteButton">Șterge</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;