import { profile } from "../data.js";

export default function Hero({ powered, onToggle, onTerminal }) {
  return (
    <header className="hero">
      <div className="via" aria-hidden="true" />
      <div className="hero-main">
        <span className="des">U1</span>
        <h1 className="name">
          <span>Krishna</span>
          <span>Para</span>
        </h1>
        <p className="pitch">{profile.pitch}</p>
        <p className="intro">{profile.intro}</p>
        <p className="status">
          <span className="led led-green" aria-hidden="true" />
          {profile.status}
        </p>
        <div className="actions">
          <a className="btn btn-pad" href="#projects">See my projects</a>
          {profile.resume && (
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
          )}
          <button className="btn" onClick={onTerminal}>Open terminal</button>
        </div>
      </div>

      <div className="switch-wrap">
        <span className="des">SW1</span>
        <button
          className="power"
          role="switch"
          aria-checked={powered}
          aria-label="Power the board"
          onClick={onToggle}
        >
          <span className="power-track">
            <span className="power-knob" />
          </span>
          <span className="power-labels" aria-hidden="true">
            <span>ON</span>
            <span>OFF</span>
          </span>
        </button>
        <p className="switch-hint" aria-live="polite">
          {powered ? "Board powered. Scroll to follow the current." : "Flip the switch to power the board."}
        </p>
      </div>
    </header>
  );
}
