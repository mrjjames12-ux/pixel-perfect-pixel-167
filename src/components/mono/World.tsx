import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Flame, Sparkles, Skull, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import forest from "@/assets/spirit-forest.jpg";
import gate from "@/assets/spirit-gate.jpg";
import spirit from "@/assets/forest-spirit.png";
import { Countdown } from "./Sections";
import { Particles, PlayButton, Reveal } from "./primitives";

export function WorldScene({ id, image, className = "", children }: { id: string; image: string; className?: string; children: ReactNode }) {
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = scene.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
        el.style.setProperty("--camera-y", `${progress * -55}px`);
        el.style.setProperty("--camera-scale", `${1.09 + (1 - Math.abs(progress)) * 0.04}`);
      });
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--look-x", `${(event.clientX / rect.width - .5) * -16}px`);
      el.style.setProperty("--look-y", `${((event.clientY - rect.top) / rect.height - .5) * -10}px`);
    };
    window.addEventListener("scroll", update, { passive: true });
    el.addEventListener("pointermove", move);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); el.removeEventListener("pointermove", move); };
  }, []);
  return <section ref={scene} id={id} className={`world-scene ${className}`}>
    <div className="world-camera" aria-hidden><img src={image} alt="" width={1920} height={1088} loading="lazy" /></div>
    <div className="world-shade" /><Particles count={16} />
    <div className="world-mist" aria-hidden />
    {children}
  </section>;
}

const encounters = [
  { name: "Spirit flames", icon: Flame, line: "Some lights aren't meant to lead you home.", detail: "Follow the Spirit Flames. Each one is worth +25 points.", tone: "text-spirit" },
  { name: "Golden charms", icon: Sparkles, line: "The forest rewards those who look closer.", detail: "Find a Golden Inu Charm to activate a 2× multiplier.", tone: "text-gold" },
  { name: "Oni demons", icon: Skull, line: "Not everything in the dark is on your side.", detail: "Avoid the Oni Demons. An encounter ends your run.", tone: "text-oni" },
  { name: "$MONO coins", icon: Coins, line: "Leave with more than a memory.", detail: "Collect $MONO coins along the path for +10 points each.", tone: "text-gold" },
];

export function ForestJourney() {
  const [awakened, setAwakened] = useState(false);
  const [selected, setSelected] = useState(0);
  const encounter = encounters[selected];
  return <>
    <WorldScene id="lore" image={forest} className="world-lore">
      <div className="world-chapter"><span>01 / THE LIVING FOREST</span><span className="font-jp">森の精霊</span></div>
      <div className="world-story">
        <Reveal><p className="eyebrow">Beyond the familiar</p><h2 className="world-title">You are not<br />alone here.</h2>
          <p className="world-copy">Before the forest belonged to anyone,<br />something lived inside it.<br />A spirit without a master. A beast without a name.</p>
          <p className="mt-6 font-jp text-xl text-bone">They called him Mononoke.</p>
        </Reveal>
        <p role="status" className={`spirit-whisper ${awakened ? "is-awake" : ""}`}>{awakened ? "The forest remembers you." : "A quiet presence watches from the trees."}</p>
        <Button asChild variant="link" className="world-next"><a href="#game">Follow the spirit <ArrowDown /></a></Button>
      </div>
      <Button variant="ghost" aria-label="Awaken the forest spirit" aria-pressed={awakened} onClick={() => setAwakened(v => !v)} className={`spirit-creature ${awakened ? "is-awake" : ""}`}>
        <img src={spirit} alt="A three-tailed forest spirit" width={1024} height={1024} loading="lazy" />
      </Button>
      <img src={spirit} alt="" width={1024} height={1024} loading="lazy" className="distant-spirit" aria-hidden />
      <div className="world-floor-label">THE FOREST IS AWAKE. <span>AND IT KNOWS YOU'RE HERE.</span></div>
    </WorldScene>
    <WorldScene id="game" image={forest} className="world-run">
      <div className="world-chapter"><span>02 / THE SPIRIT RUN</span><span className="font-jp">疾走</span></div>
      <div className="world-story">
        <Reveal><p className="eyebrow">The path calls</p><h2 className="world-title">Run into<br />the unknown.</h2><p className="world-copy">A flicker of light. A shadow between the trees.<br />One more step. One more chance.</p></Reveal>
        <div id="how" className="encounter-selector" role="tablist" aria-label="Forest encounters">
          {encounters.map((item, i) => <Button key={item.name} id={`encounter-${i}`} role="tab" aria-selected={selected === i} aria-controls="encounter-story" variant="ghost" title={item.name} aria-label={item.name} className={`encounter-symbol ${selected === i ? "is-selected" : ""} ${item.tone}`} onClick={() => setSelected(i)}><item.icon /></Button>)}
        </div>
        {encounter && <div id="encounter-story" role="tabpanel" aria-labelledby={`encounter-${selected}`} className="encounter-story" key={selected}><p className={`text-xs uppercase ${encounter.tone}`}>{encounter.name}</p><p className="mt-3 font-jp text-xl md:text-2xl">{encounter.line}</p><p className="mt-3 text-sm text-muted-foreground">{encounter.detail}</p></div>}
        <div className="mt-8"><PlayButton /></div>
        <p className="mt-4 text-xs text-muted-foreground">Spirit Run · Coming soon</p>
      </div>
      <div className="floating-flame flame-one" aria-hidden><Flame /></div><div className="floating-flame flame-two" aria-hidden><Flame /></div>
      <div className="floating-charm" aria-hidden><Sparkles /></div>
      <Button asChild variant="link" className="world-bottom-link"><a href="#gate">Beyond the forest <ArrowUpRight /></a></Button>
    </WorldScene>
    <WorldScene id="gate" image={gate} className="world-gate">
      <div className="world-chapter"><span>03 / THE AWAKENING</span><span className="font-jp">覚醒</span></div>
      <Reveal className="gate-story"><p className="eyebrow">Every legend begins with a step</p><h2 className="world-title">On the other side,<br />your story begins.</h2></Reveal>
      <Countdown />
      <Button asChild variant="link" className="world-bottom-link"><a href="#join">Find your pack <ArrowDown /></a></Button>
    </WorldScene>
  </>;
}