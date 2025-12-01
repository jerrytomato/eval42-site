// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { getCalApi } from "@calcom/embed-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SaaS Growth Without the Bullshit" },
    {
      name: "description",
      content:
        "A self-liquidating growth system that makes each new customer pay for themselves.",
    },
  ];
}

export default function Home() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: "grow" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center gap-10 px-3 md:p-0 mx-auto max-w-5xl">
        <section className="flex flex-col items-center gap-10 max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            You’re Sitting on 30% Untapped Revenue
          </h1>
          <h2 className="text-xl md:text-3xl leading-tight">
            Earn more from every booking.
          </h2>
        </section>

        <section id="listing">
          <ul className="flex flex-col gap-4 list-none">
            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
              <span>Attract people who don’t flinch at higher pricing</span>
            </li>

            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
              <span>Stop losing customers who are ready to pay</span>
            </li>

            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
              <span>High-value buyers close themselves with automated follow-up</span>
            </li>

            <li className="flex items-start">
              <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
              <span>Unlock premium add-on revenue</span>
            </li>
          </ul>
        </section>

        <section id="booking" className="flex flex-col items-center">
          <button
            data-cal-namespace="grow"
            data-cal-link="liam-elliott/grow"
            data-cal-config='{"layout":"month_view"}'
            className="btn-primary mb-12 md:mb-0 text-sm md:text-lg inline-flex items-center justify-center py-4 px-6 before:content-['👌'] before:mr-2 before:text-2xl before:leading-none whitespace-nowrap"
          >Start Stealing Back Your Revenue</button>
        </section>
      </main>

      <footer className="absolute -bottom-0 w-full mt-12 border-t">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm">
          © {new Date().getFullYear()} Eval 42
        </div>
      </footer>
    </div>
  );
}
