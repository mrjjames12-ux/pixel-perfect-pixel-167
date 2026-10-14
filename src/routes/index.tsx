import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/mono/Nav";
import { Hero } from "@/components/mono/Hero";
import { Community, Faq, Footer, Roadmap, Signup, Token } from "@/components/mono/Sections";
import { ForestJourney } from "@/components/mono/World";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mononoke Inu — $MONO | Spirit Run" },
      { name: "description", content: "Enter the living forest of Mononoke Inu. Discover wandering spirits, follow the light, and begin your Spirit Run journey." },
      { property: "og:title", content: "Mononoke Inu — The Spirit Awakens" },
      { property: "og:description", content: "A world between worlds. Explore the living forest, meet its spirits, and find your pack in Mononoke Inu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mononokerun" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="world-experience bg-background">
      <Nav />
      <Hero />
      <ForestJourney />
      <Signup />
      <Token />
      <Community />
      <Roadmap />
      <Faq />
      <Footer />
    </main>
  );
}
