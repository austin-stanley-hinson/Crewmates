import { NavLink } from 'react-router-dom';

// Links to every page, shown on the side of every page
function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" end className="sidebar-title">
        Crewmates
      </NavLink>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/create">Create a Crewmate</NavLink>
      <NavLink to="/gallery">Crewmate Gallery</NavLink>
    </nav>
  );
}

export default Sidebar;
