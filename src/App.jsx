import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Dsa from "./components/Dsa.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Terminal from "./components/Terminal.jsx";

export default function App() {
  const [powered, setPowered] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("powered", powered);
  }, [powered]);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (e.key === "`" || e.key === "~") {
        if (tag === "INPUT" && !termOpen) return;
        e.preventDefault();
        setTermOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [termOpen]);

  return (
    <>
      <a className="skip" href="#projects">Skip to projects</a>
      <main className="board">
        <div className="trace" aria-hidden="true"><span className="current" /></div>
        <Hero
          powered={powered}
          onToggle={() => setPowered((p) => !p)}
          onTerminal={() => setTermOpen(true)}
        />
        <About />
        <Experience />
        <Dsa />
        <Projects />
        <Skills />
        <Contact />
        <footer className="foot">
          <p>
            Designed and built by Krishna Para with React and Vite. Press{" "}
            <kbd>~</kbd> for the terminal.
          </p>
        </footer>
      </main>
      <Terminal open={termOpen} onClose={() => setTermOpen(false)} powerOn={() => setPowered(true)} />
    </>
  );
}
