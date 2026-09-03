import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Explore", to: "/" as const },
  { label: "Planets", to: "/planets" as const },
  { label: "Research", to: "/research" as const },
  { label: "About", to: "/about" as const },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="text-sm font-medium tracking-[0.3em] uppercase"
          onClick={() => setOpen(false)}
        >
          Orbit
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/planets"
            className="hidden rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground md:inline-flex"
          >
            Start Exploring
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur md:hidden"
        >
          <ul className="space-y-5">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-2xl tracking-tight"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
