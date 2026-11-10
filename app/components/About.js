import { LOREM } from "../data";

export default function About() {
  return (
    <section id="o-mnie">
      <div className="w about">
        <div>
          <div className="tag">Dietetyk kliniczny</div>
          <h1>Cześć, jestem Kuba – pomogę Ci jeść mądrze i bez wyrzeczeń.</h1>
          <p>{LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <div className="stats">
            <div><b>8+ lat</b>doświadczenia</div>
            <div><b>1200+</b>zadowolonych pacjentów</div>
            <div><b>mgr</b>dietetyki klinicznej</div>
          </div>
          <a className="btn" href="#pakiety">Zobacz pakiety</a>
        </div>
        <div className="ph">
          {/* Podmień na: <Image src="/kuba.jpg" width={340} height={400} alt="Kuba Ciesielski" /> */}
          <svg viewBox="0 0 340 400" role="img" aria-label="Miejsce na zdjęcie dietetyka">
            <circle cx="170" cy="150" r="62" fill="#1d6fa5" opacity=".35" />
            <path d="M50 400c0-90 55-140 120-140s120 50 120 140z" fill="#1d6fa5" opacity=".35" />
            <text x="170" y="365" textAnchor="middle" fontSize="16" fill="#1d6fa5">Tu zdjęcie dietetyka</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
