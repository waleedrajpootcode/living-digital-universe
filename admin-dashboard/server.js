// Native Zero-Dependency Local Backend (No npm install required!)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DATA_FILE = path.join(__dirname, '../data/projects.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // 1. API: Get Data
  if (req.url === '/api/data' && req.method === 'GET') {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(raw);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to read data file' }));
    }
  }

  // 2. API: Save or Update Project
  if (req.url === '/api/projects' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const proj = JSON.parse(body);
        const db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const idx = db.projects.findIndex(p => p.id === proj.id);

        if (idx !== -1) {
          db.projects[idx] = { ...db.projects[idx], ...proj };
        } else {
          db.projects.push(proj);
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: true, message: 'Project saved successfully!' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Failed to save project' }));
      }
    });
    return;
  }

  // 3. API: Delete Project
  if (req.url.startsWith('/api/projects/') && req.method === 'DELETE') {
    const id = req.url.replace('/api/projects/', '');
    try {
      const db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      db.projects = db.projects.filter(p => p.id !== id);

      fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: 'Project deleted!' }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to delete project' }));
    }
  }

  // 4. Serve Static Admin GUI Files
  const cleanUrl = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ AETHERIS PRO CONTROL STUDIO RUNNING (ZERO-DEP)`);
  console.log(`👉 Open Studio in Browser: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});