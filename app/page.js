import Header from "./components/Header";
import About from "./components/About";
import Packages from "./components/Packages";
import Diets from "./components/Diets";
import Rules from "./components/Rules";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <About />
      <Packages />
      <Diets />
      <Rules />
      <footer id="kontakt">© 2026 Kuba Ciesielski – Dietetyk · kontakt@example.com · +48 000 000 000</footer>
    </div>
  );
}
