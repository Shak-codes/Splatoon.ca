import React from "react";
import "./marquee.css";
import Subtitle from "./Subtitle";

interface DiagonalGalleryProps {
  images: string[];
}

const DiagonalGallery = ({ images }: DiagonalGalleryProps) => {
  const loop = [...images, ...images, images[0]];

  return (
    <div className="relative">
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
            alt={`gallery-${idx}`}
            className="w-[11.5vw] h-[30vh] object-cover shadow-xl brightness-80"
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-83/160 w-[600px]">
        <img key="logo" src="/logo2.png" alt="Splatoon Ontario Logo" />
        <Subtitle
          subtitle="Grassroots Splatoon in Toronto"
          className="-translate-y-[425%]"
        />
      </div>
    </div>
  );
};

export default DiagonalGallery;
