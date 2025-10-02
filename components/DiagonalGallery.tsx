import React from "react";
import "./marquee.css";
import Subtitle from "./Subtitle";

interface DiagonalGalleryProps {
  images: string[];
}

const DiagonalGallery = ({ images }: DiagonalGalleryProps) => {
  const loop = [...images, ...images, images[0]];
  const width = (100 - images.length) / images.length;
  console.log("Image width: ", width);

  return (
    <div className="relative border-2">
      <div
        className="
          flex gap-[1vw]
          transform rotate-[-3deg]
          marquee
        "
      >
        {loop.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Toronto Splatoon 3 Squid Social Photo ${idx}`}
            style={{ width: `${width}vw`, height: "30vh" }}
            className="object-cover shadow-xl brightness-80"
          />
        ))}
      </div>
      <img
        key="logo"
        src="/logo2.png"
        alt="Splatoon Ontario Logo"
        className="w-[50%] h-auto"
      />
      <Subtitle
        subtitle="Grassroots Splatoon in Toronto"
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2"
      />
    </div>
  );
};

export default DiagonalGallery;
