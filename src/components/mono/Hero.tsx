import { useEffect, useRef } from "react";
import hero from "@/assets/hero-banner.jpg";
import { Particles, PlayButton, useCountdown } from "./primitives";

function MiniCountdown() {
  const c = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  if (c.live) return <p className="font-display text-spirit text-glow">SPIRIT RUN IS LIVE</p>;
  const units = [
    [c.days, "D"],
    [c.hours, "H"],
    [c.minutes, "M"],
    [c.seconds, "S"],
  ] as const;
  return (
    <div className="flex items-center gap-2 font-display tabular-nums" aria-label="Time until Spirit Run launch">
      {units.map(([v, l], i) => (
        <div key={l} className="flex items-baseline gap-0.5">
          <span className="text-2xl text-bone md:text-3xl">{c.ready ? pad(v) : "--"}</span>
          <span className="font-body text-xs text-spirit">{l}</span>
          {i < 3 && <span className="ml-1 text-muted-foreground">:</span>}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const bg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bg.current && y < window.innerHeight * 1.2) {
          bg.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1.08 + y * 0.0002})`;
        }
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <div ref={bg} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.08)" }}>
        <img
          src={hero}
          alt="The Mononoke spirit wolf emerging from a misty forest"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-[60%_30%] md:object-center"
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent max-md:hidden" />
      <div className="fog-layer" />
      <Particles />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-28 md:px-8 md:pb-0">
        <div className="inline-flex items-center gap-2 border border-spirit/40 bg-ink/60 px-3 py-1.5 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-spirit" />
          <span className="text-[0.65rem] font-semibold tracking-[0.3em] text-spirit">COMING SOON</span>
        </div>
        <h1 className="mt-5 font-display text-[3.4rem] leading-[0.85] tracking-tight text-bone sm:text-7xl md:text-8xl lg:text-[9rem]">
          MONONOKE
          <br />
          <span className="text-spirit text-glow">INU</span>
        </h1>
        <p className="mt-4 font-display text-2xl tracking-wide md:text-4xl">THE SPIRIT AWAKENS.</p>
        <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
          A supernatural arcade world built around the legendary Mononoke spirit.
        </p>
        <div className="mt-6">
          <MiniCountdown />
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <PlayButton />
          <a href="#join" className="btn-ghost-game">JOIN THE PACK</a>
        </div>
        <p className="mt-6 text-xs font-semibold tracking-[0.35em] text-muted-foreground">$MONO • SOLANA • SPIRIT RUN</p>
      </div>
      <span className="pointer-events-none absolute right-6 top-1/4 hidden font-jp text-5xl leading-tight text-bone/40 [writing-mode:vertical-rl] md:block" aria-hidden>
        物の怪の犬
      </span>
    </section>
  );
}
