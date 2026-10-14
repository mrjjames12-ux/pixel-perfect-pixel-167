import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { X_URL } from "@/config/site";
import { PlayButton, XIcon } from "./primitives";

const LINKS = [
  { href: "#lore", label: "THE FOREST" },
  { href: "#game", label: "THE RUN" },
  { href: "#gate", label: "THE GATE" },
  { href: "#community", label: "THE PACK" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-ink/85 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Mononoke Inu" width={40} height={40} className="h-9 w-9 rounded-full glow-soft md:h-10 md:w-10" />
            <span className="font-display text-sm tracking-wider md:text-base">MONONOKE INU</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs font-semibold tracking-[0.2em] text-muted-foreground transition-colors hover:text-spirit">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow on X" className="p-2 text-muted-foreground hover:text-spirit">
              <XIcon />
            </a>
            <a href="#join" className="btn-ghost-game !px-4 !py-2.5 !text-xs">JOIN THE PACK</a>
            <PlayButton className="!px-4 !py-2.5 !text-xs" />
          </div>
          <button className="p-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-all duration-500 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--spirit-deep),transparent_60%)] opacity-30" />
        <span className="pointer-events-none absolute right-4 top-24 font-jp text-[9rem] leading-none text-spirit/10 [writing-mode:vertical-rl]" aria-hidden>
          物の怪
        </span>
        <div className="relative flex h-16 items-center justify-between px-4">
          <span className="font-display text-sm">MONONOKE INU</span>
          <button className="p-2" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-7 w-7" />
          </button>
        </div>
        <nav className="relative flex flex-1 flex-col justify-center gap-2 px-6">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl transition-all duration-500 hover:text-spirit ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              <span className="mr-3 align-middle font-body text-xs text-spirit">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="relative flex flex-col gap-3 p-6" onClick={() => setOpen(false)}>
          <PlayButton className="w-full" />
          <a href="#join" className="btn-ghost-game w-full">JOIN THE PACK</a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <XIcon className="h-4 w-4" /> @mononokerun
          </a>
        </div>
      </div>
    </>
  );
}
