const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('friends.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/friends', (req, res) => {
  const { name, notes } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const stmt = db.prepare('INSERT INTO friends (name, notes) VALUES (?, ?)');
  const result = stmt.run(name.trim(), notes ? notes.trim() : '');
  res.json({ id: result.lastInsertRowid, name: name.trim(), notes: notes ? notes.trim() : '' });
});

app.get('/friends', (req, res) => {
  const friends = db.prepare('SELECT * FROM friends ORDER BY created_at DESC').all();
  res.json(friends);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Stay Close running at http://localhost:${PORT}`);
});
