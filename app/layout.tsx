import type { Metadata } from "next";
import "./globals.css";
import { AccentInitializer } from "@/utils/accentInitializer";
import localFont from "next/font/local";
import { BackgroundInitializer } from "@/utils/backgroundInitializer";

// Only the weights actually used by the Typography component are loaded:
// 400/500/700/900 (600 -> 700 and 800 -> 900 resolve to these via CSS font
// matching). Italics and the 200/300 weights were never referenced, so they
// are omitted. Fonts are subsetted WOFF2 (Latin + typographic glyphs) for size.
const auro = localFont({
  src: [
    { path: "../public/fonts/Auro-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Auro-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Auro-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Auro-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-auro",
  display: "swap",
});

const DESCRIPTION =
  "Splatoon Toronto (Squid Social) is Canada's premier Splatoon community, hosting casual and competitive Nintendo Switch events in Toronto and the GTA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://splatoon.ca"),
  title: {
    default: "Splatoon Toronto | Canada's Premier Splatoon Community",
    template: "%s | Splatoon Toronto",
  },
  description: DESCRIPTION,
  keywords: [
    "Splatoon Toronto",
    "Splatoon Canada",
    "Squid Social",
    "Splatoon events",
    "Splatoon tournament Toronto",
    "Nintendo Switch events Toronto",
    "Splatoon 3 community",
    "GTA gaming community",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://splatoon.ca",
    siteName: "Splatoon Toronto",
    title: "Splatoon Toronto | Canada's Premier Splatoon Community",
    description: DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "https://splatoon.ca/logos/SplatoonTorontoAlt.webp",
        width: 1200,
        height: 1200,
        alt: "Splatoon Toronto - Canada's premier Splatoon community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SplatoonToronto",
    title: "Splatoon Toronto | Canada's Premier Splatoon Community",
    description: DESCRIPTION,
    images: ["https://splatoon.ca/logos/SplatoonTorontoAlt.webp"],
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
  const sameAs = [
    "https://twitter.com/SplatoonOntario",
    "https://bsky.app/profile/splatoon.ca",
    "https://www.instagram.com/splatoontoronto",
    "https://discord.com/invite/squidsocial",
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://splatoon.ca/#organization",
        name: "Splatoon Toronto",
        alternateName: "Squid Social",
        url: "https://splatoon.ca",
        logo: "https://splatoon.ca/logos/SplatoonTorontoAlt.webp",
        description:
          "Canada's premier Splatoon community, hosting casual and competitive Nintendo Switch events in Toronto and the Greater Toronto Area.",
        sameAs,
        areaServed: ["Canada", "Ontario", "Toronto"],
        foundingLocation: "Toronto, Ontario, Canada",
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://splatoon.ca/#localbusiness",
        name: "Splatoon Toronto",
        alternateName: "Squid Social",
        url: "https://splatoon.ca",
        image: "https://splatoon.ca/logos/SplatoonTorontoAlt.webp",
        logo: "https://splatoon.ca/logos/SplatoonTorontoAlt.webp",
        description:
          "Canada's premier Splatoon community, hosting casual and competitive Nintendo Switch events in Toronto and the Greater Toronto Area.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toronto",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        areaServed: ["Toronto", "Ontario", "Canada"],
        sameAs,
      },
    ],
  };
  return (
    <html lang="en-CA">
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        ></script>
      </head>
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
