import { useRef, useState } from "react";
import Section from "./Section.jsx";
import { profile } from "../data.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const burstRef = useRef(null);

  const spark = () => {
    const host = burstRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["var(--led-green)", "var(--led-red)", "var(--led-blue)", "var(--copper)"];
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("span");
      const a = (Math.PI * 2 * i) / 16;
      const d = 50 + Math.random() * 40;
      s.className = "sparkle";
      s.style.setProperty("--x", `${Math.cos(a) * d}px`);
      s.style.setProperty("--y", `${Math.sin(a) * d}px`);
      s.style.background = colors[i % colors.length];
      host.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      spark();
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Section id="contact" designator="J2" title="Let's build something" className="contact">
      <p className="lede">
        I'm open to software engineering roles. If you're hiring, or just want to talk about a problem, my inbox is open.
      </p>
      <div className="contact-row">
        <span className="burst-host" ref={burstRef}>
          <button className="btn btn-pad btn-big" onClick={copy}>
            {copied ? "Email copied" : "Copy my email"}
          </button>
        </span>
        <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
      <ul className="socials">
        <li><a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
        {profile.resume && (
          <li><a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Resume</a></li>
        )}
      </ul>
    </Section>
  );
}
