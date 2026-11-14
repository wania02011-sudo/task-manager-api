// Part B: server using only the core http module
const http = require('http');

const tasks = [{ id: 1, title: 'Learn Node.js', completed: false }];
let nextId = 2;

const send = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    return send(res, 200, { message: 'Welcome to the Task Manager (core http)' });
  }

  if (method === 'GET' && url === '/about') {
    return send(res, 200, { name: 'Task Manager', version: '1.0.0' });
  }

  if (method === 'GET' && url === '/tasks') {
    return send(res, 200, tasks);
  }

  if (method === 'POST' && url === '/tasks') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { title } = JSON.parse(body);
        if (!title || typeof title !== 'string') {
          return send(res, 400, { error: 'title is required' });
        }
        const task = { id: nextId++, title: title.trim(), completed: false };
        tasks.push(task);
        send(res, 201, task);
      } catch {
        send(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  send(res, 404, { error: 'Route not found' });
});

server.listen(3001, () => console.log('Core http server on http://localhost:3001'));
