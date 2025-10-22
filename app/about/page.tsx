"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import Header from "@/components/Header";
import Subtitle from "@/components/Subtitle";
import Typography from "@/components/Typography/Typography";
import { SECTIONS } from "./constants";
import Image from "next/image";
import Button from "@/components/Button";
import { useBreakpoint } from "@/utils/useBreakpoint";
import RotatedGallery from "@/components/RotatedGallery";
import { SQUIDSOCIAL_IMGS } from "../constants";

const About = () => {
  const bp = useBreakpoint();

  const count =
    bp === "3xl"
      ? 12
      : bp === "2xl"
      ? 10
      : bp === "xl"
      ? 8
      : bp === "lg"
      ? 6
      : 4;
  const images = SQUIDSOCIAL_IMGS.slice(0, count);
  return (
    <>
      <Navbar config={navLinks} socials={navSocials} />
      <main className="mainContainer">
        <div className="min-h-screen flex flex-col justify-start items-center pt-20 gap-10">
          <header id="header" aria-labelledby="about-heading">
            <Header
              title="About Us"
              variant="header"
              size="page-header"
              className="text-center"
            />
            <Subtitle
              subtitle="Get to know our history"
              className="text-center"
            />
          </header>
          <section className="relative flex justify-center items-center bg-black/40 p-2 rounded-sm">
            <RotatedGallery images={images} />
            <div className="absolute flex justify-center items-center gap-2 p-5">
              <Typography variant="sectionTitle" size="3xl" className="flex-2">
                The Squid Social team breathes passion.
              </Typography>
              <Typography className="flex-3">
                The Squid Social organizers continuously innovate in leaps and
                bounds to make their events happen. Our founder, Pastecat built
                Squid Social into the community wide staple it is today. Squid
                Social is no longer just a small meeting between friends, but a
                professional event that players have grown to love.
              </Typography>
            </div>
          </section>

          <section className="space-y-6">
            <Typography
              variant="sectionTitle"
              size="xl"
              className="text-center"
            >
              Professional organizations place their trust in the Squid Social
              team.
            </Typography>
            <div className="flex justify-center items-center gap-5">
              <Image
                src={"/partners/A&C.webp"}
                height={1000}
                width={1505}
                alt="A&C Games"
                className="w-[10%] h-auto"
              />
              <Image
                src={"/partners/powerup.webp"}
                height={1000}
                width={1000}
                alt="Power Up Gaming Bar"
                className="w-[10%] h-auto"
              />
              <Image
                src={"/partners/fanexpo.webp"}
                height={295}
                width={1000}
                alt="Fan Expo"
                className="w-[10%] h-auto"
              />
              <Image
                src={"/partners/nintendovs.webp"}
                height={1000}
                width={1000}
                alt="Nintendo Versus"
                className="w-[10%] h-auto"
              />
              <Image
                src={"/partners/invictus.webp"}
                height={1000}
                width={1000}
                alt="Invictus Game Station"
                className="w-[10%] h-auto"
              />
              <Image
                src={"/partners/GOML.webp"}
                height={1000}
                width={1182}
                alt="Get On My Level"
                className="w-[10%] h-auto"
              />
            </div>
            <Button text="Get Started" href="#section0" />
          </section>
        </div>
        {SECTIONS.map(
          ({ title, subtitle, text, images, width, height, alt }, idx) => {
            const isEven = idx % 2 === 0;
            const backHref = idx === 0 ? "#title" : `#section${idx - 1}`;
            const nextHref = idx === 4 ? "#title" : `#section${idx + 1}`;
            const nextText = idx === 4 ? "To the top!" : "Next";
            return (
              <div
                key={`section${idx}`}
                id={`section${idx}`}
                className="min-h-screen flex items-center"
              >
                <section className="w-full bg-black/40 rounded-sm p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-10">
                    {isEven && (
                      <Image
                        src={images[0]}
                        width={width}
                        height={height}
                        alt={alt}
                        className="w-full md:max-w-[50%] h-auto rounded-sm"
                      />
                    )}

                    <div className="w-full sm:w-auto space-y-2 sm:space-y-3">
                      <Typography
                        variant="sectionTitle"
                        size="sm"
                        className="!text-[var(--primary)]"
                      >
                        {title}
                      </Typography>
                      <Typography variant="sectionSubtitle" size="lg">
                        {subtitle}
                      </Typography>
                      <Typography size="sm">{text}</Typography>
                    </div>

                    {!isEven && (
                      <Image
                        src={images[0]}
                        width={width}
                        height={height}
                        alt={`${idx}`}
                        className="w-full md:max-w-[50%] h-auto rounded-sm"
                      />
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button text="Back" href={backHref} />
                    <Button text={nextText} href={nextHref} bghover="accent" />
                  </div>
                </section>
              </div>
            );
          }
        )}
      </main>
      <Footer />
    </>
  );
};

export default About;
