import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { planets } from "@/data/planets";

export const Route = createFileRoute("/planets/")({
  component: PlanetsPage,
  head: () => ({
    meta: [
      { title: "Planets — Worlds Beyond Our Own | Orbit" },
      {
        name: "description",
        content:
          "Explore the eight planets of the solar system: size, orbit, climate, moons and the science behind each world.",
      },
      { property: "og:title", content: "Planets — Worlds Beyond Our Own | Orbit" },
      {
        property: "og:description",
        content: "The eight planets of the solar system, explained clearly.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/planets" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/planets" }],
  }),
});

function PlanetsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="label-xs">Planets</p>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)]">
            Worlds Beyond Our Own
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Eight planets, each a distinct experiment in what a world can be.
            Select one to explore it in three dimensions.
          </p>

          <div className="mt-20 space-y-24 pb-32 md:space-y-32">
            {planets.map((p, i) => (
              <article
                key={p.slug}
                className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12"
              >
                <div
                  className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}
                  aria-hidden="true"
                >
                  <div
                    className="aspect-square w-full max-w-sm rounded-full"
                    style={{
                      background: `radial-gradient(circle at 32% 30%, ${p.visual.colors[2]}, ${p.visual.colors[0]} 45%, ${p.visual.colors[1]} 70%, #05060a 100%)`,
                      boxShadow: "0 40px 120px -60px rgba(255,255,255,0.35)",
                    }}
                  />
                </div>
                <div className="md:col-span-7">
                  <p className="label-xs">{p.type}</p>
                  <h2 className="display mt-3 text-4xl md:text-6xl">{p.name}</h2>
                  <p className="mt-2 text-muted-foreground">{p.epithet}</p>
                  <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                    {p.intro}
                  </p>
                  <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-3">
                    <div>
                      <dt className="label-xs">Distance</dt>
                      <dd className="mt-1 text-sm">{p.distance}</dd>
                    </div>
                    <div>
                      <dt className="label-xs">Diameter</dt>
                      <dd className="mt-1 text-sm">{p.diameter}</dd>
                    </div>
                    <div>
                      <dt className="label-xs">Orbital period</dt>
                      <dd className="mt-1 text-sm">{p.orbitalPeriod}</dd>
                    </div>
                    <div>
                      <dt className="label-xs">Temperature</dt>
                      <dd className="mt-1 text-sm">{p.temperature}</dd>
                    </div>
                    <div>
                      <dt className="label-xs">Moons</dt>
                      <dd className="mt-1 text-sm">{p.moons}</dd>
                    </div>
                  </dl>
                  <Link
                    to="/planets/$slug"
                    params={{ slug: p.slug }}
                    className="mt-8 inline-block rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
                  >
                    Explore {p.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
