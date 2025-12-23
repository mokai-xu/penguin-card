import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
const distPath = join(__dirname, 'dist');
app.use(express.static(distPath));

// Handle React Router - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = join(distPath, 'index.html');
  
  if (!existsSync(indexPath)) {
    res.status(500).send('Application not built. Please run "npm run build" first.');
    return;
  }

  try {
    const html = readFileSync(indexPath, 'utf8');
    res.send(html);
  } catch (error) {
    console.error('Error loading index.html:', error);
    res.status(500).send('Error loading application');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving files from: ${distPath}`);
});

