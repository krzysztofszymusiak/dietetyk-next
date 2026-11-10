"use client";
import { useState } from "react";
import Link from "next/link";

export default function ZamowForm({ items, selected }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/p24/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pakiet: f.get("pakiet"), imie: f.get("imie"), email: f.get("email") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd płatności");
      window.location.href = data.url; // przekierowanie do Przelewy24
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <select name="pakiet" defaultValue={selected}>
        {items.map((p) => <option key={p.id} value={p.id}>{p.name} – {p.price}</option>)}
      </select>
      <input name="imie" placeholder="Imię i nazwisko" required />
      <input name="email" type="email" placeholder="E-mail" required />
      <label><input type="checkbox" required /> Akceptuję regulamin i politykę prywatności</label>
      {error && <p style={{ color: "var(--no)", margin: 0 }}>{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Przekierowuję…" : "Zapłać z Przelewy24"}
      </button>
      <Link href="/" style={{ textAlign: "center" }}>← Wróć na stronę główną</Link>
    </form>
  );
}
