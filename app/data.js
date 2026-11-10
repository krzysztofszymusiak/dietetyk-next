export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const PACKAGES = [
  { id:"start", name:"Start", icon:"🥗", price:"199 zł", per:"/ miesiąc", desc:"Dobry początek zmiany nawyków.",
    items:[[1,"Wywiad i analiza nawyków"],[1,"Jadłospis na 4 tygodnie"],[1,"Lista zakupów"],[0,"Kontakt z dietetykiem"],[0,"Cotygodniowe korekty"]] },
  { id:"standard", name:"Standard", icon:"🍎", price:"349 zł", per:"/ miesiąc", pop:true, desc:"Najczęściej wybierany pakiet.",
    items:[[1,"Wywiad i analiza nawyków"],[1,"Jadłospis na 4 tygodnie"],[1,"Kontakt przez czat"],[1,"Cotygodniowe korekty"],[0,"Konsultacje wideo"]] },
  { id:"premium", name:"Premium", icon:"🥑", price:"549 zł", per:"/ miesiąc", desc:"Pełne wsparcie krok po kroku.",
    items:[[1,"Wszystko z pakietu Standard"],[1,"2 konsultacje wideo"],[1,"Przepisy i plan treningowy"],[1,"Priorytetowy kontakt"]] },
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
