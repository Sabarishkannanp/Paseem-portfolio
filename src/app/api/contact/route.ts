import { NextResponse } from "next/server";

type Body = { name?: unknown; email?: unknown; message?: unknown; topics?: unknown; company?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // honeypot: pretend success for bots
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const topics = Array.isArray(body.topics) ? body.topics.filter((t) => typeof t === "string").slice(0, 6) : [];

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please add your name, a valid email and a short message." }, { status: 422 });
  }

  // TODO: send the email. Example with Resend (npm i resend, set RESEND_API_KEY in Vercel):
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Portfolio <onboarding@resend.dev>",
  //     to: "fasimfazi@gmail.com",
  //     replyTo: email,
  //     subject: `New enquiry from ${name}`,
  //     text: `Topics: ${topics.join(", ")}\n\n${message}`,
  //   });
  //
  // Or use Nodemailer with a Gmail app password.
  console.info("[contact]", { name, email, topics, length: message.length });

  return NextResponse.json({ ok: true });
}
