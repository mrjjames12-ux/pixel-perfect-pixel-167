import { useEffect, useRef } from "react";
import hero from "@/assets/hero-banner.jpg";
import { X_URL } from "@/config/site";
import { Particles, PlayButton, XIcon, useCountdown } from "./primitives";

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
          <span suppressHydrationWarning className="text-xl text-bone md:text-2xl">{pad(v)}</span>
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
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <div ref={bg} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.08)" }}>
        <img
          src={hero}
          alt="The Mononoke spirit wolf emerging from a misty forest"
          width={1920}
          height={1088}
          className="h-[78%] w-full object-cover object-[52%_25%] md:h-full md:object-[50%_30%]"
          fetchPriority="high"
        />
      </div>
      {/* cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_38%,transparent,color-mix(in_oklab,var(--ink)_70%,transparent))]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="fog-layer" />
      <Particles />

      {/* game HUD frame */}
      <div className="pointer-events-none absolute inset-3 hidden md:inset-6 md:block" aria-hidden>
        <span className="absolute left-0 top-16 h-8 w-8 border-l-2 border-t-2 border-spirit/60" />
        <span className="absolute right-0 top-16 h-8 w-8 border-r-2 border-t-2 border-spirit/60" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-spirit/60" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-spirit/60" />
        <span className="absolute right-12 top-20 font-display text-xs tracking-[0.3em] text-spirit/80">STAGE 01 · THE FOREST</span>
      </div>
      <span className="pointer-events-none absolute right-8 top-1/3 hidden font-jp text-6xl leading-tight text-bone/30 [writing-mode:vertical-rl] lg:block" aria-hidden>
        物の怪の犬
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-28 md:px-12 md:pb-16">
        <h1 className="font-display text-[3.1rem] leading-[0.82] tracking-tight text-bone drop-shadow-[0_6px_30px_var(--ink)] sm:text-8xl md:text-[8rem] lg:text-[9.5rem]">
          MONONOKE <span className="text-spirit text-glow">INU</span>
        </h1>
        <p className="mt-3 font-display text-[1.6rem] leading-none tracking-wide md:mt-4 md:text-5xl">
          THE SPIRIT <span className="text-spirit">AWAKENS.</span>
        </p>
        <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-lg">
          A supernatural arcade world built around the legendary Mononoke spirit.
        </p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <PlayButton className="!py-5 !text-base md:!px-10 md:!text-lg" />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-spirit/40 bg-ink/70 px-2.5 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-spirit" />
              <span className="text-[0.6rem] font-semibold tracking-[0.3em] text-spirit">COMING SOON</span>
            </span>
            <MiniCountdown />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <a href="#join" className="btn-ghost-game flex-1 md:flex-none">JOIN THE PACK</a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow @mononokerun on X" className="btn-ghost-game !px-5">
            <XIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.35em] text-muted-foreground">$MONO • SOLANA • SPIRIT RUN</p>
      </div>
    </section>
  );
}
