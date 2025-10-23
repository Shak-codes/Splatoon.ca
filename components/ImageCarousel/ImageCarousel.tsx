"use client";
import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface ImageCarouselProps {
  images: { src: string; width: number; height: number }[];
}

const MAX_TILT_DEGREES = 20;
const STEP_PERCENT = 90;
const FRICTION = 6.0;
const MIN_SPEED_TO_GLIDE = 0.25;
const MIN_SPEED_STOP = 0.05;
const MAX_SPEED = 6;
const SNAP_ANIM_MS = 350;
const TAP_MAX_MOVEMENT_PX = 6;
const TAP_MAX_DURATION_MS = 220;
const FAR_HIDE_CUTOFF = 3.2;
const PRELOAD_WINDOW = 3;

type Updater = number | ((n: number) => number);
const isUpdater = (v: Updater): v is (n: number) => number =>
  typeof v === "function";

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const count = images.length;
  const [activeIndex, _setActiveIndex] = useState(Math.floor(count / 2));
  const [dragProgress, _setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isKinetic, setIsKinetic] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  const dragProgressRef = useRef(dragProgress);
  const velocityRef = useRef(0);

  const setActiveIndex = (v: Updater) => {
    const next = isUpdater(v) ? v(activeIndexRef.current) : v;
    activeIndexRef.current = next;
    _setActiveIndex(next);
  };
  const setDragProgress = (v: Updater) => {
    const next = isUpdater(v) ? v(dragProgressRef.current) : v;
    dragProgressRef.current = next;
    _setDragProgress(next);
  };

  const clampIndex = useCallback(
    (i: number) => ((i % count) + count) % count,
    [count]
  );

  const posterRef = useRef<HTMLDivElement | null>(null);
  const [posterWidth, setPosterWidth] = useState<number>(200);
  useLayoutEffect(() => {
    const el = posterRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entries[0]?.contentRect.width ?? 0;
        if (w > 0) setPosterWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wrappedDistance = (distance: number) => {
    let d = distance;
    while (d > count / 2) d -= count;
    while (d < -count / 2) d += count;
    return d;
  };

  const handleSelect = useCallback(
    (idx: number) => {
      if (isDragging || isKinetic) return;
      const ai = activeIndexRef.current;
      const diff = (idx - ai + count) % count;
      const target = diff > count / 2 ? ai - (count - diff) : ai + diff;
      setActiveIndex(clampIndex(target));
    },
    [count, isDragging, isKinetic, clampIndex]
  );

  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tapStartTimeRef = useRef(0);
  const tapTotalDxRef = useRef(0);
  const tapCandidateIdxRef = useRef<number | null>(null);

  const killRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    killRaf();
    setIsKinetic(false);
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    tapStartTimeRef.current = lastTRef.current;
    tapTotalDxRef.current = 0;
    velocityRef.current = 0;
    setDragProgress(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTRef.current) / 1000;
    const x = e.clientX;
    const dxPx = x - lastXRef.current;
    lastXRef.current = x;
    lastTRef.current = now;
    tapTotalDxRef.current += Math.abs(dxPx);
    const pxPerSlide = posterWidth * (STEP_PERCENT / 100);
    if (pxPerSlide <= 0) return;
    setDragProgress((p) => {
      const deltaSlides = -dxPx / pxPerSlide;
      const v = deltaSlides / dt;
      velocityRef.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, v));
      return p + deltaSlides;
    });
  };

  const startKinetic = useCallback(() => {
    let v = velocityRef.current;
    const speed = Math.abs(v);
    if (speed < MIN_SPEED_TO_GLIDE) {
      const floatIndex = activeIndexRef.current + dragProgressRef.current;
      const target = Math.round(floatIndex);
      setDragProgress(0);
      setActiveIndex(clampIndex(target));
      return;
    }
    setIsKinetic(true);
    let last = performance.now();
    const step = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      setDragProgress((p) => p + v * dt);
      const sign = v > 0 ? 1 : -1;
      v -= sign * FRICTION * dt;
      if (Math.sign(v) !== sign || Math.abs(v) < MIN_SPEED_STOP) {
        setIsKinetic(false);
        const floatIndex = activeIndexRef.current + dragProgressRef.current;
        const target = Math.round(floatIndex);
        setDragProgress(0);
        document.documentElement.style.setProperty(
          "--carousel-snap-ms",
          `${SNAP_ANIM_MS}ms`
        );
        setActiveIndex(clampIndex(target));
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [setActiveIndex, setDragProgress, clampIndex]);

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    const dtMs = performance.now() - tapStartTimeRef.current;
    const isTap =
      tapTotalDxRef.current <= TAP_MAX_MOVEMENT_PX &&
      dtMs <= TAP_MAX_DURATION_MS;
    if (isTap && tapCandidateIdxRef.current != null) {
      const idx = tapCandidateIdxRef.current;
      tapCandidateIdxRef.current = null;
      setDragProgress(0);
      const ai = activeIndexRef.current;
      const diff = (idx - ai + count) % count;
      const target = diff > count / 2 ? ai - (count - diff) : ai + diff;
      setActiveIndex(clampIndex(target));
      return;
    }
    startKinetic();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isDragging || isKinetic) return;
    if (e.key === "ArrowLeft") setActiveIndex((i) => clampIndex(i - 1));
    if (e.key === "ArrowRight") setActiveIndex((i) => clampIndex(i + 1));
  };

  useEffect(() => () => killRaf(), []);

  const activeIndexFloat = activeIndexRef.current + dragProgressRef.current;

  return (
    <section className={styles.carouselContainer}>
      <div
        className="relative w-full h-full flex justify-center items-center preserve-3d"
        role="listbox"
        aria-label="Image carousel"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        style={{ touchAction: "pan-y" }}
      >
        {images.map(({ src, width, height }, idx) => {
          const raw = idx - activeIndexFloat;
          const distance = wrappedDistance(raw);
          const translateX = `${distance * STEP_PERCENT}%`;
          const scale =
            distance === 0
              ? 1
              : Math.max(0.9, 1 - 0.1 * Math.min(1, Math.abs(distance)));
          const a = Math.abs(distance);
          const hidden = a > FAR_HIDE_CUTOFF;
          const opacity = hidden ? 0 : a > 3 ? 0.35 : a > 2 ? 0.7 : 1;
          const zIndex = count - Math.round(Math.min(a, 3));
          const rotateY = distance * -MAX_TILT_DEGREES;
          const isActive = a < 0.5;
          const eager = a <= PRELOAD_WINDOW;

          return (
            <div
              key={idx}
              ref={idx === activeIndex ? posterRef : undefined}
              onPointerDown={() => {
                tapCandidateIdxRef.current = idx;
              }}
              onClick={() => handleSelect(idx)}
              className={`${styles.posterContainer} ${
                isDragging || isKinetic ? styles.noTransition : ""
              }`}
              role="option"
              aria-selected={isActive}
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
                alt="poster"
                width={width}
                height={height}
                draggable={false}
                priority={isActive}
                loading={eager ? "eager" : "lazy"}
                className={`
                  object-contain w-full rounded-sm shadow-lg
                  transition-all duration-500 ease-in-out
                  ${
                    isActive
                      ? "brightness-100 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      : "brightness-70 hover:brightness-100 shadow-md hover:shadow-lg"
                  }
                `}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImageCarousel;
