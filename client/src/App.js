import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get('/api/notes').then(res => setNotes(res.data));
  }, []);

  const addNote = async () => {
    const res = await axios.post('/api/notes', { text });
    setNotes([...notes, res.data]);
    setText("");
  };

  const deleteNote = async (id) => {
    await axios.delete('/api/notes/' + id);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quick Notes</h1>
      <input className="border p-2 mr-2" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2">Add</button>
      <ul className="mt-4">
        {notes.map(note => (
          <li key={note._id} className="flex justify-between border-b py-2">
            {note.text}
            <button onClick={() => deleteNote(note._id)} className="text-red-500">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;