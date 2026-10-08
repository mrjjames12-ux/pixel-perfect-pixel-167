import { useState, type FormEvent } from "react";
import { Check, Coins, Flame, Skull, Sparkles, Lock, LineChart, ShoppingCart, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.webp";
import hero from "@/assets/hero-banner.jpg";
import { supabase } from "@/integrations/supabase/client";
import { TOKEN, X_HANDLE, X_URL } from "@/config/site";
import { Particles, PlayButton, Reveal, SectionHeading, XIcon, useCountdown } from "./primitives";

/* ---------------- COUNTDOWN ---------------- */
export function Countdown() {
  const c = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    ["DAYS", c.days],
    ["HOURS", c.hours],
    ["MINUTES", c.minutes],
    ["SECONDS", c.seconds],
  ] as const;
  return (
    <section id="countdown" className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--spirit)_14%,transparent),transparent_65%)]" />
      <Particles count={12} />
      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <Reveal>
          <p className="eyebrow">Launch event</p>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-8xl">SPIRIT RUN</h2>
          <p className="mt-2 font-display text-xl text-spirit text-glow md:text-3xl">{c.live ? "SPIRIT RUN IS LIVE" : "COMING SOON"}</p>
        </Reveal>
        {!c.live && (
          <Reveal delay={150}>
            <p className="mt-12 text-xs font-semibold tracking-[0.4em] text-muted-foreground">LAUNCHING IN</p>
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {units.map(([label, v]) => (
                <div key={label} className="panel relative overflow-hidden py-5 sm:py-8 md:py-12">
                  <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
                  <span suppressHydrationWarning className="relative block font-display text-4xl tabular-nums text-bone text-glow sm:text-6xl md:text-8xl">
                    {pad(v)}
                  </span>
                  <span className="relative mt-2 block text-[0.6rem] font-semibold tracking-[0.3em] text-spirit sm:text-xs">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        <Reveal delay={250} className="mt-12">
          <PlayButton label={c.live ? "PLAY SPIRIT RUN NOW" : "PLAY SPIRIT RUN"} className="!px-10 !py-5 !text-lg" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- GAME ---------------- */
const ITEMS = [
  { icon: Coins, name: "$MONO COIN", value: "+10 POINTS", tone: "text-spirit border-spirit/40" },
  { icon: Flame, name: "SPIRIT FLAME", value: "+25 POINTS", tone: "text-spirit border-spirit/40" },
  { icon: Sparkles, name: "GOLDEN INU CHARM", value: "2X MULTIPLIER", tone: "text-gold border-gold/40" },
  { icon: Skull, name: "ONI DEMON", value: "GAME OVER", tone: "text-oni border-oni/40" },
];

export function Game() {
  return (
    <section id="game" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading eyebrow="The game" jp="走" title={<>SPIRIT RUN</>} />
          <p className="mt-6 font-display text-3xl leading-tight text-spirit md:text-5xl">
            RUN.<br />COLLECT.<br />SURVIVE.
          </p>
          <div className="mt-6 space-y-1 text-lg text-muted-foreground">
            <p className="text-foreground">Enter the forest.</p>
            <p>Collect $MONO coins.</p>
            <p>Grab Spirit Flames.</p>
            <p>Find Golden Inu Charms.</p>
            <p>Avoid Oni Demons.</p>
          </div>
          <div className="mt-8"><PlayButton /></div>
        </Reveal>

        <Reveal delay={150}>
          <div className="panel relative aspect-[4/5] overflow-hidden border-spirit/30 glow-soft sm:aspect-[4/3]">
            <img src={hero} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
            <div className="scanlines absolute inset-0 opacity-50" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-display text-xs md:text-sm">
              <span className="text-spirit">SCORE 004210</span>
              <span className="text-gold">x2</span>
              <span className="text-bone">HI 018880</span>
            </div>
            <div className="absolute left-[12%] bottom-[22%] bob">
              <img src={logo} alt="Mononoke runner" loading="lazy" width={120} height={120} className="h-20 w-20 rounded-full glow md:h-28 md:w-28" />
            </div>
            <Coins className="absolute left-[45%] bottom-[40%] h-8 w-8 text-spirit bob" style={{ animationDelay: "-1s" }} />
            <Flame className="absolute left-[60%] bottom-[52%] h-9 w-9 text-spirit flicker" />
            <Sparkles className="absolute left-[72%] bottom-[34%] h-8 w-8 text-gold bob" style={{ animationDelay: "-2s" }} />
            <Skull className="absolute right-[8%] bottom-[22%] h-12 w-12 text-oni" />
            <div className="run-ground absolute inset-x-0 bottom-[18%] h-[3px]" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <span className="text-[0.65rem] font-semibold tracking-[0.4em] text-spirit flicker">PRESS START</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-3 px-5 md:grid-cols-4 md:gap-5 md:px-8">
        {ITEMS.map((it, i) => (
          <Reveal key={it.name} delay={i * 80}>
            <div className={`panel group h-full border p-5 transition-transform duration-300 hover:-translate-y-1 md:p-7 ${it.tone}`}>
              <it.icon className="h-8 w-8 transition-transform group-hover:scale-110 md:h-10 md:w-10" />
              <p className="mt-5 font-display text-sm text-foreground md:text-base">{it.name}</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em]">{it.value}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- LORE ---------------- */
export function Lore() {
  const lines = [
    "Before the forest belonged to anyone,",
    "something lived inside it.",
    "",
    "A spirit without a master.",
    "A beast without a name.",
    "",
    "They called him Mononoke.",
  ];
  return (
    <section id="lore" className="grain relative overflow-hidden py-32 md:py-48">
      <img src={logo} alt="" loading="lazy" width={600} height={600} className="pointer-events-none absolute left-1/2 top-1/2 h-[140vw] max-h-[900px] w-[140vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[2px]" />
      <div className="fog-layer opacity-70" />
      <span className="pointer-events-none absolute left-4 top-16 font-jp text-6xl text-spirit/15 [writing-mode:vertical-rl] md:left-16 md:text-8xl" aria-hidden>
        森の精霊
      </span>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal><p className="eyebrow">Lore</p><h2 className="mt-4 font-display text-5xl md:text-8xl">THE SPIRIT</h2></Reveal>
        <div className="mt-12 space-y-2 font-jp text-xl leading-relaxed text-bone md:text-3xl">
          {lines.map((l, i) =>
            l ? <Reveal key={i} delay={i * 120}><p>{l}</p></Reveal> : <div key={i} className="h-5" />,
          )}
        </div>
        <Reveal delay={900}>
          <p className="mt-12 font-display text-2xl text-spirit text-glow md:text-4xl">Now the forest is awake.</p>
          <p className="mt-2 font-display text-lg text-muted-foreground md:text-2xl">And the run has begun.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- $MONO ---------------- */
export function Token() {
  return (
    <section id="mono" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal><SectionHeading eyebrow="$MONO" jp="通貨" title={<>THE PACK HAS<br />A CURRENCY.</>} /></Reveal>
        <Reveal delay={150}>
          <div className="panel mt-12 grid gap-8 border-spirit/20 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-10">
            <img src={logo} alt="$MONO" loading="lazy" width={200} height={200} className="mx-auto h-32 w-32 rounded-full glow md:h-44 md:w-44" />
            <div>
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="font-display text-6xl text-spirit text-glow md:text-8xl">$MONO</span>
                <span className="border border-accent/60 px-3 py-1 text-xs font-semibold tracking-[0.3em] text-accent">SOLANA</span>
              </div>
              <div className="mt-6 border border-border bg-ink/60 p-4">
                <p className="text-[0.65rem] font-semibold tracking-[0.35em] text-muted-foreground">CONTRACT</p>
                <p className="mt-1 break-all font-display text-base text-bone md:text-lg">
                  {TOKEN.contractAddress ?? "COMING SOON"}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {[
                  { label: "BUY $MONO", url: TOKEN.buyUrl, icon: ShoppingCart },
                  { label: "VIEW CHART", url: TOKEN.chartUrl, icon: LineChart },
                ].map((b) =>
                  b.url ? (
                    <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" className="btn-ghost-game">
                      <b.icon className="h-4 w-4" /> {b.label}
                    </a>
                  ) : (
                    <span key={b.label} aria-disabled="true" className="btn-ghost-game cursor-not-allowed opacity-50">
                      <Lock className="h-4 w-4" /> {b.label} · SOON
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- EMAIL SIGNUP ---------------- */
export function Signup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean) || clean.length > 255) {
      setState("error");
      setMsg("Enter a valid email address.");
      return;
    }
    setState("loading");
    const { error } = await supabase.from("launch_list").insert({ email: clean });
    if (error && error.code !== "23505") {
      setState("error");
      setMsg("The gate didn't open. Try again in a moment.");
      return;
    }
    setState("done");
    setMsg(error ? "You're already in the pack." : "");
  }

  return (
    <section id="join" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-spirit-deep/15 to-transparent" />
      <Particles count={10} />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="eyebrow">Launch list</p>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-6xl">
            THE SPIRIT HASN'T<br />AWAKENED YET.
          </h2>
          <p className="mt-3 font-display text-xl text-spirit text-glow md:text-3xl">BE FIRST THROUGH THE GATE.</p>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Join the pack for launch updates, early access announcements, and surprise community rewards.
          </p>
        </Reveal>
        <Reveal delay={150}>
          {state === "done" ? (
            <div className="panel mx-auto mt-10 max-w-lg border-spirit/50 p-8 glow-soft">
              <p className="flex items-center justify-center gap-3 font-display text-xl text-spirit text-glow md:text-2xl">
                PACK MEMBER CONFIRMED <Check className="h-6 w-6" />
              </p>
              {msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
            </div>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row" noValidate>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                placeholder="ENTER YOUR EMAIL"
                className="h-14 flex-1 border border-input bg-ink/70 px-4 font-body text-base tracking-wider text-foreground placeholder:text-muted-foreground focus:border-spirit focus:outline-none"
              />
              <button type="submit" disabled={state === "loading"} className="btn-game h-14">
                {state === "loading" ? "OPENING..." : "JOIN THE PACK"}
              </button>
            </form>
          )}
          {state === "error" && <p className="mt-3 text-sm text-oni">{msg}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- X / COMMUNITY ---------------- */
export function Community() {
  return (
    <section id="community" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="The pack" jp="群れ" title={<>THE PACK IS<br />THE GAME.</>} />
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Mononoke Inu is more than one character. It's a world built around the people who enter the forest.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="panel group relative block overflow-hidden border-spirit/30 p-8 transition-all duration-300 hover:border-spirit md:p-12"
            >
              <XIcon className="absolute -right-8 -top-8 h-56 w-56 text-spirit/5 transition-transform duration-700 group-hover:rotate-12 md:h-72 md:w-72" />
              <p className="eyebrow relative">Official X</p>
              <p className="relative mt-3 font-display text-4xl md:text-6xl">FOLLOW<br />THE RUN.</p>
              <div className="relative mt-8 flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center bg-bone text-ink transition-transform group-hover:scale-110">
                  <XIcon className="h-8 w-8" />
                </span>
                <span className="font-display text-xl text-spirit md:text-2xl">{X_HANDLE}</span>
              </div>
              <span className="btn-game relative mt-8 w-full">FOLLOW {X_HANDLE.toUpperCase()}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROADMAP ---------------- */
const PHASES = [
  { n: "01", name: "AWAKENING", jp: "覚醒", done: true, items: ["Mononoke identity", "Website", "Spirit Run prototype", "Community launch"] },
  { n: "02", name: "THE RUN", jp: "疾走", items: ["Spirit Run launch", "Leaderboards", "More environments", "Character customization"] },
  { n: "03", name: "THE FOREST", jp: "森", items: ["New spirits", "New enemies", "New challenges", "New game mechanics"] },
  { n: "04", name: "THE LEGEND", jp: "伝説", items: ["Expanded Mononoke universe", "Community events", "Major game updates"] },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal><SectionHeading eyebrow="The spirit path" jp="道" title="ROADMAP" /></Reveal>
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-spirit via-spirit/30 to-transparent md:left-1/2" />
          {PHASES.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
              <span className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-xs md:top-1 ${p.done ? "border-spirit bg-spirit text-primary-foreground glow" : "border-spirit/50 bg-ink text-spirit"} ${i % 2 ? "md:-left-5" : "md:left-auto md:-right-5"}`}>
                {p.n}
              </span>
              <p className="font-jp text-sm text-spirit/70">{p.jp}</p>
              <h3 className="font-display text-xl md:text-2xl">PHASE {p.n} — {p.name}</h3>
              <ul className={`mt-4 space-y-2 text-muted-foreground ${i % 2 ? "" : "md:ml-auto"}`}>
                {p.items.map((it) => (
                  <li key={it} className={`flex items-center gap-2 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                    {p.done ? <Check className="h-4 w-4 shrink-0 text-spirit" /> : <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-spirit/60" />}
                    <span className={p.done ? "text-foreground" : ""}>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW TO PLAY ---------------- */
const STEPS = [
  ["CONNECT", "Connect your wallet if/when required."],
  ["RUN", "Enter Spirit Run."],
  ["SURVIVE", "Avoid Oni Demons."],
  ["COLLECT", "Collect coins, flames and charms."],
  ["CLIMB", "Push your score higher."],
];

export function HowToPlay() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal><SectionHeading eyebrow="How to play" jp="遊" title={<>FIVE STEPS<br />INTO THE FOREST.</>} /></Reveal>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="panel group h-full p-6 transition-colors hover:border-spirit/50">
                <span className="font-display text-5xl text-spirit/25 transition-colors group-hover:text-spirit">0{i + 1}</span>
                <p className="mt-4 font-display text-lg">{t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  ["What is Mononoke Inu?", "A community-driven gaming and meme project on Solana, built around the Mononoke spirit wolf."],
  ["What is $MONO?", "The community token of the Mononoke Inu world on Solana. The official contract will be shared only through official channels."],
  ["What is Spirit Run?", "An arcade runner: race through the spirit forest, collect $MONO coins, flames and charms, and avoid Oni Demons."],
  ["When does Spirit Run launch?", "Watch the countdown on this page — it shows the exact launch moment."],
  ["How do I play?", "Hit PLAY SPIRIT RUN once it's live. Run, collect, survive, and climb the score."],
  ["Where can I follow Mononoke?", `On X at ${X_HANDLE}.`],
  ["Where can I get launch updates?", "Join the launch list above and follow @mononokerun on X."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal><SectionHeading eyebrow="FAQ" title="QUESTIONS." /></Reveal>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {FAQS.map(([q, a], i) => (
            <div key={q}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-base md:text-lg">{q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-spirit transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                <p className="overflow-hidden text-muted-foreground">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <img src={logo} alt="Mononoke Inu" loading="lazy" width={80} height={80} className="h-16 w-16 rounded-full glow-soft" />
            <p className="mt-6 font-display text-4xl md:text-6xl">MONONOKE INU</p>
            <p className="mt-2 font-display text-lg text-spirit">THE SPIRIT AWAKENS.</p>
            <p className="mt-3 text-xs font-semibold tracking-[0.35em] text-muted-foreground">$MONO • SOLANA • SPIRIT RUN</p>
          </div>
          <div className="flex flex-col gap-6">
            <nav className="flex flex-wrap gap-6 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
              <a href="#game" className="hover:text-spirit">GAME</a>
              <a href="#lore" className="hover:text-spirit">LORE</a>
              <a href="#mono" className="hover:text-spirit">$MONO</a>
              <a href="#community" className="hover:text-spirit">COMMUNITY</a>
            </nav>
            <a href={X_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-display text-lg hover:text-spirit">
              <XIcon className="h-6 w-6" /> {X_HANDLE}
            </a>
          </div>
        </div>
        <p className="mt-16 max-w-3xl border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          Mononoke Inu is a community-driven gaming/meme project. Nothing on this website constitutes financial advice. Always verify official information through official project channels.
        </p>
      </div>
    </footer>
  );
}
