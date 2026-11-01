import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateForm from '../components/CrewmateForm';

const EMPTY_CREWMATE = { name: "", speed: null, color: null };

function CreateCrewmate() {
  const navigate = useNavigate();

  // What the user has picked so far
  const [crewmate, setCrewmate] = useState(EMPTY_CREWMATE);

  // Is the new crewmate being saved right now?
  const [isSaving, setIsSaving] = useState(false);

  // Message to show if saving failed ("" = no error)
  const [error, setError] = useState("");

  const createCrewmate = async () => {
    setIsSaving(true);
    setError("");

    const { error } = await supabase.from("crewmates").insert({
      name: crewmate.name.trim(),
      speed: crewmate.speed,
      color: crewmate.color,
    });

    setIsSaving(false);

    if (error) {
      setError("Couldn't create the crewmate. Please try again.");
      return;
    }

    // Show the new crewmate at the top of the gallery
    navigate("/gallery");
  };

  return (
    <div className="page">
      <h1>Create a New Crewmate</h1>
      <CrewmateForm
        crewmate={crewmate}
        setCrewmate={setCrewmate}
        onSubmit={createCrewmate}
        submitLabel="Create Crewmate"
        isSaving={isSaving}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreateCrewmate;
