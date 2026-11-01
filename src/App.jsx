import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import CrewmateGallery from './pages/CrewmateGallery';
import CrewmateDetail from './pages/CrewmateDetail';

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
          <Route path="/gallery" element={<CrewmateGallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="*" element={<div className="page"><h1>Page not found</h1></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
