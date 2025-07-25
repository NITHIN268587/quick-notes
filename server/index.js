const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/notesapp');

const NoteSchema = new mongoose.Schema({ text: String });
const Note = mongoose.model('Note', NoteSchema);

app.use(cors());
app.use(express.json());

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const note = await Note.create({ text: req.body.text });
  res.json(note);
});

app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on port 5000'));