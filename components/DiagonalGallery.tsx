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
    <div
      className="
        absolute
        top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-full
        flex justify-center
      "
    >
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
          />
        ))}
      </div>
    </div>
  );
};

export default DiagonalGallery;
