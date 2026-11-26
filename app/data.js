export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const PACKAGES = [
  {
    id: "start", name: "Pakiet Startowy", icon: "🥗", price: "225 zł", per: "/ 7 dni",
    image: "/images/meal/pakiet-startowy.webp", imageAlt: "Tost z awokado, tuńczykiem i jajkiem",
    desc: "To może być Twój pierwszy krok do zmiany, która ma sens. Podczas indywidualnej konsultacji dietetycznej poznam Twoje cele, styl życia i dotychczasowe nawyki. Na tej podstawie otrzymasz tygodniowy jadłospis, który możesz wdrożyć od razu, oraz plan suplementacji dobrany do Twoich potrzeb. Konkretny plan zamiast ogólnych porad.",
    items: [[1, "Konsultacja dietetyczna"], [1, "Tygodniowy jadłospis"], [1, "Plan suplementacji"]]
  },
  {
    id: "kompleksowy", name: "Pakiet Kompleksowy", icon: "🍎", price: "425 zł", per: "/ miesiąc",
    image: "/images/meal/pakiet-kompleksowy.webp", imageAlt: "Miska z ryżem, jajkiem, awokado i warzywami",
    desc: "Dla osób, które chcą nie tylko zacząć, ale też utrzymać motywację. Oprócz konsultacji, tygodniowego jadłospisu i planu suplementacji otrzymasz poradnik aktywności fizycznej, który pomoże dopasować ruch do diety, oraz newsletter z regularnie wysyłanymi przepisami. Dzięki temu zdrowe odżywianie staje się urozmaicone i łatwe do utrzymania na co dzień.",
    items: [[1, "Konsultacja dietetyczna"], [1, "Tygodniowy jadłospis"], [1, "Plan suplementacji"], [1, "Poradnik aktywności fizycznej"], [1, "Newsletter z przepisami"]]
  },
  {
    id: "pelny", name: "Pakiet Pełny", icon: "🥑", price: "699 zł", per: "/ 2 miesiące", pop: true,
    image: "/images/meal/pakiet-pelny.webp", imageAlt: "Kolorowa sałatka z truskawkami, szparagami i zieleniną",
    desc: "Najbardziej kompletna forma współpracy. Zawiera wszystko z Pakietu Kompleksowego, a dodatkowe dwie konsultacje pozwalają na bieżąco korygować plan i reagować na Twoje postępy. Otrzymasz też raport podsumowujący zmiany, kupony zniżkowe -10% oraz upominek na zakończenie. Wybierz go, jeśli zależy Ci na trwałych efektach i stałym wsparciu.",
    items: [[1, "Wszystko z Pakietu Kompleksowego"], [1, "Dwie dodatkowe konsultacje"], [1, "Raport podsumowujący zmiany"], [1, "Kupony zniżkowe -10%"], [1, "Upominek na zakończenie"]]
  },
  {
    id: "premium", name: "Pakiet Premium", icon: "🏆", price: "950 zł", per: "/ 3 miesiące",
    image: "/images/meal/pakiet-premium.webp", imageAlt: "Sałatka z rukolą, pomidorkami i burratą",
    desc: "Maksymalne wsparcie i wyniki – trzymiesięczna opieka, która ma dać długotrwałe efekty. Szczegółowy opis zakresu Pakietu Premium wymaga jeszcze potwierdzenia.",
    items: [[1, "Trzy spersonalizowane jadłospisy"], [1, "Regularne monitorowanie postępów"], [1, "Indywidualny plan suplementacji"], [1, "Porady o aktywności fizycznej"], [1, "Newsletter z przepisami"], [1, "Raport podsumowujący postępy"]]
  },
];

