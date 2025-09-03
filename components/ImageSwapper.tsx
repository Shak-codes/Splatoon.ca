import { useState, useEffect } from "react";

type ImageSwapperProps = {
  images: string[];
};

interface ImageState {
  index: number;
  fadeOut: boolean;
  fadeIn: boolean;
}

interface RenderDetails {
  currImg: ImageState;
  nextImg: ImageState;
  lastUpdated: "curr" | "next";
  updating: boolean;
}

export default function ImageSwapper({ images }: ImageSwapperProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [renderDetails, setRenderDetails] = useState<RenderDetails>({
    currImg: {
      index: 0,
      fadeIn: true,
      fadeOut: false,
    },
    nextImg: {
      index: 0,
      fadeIn: false,
      fadeOut: true,
    },
    lastUpdated: "curr",
    updating: false,
  });

  useEffect(() => {
    if (renderDetails.updating) {
      const timer = setTimeout(() => {
        setRenderDetails((prev) => ({ ...prev, updating: false }));
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [renderDetails.updating]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ratioX = Math.max(0, Math.min(1, x / rect.width));
    const ratioY = Math.max(0, Math.min(1, y / rect.height));

    const gridSize = Math.ceil(Math.sqrt(images.length));
    const col = Math.min(gridSize - 1, Math.floor(ratioX * gridSize));
    const row = Math.min(gridSize - 1, Math.floor(ratioY * gridSize));

    const newIndex = row * gridSize + col;

    const offsetX = (ratioX - 0.5) * 20;
    const offsetY = (ratioY - 0.5) * 20;
    setOffset({ x: offsetX, y: offsetY });

    const { currImg, nextImg, updating } = renderDetails;

    if (newIndex !== currImg.index && newIndex !== nextImg.index && !updating) {
      updateRenderDetails(newIndex);
    }
  };

  const updateRenderDetails = (newIndex: number) => {
    setRenderDetails((prev) => {
      const { currImg, nextImg, lastUpdated } = prev;

      if (currImg.index === nextImg.index || lastUpdated === "curr") {
        return {
          currImg: {
            ...currImg,
            fadeIn: false,
            fadeOut: true,
          },
          nextImg: {
            ...nextImg,
            index: newIndex,
            fadeIn: true,
            fadeOut: false,
          },
          lastUpdated: "next",
          updating: true,
        };
      }

      return {
        currImg: {
          ...prev.currImg,
          index: newIndex,
          fadeIn: true,
          fadeOut: false,
        },
        nextImg: {
          ...prev.nextImg,
          fadeOut: true,
          fadeIn: false,
        },
        lastUpdated: "curr",
        updating: true,
      };
    });
  };

  const { currImg, nextImg } = renderDetails;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-full overflow-hidden flex items-center justify-center"
    >
      <img
        src={images[currImg.index ?? 0]}
        alt={`image-${currImg.index ?? 0}`}
        className="w-[70%] h-[70%] object-contain cursor-pointer transition-opacity duration-600"
        style={{
          opacity: currImg.fadeIn ? 1 : 0,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)`,
        }}
      />
      <img
        src={images[nextImg.index ?? 0]}
        alt={`image-${nextImg.index}`}
        className="absolute w-[70%] h-[70%] object-contain cursor-pointer transition-opacity duration-600"
        style={{
          opacity: nextImg.fadeIn ? 1 : 0,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)`,
        }}
      />
    </section>
  );
}
