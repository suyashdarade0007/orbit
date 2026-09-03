import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="text-sm font-medium tracking-[0.3em] uppercase">Orbit</p>
          <p className="mt-3 text-muted-foreground">
            Explore. Discover. Understand.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Explore
          </Link>
          <Link to="/planets" className="text-sm text-muted-foreground hover:text-foreground">
            Planets
          </Link>
          <Link to="/research" className="text-sm text-muted-foreground hover:text-foreground">
            Research
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">© 2026 Orbit</p>
      </div>
    </footer>
  );
}
