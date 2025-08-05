"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type LinkConfig = {
  title: string;
  href: string;
};

type NavbarProps = {
  icon?: string;
  config: LinkConfig[];
};

const Navbar = ({ icon, config }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="w-full px-6 py-4 shadow-md flex justify-around items-center border-b-1 border-white-500 shadow-lg bg-white">
      <div className="flex items-center">
        {/* {icon && (
          <Link href="/">
            <Image src={icon} alt="Site logo" width={40} height={40} />
          </Link>
        )} */}
        <span className="text-xl font-bold text-black">Splatoon.ca</span>
      </div>

      <ul className="gap-1 flex items-center">
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
                  hover:font-medium
                  hover:scale-105
                  hover:bg-[var(--primary-accent)]
                  transition-all 
                  duration-200
                  rounded-sm
                  ${isActive ? "font-medium" : ""}`}
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
