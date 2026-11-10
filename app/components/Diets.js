import Link from "next/link";
import { DIETS, LOREM } from "../data";

export default function Diets() {
  return (
    <section id="diety">
      <div className="w">
        <h2>Pakiety według diet</h2>
        <p className="sub">Specjalistyczne plany dla osób z konkretnymi potrzebami zdrowotnymi. {LOREM.slice(0, 50)}.</p>
        <div className="grid g3">
          {DIETS.map((d) => (
            <div key={d.id} className="card">
              <div className="img">{d.icon}</div>
              <h3>{d.name}</h3>
              <div className="price">{d.price} <small>/ miesiąc</small></div>
              <p>{d.desc}</p>
              <ul className="pm">{d.tags.map((t) => <li key={t} className="y">{t}</li>)}</ul>
              <Link className="btn" href={"/zamow?pakiet=" + d.id}>Umów konsultację</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
