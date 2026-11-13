import crypto from "crypto";
import { NextResponse } from "next/server";
import { isConfigured, sign } from "../../../../lib/paynow";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const PAYNOW_STATUSES = new Set([
  "NEW",
  "PENDING",
  "CONFIRMED",
  "REJECTED",
  "EXPIRED",
  "ERROR",
]);

// Paynow wysyła tu zmiany statusu płatności (adres wpisujesz w panelu Paynow).
export async function POST(req) {
  if (!isConfigured()) return new NextResponse("Not configured", { status: 503 });

  const raw = await req.text();
  const got = req.headers.get("signature") || "";
  const expected = sign(raw);

  const ok =
    got.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));

  if (!ok) return new NextResponse("Bad signature", { status: 400 });

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { paymentId, externalId, status } = event || {};
  if (
    typeof externalId !== "string" ||
    !externalId ||
    typeof paymentId !== "string" ||
    !paymentId ||
    !PAYNOW_STATUSES.has(status)
  ) {
    return new NextResponse("Invalid notification", { status: 400 });
  }

  // Sprawdzamy, czy identyfikator zamówienia istnieje i czy paymentId
  // zgadza się z płatnością przypisaną do tego zamówienia.
  const { data: order, error: findError } = await supabaseAdmin
    .from("orders")
    .select("id, payment_status, paynow_payment_id")
    .eq("external_id", externalId)
    .maybeSingle();

  if (findError) {
    console.error("Supabase: błąd odczytu zamówienia:", findError);
    return new NextResponse("Database error", { status: 500 });
  }

  if (!order) {
    console.error("Paynow: nie znaleziono zamówienia:", externalId);
    return new NextResponse("Order not found", { status: 404 });
  }

  if (order.paynow_payment_id && order.paynow_payment_id !== paymentId) {
    console.error("Paynow: paymentId nie zgadza się z zamówieniem:", externalId);
    return new NextResponse("Payment mismatch", { status: 400 });
  }

  // CONFIRMED jest stanem końcowym — późniejsze, opóźnione powiadomienie
  // NEW/PENDING nie może cofnąć opłaconego zamówienia.
  const effectiveStatus =
    order.payment_status === "CONFIRMED" && status !== "CONFIRMED"
      ? "CONFIRMED"
      : status;

  const { error: updateError } = await supabaseAdmin
    .from("orders")
    .update({
      payment_status: effectiveStatus,
      paynow_payment_id: paymentId,
    })
    .eq("external_id", externalId);

  if (updateError) {
    console.error("Supabase: nie udało się zaktualizować zamówienia:", updateError);
    return new NextResponse("Database error", { status: 500 });
  }

  if (effectiveStatus === "CONFIRMED") {
    console.log("Opłacone zamówienie:", externalId, paymentId);
    // Wysyłkę e-maili dodamy w kolejnym kroku (Resend), po zapisaniu statusu.
  }

  return new NextResponse("OK");
}
