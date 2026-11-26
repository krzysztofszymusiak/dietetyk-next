import { PACKAGES, DIETS } from "../data";
import ZamowForm from "./ZamowForm";

export const metadata = { title: "Zamówienie – Co tam jeż!" };

export default async function Zamow({ searchParams }) {
  const { pakiet } = await searchParams;
  const isSpecialistDiet = DIETS.some((item) => item.id === pakiet);
  const items = isSpecialistDiet ? DIETS : PACKAGES;
  const selected = items.some((item) => item.id === pakiet) ? pakiet : items[0].id;

  return (
    <section className="order-section">
      <div className="w">
        <div className="order-heading">
          <span className="tag">Co tam jeż! · Zamówienie</span>
          <h1>Jeszcze tylko kilka kroków</h1>
          <p className="sub">
            Po lewej znajdziesz podsumowanie wybranej oferty. Po prawej uzupełnij dane, aby przejść do płatności.
          </p>
        </div>
        <ZamowForm items={items} selected={selected} />
      </div>
    </section>
  );
}
