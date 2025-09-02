"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type SocialConfig = {
  href: string;
  icon: string;
  alt: string;
};

type PageConfig = {
  title: string;
  href: string;
};

type NavbarProps = {
  config: PageConfig[];
  socials: SocialConfig[];
};

const Navbar = ({ config, socials }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="rellative w-full px-6 py-4 shadow-md flex bg-black/5 shadow-lg">
      {socials.length > 0 && (
        <section className="flex items-center gap-4">
          {socials.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={s.icon}
                alt={s.alt}
                width={24}
                height={24}
                className="hover:scale-110 transition-transform"
              />
            </Link>
          ))}
        </section>
      )}

      <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
        {config.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  inline-block
                  min-w-[80px] 
                  py-1.75
                  text-black
                  text-center
                  font-normal
                  hover:font-bold
                  hover:scale-105
                  transition-all 
                  duration-200
                  rounded-sm
                  ${isActive ? "!font-bold" : ""}`}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
