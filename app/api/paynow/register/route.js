import { NextResponse } from "next/server";
import {
  cfg,
  isConfigured,
  createPayment,
  findProduct,
  priceInGrosze,
  newExternalId,
} from "../../../../lib/paynow";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Płatności nie są jeszcze skonfigurowane (brak kluczy Paynow)." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy format danych." }, { status: 400 });
  }

  const { pakiet, imie, email } = body || {};
  const product = findProduct(pakiet);
  const customerName = typeof imie === "string" ? imie.trim() : "";
  const customerEmail = typeof email === "string" ? email.trim() : "";

  if (
    !product ||
    !customerName ||
    !/^\S+@\S+\.\S+$/.test(customerEmail)
  ) {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const c = cfg();
  const externalId = newExternalId(pakiet);
  const amount = priceInGrosze(pakiet);
  const [firstName, ...rest] = customerName.split(/\s+/);

  // Najpierw zapisujemy zamówienie. Dzięki temu webhook nie wyprzedzi rekordu w bazie.
  const { error: insertError } = await supabaseAdmin.from("orders").insert({
    customer_name: customerName,
    customer_email: customerEmail,
    package_id: product.id,
    package_name: product.name,
    amount_grosze: amount,
    currency: "PLN",
    external_id: externalId,
    payment_status: "NEW",
  });

  if (insertError) {
    console.error("Supabase: nie udało się zapisać zamówienia:", insertError);
    return NextResponse.json(
      { error: "Nie udało się zapisać zamówienia. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  try {
    const payment = await createPayment({
      amount,
      currency: "PLN",
      externalId,
      description: `Pakiet: ${product.name}`,
      buyer: {
        email: customerEmail,
        firstName,
        lastName: rest.join(" ") || undefined,
      },
      continueUrl: `${c.site}/zamow/dziekujemy?id=${externalId}`,
    });

    if (!payment?.redirectUrl || !payment?.paymentId) {
      throw new Error("Paynow nie zwrócił redirectUrl lub paymentId.");
    }

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ paynow_payment_id: payment.paymentId })
      .eq("external_id", externalId);

    // Nie blokujemy klientowi przejścia do płatności. Podpisany webhook
    // również zapisze paymentId, a błąd zostanie odnotowany w logach.
    if (updateError) {
      console.error("Supabase: nie udało się zapisać paymentId:", updateError);
    }

    return NextResponse.json({ url: payment.redirectUrl });
  } catch (error) {
    console.error("Paynow: nie udało się utworzyć płatności:", error);

    const { error: statusError } = await supabaseAdmin
      .from("orders")
      .update({ payment_status: "ERROR" })
      .eq("external_id", externalId);

    if (statusError) {
      console.error("Supabase: nie udało się oznaczyć zamówienia jako ERROR:", statusError);
    }

    return NextResponse.json(
      { error: "Nie udało się rozpocząć płatności." },
      { status: 502 }
    );
  }
}
