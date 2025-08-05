import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { colors } from "@/public/constants/colors";
import Bluesky from "@/public/social/bluesky.svg";
import Twitter from "@/public/social/twitter.svg";
import Discord from "@/public/social/discord.svg";
import PageHeader from "@/components/PageHeader";

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
          link="https://bsky.app/profile/splatoon.ca"
          bannerColor={colors.bluesky}
          iconSrc={Bluesky}
        />
        <Card
          link="https://www.twitter.com/SplatoonGTA"
          bannerColor={colors.twitter}
          iconSrc={Twitter}
        />
        <Card
          link="https://discord.com/invite/squidsocial"
          bannerColor={colors.discord}
          iconSrc={Discord}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
