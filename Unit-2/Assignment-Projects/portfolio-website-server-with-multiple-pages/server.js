// Importing express module to create a web server
import express from 'express';

// Importing path module to handle file and directory paths
import path from 'path';

// Importing fileURLToPath to convert the ES module URL to a file path
import { fileURLToPath } from 'url';

// Creating an instance of the Express application
const app = express();

// Defining the port on which the server will listen
const port = 3000;

// Getting the absolute path of the current file (__filename equivalent in ES modules)
const __filename = fileURLToPath(import.meta.url);

// Getting the directory name of the current file (__dirname equivalent)
const __dirname = path.dirname(__filename);

// Serving static files (HTML, CSS, JS, images, etc.) from the "dist" directory
// This is typically the folder where your frontend (e.g., React or Vite build) lives
app.use(express.static(path.join(__dirname, 'dist')));

// For all routes (like /about, /projects), serve index.html
// This supports client-side routing in single-page applications (like React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Starting the server and listening on the defined port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
