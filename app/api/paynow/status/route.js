import crypto from "crypto";
import { NextResponse } from "next/server";
import { isConfigured, sign } from "../../../../lib/paynow";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendOrderEmail, escapeEmailHtml } from "../../../../lib/resend";

const PAYNOW_STATUSES = new Set([
  "NEW",
  "PENDING",
  "CONFIRMED",
  "REJECTED",
  "EXPIRED",
  "ERROR",
]);

function formatAmount(amountGrosze, currency) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: currency || "PLN",
  }).format((Number(amountGrosze) || 0) / 100);
}

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

  const { data: order, error: findError } = await supabaseAdmin
    .from("orders")
    .select("id, customer_name, customer_email, package_name, amount_grosze, currency, payment_status, paynow_payment_id, customer_email_sent, owner_email_sent")
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
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error("Brakuje zmiennej ADMIN_EMAIL.");
      return new NextResponse("Email configuration error", { status: 500 });
    }

    const name = escapeEmailHtml(order.customer_name);
    const email = escapeEmailHtml(order.customer_email);
    const packageName = escapeEmailHtml(order.package_name);
    const amount = escapeEmailHtml(formatAmount(order.amount_grosze, order.currency));

    try {
      if (!order.customer_email_sent) {
        await sendOrderEmail({
          to: order.customer_email,
          subject: "Potwierdzenie zakupu",
          idempotencyKey: `order-customer-${order.id}`,
          html: `
            <h1>Dziękujemy za zakup!</h1>
            <p>Cześć ${name},</p>
            <p>Twoja płatność została potwierdzona.</p>
            <p><strong>Pakiet:</strong> ${packageName}<br />
            <strong>Kwota:</strong> ${amount}</p>
            <p>Dziękujemy za zaufanie!</p>
          `,
        });

        const { error } = await supabaseAdmin
          .from("orders")
          .update({ customer_email_sent: true })
          .eq("id", order.id);
        if (error) throw error;
      }

      if (!order.owner_email_sent) {
        await sendOrderEmail({
          to: adminEmail,
          subject: `Nowe opłacone zamówienie: ${order.package_name}`,
          idempotencyKey: `order-owner-${order.id}`,
          html: `
            <h1>Nowe opłacone zamówienie</h1>
            <p><strong>Klient:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Pakiet:</strong> ${packageName}<br />
            <strong>Kwota:</strong> ${amount}</p>
            <p><strong>Numer zamówienia:</strong> ${escapeEmailHtml(externalId)}</p>
          `,
        });

        const { error } = await supabaseAdmin
          .from("orders")
          .update({ owner_email_sent: true })
          .eq("id", order.id);
        if (error) throw error;
      }
    } catch (error) {
      console.error("Nie udało się wysłać e-maili zamówienia:", error);
      return new NextResponse("Email delivery failed", { status: 500 });
    }

    console.log("Opłacone zamówienie i obsłużone e-maile:", externalId, paymentId);
  }

  return new NextResponse("OK");
}
