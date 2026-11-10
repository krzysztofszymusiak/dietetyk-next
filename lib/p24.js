import crypto from "crypto";
import { PACKAGES, DIETS } from "../app/data.js";

export function cfg() {
  const merchantId = Number(process.env.P24_MERCHANT_ID);
  return {
    merchantId,
    posId: Number(process.env.P24_POS_ID || merchantId),
    apiKey: process.env.P24_API_KEY,   // "Klucz do raportów" z panelu P24
    crc: process.env.P24_CRC,          // klucz CRC z panelu P24
    base: process.env.P24_SANDBOX === "false"
      ? "https://secure.przelewy24.pl"
      : "https://sandbox.przelewy24.pl",
    site: process.env.SITE_URL || "http://localhost:3000",
  };
}

export const isConfigured = () => {
  const c = cfg();
  return Boolean(c.merchantId && c.apiKey && c.crc);
};

// Podpis: SHA-384 z JSON-a (kolejność pól ma znaczenie!)
export const sign = (obj) =>
  crypto.createHash("sha384").update(JSON.stringify(obj)).digest("hex");

export async function p24(method, path, body) {
  const c = cfg();
  const res = await fetch(`${c.base}/api/v1${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${c.posId}:${c.apiKey}`).toString("base64"),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`P24 ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

export const gatewayUrl = (token) => `${cfg().base}/trnRequest/${token}`;

// Cenę zawsze liczymy po stronie serwera (nigdy z przeglądarki)
export function findProduct(id) {
  return [...PACKAGES, ...DIETS].find((p) => p.id === id);
}
export function priceInGrosze(id) {
  const p = findProduct(id);
  return p ? parseInt(p.price, 10) * 100 : null;
}

// sessionId niesie ID produktu, dzięki temu webhook może sprawdzić kwotę bez bazy danych
export const newSessionId = (id) => `${id}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
export const productFromSession = (sid) => String(sid).split("_")[0];
