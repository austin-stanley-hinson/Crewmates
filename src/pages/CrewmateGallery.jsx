import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateIcon from '../components/CrewmateIcon';

// The summary page: every crewmate, newest first
function CrewmateGallery() {
  // All crewmates from the database (empty until the data comes back)
  const [crewmates, setCrewmates] = useState([]);

  // Is the request still running?
  const [isLoading, setIsLoading] = useState(true);

  // Message to show if the request failed ("" = no error)
  const [error, setError] = useState("");

  // Get the crewmates once, when the page first loads
  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        setError("Couldn't load your crewmates. Please refresh the page.");
      } else {
        setCrewmates(data);
      }
      setIsLoading(false);
    };

    fetchCrewmates();
  }, []);

  if (isLoading) return <div className="page"><p>Loading your crew...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <h1>Your Crewmate Gallery</h1>

      {crewmates.length === 0 ? (
        <div className="empty">
          <p>You haven't made a crewmate yet!</p>
          <Link to="/create" className="primary-button">Create one here</Link>
        </div>
      ) : (
        <div className="gallery">
          {crewmates.map((crewmate) => (
            <div className="crewmate-card" key={crewmate.id}>
              <Link to={`/crewmate/${crewmate.id}`} className="card-link">
                <CrewmateIcon color={crewmate.color} size={70} />
                <h2>{crewmate.name}</h2>
                <p className="card-role">{crewmate.category ?? "No role"}</p>
                <p>Speed: {crewmate.speed} mph</p>
                <p>Color: {crewmate.color}</p>
              </Link>
              <Link to={`/edit/${crewmate.id}`} className="secondary-button">
                Edit Crewmate
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CrewmateGallery;
