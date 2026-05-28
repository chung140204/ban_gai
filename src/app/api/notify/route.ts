import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === "your_bot_token_here") {
    // Chưa cấu hình — không crash, chỉ bỏ qua
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  const body = await req.json() as {
    date: string;
    slot: string;
    hour: number;
    time: string;
  };

  const text = [
    "💌 *Có người chốt hẹn rồi!*",
    "",
    `📅 *Ngày:* ${body.date}`,
    `🕐 *Giờ:* ${body.slot} · ${body.time}`,
    "",
    "Nhanh lên chuẩn bị nhé! 🐻💕",
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      },
    );
    const data = await res.json() as { ok: boolean };
    return NextResponse.json({ ok: data.ok });
  } catch (e) {
    console.error("Telegram notify failed:", e);
    return NextResponse.json({ ok: false, reason: "fetch_error" }, { status: 500 });
  }
}
