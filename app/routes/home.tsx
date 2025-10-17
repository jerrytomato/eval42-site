// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { WistiaPlayer } from "@wistia/wistia-player-react";

import { getCalApi } from "@calcom/embed-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sell More SaaS Without Bullshit" },
    { name: "description", content: "Demo page with video + booking" },
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
    <div className="min-h-screen">
      <main className="flex flex-col items-center gap-10 px-3 md:p-0 mx-auto max-w-5xl">
        <section className="max-w-3xl text-center mt-10">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            The Smart Founder's Secret to Wild and{" "}
            <span className="italic">Pain-Free</span> SaaS Growth
          </h1>
        </section>

        <section id="video" className="aspect-video w-full">
          <WistiaPlayer
            mediaId="6vhvx9otz9"
            aspect={16 / 9}
            playerColor="#111827"
            controlsVisibleOnLoad
          />
        </section>

        <section id="booking" className="flex flex-col items-center">
          <button
            data-cal-namespace="grow"
            data-cal-link="liam-elliott/grow"
            data-cal-config='{"layout":"month_view"}'
            className="btn-primary py-4 px-6"
          >
            Start Buying New Customers for Free
          </button>
        </section>
      </main>

      <footer className="mt-12 border-t">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm">
          © {new Date().getFullYear()} Eval 42 Innovation Forward
        </div>
      </footer>
    </div>
  );
}
