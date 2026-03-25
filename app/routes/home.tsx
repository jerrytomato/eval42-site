// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useMemo, useRef, useState } from "react";

import { getCalApi } from "@calcom/embed-react";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";

export function meta({ }: Route.MetaArgs) {
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
    <span className="inline-flex self-start items-center bg-slate-900 text-white px-2.5 py-1.5 md:px-3 md:py-2 font-mono text-sm md:text-base font-semibold tracking-tight border border-slate-800">
      eval(42)
    </span>
  );
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp({
  target,
  duration = 800,
  format,
  shouldStart,
  flickerWords,
}: {
  target: number;
  duration?: number;
  format: (value: number) => string;
  shouldStart: boolean;
  flickerWords?: string[];
}) {
  const [display, setDisplay] = useState(() => format(target));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOut(t);
      const current = target * eased;
      setDisplay(format(current));

      if (flickerWords && flickerWords.length > 0 && t < 1) {
        const idx = Math.min(
          flickerWords.length - 1,
          Math.floor((t * flickerWords.length * 1.2) % flickerWords.length),
        );
        setDisplay(flickerWords[idx]);
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(format(target));
      }
    };

    requestAnimationFrame(step);
  }, [duration, format, shouldStart, target, flickerWords]);

  return display;
}

type MetricType = "money" | "percent" | "flicker";

type MetricDatum = {
  metric: string;
  label: string;
  subtext: string;
  type: MetricType;
  value: number;
};

const metrics: MetricDatum[] = [
  {
    metric: "$450k+",
    label: "Identified annual leak",
    subtext: "Typical loss in high-value, capacity-constrained services",
    type: "money",
    value: 450000,
  },
  {
    metric: "14.2%",
    label: "Recoverable peak capacity",
    subtext: "Average yield gap in premium, limited-capacity offers",
    type: "percent",
    value: 14.2,
  },
  {
    metric: "Instant",
    label: "Decision confidence",
    subtext: "Simulate the loss before you make the change",
    type: "flicker",
    value: 1,
  },
];

function MetricCard({ metric, label, subtext, type, value }: MetricDatum) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.8,
    once: true,
  });

  const formatter = useMemo(() => {
    if (type === "money") {
      return (v: number) => `$${Math.round(v / 1000)}k+`;
    }
    if (type === "percent") {
      return (v: number) => `${v.toFixed(1)}%`;
    }
    return () => "Instant";
  }, [type]);

  const display = useCountUp({
    target: type === "flicker" ? 0 : value,
    format: type === "flicker" ? () => "Instant" : formatter,
    shouldStart: type === "flicker" ? false : isIntersecting,
  });

  return (
    <article
      ref={ref}
      className="card metric-card p-6 pb-8 flex flex-col gap-3 h-full text-left"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-slate-900">{display}</div>
      <p className="text-base font-semibold text-slate-900 leading-relaxed">{label}</p>
      <p className="text-sm text-slate-600 leading-relaxed min-h-[44px]">{subtext}</p>
    </article>
  );
}

export default function Home() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: "grow" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen page-shell flex flex-col">
      <div className="fixed top-4 left-4 z-50 hidden lg:block">
        <LogoMark />
      </div>
      <div className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl pt-8 pb-1 flex justify-center block lg:hidden">
        <LogoMark />
      </div>
      <main className="flex-1 w-full py-8 md:py-12 space-y-14 md:space-y-16">
        <section className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl mt-4 md:mt-6 lg:mt-10">
          <div className="soft-panel p-8 md:p-12 flex flex-col gap-12">
            <div className="flex flex-col gap-6 max-w-3xl">
              <span className="eyebrow">Revenue design consultancy</span>
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
                  className="btn-primary w-full sm:w-auto text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  Book a decision model walkthrough
                </button>
                <a
                  href="#how"
                  className="btn-secondary w-full sm:w-auto text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  See 12-week plan (fast walk-through)
                </a>
              </div>
              <p className="text-sm text-slate-600">High-ticket, capacity-constrained ($2k–$50k+ per transaction). See the loss before you make it.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="eyebrow text-[11px]">Trusted by teams in</span>
              <div className="flex flex-wrap gap-3 text-slate-800">
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Private Jet Charters</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Yacht Charters</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Imaging Clinics</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Executive Health</span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">Luxury Travel</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="proof" className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl" id="proof">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {metrics.map((item, idx) => (
              <MetricCard key={idx} {...item} />
            ))}
          </div>
        </section>

        <section
          id="how"
          className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl"
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

        <section id="booking" className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl">
          <div className="soft-panel p-8 md:p-10 flex flex-col gap-4 items-start md:items-center md:text-center">
            <span className="eyebrow">Ready when you are</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Book a decision model walkthrough</h3>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl">
              Bring your current flow and targets. We'll run your scenarios in the model and show where money leaks—and which small changes pay most—before you spend time or budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button
                data-cal-namespace="grow"
                data-cal-link="liam-elliott/grow"
                data-cal-config='{"layout":"month_view"}'
                className="btn-primary w-full sm:w-auto text-base md:text-lg inline-flex items-center justify-center py-3 px-6 gap-2"
              >
                Book now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-700 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Eval 42</span>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-slate-500">Global • Remote</span>
            </div>
          </div>
      </footer>
    </div>
  );
}
