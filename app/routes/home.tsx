// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { getCalApi } from "@calcom/embed-react";

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

export default function Home() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: "grow" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center gap-10 px-3 md:px-0 mx-auto max-w-5xl">
        <section className="flex flex-col items-center gap-6 max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            You’re Sitting on 30% Untapped Revenue
          </h1>
          <h2 className="text-xl md:text-3xl leading-tight">
            Earn more from every booking.
          </h2>
        </section>

        <section id="listing">
          <ul className="flex flex-col gap-4 list-none text-base md:text-lg">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
              <span>Attract people who don’t flinch at higher pricing</span>
            </li>

            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
              <span>Stop losing customers who are ready to pay</span>
            </li>

            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
              <span>Let high-value buyers close themselves with automated follow-up</span>
            </li>

            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-1" />
              <span>Unlock premium add-on revenue</span>
            </li>
          </ul>
        </section>

        <section id="booking" className="flex flex-col items-center">
          <button
            data-cal-namespace="grow"
            data-cal-link="liam-elliott/grow"
            data-cal-config='{"layout":"month_view"}'
            className="btn-primary text-sm md:text-lg inline-flex items-center justify-center py-4 px-6 before:content-['👌'] before:mr-2 before:text-2xl before:leading-none whitespace-nowrap"
          >Start Stealing Back Your Revenue</button>
        </section>
      </main>

      <footer className="w-full border-t">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm">
          © {new Date().getFullYear()} Eval 42
        </div>
      </footer>
    </div>
  );
}
