import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/mono/Nav";
import { Hero } from "@/components/mono/Hero";
import { Community, Countdown, Faq, Footer, Game, HowToPlay, Lore, Roadmap, Signup, Token } from "@/components/mono/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mononoke Inu — $MONO | Spirit Run" },
      { name: "description", content: "The spirit awakens. Spirit Run is a supernatural arcade game from Mononoke Inu ($MONO) on Solana. Join the pack." },
      { property: "og:title", content: "Mononoke Inu — The Spirit Awakens" },
      { property: "og:description", content: "Spirit Run: a supernatural arcade world built around the legendary Mononoke spirit. $MONO on Solana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mononokerun" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero />
      <Game />
      <Countdown />
      <Signup />
      <Lore />
      <Token />
      <Community />
      <Roadmap />
      <HowToPlay />
      <Faq />
      <Footer />
    </main>
  );
}
