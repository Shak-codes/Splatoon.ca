import React from "react";
import Image from "next/image";
import "./marquee.css";

interface RotatedGalleryProps {
  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

const RotatedGallery = ({ images }: RotatedGalleryProps) => {
  console.log("Passed in", images.length, "images!");
  const width = (100 - images.length / 2) / images.length;

  return (
    <div className="relative w-full overflow-hidden rounded-sm">
      <div
        className="
          flex gap-[0.5%]
          transform rotate-[-3deg] scale-[1.2]
        "
      >
        {images.map((image, idx) => (
          <Image
            key={idx}
            src={image.url}
            alt={`Toronto Splatoon 3 Squid Social Photo ${idx}`}
            width={image.width}
            height={image.height}
            className="object-cover shadow-xl brightness-40 max-h-[1100px]"
            style={{ width: `${width}%`, height: "30vh" }}
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

export default RotatedGallery;
