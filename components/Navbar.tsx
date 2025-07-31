import Link from "next/link";
import Image from "next/image";

type LinkConfig = {
  title: string;
  href: string;
};

type NavbarProps = {
  icon?: string;
  config: LinkConfig[];
};

const Navbar = ({ icon, config }: NavbarProps) => {
  return (
    <nav className="w-full px-6 py-4 shadow-md flex justify-around items-center">
      <div className="flex items-center gap-3">
        {/* {icon && (
          <Link href="/">
            <Image src={icon} alt="Site logo" width={40} height={40} />
          </Link>
        )} */}
        <span className="text-xl font-semibold">Splatoon.ca</span>
      </div>

      <ul className="flex gap-6 items-center">
        {config.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white-700 hover:text-blue-600 transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
