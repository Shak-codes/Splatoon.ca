import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader/EventHeader";
import { navLinks, navSocials } from "@/public/constants/nav";
import Typography from "@/components/Typography/Typography";
import Header from "@/components/Header";
import Button from "@/components/Button";
import InteractiveRotatedGallery from "@/components/InteractiveRotatedGallery";
import { POSTERS } from "./constants";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";

const Events = () => {
  return (
    <div className="flex flex-col items-center gap-1 min-h-screen pb-1">
      <Navbar config={navLinks} socials={navSocials} />
      <main className={`mainContainer justify-center`}>
        <EventHeader
          date="Sunday September 28th"
          location="558 Yonge Street"
          href="#details"
          className="min-h-[calc(100vh-60px)]"
        />
        <section
          id="details"
          className="grid items-center min-h-screen w-[var(--width)]"
        >
          <div className="bg-black/40 p-5 rounded-xl space-y-2">
            <Header variant="sectionTitle" size="text-5xl" title="DETAILS" />
            <Typography>
              We pride ourselves on bringing together people from all facets of
              the community. Whether you&apos;re a competitive player, casual,
              or even just getting into the series you&apos;ll have a great
              time! Hosted at Invictus Gaming Lounge, we run competitive and
              casual matches for all to enjoy!
            </Typography>
            <Button text="What to bring" disabled={false} href="#belongings" />
          </div>
        </section>
        <section
          id="belongings"
          className="grid items-center min-h-screen w-[var(--width)]"
        >
          <div className="bg-black/40 p-5 rounded-xl space-y-2">
            <Header
              variant="sectionTitle"
              size="text-5xl"
              title="WHAT TO BRING"
            />
            <Typography>
              As an attendee there&apos;s a few things you have to bring in
              order to play. Make sure to pack the night before and double check
              in the morning that you got everything on the list.
            </Typography>
            <Button text="Posters" disabled={false} href="#posters" />
          </div>
        </section>
        <section
          id="posters"
          className="grid items-center min-h-screen w-[var(--width)]"
        >
          <div className="bg-black/40 p-5 rounded-xl space-y-2">
            <Header variant="sectionTitle" size="text-5xl" title="POSTERS" />
            <Typography>
              At the larger Squid Social events we have posters for sale. These
              are made by talented artists in our local community and you can
              buy the latest one for ten dollars! Sometimes we have leftovers
              from older events and if you&apos;d like to pick any of those up
              it&apos;ll cost you five bucks. Here are some examples of our
              previous posters for your viewing!
            </Typography>
            <ImageCarousel images={POSTERS} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
