"use client";
import { useState, useEffect, useRef } from "react";
import { PACKAGES, DIETS } from "../data";

function Dropdown({ label, items, target, onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return (
    <div className="dd" ref={ref}>
      <button onClick={() => setOpen(!open)}>{label} ▾</button>
      {open && (
        <div className="list">
          {items.map((i) => (
            <a key={i.id} href={"#" + target} onClick={() => { setOpen(false); onPick(); }}>{i.name}</a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [m, setM] = useState(false);
  const close = () => setM(false);
  return (
    <header>
      <div className="w">
        <nav>
          <a className="logo" href="#top" style={{ textDecoration: "none" }}>🥗 Kuba Ciesielski</a>
          <button className="burger" onClick={() => setM(!m)} aria-label="Menu">☰</button>
          <div className={"menu" + (m ? " open" : "")}>
            <Dropdown label="Pakiety" target="pakiety" items={PACKAGES} onPick={close} />
            <Dropdown label="Pakiety wg diet" target="diety" items={DIETS} onPick={close} />
            <a href="#regulamin" onClick={close}>Regulamin</a>
            <a href="#o-mnie" onClick={close}>O mnie</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
