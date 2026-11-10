import { NextResponse } from "next/server";
import { cfg, isConfigured, sign, p24, gatewayUrl, findProduct, priceInGrosze, newSessionId } from "../../../../lib/p24";

export async function POST(req) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Płatności nie są jeszcze skonfigurowane (brak kluczy P24)." }, { status: 503 });
  }
  const { pakiet, imie, email } = await req.json();
  const product = findProduct(pakiet);
  const amount = priceInGrosze(pakiet);
  if (!product || !imie?.trim() || !/^\S+@\S+\.\S+$/.test(email || "")) {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const c = cfg();
  const sessionId = newSessionId(pakiet);
  const currency = "PLN";

  try {
    const { data } = await p24("POST", "/transaction/register", {
      merchantId: c.merchantId,
      posId: c.posId,
      sessionId,
      amount,
      currency,
      description: `Pakiet: ${product.name}`,
      email,
      client: imie,
      country: "PL",
      language: "pl",
      urlReturn: `${c.site}/zamow/dziekujemy?sid=${sessionId}`,
      urlStatus: `${c.site}/api/p24/status`,
      sign: sign({ sessionId, merchantId: c.merchantId, amount, currency, crc: c.crc }),
    });
    // TODO: zapisz zamówienie ze statusem "oczekuje" (sessionId, imie, email, pakiet)
    return NextResponse.json({ url: gatewayUrl(data.token) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Nie udało się rozpocząć płatności." }, { status: 502 });
  }
}
