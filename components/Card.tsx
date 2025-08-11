"use client";
import Image from "next/image";

type CardProps = {
  link: string;
  bannerColor: string;
  iconSrc: string;
  title: string;
  content: string;
};

const Card = ({ link, bannerColor, iconSrc, title, content }: CardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
      group
      rounded-2xl 
      h-[600px] 
      w-[400px] 
      m-5 
      bg-white/60 
      hover:bg-white/90
      transition 
      duration-300 
      shadow-md 
      hover:shadow-2xl 
      hover:scale-105 
      transform
      cursor-pointer
      p-5
      flex
      flex-col
      gap-5"
    >
      <div
        className="h-40 flex items-center justify-center rounded-2xl"
        style={{ backgroundColor: bannerColor }}
      >
        <Image src={iconSrc} alt="Icon" width={50} height={50} className="" />
      </div>
      <h3 className="!text-[var(--secondary-background)] font-bold text-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        {title}
      </h3>
      <p className="!text-[var(--secondary-background)] text-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        {content}
      </p>
    </a>
  );
};

export default Card;
