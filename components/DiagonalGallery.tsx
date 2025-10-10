"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import "./marquee.css";

interface DiagonalGalleryProps {
  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

const DiagonalGallery = ({ images }: DiagonalGalleryProps) => {
  console.log("Passed in", images.length, "images!");
  const loop = useMemo(() => [...images, ...images, images[0]], [images]);
  const width = (100 - images.length) / images.length;

  return (
    <div className="relative">
      <div
        className="
          flex gap-[1vw]
          transform rotate-[-3deg]
          marquee
        "
      >
        {loop.map((image, idx) => (
          <Image
            key={idx}
            src={image.url}
            alt={`Toronto Splatoon 3 Squid Social Photo ${idx}`}
            width={image.width}
            height={image.height}
            className="object-cover shadow-xl brightness-80 max-h-[1100px]"
            style={{ width: `${width}vw`, height: "30vh" }}
            sizes="
              (min-width: 1920px) 550px,
              (min-width: 1536px) 500px,
              (min-width: 1280px) 450px,
              (min-width: 1024px) 400px,
              (min-width: 768px) 350px,
              (min-width: 640px) 300px,
              (min-width: 360px) 250px
            "
          />
        ))}
      </div>
    </div>
  );
};

export default DiagonalGallery;
