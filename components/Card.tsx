"use client";
import Image from "next/image";

type CardProps = {
  link: string;
  bannerColor: string;
  iconSrc: string;
};

const Card = ({ link, bannerColor, iconSrc }: CardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
      group
      rounded-2xl 
      h-[400px] 
      w-[300px] 
      m-5 
      bg-white/25 
      hover:bg-white/70 
      transition 
      duration-300 
      shadow-md 
      hover:shadow-2xl 
      hover:scale-105 
      transform
      cursor-pointer"
    >
      <div
        className="h-20 w-full flex items-center justify-center rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: bannerColor }}
      >
        <Image src={iconSrc} alt="Icon" width={50} height={50} className="" />
      </div>
    </a>
  );
};

export default Card;
