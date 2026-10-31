"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { AnimatedTitle, Eyebrow, Reveal } from "./fx/AnimatedTitle";
import { Magnetic } from "./fx/Magnetic";

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-xl border border-bg/20 bg-bg/5 px-4 py-3 text-sm text-bg placeholder:text-bg/35 outline-none transition focus:border-blue-2 focus:bg-bg/10 aria-[invalid=true]:border-red-400";

const BUYER_TYPES = ["Regional distributor", "Retail chain or boutique", "Online reseller", "Duty-free or travel retail"];
const VOLUMES = ["Under 500 units", "500 to 2,000 units", "2,000 to 10,000 units", "Pallet or container"];

export function TradeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/trade-account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
        return;
      }
      setStatus("error");
      setMessage(json.message || "Something went wrong. Please try again or email hello@karoh.house.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="apply" className="grain relative overflow-hidden bg-fg py-28 text-bg sm:py-36">
      <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] bg-blue/40 blur-[140px] animate-blob" />
      <div className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] bg-cyan/40 blur-[140px] animate-blob" style={{ animationDelay: "-7s" }} />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>06 · Trade account</Eyebrow>
          <AnimatedTitle className="mt-6 text-4xl sm:text-5xl lg:text-6xl" lines={["Open a", "*wholesale* account"]} />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-sm text-bg/70 sm:text-base">
              Tell us about your business and expected volumes. Every application is qualified
              within 24 hours and followed by the catalogue, pricing and a sample pack offer.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {[
                ["Response", "Within 24 hours"],
                ["Samples", "Paid, refundable"],
                ["Payment", "Transfer or LC"],
                ["Ships from", "Dubai, UAE"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-bg/50">{k}</dt>
                  <dd className="display mt-1 text-xl">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-8 text-sm text-bg/60">
              Prefer email? Write to{" "}
              <a href="mailto:hello@karoh.house" className="font-semibold text-bg underline-offset-4 hover:underline">
                hello@karoh.house
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-bg/15 p-10 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-sky" />
                <h3 className="display mt-6 text-2xl">Application received</h3>
                <p className="mt-3 max-w-sm text-sm text-bg/70">
                  Thank you. The Karoh House team will review your details and respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-semibold text-bg/70 underline-offset-4 hover:underline"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-5 rounded-[2rem] border border-bg/10 bg-bg/[0.03] p-6 backdrop-blur-sm sm:grid-cols-2 sm:p-8"
              >
                <Field label="Company name" error={errors.company} className="sm:col-span-2">
                  <input name="company" required autoComplete="organization" placeholder="Your trading company" className={inputCls} aria-invalid={!!errors.company} />
                </Field>
                <Field label="Contact name" error={errors.name}>
                  <input name="name" required autoComplete="name" placeholder="Full name" className={inputCls} aria-invalid={!!errors.name} />
                </Field>
                <Field label="Work email" error={errors.email}>
                  <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} aria-invalid={!!errors.email} />
                </Field>
                <Field label="Country" error={errors.country}>
                  <input name="country" required autoComplete="country-name" placeholder="United Arab Emirates" className={inputCls} aria-invalid={!!errors.country} />
                </Field>
                <Field label="Trade licence number" hint="Optional at this stage">
                  <input name="licence" placeholder="Licence or registration number" className={inputCls} />
                </Field>
                <Field label="Buyer type" error={errors.type}>
                  <select name="type" defaultValue="" required className={`${inputCls} [&>option]:text-[#0b1220]`} aria-invalid={!!errors.type}>
                    <option value="" disabled>Select one</option>
                    {BUYER_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Expected monthly volume" error={errors.volume}>
                  <select name="volume" defaultValue="" required className={`${inputCls} [&>option]:text-[#0b1220]`} aria-invalid={!!errors.volume}>
                    <option value="" disabled>Select one</option>
                    {VOLUMES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </Field>
                <Field label="Brands and categories of interest" hint="Optional" className="sm:col-span-2">
                  <textarea name="categories" rows={3} placeholder="e.g. Lattafa and Afnan EDPs, Armaf Club de Nuit range, Rasasi Hawas" className={inputCls} />
                </Field>

                {/* Honeypot: hidden from people, filled by bots */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="flex flex-col items-start gap-4 sm:col-span-2">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-on-accent transition hover:bg-sky-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {status === "sending" ? "Sending…" : "Submit application"}
                    </button>
                  </Magnetic>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-bg"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-red-400" />
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="text-[11px] text-bg/45">
                    By applying you agree to be contacted about wholesale pricing and samples.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bg/70">{label}</span>
        {hint && !error && <span className="text-[11px] text-bg/40">{hint}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}
