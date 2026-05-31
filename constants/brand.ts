export const BRAND = {
  name: "FerroCore Industrial",
  shortName: "FerroCore",
  tagline: "Engineering the Future of Industrial Excellence",
  description:
    "FerroCore Industrial is a leading enterprise platform for steel manufacturing, inventory management, and industrial operations — built for scale, speed, and precision.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://ferrocore.industrial",
  email: "contact@ferrocore.industrial",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
    icon: "/icon.svg",
  },
  social: {
    twitter: "https://twitter.com/ferrocore",
    linkedin: "https://linkedin.com/company/ferrocore",
    github: "https://github.com/ferrocore",
  },
} as const;

export const COLORS = {
  ember: "#F76C46",
  cobalt: "#3D55FD",
  sand: "#C6AF88",
  steel: "#85A1C5",
  citrine: "#E9E778",
  base: "#F2EFEA",
  black: "#000000",
} as const;

export const FONTS = {
  display: "Urbanist",
  body: "Figtree",
} as const;
