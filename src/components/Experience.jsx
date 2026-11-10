import Section from "./Section.jsx";
import { experience } from "../data.js";

export default function Experience() {
  return (
    <Section id="experience" designator="D1–D3" title="Where I've worked">
      <ol className="timeline">
        {experience.map((e) => (
          <li key={e.id} className={`job ${e.current ? "is-current" : ""}`}>
            <div className="job-rail" aria-hidden="true">
              <span className={`led ${e.current ? "led-green" : "led-copper"}`} />
            </div>
            <div className="job-body">
              <p className="job-meta">
                <span className="des">{e.id}</span>
                <span>{e.dates}</span>
                {e.current && <span className="now">Now</span>}
              </p>
              <h3>{e.role}</h3>
              <p className="job-org">
                {e.org}, {e.place}
              </p>
              <ul className="job-points">
                {e.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <ul className="job-tags">
                {e.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
