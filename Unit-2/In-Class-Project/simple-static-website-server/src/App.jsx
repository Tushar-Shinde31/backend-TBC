import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  return (
    <div id="root">
      <img src={reactLogo} className="logo react" alt="React logo" />
      <div className="card">
        <h1>Welcome to the React Static Server</h1>
        <h2 style={{ color: '#646cff', marginTop: 0 }}>Express + React</h2>
        <p>This is served using an Express backend.</p>
      </div>
      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR updates.
      </p>
    </div>
  );
}

export default App;
