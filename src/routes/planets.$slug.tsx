import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SpaceCanvas } from "@/components/space/SpaceCanvas";
import { getPlanet, planets } from "@/data/planets";
import { researchForPlanet } from "@/data/research";

export const Route = createFileRoute("/planets/$slug")({
  loader: ({ params }) => {
    const planet = getPlanet(params.slug);
    if (!planet) throw notFound();
    return { planet };
  },
  component: PlanetPage,
  head: ({ params, loaderData }) => {
    const p = loaderData?.planet;
    const title = p ? `${p.name} - ${p.epithet} | Orbit` : "Planet | Orbit";
    const description = p?.intro ?? "Planetary science on Orbit.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/planets/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/planets/${params.slug}` }],
    };
  },
});

function PlanetPage() {
  const { planet } = Route.useLoaderData();
  const papers = researchForPlanet(planet.slug);
  const index = planets.findIndex((p) => p.slug === planet.slug);
  const next = planets[(index + 1) % planets.length]!;

  return (
    <>
      <Nav />
      <main>
        <section className="relative h-[78svh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <SpaceCanvas focusOnly={planet.slug} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 pb-14 md:px-10">
            <p className="label-xs">{planet.type}</p>
            <h1 className="display mt-4 text-[clamp(2.75rem,8vw,6.5rem)]">
              {planet.name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{planet.epithet}</p>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <section className="grid gap-10 border-t border-border py-20 md:grid-cols-12 md:py-28">
            <p className="max-w-2xl text-xl leading-relaxed md:col-span-7 md:text-2xl">
              {planet.intro}
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-5">
              {[
                ["Distance", planet.distance],
                ["Diameter", planet.diameter],
                ["Orbital period", planet.orbitalPeriod],
                ["Temperature", planet.temperature],
                ["Moons", planet.moons],
                ["Type", planet.type],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label-xs">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border-t border-border py-20 md:py-28">
            <h2 className="display text-[clamp(1.75rem,4vw,3rem)]">
              Inside the World
            </h2>
            <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {planet.sections.map((s) => (
                <article key={s.title}>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-border py-20 md:py-28">
            <h2 className="display text-[clamp(1.75rem,4vw,3rem)]">
              Interesting Facts
            </h2>
            <ul className="mt-12 space-y-8">
              {planet.facts.map((f) => (
                <li
                  key={f}
                  className="max-w-3xl border-b border-border pb-8 text-xl leading-relaxed md:text-2xl"
                >
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border py-20 md:py-28">
            <h2 className="display text-[clamp(1.75rem,4vw,3rem)]">Research</h2>
            {papers.length === 0 ? (
              <p className="mt-8 max-w-lg leading-relaxed text-muted-foreground">
                No verified sources have been added for {planet.name} yet. This
                section is ready for real references - title, authors,
                publication, year, source and an external link.
              </p>
            ) : (
              <ul className="mt-12 divide-y divide-border border-t border-border">
                {papers.map((r) => (
                  <li key={r.id} className="py-8">
                    {r.placeholder && (
                      <p className="label-xs">Placeholder - not a real citation</p>
                    )}
                    <h3 className="mt-2 text-xl md:text-2xl">{r.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {r.summary}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {r.authors} · {r.publication} · {r.year} · {r.source}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/research"
              className="mt-10 inline-block text-sm underline underline-offset-4"
            >
              All research →
            </Link>
          </section>

          <section className="flex items-center justify-between border-t border-border py-16">
            <Link to="/planets" className="text-sm text-muted-foreground hover:text-foreground">
              ← All planets
            </Link>
            <Link
              to="/planets/$slug"
              params={{ slug: next.slug }}
              className="text-right"
            >
              <span className="label-xs">Next</span>
              <span className="display mt-1 block text-2xl md:text-3xl">
                {next.name} →
              </span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
