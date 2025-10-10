"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface ImageCarouselProps {
  images: { src: string; width: number; height: number }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const count = images.length;
  const [activeIndex, setActiveIndex] = useState(Math.floor(count / 2));

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;

    const diff = (idx - activeIndex + count) % count;
    const newIndex =
      diff > count / 2 ? activeIndex - (count - diff) : activeIndex + diff;

    setActiveIndex(((newIndex % count) + count) % count);
  };

  return (
    <section className="relative flex justify-center items-center overflow-hidden w-full h-[40vh]">
      <div className="relative w-full h-full flex justify-center items-center preserve-3d">
        {images.map(({ src, width, height }, idx) => {
          const offset = (idx - activeIndex + count) % count;
          const distance = offset > count / 2 ? offset - count : offset;

          const translateX = `${distance * 300}px`;
          const scale = distance === 0 ? 1 : 0.9;
          const zIndex = count - Math.abs(distance);
          const opacity = Math.abs(distance) > 2 ? 0 : 1;
          const rotateY = distance * -20;

          const isActive = distance === 0;

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className="absolute transition-all duration-700 ease-in-out"
              style={{
                transform: `
                  perspective(1000px)
                  translateX(${translateX})
                  scale(${scale})
                  rotateY(${rotateY}deg)
                `,
                zIndex,
                opacity,
              }}
            >
              <Image
                src={src}
                alt="alt"
                width={width}
                height={height}
                className={`
                  object-contain w-[300px] h-[30vh] rounded-lg shadow-lg 
                  transition-all duration-500 ease-in-out
                  ${
                    isActive
                      ? "brightness-100 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      : "brightness-70 hover:brightness-100 shadow-md hover:shadow-lg"
                  }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageCarousel;
