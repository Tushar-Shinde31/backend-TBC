// Importing necessary components from React Router DOM for routing
import { Routes, Route } from 'react-router-dom';

// Importing custom components used in the app
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';

// The main App component - the entry point of the application
function App() {
  return (
    <>
      {/* Display the Navbar on all pages */}
      <Navbar />

      {/* Define the routes for the application using React Router */}
      <Routes>
        {/* Route for the Home page - loaded when user visits "/" */}
        <Route path="/" element={<Home />} />

        {/* Route for the About page - loaded when user visits "/about" */}
        <Route path="/about" element={<About />} />

        {/* Route for the Projects page - loaded when user visits "/projects" */}
        <Route path="/projects" element={<Projects />} />

        {/* Catch-all route for undefined paths - shows a 404 message */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

// Exporting the App component so it can be used in other files (like main.jsx)
export default App;
