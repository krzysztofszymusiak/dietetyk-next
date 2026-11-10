import Link from "next/link";
import { PACKAGES, LOREM } from "../data";

export default function Packages() {
  return (
    <section id="pakiety" className="alt">
      <div className="w">
        <h2>Pakiety</h2>
        <p className="sub">Wybierz opcję dopasowaną do swoich potrzeb. {LOREM.slice(0, 60)}.</p>
        <div className="grid g3">
          {PACKAGES.map((p) => (
            <div key={p.id} className={"card" + (p.pop ? " pop" : "")}>
              {p.pop && <span className="badge">Najpopularniejszy</span>}
              <div className="img">{p.icon}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="price">{p.price} <small>{p.per}</small></div>
              <ul className="pm">
                {p.items.map((it, i) => <li key={i} className={it[0] ? "y" : "n"}>{it[1]}</li>)}
              </ul>
              <Link className="btn" href={"/zamow?pakiet=" + p.id}>Wybieram</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
