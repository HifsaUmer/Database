

import express from 'express';
import path from 'path'; // Helper module for file paths
import apiRouter from './routes/index.js'; // Import the router
import cors from 'cors'

// This helps resolve the directory name in ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4500;
app.use(cors());

// Middleware 1: Serve static files from the 'public' directory
// This makes index.html and app.js accessible to the browser.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware 2: Mount the API router
// All routes defined in api.js will now be prefixed with /api
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on http://localhost:${PORT}`);
  console.log('Your frontend should be accessible now.');
});
