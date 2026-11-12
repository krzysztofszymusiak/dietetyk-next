import crypto from "crypto";
import { NextResponse } from "next/server";
import { isConfigured, sign } from "../../../../lib/paynow";

// Webhook: Paynow wysyła tu zmiany statusu płatności (adres wpisujesz w panelu Paynow)
export async function POST(req) {
  if (!isConfigured()) return new NextResponse("Not configured", { status: 503 });

  const raw = await req.text(); // podpis liczy się z surowej treści
  const got = req.headers.get("signature") || "";
  const expected = sign(raw);
  const ok =
    got.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
  if (!ok) return new NextResponse("Bad signature", { status: 400 });

  const { paymentId, externalId, status } = JSON.parse(raw);
  // status: NEW, PENDING, CONFIRMED, REJECTED, EXPIRED, ERROR

  if (status === "CONFIRMED") {
    // TODO: oznacz zamówienie (externalId) jako opłacone + wyślij e-mail do klienta i dietetyka
    console.log("Opłacone:", externalId, paymentId);
  }
  return new NextResponse("OK");
}
