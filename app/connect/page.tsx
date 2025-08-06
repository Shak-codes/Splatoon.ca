import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { colors } from "@/public/constants/colors";
import Bluesky from "@/public/social/bluesky.svg";
import Twitter from "@/public/social/twitter.svg";
import Discord from "@/public/social/discord.svg";
import PageHeader from "@/components/PageHeader";
import { links } from "@/public/constants/links";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

const Connect = () => {
  return (
    <div className="flex flex-col items-center gap-10 min-h-screen pb-5">
      <Navbar config={navLinks} />
      <PageHeader
        title="Want to stay connected?"
        subtitle="We got you covered"
      />
      <main className="flex items-center justify-center flex-grow">
        <Card
          link={links.bluesky}
          bannerColor={colors.bluesky}
          iconSrc={Bluesky}
          title="Bluesky"
          content="Follow us on Bluesky! We post here frequently regarding the details surrounding our events!"
        />
        <Card
          link={links.twitter}
          bannerColor={colors.twitter}
          iconSrc={Twitter}
          title="Twitter"
          content="Follow us on Twitter! We haven't posted here for years but maybe that's changed by the time you're looking at this."
        />
        <Card
          link={links.discord}
          bannerColor={colors.discord}
          iconSrc={Discord}
          title="Discord"
          content="The best way to keep in touch with us in by joining our Discord. Here you can ask questions not listed in our FAQ, get to know us, and even play some games!"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
