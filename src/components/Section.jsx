export default function Section({ id, designator, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="via" aria-hidden="true" />
      <header className="section-head">
        <span className="des">{designator}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}
