// Importing React library to use JSX and React features
import React from 'react'

// Importing Link from react-router-dom to navigate without page reloads
import { Link } from 'react-router-dom'

// Importing external CSS for styling the Navbar component
import './Navbar.css'

// Functional component for the Navbar
const Navbar = () => {
  return (
    // Main navigation bar element with a CSS class "navbar"
    <nav className="navbar">

      {/* Container inside the navbar for layout and alignment */}
      <div className="navbar-container">

        {/* Logo or brand name of the website, linking to the home page */}
        <Link to="/" className="navbar-brand">
          My Portfolio
        </Link>

        {/* Navigation links for routing to different pages */}
        <div className="navbar-links">
          {/* Link to the Home page */}
          <Link to="/" className="navbar-link">Home</Link>

          {/* Link to the About page */}
          <Link to="/about" className="navbar-link">About</Link>

          {/* Link to the Projects page */}
          <Link to="/projects" className="navbar-link">Projects</Link>
        </div>
      </div>
    </nav>
  )
}

// Exporting Navbar so it can be used in other components like App.jsx
export default Navbar
