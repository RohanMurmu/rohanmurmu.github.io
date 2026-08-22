import type { Metadata } from "next";
import { profile } from "@/data/profile";
import "./globals.css";

const description =
  "M.S. student at KAIST Kim Jaechul Graduate School of AI (BISPL), advised by Jong Chul Ye. Research on 3D vision, robotics, vision-language-action models, and diffusion models.";

// Change this if you attach a custom domain.
export const siteUrl = "https://ggred0123.github.io";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
