import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Squid Social",
  description:
    "The story of Squid Social and Splatoon Toronto — from a humble Splatoon 1 meetup to Canada's premier Splatoon community in the Greater Toronto Area.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
