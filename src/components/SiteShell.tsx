import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/practice", label: "Practice" },
  { to: "/traps", label: "Traps" },
  { to: "/vocabulary", label: "Words" },
  { to: "/progress", label: "Progress" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="font-display text-xl font-semibold text-primary">
            Patente B <span className="text-accent">Decoder</span>
          </Link>
          <nav aria-label="Main" className="flex flex-wrap gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted font-bold text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-4xl space-y-1 px-4 py-6 text-sm text-muted-foreground">
          <p>
            Independent study aid — not an official Italian government product. Always check the official
            ministry materials.
          </p>
          <p>
            Questions from the study guide by Gregg Poss. <Link to="/about" className="underline">Sources & attribution</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
