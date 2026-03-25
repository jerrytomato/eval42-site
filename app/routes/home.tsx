// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { getCalApi } from "@calcom/embed-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Make More With the Capacity You Already Have | Eval 42" },
    {
      name: "description",
      content:
        "Unlock 30% more revenue without adding seats, staff, or capacity. Stop losing ready-to-pay buyers and make high-value bookings close themselves automatically.",
    },
  ];
}

export default function Home() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "grow" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen page-shell flex flex-col">
      <main className="flex-1 w-full px-4 md:px-8 lg:px-0 mx-auto max-w-6xl py-14 md:py-20 space-y-14 md:space-y-16">
        <section className="soft-panel p-8 md:p-12 flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="eyebrow">Revenue design consultancy</span>
            <h1 className="text-3xl md:text-5xl font-black leading-[1.2] text-slate-900">
              Capture the premium bookings you already earn
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              We fix the friction between intent and purchase. High-value inbound buyers convert in days, not weeks—without adding headcount, scripts, or generic nurture spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                data-cal-namespace="grow"
                data-cal-link="liam-elliott/grow"
                data-cal-config='{"layout":"month_view"}'
                className="btn-primary text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
              >
                Book a strategy call
              </button>
              <a
                className="btn-secondary text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                href="#how"
              >
                See 12-week revenue plan
              </a>
            </div>
            <p className="text-sm text-slate-600">Response in under 1 business hour. No sales reps—speak directly with the team doing the work.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="eyebrow text-[11px]">Trusted by teams in</span>
            <div className="flex flex-wrap gap-3 text-slate-800">
              <span className="px-3 py-2 bg-white rounded-full border border-slate-200">B2B SaaS</span>
              <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Pro Services</span>
              <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Education</span>
              <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Healthcare</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="proof" className="grid md:grid-cols-3 gap-6" id="proof">
          {["+28% ARPC from ready-to-buy inbound", "41% faster close on premium packages", "3.4x lift in paid add-ons"].map(
            (headline, idx) => (
              <article key={idx} className="card p-6 flex flex-col gap-3">
                <div className="metric text-slate-900">
                  {headline.split(" ")[0]}
                </div>
                <p className="text-base text-slate-700 leading-relaxed">
                  {headline.replace(headline.split(" ")[0] + " ", "")}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <FaCheckCircle className="text-green-500 w-4 h-4" />
                  Verified across recent client launches
                </div>
              </article>
            ),
          )}
        </section>

        <section id="how" className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start">
          <div className="card p-6 md:p-8 flex flex-col gap-6">
            <div>
              <span className="eyebrow">How we reclaim lost revenue</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">3 moves, 12 weeks, measurable lift</h2>
              <p className="text-slate-700 mt-2">We remove buying friction, redesign high-intent flows, and install disciplined follow-up that feels bespoke—not spammy.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {["Discovery", "Systems", "Scale"].map((label, idx) => (
                <div key={label} className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
                  <div className="text-sm font-semibold text-slate-900">{idx + 1}. {label}</div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {label === "Discovery"
                      ? "Map intent leaks in your funnel and quantify the upside."
                      : label === "Systems"
                        ? "Rebuild booking, pricing, and follow-up to close premium buyers fast."
                        : "Instrument, A/B, and operationalize—then hand over playbooks."}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">What we're not: generic CRO audits, spray-and-pray email drips, or outsourced SDRs. We rebuild the buying experience end-to-end.</p>
          </div>

          <div className="card p-6 md:p-8 flex flex-col gap-4">
            <span className="eyebrow">Client note</span>
            <blockquote className="text-lg text-slate-900 leading-relaxed">
              “Eval 42 rebuilt our premium booking flow and we closed our top package in 3 days instead of 3 weeks. We didn't add seats—just removed friction.”
            </blockquote>
            <div className="text-sm text-slate-600">Amira Patel — VP Growth, Series B SaaS</div>
            <div className="text-sm text-slate-500">Recent outcomes: +31% upgrade rate, 2.7x add-on attach</div>
          </div>
        </section>

        <section id="booking" className="soft-panel p-8 md:p-10 flex flex-col gap-4 items-start md:items-center md:text-center">
          <span className="eyebrow">Ready when you are</span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Book a strategy call—see the lift before we start</h3>
          <p className="text-base md:text-lg text-slate-700 max-w-3xl">
            Share your current booking flow and targets. We'll map the specific leaks and deliver a 12-week plan. If it’s not a fit, we'll tell you fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              data-cal-namespace="grow"
              data-cal-link="liam-elliott/grow"
              data-cal-config='{"layout":"month_view"}'
              className="btn-primary text-base md:text-lg inline-flex items-center justify-center py-3 px-6 gap-2"
            >
              Book now
            </button>
            <a className="btn-secondary text-base md:text-lg inline-flex items-center justify-center py-3 px-6 gap-2" href="mailto:hello@eval42.com">
              Email the team
            </a>
          </div>
          <p className="text-sm text-slate-600">Calendly alternative powered by Cal.com • Timezone-aware • 25 min</p>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-700 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Eval 42</span>
          <div className="flex flex-wrap gap-4 items-center">
            <a className="underline underline-offset-4" href="mailto:hello@eval42.com">hello@eval42.com</a>
            <span className="text-slate-500">EST • Remote</span>
            <a className="underline underline-offset-4" href="#proof">View recent outcomes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
