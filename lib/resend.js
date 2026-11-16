function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

export async function sendOrderEmail({ to, subject, html, idempotencyKey }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Brakuje zmiennej RESEND_API_KEY.");

  const from = process.env.EMAIL_FROM || "Dietetyk <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Resend: błąd wysyłki:", response.status, result);
    throw new Error(`Resend zwrócił błąd HTTP ${response.status}.`);
  }

  return result;
}

export function escapeEmailHtml(value) {
  return escapeHtml(value);
}
