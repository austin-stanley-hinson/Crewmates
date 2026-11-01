import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';

function App() {
  // Start at the top of the page when going to a new page
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="*" element={<div className="page"><h1>Page not found</h1></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
