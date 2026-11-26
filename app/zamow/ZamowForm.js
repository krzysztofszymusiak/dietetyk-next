"use client";

import { useState } from "react";
import Link from "next/link";

export default function ZamowForm({ items, selected }) {
  const initialId = items.some((item) => item.id === selected) ? selected : items[0]?.id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const product = items.find((item) => item.id === selectedId) || items[0];

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/paynow/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pakiet: selectedId,
          imie: f.get("imie"),
          email: f.get("email"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd płatności");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="order-layout">
      <aside className="order-summary" aria-live="polite">
        <div className="order-image-wrap">
          <img className="order-image" src={product.image} alt={product.imageAlt || product.name} />
        </div>
        <div className="order-summary-content">
          <span className="order-eyebrow">Wybrana oferta</span>
          <h2>{product.name}</h2>
          <p className="order-description">{product.desc}</p>
          <div className="order-price">
            <strong>{product.price}</strong>
            {product.per && <span>{product.per}</span>}
          </div>
          {product.items?.length > 0 && (
            <ul className="order-includes">
              {product.items.filter((item) => item[0]).map((item) => (
                <li key={item[1]}>{item[1]}</li>
              ))}
            </ul>
          )}
          {product.tags?.length > 0 && (
            <div className="order-tags">
              {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
        </div>
      </aside>

      <div className="order-form-panel">
        <span className="order-eyebrow">Dokończ zamówienie</span>
        <h2>Twoje dane</h2>
        <p className="order-form-intro">
          Sprawdź wybraną ofertę, wpisz dane i przejdź do bezpiecznej płatności mBank Paynow.
        </p>
        <form className="form order-form" onSubmit={onSubmit}>
          <label htmlFor="pakiet">Wybierz ofertę</label>
          <select
            id="pakiet"
            name="pakiet"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>{item.name} – {item.price}</option>
            ))}
          </select>
          <label htmlFor="imie">Imię i nazwisko</label>
          <input id="imie" name="imie" placeholder="Wpisz imię i nazwisko" autoComplete="name" required />
          <label htmlFor="email">Adres e-mail</label>
          <input id="email" name="email" type="email" placeholder="Wpisz adres e-mail" autoComplete="email" required />
          <label className="order-consent">
            <input type="checkbox" required />
            <span>Akceptuję regulamin i politykę prywatności</span>
          </label>
          {error && <p className="order-error">{error}</p>}
          <button className="btn order-submit" type="submit" disabled={loading}>
            {loading ? "Przekierowuję…" : `Przejdź do płatności · ${product.price}`}
          </button>
          <Link href="/" className="order-back">← Wróć na stronę główną</Link>
        </form>
      </div>
    </div>
  );
}
