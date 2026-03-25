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

function LogoMark() {
  return (
    <span className="inline-flex self-start items-center bg-slate-900 text-white px-3 py-2 font-mono text-base font-semibold tracking-tight border border-slate-800">
      eval(42)
    </span>
  );
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
      <main className="flex-1 w-full py-14 md:py-20 space-y-14 md:space-y-16">
        <section className="px-4 md:px-8 lg:px-0 mx-auto max-w-6xl">
          <div className="soft-panel p-8 md:p-12 flex flex-col gap-10">
            <div className="flex flex-col gap-4 max-w-3xl">
              <LogoMark />
              <h1 className="text-3xl md:text-5xl font-black leading-[1.2] text-slate-900">
                Stop leaking revenue in daily decisions
              </h1>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                I model your business so you can see what happens before you change pricing, scheduling, or allocation—no more guessing or paying to find out.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  data-cal-namespace="grow"
                  data-cal-link="liam-elliott/grow"
                  data-cal-config='{"layout":"month_view"}'
                  className="btn-primary text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  Book a decision model walkthrough
                </button>
                <button
                  data-cal-namespace="grow"
                  data-cal-link="liam-elliott/grow"
                  data-cal-config='{"layout":"month_view"}'
                  className="btn-secondary text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  See 12-week plan (fast walk-through)
                </button>
              </div>
              <p className="text-sm text-slate-600">High-ticket, capacity-constrained ($2k–$50k+ per transaction). See the loss before you make it.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="eyebrow text-[11px]">Trusted by teams in</span>
              <div className="flex flex-wrap gap-3 text-slate-800">
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Private Jet Charter</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Yacht Charter</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Imaging Clinics</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Executive Health</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Expedition Travel</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="proof" className="px-4 md:px-8 lg:px-0 mx-auto max-w-6xl" id="proof">
          <div className="grid md:grid-cols-3 gap-6">
            {["-38% wasted capacity", "+19% per booking", "2.3x faster decisions"].map(
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
          </div>
        </section>

        <section
          id="how"
          className="px-4 md:px-8 lg:px-0 mx-auto max-w-6xl"
        >
          <div className="card p-6 md:p-10 lg:p-12 flex flex-col gap-8">
            <div className="max-w-4xl">
              <span className="eyebrow">How we reclaim lost revenue</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">3 moves, 12 weeks, measurable lift</h2>
              <p className="text-slate-700 mt-2">We make the daily, high-value decisions visible—so you stop losing money on pricing, scheduling, allocation, and follow-up guesswork.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {["Discovery", "Systems", "Scale"].map((label, idx) => (
                <div key={label} className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6 flex flex-col gap-3">
                  <div className="text-sm font-semibold text-slate-900">{idx + 1}. {label}</div>
                   <p className="text-sm text-slate-700 leading-relaxed">
                     {label === "Discovery"
                      ? "Map revenue-critical decisions and underused capacity; build a lightweight model of demand, no-shows, timing."
                      : label === "Systems"
                        ? "Test pricing, scheduling, allocation, and follow-up changes in the model; see what’s quietly costing you money."
                        : "Ship the winning decisions with scripts, playbooks, and guardrails; track results against the model."}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">Not marketing, dashboards, or generic analytics—only the high-value decisions that drive revenue.</p>
          </div>
        </section>

        <section id="booking" className="px-4 md:px-8 lg:px-0 mx-auto max-w-6xl">
          <div className="soft-panel p-8 md:p-10 flex flex-col gap-4 items-start md:items-center md:text-center">
            <span className="eyebrow">Ready when you are</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Book a decision model walkthrough</h3>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl">
              Bring your current flow and targets. We'll run your scenarios in the model and show where money leaks—and which small changes pay most—before you spend time or budget.
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
            </div>
            <p className="text-sm text-slate-600">Calendly alternative powered by Cal.com • Timezone-aware • 25 min</p>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-700 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Eval 42</span>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-slate-500">EST • Remote</span>
            <a className="underline underline-offset-4" href="#proof">View recent outcomes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
