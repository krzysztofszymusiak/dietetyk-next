import crypto from "crypto";
import { PACKAGES, DIETS } from "../app/data.js";

export function cfg() {
  return {
    apiKey: process.env.PAYNOW_API_KEY,             // "Klucz dostępu do API"
    signatureKey: process.env.PAYNOW_SIGNATURE_KEY, // "Klucz obliczania podpisu"
    base: process.env.PAYNOW_SANDBOX === "false"
      ? "https://api.paynow.pl"
      : "https://api.sandbox.paynow.pl",
    site: process.env.SITE_URL || "http://localhost:3000",
  };
}

export const isConfigured = () => {
  const c = cfg();
  return Boolean(c.apiKey && c.signatureKey);
};

// Podpis = Base64( HMAC-SHA256( surowa treść żądania, klucz podpisu ) )
export const sign = (rawBody) =>
  crypto.createHmac("sha256", cfg().signatureKey).update(rawBody).digest("base64");

export async function createPayment(payload) {
  const c = cfg();
  const body = JSON.stringify(payload); // podpisujemy dokładnie ten tekst, który wysyłamy
  const res = await fetch(`${c.base}/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Api-Key": c.apiKey,
      Signature: sign(body),
      "Idempotency-Key": crypto.randomUUID(),
    },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Paynow ${res.status}: ${JSON.stringify(json)}`);
  return json; // { redirectUrl, paymentId, status }
}

// Cenę zawsze liczymy po stronie serwera (nigdy z przeglądarki)
export function findProduct(id) {
  return [...PACKAGES, ...DIETS].find((p) => p.id === id);
}
export function priceInGrosze(id) {
  const p = findProduct(id);
  return p ? parseInt(p.price, 10) * 100 : null;
}

export const newExternalId = (id) => `${id}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
