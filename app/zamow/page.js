import { PACKAGES, DIETS } from "../data";
import ZamowForm from "./ZamowForm";

export const metadata = { title: "Zamówienie – Kuba Ciesielski" };

export default async function Zamow({ searchParams }) {
  const { pakiet } = await searchParams;
  return (
    <section>
      <div className="w">
        <h2>Zamówienie</h2>
        <p className="sub">Uzupełnij dane – po zatwierdzeniu przejdziesz do bezpiecznej płatności mBank Paynow.</p>
        <ZamowForm items={[...PACKAGES, ...DIETS]} selected={pakiet} />
      </div>
    </section>
  );
}
