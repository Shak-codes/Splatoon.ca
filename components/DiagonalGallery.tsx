import React from "react";
import "./marquee.css";

interface DiagonalGalleryProps {
  images: string[];
}

const DiagonalGallery = ({ images }: DiagonalGalleryProps) => {
  const loop = [...images, ...images, images[0]];

  return (
    <div className="relative">
      <div
        className="
          flex gap-3
          transform rotate-[-3deg]
          marquee
        "
      >
        {loop.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`gallery-${idx}`}
            className="w-61.5 h-100 object-cover shadow-xl brightness-80"
          />
        ))}
      </div>
      <img
        key="logo"
        src="/logo2.png"
        alt="Splatoon Ontario Logo"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]"
      />
    </div>
  );
};

export default DiagonalGallery;
