// The crew's mission success score, shown above the crewmate list.
// `success` comes from crewSuccess().
function MissionStatus({ success }) {
  return (
    <section className={`mission-status tier-${success.tier}`}>
      <div className="mission-header">
        <h2>Mission Success: {success.score}%</h2>
        <span className="mission-label">{success.label}</span>
      </div>

      <div
        className="mission-meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={success.score}
        aria-label="Mission success"
      >
        <span style={{ width: `${success.score}%` }} />
      </div>

      <p className="mission-breakdown">
        Roles {success.rolePoints}/60 · Speed {success.speedPoints}/25 · Crew size{" "}
        {success.sizePoints}/15
      </p>
      <p className="mission-tip">{success.tip}</p>
    </section>
  );
}

export default MissionStatus;
