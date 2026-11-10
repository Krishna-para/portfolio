import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, leetcode, stats, experience } from "../data.js";

const WELCOME = [
  { t: "out", v: "krishna-os v2.0 — type 'help' to see what I can do." },
];

export default function Terminal({ open, onClose, powerOn }) {
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const go = (hash) => {
    onClose();
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const out = [];
    const say = (v) => out.push({ t: "out", v });

    switch (cmd) {
      case "":
        break;
      case "help":
        say("whoami     who is Krishna");
        say("experience where I've worked");
        say("projects   what I've shipped");
        say("skills     my stack");
        say("dsa        LeetCode stats");
        say("contact    how to reach me");
        say("resume     get my resume");
        say("power      switch the board on");
        say("hire       you know you want to");
        say("clear      clear the screen");
        say("exit       close the terminal");
        break;
      case "whoami":
        say(`${profile.name}. EE undergrad at NSUT Delhi, aspiring software engineer.`);
        stats.forEach((s) => say(`  ${s.value.padEnd(6)} ${s.label}`));
        break;
      case "experience":
      case "work":
        experience.forEach((e) => {
          say(`  ${e.current ? "●" : "○"} ${e.role}, ${e.org}`);
          say(`    ${e.dates}`);
        });
        break;
      case "projects":
      case "ls":
        projects.forEach((p) => say(`  ${p.name.padEnd(12)} ${p.tagline}`));
        say("Type 'open interviewiq' or 'open vingo' to try them live.");
        break;
      case "skills":
        skills.forEach((g) => say(`  ${g.group.padEnd(10)} ${g.items.join(", ")}`));
        break;
      case "dsa":
      case "leetcode":
        say(`  easy ${leetcode.easy} · medium ${leetcode.medium} · hard ${leetcode.hard}`);
        say(`  total ${leetcode.easy + leetcode.medium + leetcode.hard} and counting`);
        say(`  contest rating ${leetcode.contestRating} (top ${leetcode.topPercent}%)`);
        say(`  longest streak ${leetcode.maxStreak} days`);
        break;
      case "contact":
        say(`  email     ${profile.email}`);
        say(`  linkedin  ${profile.linkedin}`);
        say(`  github    ${profile.github}`);
        say(`  leetcode  ${leetcode.profile}`);
        break;
      case "resume":
        if (profile.resume) {
          window.open(profile.resume, "_blank", "noopener");
          say("Opening resume in a new tab.");
        } else say(`Email me at ${profile.email} and I'll send my resume right away.`);
        break;
      case "power":
        powerOn();
        say("Board powered. Look at those LEDs.");
        break;
      case "hire":
      case "hire krishna":
        say("Great choice. Taking you to the contact section…");
        setTimeout(() => go("#contact"), 700);
        break;
      case "sudo hire krishna":
        say("Permission granted. Offer letter pending ✓");
        break;
      case "sudo":
        say("Nice try. Try 'sudo hire krishna'.");
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        onClose();
        return;
      default:
        if (cmd.startsWith("open ")) {
          const name = cmd.slice(5);
          const p = projects.find((x) => x.name.toLowerCase() === name);
          if (p) {
            window.open(p.live || p.code, "_blank", "noopener");
            say(`Opening ${p.name}.`);
          } else say(`No project called '${name}'. Try 'projects'.`);
        } else {
          say(`command not found: ${cmd}. Type 'help' for the list.`);
        }
    }
    setLines((l) => [...l, { t: "in", v: raw }, ...out]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) { setHIdx(i); setInput(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="term-backdrop" onClick={onClose}>
      <div
        className="term"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
      >
        <div className="term-bar">
          <span className="led led-red" /><span className="led led-copper" /><span className="led led-green" />
          <span className="term-title">krishna@nsut: ~</span>
          <button className="term-close" onClick={onClose} aria-label="Close terminal">×</button>
        </div>
        <div className="term-body" ref={bodyRef}>
          {lines.map((l, i) => (
            <pre key={i} className={l.t === "in" ? "term-in" : "term-out"}>
              {l.t === "in" ? <><span className="prompt">$</span> {l.v}</> : l.v}
            </pre>
          ))}
          <div className="term-input">
            <span className="prompt">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
