import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateForm from '../components/CrewmateForm';

// The update form for one crewmate, e.g. /edit/3
function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // The values in the form (null until the crewmate loads or if not found)
  const [crewmate, setCrewmate] = useState(null);

  // Is the crewmate still loading?
  const [isLoading, setIsLoading] = useState(true);

  // Is a save or delete running right now?
  const [isSaving, setIsSaving] = useState(false);

  // Message shown under the form after saving ("" = nothing to show)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fill the form with the crewmate's current values
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

  // Clear the "saved" message as soon as the user changes something
  const changeCrewmate = (updater) => {
    setMessage("");
    setCrewmate(updater);
  };

  const updateCrewmate = async () => {
    setIsSaving(true);
    setError("");

    const { data, error } = await supabase
      .from("crewmates")
      .update({
        name: crewmate.name.trim(),
        category: crewmate.category,
        speed: crewmate.speed,
        color: crewmate.color,
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    setIsSaving(false);

    if (error || !data) {
      setError("Couldn't save your changes. Please try again.");
      return;
    }

    // Show the saved values in the form
    setCrewmate(data);
    setMessage(`${data.name} has been updated!`);
  };

  const deleteCrewmate = async () => {
    if (!window.confirm(`Delete ${crewmate.name}? This can't be undone.`)) return;

    setIsSaving(true);
    setError("");

    const { error } = await supabase.from("crewmates").delete().eq("id", id);

    if (error) {
      setIsSaving(false);
      setError("Couldn't delete the crewmate. Please try again.");
      return;
    }

    navigate("/gallery");
  };

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

  return (
    <div className="page">
      <h1>Update Your Crewmate</h1>
      <CrewmateForm
        crewmate={crewmate}
        setCrewmate={changeCrewmate}
        onSubmit={updateCrewmate}
        submitLabel="Update Crewmate"
        isSaving={isSaving}
      />

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="edit-actions">
        <Link to={`/crewmate/${id}`} className="secondary-button">
          View Crewmate
        </Link>
        <button
          type="button"
          className="danger-button"
          onClick={deleteCrewmate}
          disabled={isSaving}
        >
          Delete Crewmate
        </button>
      </div>
    </div>
  );
}

export default EditCrewmate;
