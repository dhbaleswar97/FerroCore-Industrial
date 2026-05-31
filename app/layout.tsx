import type { Metadata, Viewport } from "next";
import { urbanist, figtree } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import "@/styles/globals.css";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  metadataBase: new URL(BRAND.url),
  keywords: [
    "industrial platform",
    "steel manufacturing",
    "inventory management",
    "enterprise SaaS",
    "CRM",
    "analytics",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRAND.url,
    title: BRAND.name,
    description: BRAND.description,
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EFEA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0908" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${urbanist.variable} ${figtree.variable}`}>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
