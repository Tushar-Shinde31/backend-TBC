import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Welcome to My Portfolio
      </h1>
      <p className="home-description">
        Hi, I'm a passionate developer who loves creating amazing web experiences.
      </p>
      <div className="home-buttons">
        <button className="btn-primary">
          View My Work
        </button>
        <button className="btn-secondary">
          Contact Me
        </button>
      </div>
    </div>
  )
}

export default Home
