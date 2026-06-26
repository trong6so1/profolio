import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Vui lòng nhập họ tên (tối thiểu 2 ký tự)." })
    .max(80, { message: "Họ tên quá dài (tối đa 80 ký tự)." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập email." })
    .email({ message: "Email không hợp lệ." }),
  subject: z
    .string()
    .trim()
    .min(2, { message: "Vui lòng nhập chủ đề." })
    .max(120, { message: "Chủ đề quá dài." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tin nhắn quá ngắn (tối thiểu 10 ký tự)." })
    .max(2000, { message: "Tin nhắn quá dài (tối đa 2000 ký tự)." }),
});

export type ContactPayload = z.infer<typeof ContactSchema>;

// Simple in-memory rate limit (per IP, 5 requests / 10 minutes)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; first: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.first > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (!rateLimit(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau ít phút.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Dữ liệu không hợp lệ." },
      { status: 400 },
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Dữ liệu không hợp lệ." },
      { status: 422 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  // In a real deployment this is where you'd forward to an email provider,
  // queue a job, or persist to the database. For this portfolio demo we log
  // it server-side so the form is fully functional end-to-end.
  console.log("[contact] new message", {
    name,
    email,
    subject,
    messagePreview: message.slice(0, 120),
    ip,
    at: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      ok: true,
      message: `Cảm ơn ${name}! Tin nhắn của bạn đã được ghi nhận. Mình sẽ phản hồi sớm qua email ${email}.`,
    },
    { status: 200 },
  );
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    method: "POST",
    fields: ["name", "email", "subject", "message"],
  });
}
