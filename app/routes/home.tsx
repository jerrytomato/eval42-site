
// app/routes/home.tsx
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { WistiaPlayer } from "@wistia/wistia-player-react";

import Cal, { getCalApi } from "@calcom/embed-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Sell More SaaS Without Bullshit" },
    { name: "description", content: "Demo page with video + booking" },
  ];
}

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">
        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Sell More SaaS Without Bullshit
          </h1>
        </section>

        <section id="video" className="mt-10">
          <div className="rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
            <ClientOnly>
              <WistiaPlayer
                mediaId="6vhvx9otz9"
                aspect={16 / 9}
                playerColor="#111827"
                controlsVisibleOnLoad
              />
            </ClientOnly>
          </div>
        </section>

        <section id="booking" className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-center">Book a Strategy Call</h2>
          <div className="rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
            <Cal namespace="grow"
              calLink="liam-elliott/grow"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ "layout": "month_view" }}


            />
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-white">
          © {new Date().getFullYear()} Eval 42
        </div>
      </footer>
    </div>
  );
}

