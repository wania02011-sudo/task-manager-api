// Part C & D: Express REST API
const express = require('express');
const app = express();

app.use(express.json());

let tasks = [{ id: 1, title: 'Learn Express', completed: false }];
let nextId = 2;

const validTitle = (t) => typeof t === 'string' && t.trim().length > 0;

// GET all tasks
app.get('/api/v1/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET one task
app.get('/api/v1/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
});

// POST create task
app.post('/api/v1/tasks', (req, res) => {
  const { title, completed = false } = req.body;
  if (!validTitle(title)) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }
  const task = { id: nextId++, title: title.trim(), completed };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update task
app.put('/api/v1/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, completed } = req.body;
  if (!validTitle(title) || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'title (string) and completed (boolean) are required' });
  }
  task.title = title.trim();
  task.completed = completed;
  res.status(200).json(task);
});

// DELETE task
app.delete('/api/v1/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const [removed] = tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted', task: removed });
});

// Unknown routes
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Bad JSON and other errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express API on http://localhost:${PORT}`));
