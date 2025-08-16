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
  icon?: string;
  config: PageConfig[];
  socials: SocialConfig[];
};

const Navbar = ({ icon, config, socials }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 shadow-md flex justify-around items-center bg-black/5 shadow-lg">
      <div className="flex items-center">
        {/* {icon && (
          <Link href="/">
            <Image src={icon} alt="Site logo" width={40} height={40} />
          </Link>
        )} */}
        <span className="text-xl font-bold text-white">Splatoon.ca</span>
      </div>

      {socials.length > 0 && (
        <div className="flex items-center gap-4">
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
        </div>
      )}

      <ul className="flex items-center gap-10">
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
