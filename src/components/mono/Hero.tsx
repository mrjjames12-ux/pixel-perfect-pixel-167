import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { WorldScene } from "./World";

export function Hero() {
  return <WorldScene id="top" image={hero} className="world-hero">
    <div className="hero-intro">
      <p className="eyebrow">A world between worlds</p>
      <h1>MONONOKE <span>INU</span></h1>
      <p className="hero-tagline">The spirit awakens.</p>
      <Button asChild variant="outline" className="enter-world"><a href="#lore">ENTER THE FOREST <ArrowDown /></a></Button>
    </div>
    <div className="hero-caption"><span>AN UNTAMED SPIRIT. AN UNWRITTEN LEGEND.</span><span className="font-jp">物の怪の犬</span></div>
    <a href="#lore" className="hero-scroll" aria-label="Explore the forest"><span /><ArrowDown /></a>
  </WorldScene>;
}