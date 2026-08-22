import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

// Change this if you attach a custom domain.
export const siteUrl = "https://ggred0123.github.io";

/**
 * Self-hosted at build time by next/font, so the static export ships the
 * font files itself — no runtime request to Google.
 *  - Inter: body & UI
 *  - Instrument Serif (italic): display accents — name, venues, watermark
 *  - JetBrains Mono: metadata — dates, labels, chips
 */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-var",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

const description =
  "M.S. student at KAIST Kim Jaechul Graduate School of AI (BISPL), advised by Jong Chul Ye. Research on 3D vision, robotics, vision-language-action models, and diffusion models.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.name + " — " + profile.affiliation,
  description,
  openGraph: {
    title: profile.name,
    description,
    type: "profile",
    images: [profile.photo],
  },
  twitter: { card: "summary", title: profile.name, description },
};

// Applies the saved theme before first paint, so a visitor who chose light
// never sees a dark flash (and vice versa).
const themeBoot = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
