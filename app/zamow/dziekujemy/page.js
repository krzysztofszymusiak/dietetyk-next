import Link from "next/link";

export const metadata = { title: "Dziękujemy – Kuba Ciesielski" };

export default async function Dziekujemy({ searchParams }) {
  const { paymentStatus } = await searchParams; // Paynow dokleja status do adresu powrotu
  const failed = paymentStatus === "REJECTED" || paymentStatus === "ERROR" || paymentStatus === "EXPIRED";
  return (
    <section>
      <div className="w" style={{ textAlign: "center" }}>
        <h2>{failed ? "Płatność nie powiodła się" : "Dziękujemy za zamówienie! 🎉"}</h2>
        <p className="sub">
          {failed
            ? "Nie pobraliśmy żadnych środków. Spróbuj ponownie lub wybierz inną metodę płatności."
            : "Płatność jest potwierdzana przez mBank Paynow. Potwierdzenie i dalsze kroki wyślemy na Twój adres e-mail."}
        </p>
        <Link className="btn" href={failed ? "/#pakiety" : "/"}>{failed ? "Spróbuj ponownie" : "Wróć na stronę główną"}</Link>
      </div>
    </section>
  );
}
