import { Link } from 'react-router-dom';
import CrewmateIcon from '../components/CrewmateIcon';
import { COLORS } from '../crewmateOptions';

function Home() {
  return (
    <div className="page home">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p>
        Here you can build your own crew of crewmates before sending them off
        into space. Pick a name, a speed, and a color for each one.
      </p>

      <div className="home-crew">
        {COLORS.map((color) => (
          <CrewmateIcon key={color} color={color} size={56} />
        ))}
      </div>

      <div className="home-links">
        <Link to="/create" className="primary-button">Create a Crewmate</Link>
        <Link to="/gallery" className="secondary-button">See Your Crew</Link>
      </div>
    </div>
  );
}

export default Home;
