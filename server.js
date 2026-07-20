import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable gzip/deflate compression for fast asset transfers
app.use(compression());

// Serve static files from the React dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router SPA routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend production server running on port ${PORT}`);
});
