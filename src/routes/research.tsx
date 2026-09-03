import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { research, researchCategories } from "@/data/research";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
  head: () => ({
    meta: [
      { title: "Research & Discovery | Orbit" },
      {
        name: "description",
        content:
          "The science behind the worlds we observe: planetary science, astrophysics, space exploration, exoplanets and cosmology.",
      },
      { property: "og:title", content: "Research & Discovery | Orbit" },
      {
        property: "og:description",
        content: "Explore the science behind the worlds we observe.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/research" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
});

function ResearchPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="label-xs">Research</p>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)]">
            Research &amp; Discovery
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Explore the science behind the worlds we observe.
          </p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            The entries below are placeholders. They describe topics rather than
            specific papers, and carry no citation until a verified reference is
            added.
          </p>

          <div className="mt-24 space-y-24 pb-32">
            {researchCategories.map((category) => {
              const items = research.filter((r) => r.category === category);
              if (!items.length) return null;
              return (
                <section key={category}>
                  <h2 className="label-xs">{category}</h2>
                  <ul className="mt-8 divide-y divide-border border-t border-border">
                    {items.map((r) => (
                      <li key={r.id} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10">
                        <div className="md:col-span-8">
                          {r.placeholder && (
                            <p className="label-xs">
                              Placeholder — not a real citation
                            </p>
                          )}
                          <h3 className="mt-2 text-2xl leading-snug md:text-3xl">
                            {r.title}
                          </h3>
                          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                            {r.summary}
                          </p>
                        </div>
                        <div className="md:col-span-4 md:text-right">
                          <p className="text-sm text-muted-foreground">
                            {r.authors}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {r.publication} · {r.year}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {r.source}
                          </p>
                          {r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-block text-sm underline underline-offset-4"
                            >
                              Read Paper →
                            </a>
                          ) : (
                            <p className="mt-4 text-sm text-muted-foreground">
                              Link pending
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
