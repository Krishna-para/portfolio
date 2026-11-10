import Section from "./Section.jsx";
import { about, stats, profile } from "../data.js";

export default function About() {
  return (
    <Section id="about" designator="U2" title="From circuits to code">
      <div className="about">
        <div className="about-text">
          {profile.photo && (
            <figure className="cam">
              <div className="cam-board">
                <span className="cam-hole" /><span className="cam-hole" />
                <span className="cam-hole" /><span className="cam-hole" />
                <div className="cam-lens">
                  <img src={profile.photo} alt="Krishna Para" width="220" height="220" />
                </div>
              </div>
              <figcaption><span className="des">CAM1</span> That's me, hi.</figcaption>
            </figure>
          )}
          {about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label} className="cap">
              <span className="cap-value">{s.value}</span>
              <span className="cap-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
