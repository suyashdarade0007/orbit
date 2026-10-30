import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SpaceCanvas } from "@/components/space/SpaceCanvas";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { planets, getPlanet } from "@/data/planets";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Orbit - Explore Our Cosmic Neighborhood" },
      {
        name: "description",
        content:
          "An interactive 3D solar system. Explore the planets, their science and the research behind the worlds we observe.",
      },
      { property: "og:title", content: "Orbit - Explore Our Cosmic Neighborhood" },
      {
        property: "og:description",
        content:
          "An interactive 3D solar system with planetary science, discoveries and research.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [interacted, setInteracted] = useState(false);
  const planet = selected ? getPlanet(selected) : undefined;

  useEffect(() => {
    if (selected) setInteracted(true);
  }, [selected]);

  return (
    <>
      <Nav />
      <main>
        {/* Hero - interactive solar system */}
        <section
          id="explore"
          className="relative h-[100svh] w-full overflow-hidden"
          aria-label="Interactive solar system"
        >
          <div
            className="absolute inset-0"
            onPointerDown={() => setInteracted(true)}
            onWheel={() => setInteracted(true)}
          >
            <SpaceCanvas selected={selected} onSelect={setSelected} />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />

          <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1400px] flex-col justify-end px-6 pb-20 md:justify-center md:px-10 md:pb-0">
            <div className="max-w-2xl rise">
              <p className="label-xs">The Solar System</p>
              <h1 className="display mt-5 text-[clamp(2.75rem,7vw,6rem)]">
                Explore Our
                <br />
                Cosmic Neighborhood.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Discover the planets, worlds and scientific discoveries that make
                up our corner of the universe.
              </p>
              <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-6">
                <Link
                  to="/planets"
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  Explore Planets
                </Link>
                <Link
                  to="/research"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Discover the research →
                </Link>
              </div>
            </div>
          </div>

          {/* subtle hints */}
          <div
            className={`pointer-events-none absolute right-6 bottom-6 hidden gap-6 text-xs text-muted-foreground transition-opacity duration-700 md:flex md:right-10 ${
              interacted ? "opacity-0" : "opacity-100"
            }`}
          >
            <span>Drag to explore</span>
            <span>Scroll to zoom</span>
          </div>

          {/* selected planet, minimal */}
          {planet && (
            <div className="absolute bottom-6 left-6 z-10 md:bottom-10 md:left-10">
              <p className="label-xs">{planet.type}</p>
              <h2 className="display mt-2 text-3xl md:text-4xl">{planet.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {planet.epithet}
              </p>
              <div className="mt-4 flex items-center gap-5">
                <Link
                  to="/planets/$slug"
                  params={{ slug: planet.slug }}
                  className="text-sm underline underline-offset-4"
                >
                  Explore {planet.name} →
                </Link>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to system
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Planets */}
        <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <p className="label-xs">Planets</p>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)]">
            Worlds Beyond Our Own
          </h2>
          <ul className="mt-16 divide-y divide-border border-t border-border">
            {planets.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/planets/$slug"
                  params={{ slug: p.slug }}
                  className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <span className="display text-2xl md:col-span-4 md:text-4xl">
                    {p.name}
                  </span>
                  <span className="text-sm text-muted-foreground md:col-span-2">
                    {p.type}
                  </span>
                  <span className="text-sm text-muted-foreground md:col-span-4">
                    {p.description}
                  </span>
                  <span className="text-sm transition-transform md:col-span-2 md:justify-self-end md:group-hover:translate-x-1">
                    Explore →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Discoveries */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
            <p className="label-xs">Discoveries</p>
            <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)]">
              Things Worth Looking Up At
            </h2>
            <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
              {[
                {
                  fact: "Jupiter is the largest planet in our solar system.",
                  body: "It is more massive than all the other planets combined, and its gravity shapes the paths of asteroids and comets throughout the system.",
                },
                {
                  fact: "Venus is hotter than Mercury.",
                  body: "A dense carbon dioxide atmosphere traps heat so effectively that Venus stays around 465 °C, even though Mercury orbits closer to the Sun.",
                },
                {
                  fact: "Saturn would float in a large enough ocean.",
                  body: "Its average density is lower than that of water, the result of an enormous volume of hydrogen and helium around a comparatively small core.",
                },
                {
                  fact: "Neptune was found with mathematics before a telescope.",
                  body: "Irregularities in the orbit of Uranus pointed astronomers to where an unseen planet had to be - and there it was.",
                },
              ].map((d) => (
                <article key={d.fact}>
                  <h3 className="display text-2xl md:text-3xl">{d.fact}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
            <div className="md:col-span-7">
              <p className="label-xs">About</p>
              <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.75rem)]">
                Understanding the Universe,
                <br />
                One World at a Time.
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-16">
              <p className="leading-relaxed text-muted-foreground">
                Orbit is an interactive place to learn about the solar system.
                It combines a real-time 3D model of the planets with clear,
                carefully sourced writing, so that planetary science feels
                approachable rather than intimidating.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-block text-sm underline underline-offset-4"
              >
                More about the project →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
