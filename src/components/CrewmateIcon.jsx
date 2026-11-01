import { COLOR_VALUES } from '../crewmateOptions';

// A simple drawing of a crewmate in the given color
function CrewmateIcon({ color, size = 80 }) {
  const fill = COLOR_VALUES[color] ?? "#888";

  return (
    <div
      className="crewmate-icon"
      style={{ width: size, height: size * 1.15 }}
      aria-hidden="true"
    >
      <div className="crewmate-pack" style={{ background: fill }} />
      <div className="crewmate-body" style={{ background: fill }}>
        <div className="crewmate-visor" />
      </div>
    </div>
  );
}

export default CrewmateIcon;
