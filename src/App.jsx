import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<h1>Crewmates</h1>} />
      </Routes>
    </div>
  )
}

export default App
