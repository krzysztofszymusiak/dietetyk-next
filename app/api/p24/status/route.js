import { NextResponse } from "next/server";
import { cfg, sign, p24, priceInGrosze, productFromSession } from "../../../../lib/p24";

// Webhook: Przelewy24 woła ten adres po opłaceniu zamówienia
export async function POST(req) {
  const n = await req.json();
  const c = cfg();

  // 1) Czy powiadomienie naprawdę pochodzi z P24 (podpis)?
  const expected = sign({
    merchantId: n.merchantId, posId: n.posId, sessionId: n.sessionId,
    amount: n.amount, originAmount: n.originAmount, currency: n.currency,
    orderId: n.orderId, methodId: n.methodId, statement: n.statement, crc: c.crc,
  });
  if (expected !== n.sign) return new NextResponse("Bad signature", { status: 400 });

  // 2) Czy kwota zgadza się z ceną produktu?
  if (n.merchantId !== c.merchantId || n.amount !== priceInGrosze(productFromSession(n.sessionId))) {
    return new NextResponse("Bad amount", { status: 400 });
  }

  // 3) Potwierdzamy transakcję w P24 – dopiero to kończy płatność
  try {
    await p24("PUT", "/transaction/verify", {
      merchantId: c.merchantId, posId: c.posId, sessionId: n.sessionId,
      amount: n.amount, currency: n.currency, orderId: n.orderId,
      sign: sign({ sessionId: n.sessionId, orderId: n.orderId, amount: n.amount, currency: n.currency, crc: c.crc }),
    });
  } catch (e) {
    console.error(e);
    return new NextResponse("Verify failed", { status: 500 });
  }

  // TODO: oznacz zamówienie jako opłacone w bazie + wyślij e-mail do klienta i dietetyka
  return new NextResponse("OK");
}
