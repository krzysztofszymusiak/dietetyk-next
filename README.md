# Dietetyk – Kuba Ciesielski (Next.js)
npm install
npm run dev   # http://localhost:3000

## Płatności mBank Paynow
1. cp .env.example .env.local  i uzupełnij klucze z panelu Paynow (sandbox)
2. W panelu Paynow ustaw adres powiadomień: SITE_URL + /api/paynow/status
3. Lokalnie webhook wymaga tunelu (np. ngrok http 3000) – wpisz jego adres w SITE_URL
4. Zrestartuj npm run dev
