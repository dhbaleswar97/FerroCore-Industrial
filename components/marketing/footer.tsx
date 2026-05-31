import Link from "next/link";
import { BRAND } from "@/constants/brand";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Solutions: [
    { label: "Manufacturing", href: "/solutions/manufacturing" },
    { label: "Construction", href: "/solutions/construction" },
    { label: "Aerospace", href: "/solutions/aerospace" },
    { label: "Energy", href: "/solutions/energy" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Status", href: "/status" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-ember">
                <span className="font-display text-sm font-black text-white">FC</span>
              </div>
              <span className="font-display text-base font-bold">{BRAND.shortName}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {BRAND.tagline}
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(BRAND.social).map(([name, href]) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize text-muted-foreground transition-colors hover:text-foreground"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
