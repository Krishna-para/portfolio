import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, leetcode, stats, experience } from "../data.js";

const WELCOME = [
  { t: "out", v: "Hi! This is a mini terminal about me." },
  { t: "out", v: "Tap a button above, or type a word like 'projects' and press Enter." },
  { t: "out", v: "Not sure what to type? Try 'help'." },
];

// One-tap buttons so visitors who've never used a terminal can still explore.
const QUICK = [
  { cmd: "whoami", label: "About me" },
  { cmd: "experience", label: "Experience" },
  { cmd: "projects", label: "Projects" },
  { cmd: "skills", label: "Skills" },
  { cmd: "dsa", label: "LeetCode" },
  { cmd: "contact", label: "Contact" },
  { cmd: "hire", label: "Hire me" },
];

const COMMANDS = [
  "help", "whoami", "experience", "projects", "skills", "dsa", "contact",
  "resume", "power", "hire", "clear", "exit", "open interviewiq", "open vingo",
];

// Friendly words people might type instead of the real command names.
const ALIASES = {
  "?": "help", menu: "help", commands: "help", hi: "help", hello: "help", hey: "help", start: "help",
  about: "whoami", "about me": "whoami", me: "whoami", intro: "whoami", "who are you": "whoami",
  work: "experience", jobs: "experience", internship: "experience", internships: "experience", exp: "experience",
  ls: "projects", project: "projects", portfolio: "projects",
  skill: "skills", stack: "skills", tech: "skills",
  leetcode: "dsa", stats: "dsa",
  email: "contact", mail: "contact", linkedin: "contact", github: "contact",
  cv: "resume", "hire me": "hire", "hire krishna": "hire",
  close: "exit", quit: "exit", bye: "exit", cls: "clear",
};

// Small edit distance, so typos like "projcts" still get a helpful suggestion.
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function suggest(cmd) {
  let best = null;
  let bestD = Infinity;
  for (const c of COMMANDS) {
    const dd = distance(cmd, c);
    if (dd < bestD) { bestD = dd; best = c; }
  }
  return bestD <= 2 ? best : null;
}

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
    const typed = raw.trim().toLowerCase().replace(/\s+/g, " ");
    const cmd = ALIASES[typed] ?? typed;
    const out = [];
    const say = (v) => out.push({ t: "out", v });

    switch (cmd) {
      case "":
        break;
      case "help":
        say("Type any of these words and press Enter:");
        say("");
        say("  whoami        who I am, in one line");
        say("  experience    where I've worked");
        say("  projects      what I've built");
        say("  open vingo    try a project live (or 'open interviewiq')");
        say("  skills        the tech I use");
        say("  dsa           my LeetCode stats");
        say("  contact       how to reach me");
        say("  resume        how to get my resume");
        say("  power         switch the board on");
        say("  hire          you know you want to");
        say("  clear         clean the screen");
        say("  exit          close this window");
        say("");
        say("Tips: press Tab to finish a word, ↑ to reuse a command.");
        break;
      case "whoami":
        say(`${profile.name}. EE undergrad at NSUT Delhi, aspiring software engineer.`);
        stats.forEach((s) => say(`  ${s.value.padEnd(6)} ${s.label}`));
        break;
      case "experience":
        experience.forEach((e) => {
          say(`  ${e.current ? "●" : "○"} ${e.role}, ${e.org}`);
          say(`    ${e.dates}`);
        });
        break;
      case "projects":
        projects.forEach((p) => say(`  ${p.name.padEnd(12)} ${p.tagline}`));
        say("Type 'open interviewiq' or 'open vingo' to try them live.");
        break;
      case "skills":
        skills.forEach((g) => say(`  ${g.group.padEnd(10)} ${g.items.join(", ")}`));
        break;
      case "dsa":
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
          } else say(`I don't have a project called '${name}'. Try 'open vingo' or 'open interviewiq'.`);
        } else {
          const guess = suggest(cmd);
          say(
            guess
              ? `I don't know '${cmd}'. Did you mean '${guess}'?`
              : `I don't know '${cmd}'. Type 'help' to see what I understand, or tap a button above.`
          );
        }
    }
    setLines((l) => [...l, { t: "in", v: raw }, ...out]);
  };

  const quick = (cmd) => {
    run(cmd);
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const v = input.trim().toLowerCase();
      if (!v) return;
      const matches = COMMANDS.filter((c) => c.startsWith(v));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1)
        setLines((l) => [...l, { t: "in", v: input }, { t: "out", v: matches.join("   ") }]);
    } else if (e.key === "Enter") {
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
        <div className="term-quick" role="group" aria-label="Quick commands">
          {QUICK.map((q) => (
            <button key={q.cmd} className="term-chip" onClick={() => quick(q.cmd)}>
              {q.label}
            </button>
          ))}
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
              aria-label="Type a command"
              placeholder={lines.length <= WELCOME.length ? "type help and press Enter" : ""}
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