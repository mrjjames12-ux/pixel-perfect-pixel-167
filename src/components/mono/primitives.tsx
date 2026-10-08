import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { GAME_URL, LAUNCH_DATE } from "@/config/site";

const LAUNCH_MS = new Date(LAUNCH_DATE).getTime();

export function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? null : Math.max(0, LAUNCH_MS - now);
  const live = diff === 0;
  const s = diff === null ? 0 : Math.floor(diff / 1000);
  return {
    ready: now !== null,
    live,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function PlayButton({ className = "", label = "PLAY SPIRIT RUN" }: { className?: string; label?: string }) {
  const { live } = useCountdown();
  const external = GAME_URL.startsWith("http");
  return (
    <a
      href={GAME_URL}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`btn-game ${className}`}
      data-live={live}
    >
      <Play className="h-4 w-4 fill-current" />
      {label}
    </a>
  );
}

export function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 4),
  dur: 9 + ((i * 13) % 12),
  delay: -((i * 3.1) % 18),
  dx: ((i % 5) - 2) * 30,
}));

export function Particles({ count = 22 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ["--dx" as string]: `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, jp }: { eyebrow: string; title: ReactNode; jp?: string }) {
  return (
    <div className="relative">
      {jp && (
        <span className="pointer-events-none absolute -top-10 left-0 select-none font-jp text-7xl text-spirit/10 md:text-9xl" aria-hidden>
          {jp}
        </span>
      )}
      <p className="eyebrow relative">{eyebrow}</p>
      <h2 className="relative mt-3 font-display text-4xl leading-[0.95] md:text-7xl">{title}</h2>
    </div>
  );
}
