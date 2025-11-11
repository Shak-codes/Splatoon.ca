import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader/EventHeader";
import { navLinks, navSocials } from "@/public/constants/nav";
import Typography from "@/components/Typography/Typography";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { POSTERS } from "./constants";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Checklist from "@/components/Checklist";
import { CHECKLIST } from "./constants";

const Events = () => {
  return (
    <div className="flex flex-col items-center gap-1 min-h-screen pb-1">
      <Navbar config={navLinks} socials={navSocials} />
      <main className="mainContainer">
        <EventHeader
          date="Sunday November 30th"
          location="558 Yonge Street"
          href="#details"
          className="min-h-screen"
        />
        <section id="details" className="mainSection">
          <div className="sectionContent">
            <Header variant="sectionTitle" size="5xl" title="Details" />
            <Typography>
              We pride ourselves on bringing together people from all facets of
              the community. Whether you&apos;re a competitive player, casual,
              or even just getting into the series you&apos;ll have a great
              time! Hosted at Invictus Game Station in Toronto, we run
              competitive and casual matches for all to enjoy!
            </Typography>
            <Typography>
              If you&apos;re participating in the competitive matches,
              you&apos;ll be randomly assigned to a team for the event, where
              you&apos;ll participate in a round-robin bracket with your team.
              There&apos;s absolutely no skill requirement to play in these
              matches, our skill range scales brand new players to seasoned
              veterans. Furthermore, since we only have two stations for
              competitive play, during downtime you&apos;ll be able to
              participate in the casual matches!
            </Typography>
            <Typography>
              If you aren&apos;t playing in the competitive matches, you can do
              practically whatever you&apos;d like. Most people join a casual
              lobby, some play open together, sometimes people even play
              different games like Mario Kart.
            </Typography>
          </div>
          <Button text="Cross off our checklist!" href="#checklist" />
        </section>
        <section id="checklist" className="mainSection">
          <div className="sectionContent">
            <Header variant="sectionTitle" size="5xl" title="Checklist" />
            <Typography>
              As an attendee there&apos;s a few things you have to bring in
              order to play. Make sure you packed everything on the list!
            </Typography>
            <Checklist items={CHECKLIST} />
          </div>
          <Button href="#posters" text="Check out our posters!" />
        </section>
        <section id="posters" className="mainSection">
          <div className="sectionContent">
            <Header variant="sectionTitle" size="5xl" title="Posters" />
            <Typography>
              At most of our events we have posters for sale. These are made by
              talented artists in our local community and you can buy the latest
              one for ten dollars! Sometimes we have leftovers from older events
              and if you&apos;d like to pick any of those up it&apos;ll cost you
              five bucks. Here are some examples of our previous posters for
              your viewing!
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
