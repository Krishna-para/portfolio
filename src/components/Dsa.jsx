import Section from "./Section.jsx";
import { leetcode } from "../data.js";
import useLeetCode from "../useLeetCode.js";

export default function Dsa() {
  const s = useLeetCode();
  const total = s.easy + s.medium + s.hard;
  const max = Math.max(s.easy, s.medium, s.hard);
  const cells = [
    { id: "B1", label: "Easy", n: s.easy, color: "var(--led-green)" },
    { id: "B2", label: "Medium", n: s.medium, color: "var(--copper)" },
    { id: "B3", label: "Hard", n: s.hard, color: "var(--led-red)" },
  ];
  const extras = [
    { id: "TP1", value: leetcode.contestRating.toLocaleString("en-IN"), label: `contest rating, top ${leetcode.topPercent}%` },
    { id: "TP2", value: `${leetcode.maxStreak} days`, label: "longest daily streak" },
    { id: "TP3", value: leetcode.activeDays, label: "active days this year" },
  ];
  return (
    <Section id="dsa" designator="B1–B3" title={`${total} problems and counting`}>
      <p className="lede">
        DSA isn't just interview prep for me. Here's where my LeetCode practice stands, charged by difficulty.
      </p>
      <div className="batteries">
        {cells.map((c) => (
          <div className="battery" key={c.id}>
            <div className="battery-body" style={{ "--fill-n": (c.n / max).toFixed(3), "--cell": c.color }}>
              <span className="battery-fill" />
            </div>
            <span className="battery-cap" aria-hidden="true" />
            <p className="battery-label">
              <span className="battery-n">{c.n}</span>
              <span>{c.label}</span>
              <span className="des">{c.id}</span>
            </p>
          </div>
        ))}
      </div>
      <ul className="testpoints">
        {extras.map((e) => (
          <li key={e.id}>
            <span className="tp-ring" aria-hidden="true" />
            <span className="tp-value">{e.value}</span>
            <span className="tp-label">{e.label}</span>
          </li>
        ))}
      </ul>
      <p className="dsa-foot">
        <span className={`sync ${s.live ? "is-live" : ""}`}>
          <span className="led led-green" aria-hidden="true" />
          {s.live ? "Synced live from LeetCode" : "Updated November 2026"}
        </span>
        <a className="link" href={leetcode.profile} target="_blank" rel="noreferrer">
          See my LeetCode profile
        </a>
      </p>
    </Section>
  );
}
