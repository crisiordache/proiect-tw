import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import JoinStudyGroup from './Components/JoinStudyGroup';
import NotesApp from './components/NotesApp';

function App() {
  return (
    <div className="App">
      
      <JoinStudyGroup/>
      <NotesApp />
    </div>
  );
}

export default App;
