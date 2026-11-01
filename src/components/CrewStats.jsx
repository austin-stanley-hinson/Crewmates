import { CATEGORY_NAMES, COLORS, COLOR_VALUES } from '../crewmateOptions';

// Count how many crewmates have each value, as a percent of the crew.
// Only values at least one crewmate has are kept, biggest first.
function breakdown(crewmates, field, values) {
  return values
    .map((value) => {
      const count = crewmates.filter((c) => c[field] === value).length;
      return { value, count, percent: Math.round((count / crewmates.length) * 100) };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count);
}

// One bar per value, sized by its percent of the crew
function BreakdownBars({ rows, colorFor }) {
  return (
    <ul className="bars">
      {rows.map((row) => (
        <li key={row.value}>
          <span className="bar-label">{row.value}</span>
          <span className="bar-track">
            <span
              className="bar-fill"
              style={{ width: `${row.percent}%`, background: colorFor?.(row.value) }}
            />
          </span>
          <span className="bar-value">{row.percent}%</span>
        </li>
      ))}
    </ul>
  );
}

// Summary statistics about the whole crew, shown above the gallery
function CrewStats({ crewmates }) {
  const total = crewmates.length;
  const averageSpeed =
    crewmates.reduce((sum, c) => sum + Number(c.speed), 0) / total;
  const fastest = crewmates.reduce((best, c) =>
    Number(c.speed) > Number(best.speed) ? c : best,
  );

  const roles = breakdown(crewmates, "category", CATEGORY_NAMES);
  const colors = breakdown(crewmates, "color", COLORS);

  return (
    <section className="crew-stats">
      <h2>Crew Stats</h2>

      <dl className="stats">
        <div>
          <dt>Crew size</dt>
          <dd>{total} {total === 1 ? "crewmate" : "crewmates"}</dd>
        </div>
        <div>
          <dt>Average speed</dt>
          <dd>{averageSpeed.toFixed(1)} mph</dd>
        </div>
        <div>
          <dt>Fastest crewmate</dt>
          <dd>{fastest.name} ({fastest.speed} mph)</dd>
        </div>
      </dl>

      <div className="breakdowns">
        <div>
          <h3>Roles</h3>
          {roles.length > 0 ? (
            <BreakdownBars rows={roles} />
          ) : (
            <p className="form-hint">No crewmates have a role yet.</p>
          )}
        </div>
        <div>
          <h3>Colors</h3>
          <BreakdownBars rows={colors} colorFor={(color) => COLOR_VALUES[color]} />
        </div>
      </div>
    </section>
  );
}

export default CrewStats;
