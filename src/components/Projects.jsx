import { useState } from "react";
import Section from "./Section.jsx";
import { projects } from "../data.js";

function Chip({ p }) {
  const [open, setOpen] = useState(false);
  const [shot, setShot] = useState(0);
  const imgs = p.images || [];
  const half = Math.ceil(p.stack.length / 2);
  const top = p.stack.slice(0, half);
  const bottom = p.stack.slice(half);
  return (
    <article className={`chip ${open ? "is-open" : ""}`}>
      <ul className="pins pins-top" aria-hidden="true">
        {top.map((s) => <li key={s}><span>{s}</span></li>)}
      </ul>
      <div className="chip-body">
        <div className="chip-head">
          <span className="des">{p.id}</span>
          <span className="chip-status">
            <span className="led led-green" aria-hidden="true" />
            {p.status}
          </span>
        </div>
        {imgs.length > 0 && (
          <figure className="chip-shot">
            <div className="shot-frame">
              {imgs.map((im, i) => (
                <img
                  key={im.src}
                  src={im.src}
                  alt={`${p.name}: ${im.label}`}
                  loading="lazy"
                  className={i === shot ? "is-shown" : ""}
                />
              ))}
            </div>
            {imgs.length > 1 && (
              <figcaption className="shot-tabs" role="group" aria-label={`${p.name} screenshots`}>
                {imgs.map((im, i) => (
                  <button
                    key={im.src}
                    className={`shot-tab ${i === shot ? "is-on" : ""}`}
                    aria-pressed={i === shot}
                    onClick={() => setShot(i)}
                  >
                    <span className="led" aria-hidden="true" />
                    {im.label}
                  </button>
                ))}
              </figcaption>
            )}
          </figure>
        )}
        <h3>{p.name}</h3>
        <p className="chip-tag">{p.tagline}</p>

        <div className="chip-detail" id={`detail-${p.id}`} hidden={!open}>
          <p>{p.problem}</p>
          <h4>What I built</h4>
          <ul className="built">
            {p.built.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <p className="stack-line">
            <span className="sr-only">Tech stack: </span>
            {p.stack.join(", ")}
          </p>
        </div>

        <div className="chip-actions">
          <button
            className="btn btn-small"
            aria-expanded={open}
            aria-controls={`detail-${p.id}`}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Hide details" : "How I built it"}
          </button>
          {p.live && (
            <a className="btn btn-small btn-pad" href={p.live} target="_blank" rel="noreferrer">
              Open live site
            </a>
          )}
          <a className="btn btn-small" href={p.code} target="_blank" rel="noreferrer">
            View code
          </a>
        </div>
      </div>
      <ul className="pins pins-bottom" aria-hidden="true">
        {bottom.map((s) => <li key={s}><span>{s}</span></li>)}
      </ul>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" designator="U3–U4" title="Things I've shipped">
      <p className="lede">
        Each chip's pins are the tech it runs on. The live demos run on free servers, so the first load can take about 30 seconds to wake up.
      </p>
      <div className="chips">
        {projects.map((p) => <Chip key={p.id} p={p} />)}
      </div>
    </Section>
  );
}
