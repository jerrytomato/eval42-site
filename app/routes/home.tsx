// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useMemo, useRef, useState } from "react";

import { getCalApi } from "@calcom/embed-react";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Stop Gambling the Business on Intuition | Eval 42" },
    {
      name: "description",
      content:
        "Model-driven simulations for high-ticket, capacity-constrained operations. See where scheduling, pricing, and allocation leak margin before you commit capital.",
    },
  ];
}

function LogoMark() {
  return (
    <span className="inline-flex self-start items-center text-white text-base font-mono font-medium tracking-wider leading-none select-none">
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
}: {
  target: number;
  duration?: number;
  format: (value: number) => string;
  shouldStart: boolean;
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

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(format(target));
      }
    };

    requestAnimationFrame(step);
  }, [duration, format, shouldStart, target]);

  return display;
}

type MetricType = "money" | "percent";

type MetricDatum = {
  metric: string;
  label: string;
  subtext: string;
  type: MetricType;
  value: number;
  animate?: boolean;
};

const metrics: MetricDatum[] = [
  {
    metric: "95%",
    label: "Asset time wasted annually",
    subtext:
      "High-value capacity sits idle most of the year instead of earning.",
    type: "percent",
    value: 95,
    animate: true,
  },
  {
    metric: "23%",
    label: "Capacity lost to no-shows",
    subtext:
      "Booked capacity expires because no-shows aren’t predicted or backfilled fast enough.",
    type: "percent",
    value: 23,
    animate: true,
  },
  {
    metric: "$100k+",
    label: "Revenue at risk per decision",
    subtext:
      "Each pricing or allocation guess on a limited asset can burn six figures without prior modeling.",
    type: "money",
    value: 100000,
    animate: false,
  },
];

function MetricCard({
  metric,
  label,
  subtext,
  type,
  value,
  animate = false,
}: MetricDatum) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.8,
    once: true,
  });

  const formatter = useMemo(() => {
    if (type === "money") {
      return (v: number) => `$${Math.round(v / 1000)}k+`;
    }
    if (type === "percent") {
      return (v: number) => `${v.toFixed(0)}%`;
    }
    return () => "";
  }, [type]);

  const formattedTarget = formatter(value);

  const display = animate
    ? useCountUp({
        target: value,
        format: formatter,
        shouldStart: isIntersecting,
      })
    : formattedTarget;

  return (
    <article
      ref={ref}
      className="card metric-card p-6 pb-8 flex flex-col gap-3 h-full text-left"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
        {display}
      </div>
      <p className="text-base font-semibold text-slate-900 leading-relaxed">
        {label}
      </p>
      <p className="text-sm text-slate-600 leading-relaxed min-h-[44px]">
        {subtext}
      </p>
    </article>
  );
}

type StepCardProps = {
  index: number;
  title: string;
  subhead: string;
  body: string;
};

function StepCard({ index, title, subhead, body }: StepCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6 flex flex-col gap-3">
      <div className="text-sm font-semibold text-slate-900">
        {index}. {title}
      </div>
      <div className="text-sm font-semibold text-slate-800">{subhead}</div>
      <p className="text-sm text-slate-700 leading-relaxed">{body}</p>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "grow" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen page-shell flex flex-col">
      <div className="fixed top-0 left-0 right-0 py-2 z-50 bg-slate-900 text-white">
        <div className="px-4 md:px-6 py-2 flex items-center justify-start">
          <LogoMark />
        </div>
      </div>
      <main className="flex-1 w-full pt-20 md:pt-24 pb-8 space-y-12 md:space-y-14">
        <section className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl mt-0">
          <div className="soft-panel p-8 md:p-12 flex flex-col gap-12">
            <div className="flex flex-col gap-6 max-w-3xl">
              <span className="eyebrow">
                When every $100k decision falls back on you
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-[1.2] text-slate-900">
                Your intuition is hurting the business
              </h1>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                See the financial impact of high-value decisions before the
                losses become your responsibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  data-cal-namespace="grow"
                  data-cal-link="liam-elliott/grow"
                  data-cal-config='{"layout":"month_view","theme":"light"}'
                  className="btn-primary w-full sm:w-auto text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  Find your hidden losses
                </button>
                <a
                  href="#how"
                  className="btn-secondary w-full sm:w-auto text-base md:text-lg inline-flex items-center justify-center py-4 px-6 gap-2"
                >
                  The 12-week margin recovery plan
                </a>
              </div>
              <p className="text-sm text-slate-600">
                For high-ticket, capacity-constrained businesses ($2k–$50k+ per
                transaction). See the loss before you live it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="eyebrow text-[11px]">Trusted by teams in</span>
              <div className="flex flex-wrap gap-3 text-slate-800">
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">
                  Private Jet Charters
                </span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">
                  Yacht Charters
                </span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">
                  Imaging Clinics
                </span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">
                  Executive Health
                </span>
                <span className="px-3 py-2 bg-white rounded-full border border-slate-200">
                  Luxury Travel
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="proof"
          className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl"
          id="proof"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {metrics.map((item, idx) => (
              <MetricCard key={idx} {...item} />
            ))}
          </div>
        </section>

        <section id="how" className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl">
          <div className="card p-6 md:p-10 lg:p-12 flex flex-col gap-8">
            <div className="max-w-4xl">
              <span className="eyebrow">How we reclaim lost margin</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900">
                3 moves, 12 weeks, measurable lift
              </h2>
              <p className="text-slate-700 mt-2">
                We replace unmodeled assumptions with Uber-grade, model-driven
                simulations so you price and allocate scarce capacity before
                committing a dollar of capital.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <StepCard
                index={1}
                title="Uncover"
                subhead="Stop the bleeding"
                body="We isolate exactly where your margin disappears to establish model-backed ROI targets for the next 12 months."
              />
              <StepCard
                index={2}
                title="Simulate"
                subhead="Stress-test the future"
                body="Predict the $100k impact of pricing shifts or capacity changes in seconds, and before you commit a single dollar of capital."
              />
              <StepCard
                index={3}
                title="Deploy"
                subhead="Hard-code the growth"
                body="Replace expensive guesswork with hard-coded operational guardrails. Move from defending margin to high-velocity scaling on autopilot."
              />
            </div>
            <p className="text-sm text-slate-600">
              Hard-coded operational logic for decisions where gut feel is an
              unacceptable expense.
            </p>
          </div>
        </section>

        <section
          id="booking"
          className="px-4 md:px-8 lg:px-10 mx-auto max-w-6xl"
        >
          <div className="soft-panel p-10 md:p-12 flex flex-col gap-6 md:gap-8 items-start md:items-center md:text-center">
            <span className="eyebrow">Ready when you are</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              Stop gambling your reputation on guesses
            </h3>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl">
              We’ll show exactly where your current process has blind spots that
              leak margin and the model-driven moves that recover it fastest.
            </p>
            <div className="flex flex-col gap-4 items-center text-center">
              <button
                data-cal-namespace="grow"
                data-cal-link="liam-elliott/grow"
                data-cal-config='{"layout":"month_view","theme":"light"}'
                className="btn-primary w-full text-base md:w-auto md:text-lg inline-flex items-center justify-center py-3 px-6 gap-2"
              >
                Run the simulation on your margins
              </button>
              <p className="text-sm text-slate-700 max-w-3xl">
                No data prep or homework required.
              </p>
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
