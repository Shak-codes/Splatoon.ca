"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between w-full px-6 py-4 shadow-md bg-black/15 shadow-lg">
        {/* tab icon */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
          onClick={() => setOpen(!open)}
        >
          <span className={`${styles.bar} ${open ? styles.openTop : ""}`} />
          <span className={`${styles.bar} ${open ? styles.openMid : ""}`} />
          <span className={`${styles.bar} ${open ? styles.openBot : ""}`} />
        </button>

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

        {/* Desktop Layout */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {config.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                  inline-block min-w-[80px] py-1.5
                  text-white text-center
                  font-normal hover:font-bold hover:scale-105
                  transition-all duration-200 rounded-sm
                  ${isActive ? "!font-bold" : ""}
                `}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`${styles.drawer} ${
          open ? styles.drawerOpen : styles.drawerClosed
        }`}
      >
        <ul className="flex flex-col gap-6 p-6">
          {config.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                  block text-lg text-black
                  hover:font-bold transition-all duration-200
                  ${isActive ? "!font-bold" : ""}
                `}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
