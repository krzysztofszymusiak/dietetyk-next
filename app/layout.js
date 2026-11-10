import "./globals.css";

export const metadata = {
  title: "Kuba Ciesielski – Dietetyk",
  description: "Indywidualne plany żywieniowe i pakiety dietetyczne.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
