"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import DiagonalGallery from "@/components/DiagonalGallery";
import { useBreakpoint } from "@/utils/useBreakpoint";
import Image from "next/image";
import Link from "next/link";
import Subtitle from "@/components/Subtitle";
import Typography from "@/components/Typography/Typography";
import { SQUIDSOCIAL_IMGS } from "./constants";

export default function Home() {
  const bp = useBreakpoint();

  const count =
    bp === "5xl"
      ? 18
      : bp === "4xl"
      ? 16
      : bp === "3xl"
      ? 14
      : bp === "2xl"
      ? 12
      : bp === "xl"
      ? 10
      : bp === "lg"
      ? 8
      : 6;
  const images = SQUIDSOCIAL_IMGS.slice(0, count);

  return (
    <div className="relative">
      <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen w-full">
        <Navbar config={navLinks} socials={navSocials} />
        <main className="flex-grow w-full flex flex-col items-center">
          <section className="relative w-full min-h-screen overflow-clip flex items-center justify-center">
            <DiagonalGallery images={images} />
            <div
              className="
                absolute
                flex flex-col justify-center items-center
                min-w-[300px] max-w-[800px]
                top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2
                gap-1
              "
            >
              <h1 className="sr-only">
                Splatoon Toronto — Canada&apos;s Premier Splatoon Community
              </h1>
              <Image
                src="/logos/SplatoonToronto.webp"
                alt="Splatoon Toronto Logo"
                width={2048}
                height={1816}
                sizes="(max-width: 360px) 300px,
                      (max-width: 640px) 400px,
                      (max-width: 1024px) 500px,
                      (max-width: 1280px) 600px,
                      (max-width: 1536px) 700px,
                      800px"
                className="w-[min(80vw,60vh)] h-auto max-w-[800px]"
              />
              <Subtitle
                subtitle="Canada's Premier\n Splatoon Community"
                className="w-full"
              />
            </div>
          </section>

          <section
            aria-label="About Splatoon Toronto"
            className="w-full max-w-[900px] px-6 pb-20"
          >
            <div className="bg-black/40 rounded-sm p-6 sm:p-8 space-y-5">
              <Typography variant="subtitle" size="3xl">
                Toronto&apos;s Home for Splatoon
              </Typography>
              <Typography size="base">
                Splatoon Toronto — known to the community as Squid Social — is
                Canada&apos;s premier Splatoon community. Since the early days of
                the original Splatoon on the Wii U, we&apos;ve brought players
                across Toronto and the Greater Toronto Area together to
                celebrate the game we love. Today we run regular Splatoon 3
                events on the Nintendo Switch for players of every skill level.
              </Typography>

              <Typography variant="sectionTitle" size="xl">
                Casual and Competitive Splatoon Events
              </Typography>
              <Typography size="base">
                Every event features both competitive round-robin brackets and
                relaxed casual lobbies. There&apos;s absolutely no skill
                requirement to join — whether you&apos;re a seasoned veteran or
                picking up your controller for the first time, you&apos;ll find
                a welcoming game and a friendly crowd here in Toronto.
              </Typography>

              <Typography variant="sectionTitle" size="xl">
                Join the Squid Social Community
              </Typography>
              <Typography size="base">
                Squid Social started as a small gathering between friends and
                grew into a recognized staple of the Canadian Splatoon scene.
                Come hang out, meet local players, grab an event poster, and
                become part of the GTA&apos;s longest-running Splatoon community.
              </Typography>

              <Typography variant="sectionTitle" size="xl">
                Connect With Us
              </Typography>
              <Typography size="base">
                Follow Splatoon Toronto on{" "}
                <Link
                  href="https://www.instagram.com/splatoontoronto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--primary)]"
                >
                  Instagram
                </Link>
                ,{" "}
                <Link
                  href="https://bsky.app/profile/splatoon.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--primary)]"
                >
                  Bluesky
                </Link>
                , and{" "}
                <Link
                  href="https://twitter.com/SplatoonOntario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--primary)]"
                >
                  Twitter/X
                </Link>
                , or join our{" "}
                <Link
                  href="https://discord.com/invite/squidsocial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--primary)]"
                >
                  Discord
                </Link>{" "}
                to stay up to date on upcoming events.
              </Typography>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