export const DIETS = [
  {
    id: "cukrzyca", icon: "🩸", name: "Cukrzyca i zaburzenia glikemii", price: "299 zł",
    image: "/images/meal/dieta-cukrzyca.webp", imageAlt: "Sałatka z jajkiem, tuńczykiem i warzywami",
    desc: "Jadłospis i wskazówki, które pomagają komponować posiłki tak, by lepiej rozumieć ich wpływ na poziom glukozy. Plan powstaje podczas konsultacji, z uwzględnieniem Twoich leków, badań i trybu życia. Pakiet nie zastępuje leczenia prowadzonego przez lekarza, jednak może wspierać poprawę parametrów glikemii.",
    tags: ["poziom glukozy", "indywidualny plan", "konsultacja"]
  },
  {
    id: "insulino", icon: "⚖️", name: "Insulinooporność i PCOS", price: "299 zł",
    image: "/images/meal/dieta-insulino.webp", imageAlt: "Zielona sałatka z awokado i warzywami",
    desc: "Plan oparty na zmianie codziennych nawyków żywieniowych: sycące posiłki, mniej wahań energii i mniej napadów głodu. Przy PCOS plan dopasujemy do Twoich objawów, badań i preferencji, by był smaczny i możliwy do utrzymania na dłużej.",
    tags: ["sytość", "nawyki żywieniowe", "indywidualny plan"]
  },
  {
    id: "nadcisnienie", icon: "❤️", name: "Nadciśnienie i cholesterol", price: "279 zł",
    image: "/images/meal/dieta-nadcisnienie.webp", imageAlt: "Sałatka z warzywami, awokado i sezamem",
    desc: "Jadłospis łączy zasady diety DASH i diety śródziemnomorskiej z kuchnią, którą naprawdę polubisz. Uwzględnia warzywa, owoce i produkty z ograniczoną ilością tłuszczów nasyconych.",
    tags: ["DASH", "dieta śródziemnomorska", "indywidualny jadłospis"]
  },
  {
    id: "hashimoto", icon: "🦋", name: "Hashimoto i tarczyca", price: "299 zł",
    image: "/images/meal/dieta-hashimoto.webp", imageAlt: "Pełnoziarnisty tost z awokado, jajkiem i tuńczykiem",
    desc: "Dieta może być uzupełnieniem leczenia choroby tarczycy. Podczas konsultacji ocenimy Twój sposób żywienia i to, czego może brakować, a plan dopasujemy do Twoich potrzeb. Bez obiecywania cudownej diety.",
    tags: ["konsultacja", "ocena sposobu żywienia", "indywidualny plan"]
  },
  {
    id: "jelita", icon: "🌿", name: "Jelita i IBS", price: "319 zł",
    image: "/images/meal/dieta-jelita.webp", imageAlt: "Sałatka z jarmużem i pieczonymi warzywami",
    desc: "Dieta o obniżonej zawartości FODMAP może zmniejszać objawy IBS. Pomożemy Ci przejść ten proces bezpiecznie i z głową, tak by nie eliminować produktów bez potrzeby i odkryć, co faktycznie Ci służy.",
    tags: ["FODMAP", "IBS", "indywidualny plan"]
  },
  {
    id: "redukcja", icon: "🏃", name: "Sport i redukcja", price: "259 zł",
    image: "/images/meal/dieta-redukcja.webp", imageAlt: "Świeża sałatka warzywna z awokado",
    desc: "Redukcja tkanki tłuszczowej opiera się na utrzymanym deficycie energii, a wiele stylów żywienia może działać podobnie dobrze. Wybierzemy podejście, które wytrzymasz w praktyce, z odpowiednią ilością białka i energii na treningi.",
    tags: ["deficyt energii", "białko", "trening"]
  },
];

export const RULES = [
  ["§1 Postanowienia ogólne", LOREM],
  ["§2 Zakup i płatność", LOREM + " Ut enim ad minim veniam, quis nostrud exercitation."],
  ["§3 Realizacja usługi", LOREM],
  ["§4 Rezygnacja i zwroty", LOREM + " Duis aute irure dolor in reprehenderit."],
  ["§5 Dane osobowe (RODO)", LOREM],
];
