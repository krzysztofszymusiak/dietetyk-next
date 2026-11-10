import { RULES } from "../data";

export default function Rules() {
  return (
    <section id="regulamin" className="alt">
      <div className="w reg">
        <h2>Regulamin</h2>
        <p className="sub">Zasady współpracy w pigułce.</p>
        {RULES.map(([t, b], i) => (
          <details key={i} open={i === 0}><summary>{t}</summary><p>{b}</p></details>
        ))}
      </div>
    </section>
  );
}
