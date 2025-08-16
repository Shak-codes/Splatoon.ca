import Bluesky from "@/public/social/bluesky.svg";
import Twitter from "@/public/social/twitter.svg";
import Discord from "@/public/social/discord.svg";

export const navLinks = [
  { title: "HOME", href: "/" },
  { title: "ABOUT", href: "/about" },
  { title: "EVENTS", href: "/events" },
  { title: "FAQ", href: "/faq" },
];

export const navSocials = [
  {
    href: "https://bsky.app/profile/splatoon.ca",
    icon: Bluesky,
    alt: "Bluesky",
  },
  {
    href: "https://discord.com/invite/squidsocial",
    icon: Discord,
    alt: "Discord",
  },
  {
    href: "https://www.twitter.com/SplatoonGTA",
    icon: Twitter,
    alt: "Twitter",
  },
];
