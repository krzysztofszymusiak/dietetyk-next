import { NextResponse } from "next/server";
import { cfg, isConfigured, createPayment, findProduct, priceInGrosze, newExternalId } from "../../../../lib/paynow";

export async function POST(req) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Płatności nie są jeszcze skonfigurowane (brak kluczy Paynow)." }, { status: 503 });
  }
  const { pakiet, imie, email } = await req.json();
  const product = findProduct(pakiet);
  if (!product || !imie?.trim() || !/^\S+@\S+\.\S+$/.test(email || "")) {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const c = cfg();
  const externalId = newExternalId(pakiet);
  const [firstName, ...rest] = imie.trim().split(/\s+/);

  try {
    const payment = await createPayment({
      amount: priceInGrosze(pakiet),               // w groszach, liczone na serwerze
      currency: "PLN",
      externalId,
      description: `Pakiet: ${product.name}`,
      buyer: { email, firstName, lastName: rest.join(" ") || undefined },
      continueUrl: `${c.site}/zamow/dziekujemy?id=${externalId}`,
    });
    // TODO: zapisz zamówienie ze statusem "oczekuje" (externalId, payment.paymentId, imie, email, pakiet)
    return NextResponse.json({ url: payment.redirectUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Nie udało się rozpocząć płatności." }, { status: 502 });
  }
}
