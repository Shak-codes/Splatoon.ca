import type { Metadata } from "next";
import "./globals.css";
import { AccentInitializer } from "@/utils/accentInitializer";
import localFont from "next/font/local";
import { BackgroundInitializer } from "@/utils/backgroundInitializer";

const auro = localFont({
  src: [
    { path: "../public/fonts/Auro-Light.otf", weight: "200", style: "normal" },
    {
      path: "../public/fonts/Auro-Light Italic.otf",
      weight: "200",
      style: "italic",
    },
    { path: "../public/fonts/Auro-Book.otf", weight: "300", style: "normal" },
    {
      path: "../public/fonts/Auro-Book Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Auro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Auro-Regular Italic.otf",
      weight: "400",
      style: "italic",
    },
    { path: "../public/fonts/Auro-Medium.otf", weight: "500", style: "normal" },
    {
      path: "../public/fonts/Auro-Medium Italic.otf",
      weight: "500",
      style: "italic",
    },
    { path: "../public/fonts/Auro-Bold.otf", weight: "700", style: "normal" },
    {
      path: "../public/fonts/Auro-Bold Italic.otf",
      weight: "700",
      style: "italic",
    },
    { path: "../public/fonts/Auro-Black.otf", weight: "900", style: "normal" },
    {
      path: "../public/fonts/Auro-Black Italic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-auro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://splatoon.ca"),
  title: "Splatoon Toronto",
  description:
    "Stay up to date with the grassroots Splatoon community around Toronto.",
  openGraph: {
    type: "website",
    url: "https://splatoon.ca",
    title: "Splatoon Toronto",
    description:
      "Stay up to date with the grassroots Splatoon community around Toronto.",
    locale: "en_CA",
    images: [
      {
        url: "https://splatoon.ca/SplatoonToronto2.webp",
        width: 1200,
        height: 1200,
        alt: "Splatoon Toronto - events, merchandise, and community info!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SplatoonToronto",
    title: "Splatoon Toronto",
    description:
      "Stay up to date with the grassroots Splatoon community around Toronto.",
    images: ["https://splatoon.ca/SplatoonToronto2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "Splatoon.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${auro.variable} antialiased min-h-screen flex flex-col items-center`}
      >
        <AccentInitializer />
        <BackgroundInitializer />
        {children}
      </body>
    </html>
  );
}
