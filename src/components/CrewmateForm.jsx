import { SPEEDS, COLORS, CATEGORIES, CATEGORY_NAMES } from '../crewmateOptions';
import CrewmateIcon from './CrewmateIcon';

// The form for a crewmate's name, role, speed, and color.
// Used by both the create page and the edit page.
// `crewmate` is { name, category, speed, color } and `setCrewmate` updates it.
function CrewmateForm({ crewmate, setCrewmate, onSubmit, submitLabel, isSaving }) {
  // The speeds and colors the chosen role allows (none until a role is picked)
  const role = CATEGORIES[crewmate.category];
  const speedOptions = role ? SPEEDS.filter((s) => role.speeds.includes(s)) : [];
  const colorOptions = role ? COLORS.filter((c) => role.colors.includes(c)) : [];

  // Change one attribute and keep the others
  const update = (field, value) => {
    setCrewmate((prev) => ({ ...prev, [field]: value }));
  };

  // Picking a new role clears any speed or color that role doesn't allow
  const chooseCategory = (category) => {
    const allowed = CATEGORIES[category];
    setCrewmate((prev) => ({
      ...prev,
      category,
      speed: allowed.speeds.includes(prev.speed) ? prev.speed : null,
      color: allowed.colors.includes(prev.color) ? prev.color : null,
    }));
  };

  const canSubmit =
    crewmate.name.trim() !== "" &&
    crewmate.category &&
    crewmate.speed &&
    crewmate.color &&
    !isSaving;

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
        <legend className="form-label">Role</legend>
        <div className="choices">
          {CATEGORY_NAMES.map((category) => (
            <button
              type="button"
              key={category}
              className={crewmate.category === category ? "choice selected" : "choice"}
              aria-pressed={crewmate.category === category}
              onClick={() => chooseCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="form-hint">
          {role
            ? role.description
            : "Pick a role first. Each role can only use some speeds and colors."}
        </p>
      </fieldset>

      <fieldset className="form-section" disabled={!role}>
        <legend className="form-label">Speed (mph)</legend>
        {role ? (
          <div className="choices">
            {speedOptions.map((speed) => (
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
        ) : (
          <p className="form-hint">Choose a role to see the speeds.</p>
        )}
      </fieldset>

      <fieldset className="form-section" disabled={!role}>
        <legend className="form-label">Color</legend>
        {role ? (
          <div className="choices">
            {colorOptions.map((color) => (
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
        ) : (
          <p className="form-hint">Choose a role to see the colors.</p>
        )}
      </fieldset>

      <button type="submit" className="primary-button" disabled={!canSubmit}>
        {isSaving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default CrewmateForm;
