export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const PACKAGES = [
  { id:"start", name:"Pakiet Startowy", icon:"🥗", price:"225 zł", per:"/ 7 dni", desc:"Dobry na start – 7-dniowy plan dietetyczny, który pomoże Ci wprowadzić pierwsze zmiany prosto i smacznie.",
    items:[[1,"Konsultacja dietetyczna"],[1,"Tygodniowy jadłospis"],[1,"Plan suplementacji"],[0,"Porady o aktywności fizycznej"],[0,"Newsletter z przepisami"],[0,"Monitorowanie postępów"]] },
  { id:"kompleksowy", name:"Pakiet Kompleksowy", icon:"🍎", price:"425 zł", per:"/ miesiąc", desc:"Zdrowe fundamenty – miesięczne wsparcie, by wdrożyć trwałe zmiany w nawykach żywieniowych.",
    items:[[1,"Konsultacja dietetyczna"],[1,"Miesięczny jadłospis (30 dni)"],[1,"Plan suplementacji"],[1,"Porady o aktywności fizycznej"],[1,"Newsletter z przepisami"],[0,"Kupony zniżkowe na kolejne pakiety"],[0,"Monitorowanie postępów"]] },
  { id:"pelny", name:"Pakiet Pełny", icon:"🥑", price:"699 zł", per:"/ 2 miesiące", pop:true, desc:"Prosto do celu – dwumiesięczny plan z pełnym wsparciem specjalistów.",
    items:[[1,"Indywidualny plan żywieniowy"],[1,"Trzy konsultacje dietetyczne"],[1,"Porady o aktywności i motywacji"],[1,"Newsletter z przepisami"],[1,"Dwa kupony zniżkowe (10%)"],[0,"Monitorowanie postępów"],[0,"Raport podsumowujący"]] },
  { id:"premium", name:"Pakiet Premium", icon:"🏆", price:"950 zł", per:"/ 3 miesiące", desc:"Maksymalne wsparcie i wyniki – trzymiesięczna opieka, która ma dać długotrwałe efekty.",
    items:[[1,"Trzy spersonalizowane jadłospisy"],[1,"Regularne monitorowanie postępów"],[1,"Indywidualny plan suplementacji"],[1,"Porady o aktywności fizycznej"],[1,"Newsletter z przepisami"],[1,"Cztery kupony zniżkowe (10%)"],[1,"Raport podsumowujący postępy"],[1,"Opcjonalny pakiet z upominkami"]] },
];

export const DIETS = [
  { id:"cukrzyca", icon:"🩸", name:"Dieta dla diabetyków", price:"299 zł", desc:"Plan oparty na indeksie i ładunku glikemicznym, stabilizujący poziom glukozy. Wsparcie przy cukrzycy typu 2 i stanie przedcukrzycowym.", tags:["niski IG","liczenie węglowodanów","stały rytm posiłków"] },
  { id:"insulino", icon:"⚖️", name:"Insulinooporność i PCOS", price:"299 zł", desc:"Jadłospis ograniczający skoki insuliny, z pełnoziarnistymi produktami i odpowiednią ilością białka.", tags:["niski IG","sytość","bez głodzenia"] },
  { id:"nadcisnienie", icon:"❤️", name:"Nadciśnienie i cholesterol", price:"279 zł", desc:"Dieta w duchu DASH: mniej soli, więcej warzyw, ryb i zdrowych tłuszczów.", tags:["DASH","mało soli","omega-3"] },
  { id:"hashimoto", icon:"🦋", name:"Hashimoto i tarczyca", price:"299 zł", desc:"Plan wspierający pracę tarczycy, bogaty w selen, jod i żelazo, dopasowany do Twoich wyników.", tags:["przeciwzapalna","selen","jod"] },
  { id:"jelita", icon:"🌿", name:"Jelita i IBS", price:"319 zł", desc:"Dieta low-FODMAP z etapem eliminacji i stopniowego wprowadzania produktów.", tags:["low FODMAP","probiotyki","dziennik objawów"] },
  { id:"redukcja", icon:"🏃", name:"Redukcja i sport", price:"259 zł", desc:"Bezpieczna redukcja masy ciała lub budowanie formy z uwzględnieniem aktywności fizycznej.", tags:["deficyt kcal","białko","regeneracja"] },
];

export const RULES = [
  ["§1 Postanowienia ogólne", LOREM],
  ["§2 Zakup i płatność", LOREM + " Ut enim ad minim veniam, quis nostrud exercitation."],
  ["§3 Realizacja usługi", LOREM],
  ["§4 Rezygnacja i zwroty", LOREM + " Duis aute irure dolor in reprehenderit."],
  ["§5 Dane osobowe (RODO)", LOREM],
];
