"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./marquee.css";
import Subtitle from "./Subtitle";

interface DiagonalGalleryProps {
  images: string[];
  onReady?: () => void;
}

const DiagonalGallery = ({ images, onReady }: DiagonalGalleryProps) => {
  const loop = [...images, ...images, images[0]];
  const width = (100 - images.length) / images.length;
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    setLoadedCount(0);
  }, [images]);

  const handleLoad = () => {
    setLoadedCount((prev) => {
      if (prev + 1 === images.length) {
        console.log("Loading finished!");
        onReady?.();
      }
      return prev + 1;
    });
  };

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
          <Image
            key={idx}
            src={src}
            alt={`Toronto Splatoon 3 Squid Social Photo ${idx}`}
            width={1100}
            height={550}
            className="object-cover shadow-xl brightness-80 max-h-[1100px]"
            style={{ width: `${width}vw`, height: "30vh" }}
            onLoad={handleLoad}
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

      {/* <Image
        src="/logo2.png"
        alt="Splatoon Ontario Logo"
        width={800}
        height={400}
        className="w-[50%] h-auto"
      />
      <Subtitle
        subtitle="Grassroots Splatoon in Toronto"
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2"
      /> */}
    </div>
  );
};

export default DiagonalGallery;
