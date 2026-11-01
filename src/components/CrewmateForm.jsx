import { SPEEDS, COLORS } from '../crewmateOptions';
import CrewmateIcon from './CrewmateIcon';

// The form for a crewmate's name, speed, and color.
// Used by both the create page and the edit page.
// `crewmate` is { name, speed, color } and `setCrewmate` updates it.
function CrewmateForm({ crewmate, setCrewmate, onSubmit, submitLabel, isSaving }) {
  // Change one attribute and keep the others
  const update = (field, value) => {
    setCrewmate((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit =
    crewmate.name.trim() !== "" && crewmate.speed && crewmate.color && !isSaving;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSubmit) onSubmit();
  };

  return (
    <form className="crewmate-form" onSubmit={handleSubmit}>
      <div className="form-preview">
        <CrewmateIcon color={crewmate.color} size={90} />
      </div>

      <label className="form-section">
        <span className="form-label">Name</span>
        <input
          type="text"
          value={crewmate.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Enter the crewmate's name"
          maxLength={30}
        />
      </label>

      <fieldset className="form-section">
        <legend className="form-label">Speed (mph)</legend>
        <div className="choices">
          {SPEEDS.map((speed) => (
            <button
              type="button"
              key={speed}
              className={crewmate.speed === speed ? "choice selected" : "choice"}
              aria-pressed={crewmate.speed === speed}
              onClick={() => update("speed", speed)}
            >
              {speed} mph
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend className="form-label">Color</legend>
        <div className="choices">
          {COLORS.map((color) => (
            <button
              type="button"
              key={color}
              className={crewmate.color === color ? "choice selected" : "choice"}
              aria-pressed={crewmate.color === color}
              onClick={() => update("color", color)}
            >
              {color}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="primary-button" disabled={!canSubmit}>
        {isSaving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default CrewmateForm;
