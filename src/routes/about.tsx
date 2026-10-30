import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Orbit - Understanding the Universe" },
      {
        name: "description",
        content:
          "Orbit makes astronomy and planetary science easier to explore, combining an interactive 3D solar system with clear scientific writing.",
      },
      { property: "og:title", content: "About Orbit - Understanding the Universe" },
      {
        property: "og:description",
        content: "Why Orbit exists and how it approaches planetary science.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 pb-32 md:px-10">
          <p className="label-xs">About</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)]">
            Understanding the Universe,
            <br />
            One World at a Time.
          </h1>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <div className="space-y-6 md:col-span-7">
              <p className="text-xl leading-relaxed md:text-2xl">
                Orbit is a place to look at the solar system closely, without
                the noise.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The planets are rendered in real time so that scale, motion and
                distance can be explored rather than read about. Around that
                model sits plain, careful writing: what each world is made of,
                what its climate is like, and how we came to know.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The project does not invent science. Facts are kept general and
                well established, and the research section is built to hold real
                citations - title, authors, publication, year, source and link -
                with anything unverified clearly labelled as a placeholder.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="label-xs">Explore next</p>
              <div className="mt-4 space-y-3">
                <Link to="/planets" className="block text-lg underline underline-offset-4">
                  The planets →
                </Link>
                <Link to="/research" className="block text-lg underline underline-offset-4">
                  Research →
                </Link>
                <Link to="/" className="block text-lg underline underline-offset-4">
                  The 3D solar system →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
