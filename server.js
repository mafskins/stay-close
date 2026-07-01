const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('friends.db');

db.exec('CREATE TABLE IF NOT EXISTS friends (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, notes TEXT, relationship TEXT DEFAULT ' + "'Mate'" + ', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, last_contacted DATETIME, last_chat TEXT)');
db.exec('CREATE TABLE IF NOT EXISTS milestones (id INTEGER PRIMARY KEY AUTOINCREMENT, friend_id INTEGER NOT NULL, label TEXT NOT NULL, month INTEGER NOT NULL, day INTEGER NOT NULL, FOREIGN KEY(friend_id) REFERENCES friends(id) ON DELETE CASCADE)');

try { db.exec('ALTER TABLE friends ADD COLUMN last_contacted DATETIME'); } catch (_) {}
try { db.exec("ALTER TABLE friends ADD COLUMN relationship TEXT DEFAULT 'Mate'"); } catch (_) {}
try { db.exec('ALTER TABLE friends ADD COLUMN last_chat TEXT'); } catch (_) {}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/friends', (req, res) => {
  const friends = db.prepare('SELECT * FROM friends ORDER BY CASE WHEN last_contacted IS NULL THEN 0 ELSE 1 END ASC, COALESCE(last_contacted, created_at) ASC').all();
  res.json(friends);
});

app.post('/friends', (req, res) => {
  const { name, notes, relationship } = req.body;
  if (!name || name.trim() === '') return res.status(400).json({ error: 'Name is required' });
  const result = db.prepare('INSERT INTO friends (name, notes, relationship) VALUES (?, ?, ?)').run(name.trim(), notes ? notes.trim() : '', relationship || 'Mate');
  res.json({ id: result.lastInsertRowid, name: name.trim() });
});

app.patch('/friends/:id', (req, res) => {
  const { notes } = req.body;
  const result = db.prepare('UPDATE friends SET notes = ? WHERE id = ?').run(notes, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

app.post('/friends/:id/checkin', (req, res) => {
  const { chat } = req.body;
  const result = db.prepare('UPDATE friends SET last_contacted = CURRENT_TIMESTAMP, last_chat = ? WHERE id = ?').run(chat || null, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

app.delete('/friends/:id', (req, res) => {
  const result = db.prepare('DELETE FROM friends WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

app.get('/milestones', (req, res) => {
  const rows = db.prepare('SELECT m.*, f.name as friend_name FROM milestones m JOIN friends f ON f.id = m.friend_id').all();
  res.json(rows);
});

app.get('/friends/:id/milestones', (req, res) => {
  const rows = db.prepare('SELECT * FROM milestones WHERE friend_id = ?').all(req.params.id);
  res.json(rows);
});

app.post('/friends/:id/milestones', (req, res) => {
  const { label, month, day } = req.body;
  if (!label || !month || !day) return res.status(400).json({ error: 'label, month and day required' });
  const result = db.prepare('INSERT INTO milestones (friend_id, label, month, day) VALUES (?, ?, ?, ?)').run(req.params.id, label, month, day);
  res.json({ id: result.lastInsertRowid });
});

app.delete('/milestones/:id', (req, res) => {
  db.prepare('DELETE FROM milestones WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Stay Close running on port ' + PORT));
