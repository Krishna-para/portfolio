import Section from "./Section.jsx";
import { skills } from "../data.js";

export default function Skills() {
  return (
    <Section id="skills" designator="J1" title="What I build with">
      <div className="headers">
        {skills.map((g) => (
          <div className="header-row" key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((s) => <li key={s} className="pad">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
