import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateIcon from '../components/CrewmateIcon';
import { describeSpeed, CATEGORIES } from '../crewmateOptions';

// The info page for one crewmate, e.g. /crewmate/3
function CrewmateDetail() {
  const { id } = useParams();

  // The crewmate from the database (null until it comes back or if not found)
  const [crewmate, setCrewmate] = useState(null);

  // Is the request still running?
  const [isLoading, setIsLoading] = useState(true);

  // Get the crewmate whenever the id in the URL changes
  useEffect(() => {
    const fetchCrewmate = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("crewmates")
        .select()
        .eq("id", id)
        .maybeSingle();

      setCrewmate(data);
      setIsLoading(false);
    };

    fetchCrewmate();
  }, [id]);

  if (isLoading) return <div className="page"><p>Loading crewmate...</p></div>;

  if (!crewmate) {
    return (
      <div className="page">
        <h1>Crewmate not found</h1>
        <p>This crewmate may have been deleted.</p>
        <Link to="/gallery" className="secondary-button">Back to the Gallery</Link>
      </div>
    );
  }

  const role = CATEGORIES[crewmate.category];

  const createdAt =new Date(crewmate.created_at).toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="page detail">
      <CrewmateIcon color={crewmate.color} size={140} />
      <h1>{crewmate.name}</h1>

      {role && <p className="role-note">{crewmate.category}: {role.description}</p>}

      <dl className="stats">
        <div>
          <dt>Role</dt>
          <dd>{crewmate.category ?? "No role"}</dd>
        </div>
        <div>
          <dt>Speed</dt>
          <dd>{crewmate.speed} mph</dd>
        </div>
        <div>
          <dt>Color</dt>
          <dd>{crewmate.color}</dd>
        </div>
        <div>
          <dt>Crewmate #</dt>
          <dd>{crewmate.id}</dd>
        </div>
        <div>
          <dt>Joined the crew</dt>
          <dd>{createdAt}</dd>
        </div>
      </dl>

      <p className="speed-note">{describeSpeed(crewmate.speed)}</p>

      <div className="home-links">
        <Link to={`/edit/${crewmate.id}`} className="primary-button">
          Edit this Crewmate
        </Link>
        <Link to="/gallery" className="secondary-button">Back to the Gallery</Link>
      </div>
    </div>
  );
}

export default CrewmateDetail;
