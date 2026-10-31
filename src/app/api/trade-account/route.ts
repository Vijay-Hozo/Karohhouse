import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

type Payload = {
  company: string;
  name: string;
  email: string;
  country: string;
  licence?: string;
  type: string;
  volume: string;
  categories?: string;
  website?: string; // honeypot, must stay empty
};

const BUYER_TYPES = [
  "Regional distributor",
  "Retail chain or boutique",
  "Online reseller",
  "Duty-free or travel retail",
];
const VOLUMES = [
  "Under 500 units",
  "500 to 2,000 units",
  "2,000 to 10,000 units",
  "Pallet or container",
];

function clean(v: unknown, max = 300) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function validate(body: Record<string, unknown>) {
  const data: Payload = {
    company: clean(body.company),
    name: clean(body.name),
    email: clean(body.email),
    country: clean(body.country),
    licence: clean(body.licence),
    type: clean(body.type),
    volume: clean(body.volume),
    categories: clean(body.categories, 1000),
    website: clean(body.website),
  };
  const errors: Partial<Record<keyof Payload, string>> = {};
  if (data.company.length < 2) errors.company = "Enter your company name.";
  if (data.name.length < 2) errors.name = "Enter a contact name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid work email.";
  if (data.country.length < 2) errors.country = "Enter your country.";
  if (!BUYER_TYPES.includes(data.type)) errors.type = "Choose a buyer type.";
  if (!VOLUMES.includes(data.volume)) errors.volume = "Choose an expected volume.";
  return { data, errors };
}

async function deliver(record: Payload & { receivedAt: string; ip: string | null }) {
  const webhook = process.env.TRADE_FORM_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return "webhook";
  }
  // Local fallback: append one JSON line per application to data/applications.jsonl
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "applications.jsonl"), JSON.stringify(record) + "\n", "utf8");
  return "file";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { data, errors } = validate(body);

  // Honeypot: bots fill every field. Pretend success and drop it.
  if (data.website) return NextResponse.json({ ok: true });

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const record = {
    ...data,
    website: undefined,
    receivedAt: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
  };

  try {
    const via = await deliver(record);
    return NextResponse.json({ ok: true, via });
  } catch (err) {
    console.error("[trade-account] delivery failed", err);
    return NextResponse.json(
      { ok: false, message: "We could not save your application. Please email hello@karoh.house." },
      { status: 502 }
    );
  }
}
