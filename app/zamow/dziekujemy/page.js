import Link from "next/link";

export const metadata = { title: "Dziękujemy – Kuba Ciesielski" };

export default function Dziekujemy() {
  return (
    <section>
      <div className="w" style={{ textAlign: "center" }}>
        <h2>Dziękujemy za zamówienie! 🎉</h2>
        <p className="sub">
          Płatność jest właśnie potwierdzana przez Przelewy24. Potwierdzenie i dalsze kroki wyślemy na Twój adres e-mail.
        </p>
        <Link className="btn" href="/">Wróć na stronę główną</Link>
      </div>
    </section>
  );
}
