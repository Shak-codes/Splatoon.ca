import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Bluesky from "@/public/social/bluesky.svg";
import Twitter from "@/public/social/twitter.svg";
import Discord from "@/public/social/discord.svg";
import PageHeader from "@/components/PageHeader";
import { CardData } from "./constants";
import { navLinks, navSocials } from "@/public/constants/nav";

const Connect = () => {
  return (
    <div className="flex flex-col items-center gap-5 min-h-screen pb-5">
      <Navbar config={navLinks} socials={navSocials} />
      <PageHeader
        title="Want to stay connected?"
        subtitle="We got you covered"
      />
      <main className="flex items-center justify-center flex-grow">
        <Card
          link={CardData.bluesky.link}
          bannerColor={CardData.bluesky.color}
          iconSrc={Bluesky}
          title={CardData.bluesky.title}
          content={CardData.bluesky.content}
        />
        <Card
          link={CardData.twitter.link}
          bannerColor={CardData.twitter.color}
          iconSrc={Twitter}
          title={CardData.twitter.title}
          content={CardData.twitter.content}
        />
        <Card
          link={CardData.discord.link}
          bannerColor={CardData.discord.color}
          iconSrc={Discord}
          title={CardData.discord.title}
          content={CardData.discord.content}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
