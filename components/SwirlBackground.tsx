"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Curtains, Plane } from "curtainsjs";

type SwirlBackgroundProps = {
  /** Path to line1 image (shifts left). */
  line1Src?: string;
  /** Path to line2 image (shifts right). */
  line2Src?: string;
  /** Number of rows to display. If not set, auto-fills the screen. */
  rowCount?: number;
  /** Estimated height of each row in pixels (for auto row count calculation). */
  rowHeight?: number;
  /** Gap between rows in pixels. */
  rowGap?: number;
  /** Animation duration in seconds for one full cycle. */
  animationDuration?: number;
  /** Opacity of the background. */
  opacity?: number;
  /** Distortion strength. */
  strength?: number;
  /** Distortion radius (0-1). */
  radius?: number;
  /** Speed for easing effect in. */
  fadeInSpeed?: number;
  /** Speed for easing effect out. */
  fadeOutSpeed?: number;
  /** Base opacity when mouse is far away (0-1). */
  baseOpacity?: number;
  /** Maximum opacity when hovering near cursor (0-1). */
  maxOpacity?: number;
};

// Vertex shader
const vertexShader = `
  precision mediump float;
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  varying vec2 vTextureCoord;
  void main() {
    vTextureCoord = aTextureCoord;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  }
`;

// Fragment shader with swirl/pinch effect
const fragmentShader = `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uStrength;
  uniform float uRadius;
  uniform float uFade;
  uniform float uTime;
  uniform float uBaseOpacity;
  uniform float uMaxOpacity;

  void main() {
    vec2 uv = vTextureCoord;
    float aspect = uResolution.x / uResolution.y;

    vec2 toMouse = uv - uMouse;
    vec2 toMouseAspect = vec2(toMouse.x * aspect, toMouse.y);
    float dist = length(toMouseAspect);

    float falloff = smoothstep(uRadius, 0.0, dist);
    falloff = pow(falloff, 1.6);

    float effect = uFade * falloff * uStrength;

    // Swirl
    float angle = effect * 3.0;
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotatedAspect = vec2(
      toMouseAspect.x * c - toMouseAspect.y * s,
      toMouseAspect.x * s + toMouseAspect.y * c
    );

    // Center flip
    float flipFalloff = smoothstep(0.18, 0.0, dist);
    flipFalloff = pow(flipFalloff, 4.6);
    float flipAngle = 3.14159265 * flipFalloff * uFade;
    float fs = sin(flipAngle);
    float fc = cos(flipAngle);
    rotatedAspect = vec2(
      rotatedAspect.x * fc - rotatedAspect.y * fs,
      rotatedAspect.x * fs + rotatedAspect.y * fc
    );

    // Pinch
    float pinchFalloff = smoothstep(0.18, 0.0, dist);
    pinchFalloff = pow(pinchFalloff, 3.0);
    float pinch = 1.0 + pinchFalloff * effect * 5.0;
    rotatedAspect *= pinch;

    vec2 rotated = vec2(rotatedAspect.x / aspect, rotatedAspect.y);
    vec2 distortedUV = uMouse + rotated;

    distortedUV += 0.0025 * sin(vec2(1.2, 1.7) * uTime) * uFade;
    distortedUV = clamp(distortedUV, vec2(0.0), vec2(1.0));

    vec4 texColor = texture2D(uTexture, distortedUV);
    
    float opacityFalloff = smoothstep(uRadius * 1.5, 0.0, dist);
    opacityFalloff = pow(opacityFalloff, 0.8);
    float opacity = uBaseOpacity + (uMaxOpacity - uBaseOpacity) * opacityFalloff * uFade;
    
    gl_FragColor = vec4(texColor.rgb, texColor.a * opacity);
  }
`;

export function SwirlBackground({
  line1Src = "/backgrounds/torontoroka/line1.webp",
  line2Src = "/backgrounds/torontoroka/line2.webp",
  rowCount,
  rowHeight = 40,
  rowGap = 15,
  animationDuration = 30,
  opacity = 0.5,
  strength = 0.32,
  radius = 0.7,
  fadeInSpeed = 0.12,
  fadeOutSpeed = 0.015,
  baseOpacity = 0.3,
  maxOpacity = 0.6,
}: SwirlBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curtainsContainerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const curtainsRef = useRef<Curtains | null>(null);
  const planeInstanceRef = useRef<Plane | null>(null);
  const animationFrameRef = useRef<number>(0);
  const imagesRef = useRef<{
    line1: HTMLImageElement | null;
    line2: HTMLImageElement | null;
  }>({
    line1: null,
    line2: null,
  });

  const [containerHeight, setContainerHeight] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const fade = useRef(0);
  const fadeTarget = useRef(0);
  const isPointerInside = useRef(false);

  // Calculate row count
  const totalRowHeight = rowHeight + rowGap;
  const autoRowCount = Math.ceil(containerHeight / totalRowHeight) + 4;
  const actualRowCount = rowCount ?? autoRowCount;

  // Load images
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded === 2) {
        imagesRef.current = { line1: img1, line2: img2 };
        setImagesLoaded(true);
      }
    };

    img1.onload = onLoad;
    img2.onload = onLoad;
    img1.src = line1Src;
    img2.src = line2Src;

    return () => {
      img1.onload = null;
      img2.onload = null;
    };
  }, [line1Src, line2Src]);

  // Handle resize
  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Draw scrolling rows to canvas
  const drawToCanvas = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const { line1, line2 } = imagesRef.current;

      if (!canvas || !ctx || !line1 || !line2) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Apply rotation
      ctx.translate(width / 2, height / 2);
      ctx.rotate((-10 * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      const cycleDuration = animationDuration * 1000;
      const progress = (time % cycleDuration) / cycleDuration;

      // Draw rows
      for (let i = 0; i < actualRowCount; i++) {
        const isLine1 = i % 2 === 0;
        const img = isLine1 ? line1 : line2;
        const direction = isLine1 ? -1 : 1;

        const y = i * totalRowHeight - height * 0.1;
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate scroll offset
        const scrollOffset = progress * imgWidth * direction;

        // Draw multiple copies for seamless scrolling
        const startX = (scrollOffset % imgWidth) - imgWidth;
        for (let x = startX; x < width * 1.3; x += imgWidth) {
          ctx.drawImage(img, x - width * 0.1, y, imgWidth, imgHeight);
        }
      }

      ctx.restore();
    },
    [actualRowCount, animationDuration, totalRowHeight],
  );

  // Initialize Curtains.js
  useEffect(() => {
    if (
      !imagesLoaded ||
      !curtainsContainerRef.current ||
      !planeRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    const canvas = canvasRef.current;
    let startTime = performance.now();
    let isReady = false;

    // Initial draw
    drawToCanvas(0);

    const curtains = new Curtains({
      container: curtainsContainerRef.current,
      watchScroll: false,
      productionPipeline: true,
      pixelRatio: Math.min(1.6, window.devicePixelRatio || 1),
      autoRender: true,
    });

    curtainsRef.current = curtains;

    const curtainCanvas = curtains.canvas;
    if (curtainCanvas) {
      curtainCanvas.style.position = "absolute";
      curtainCanvas.style.inset = "0";
      curtainCanvas.style.width = "100%";
      curtainCanvas.style.height = "100%";
      curtainCanvas.style.display = "block";
    }

    const params = {
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { name: "uMouse", type: "2f" as const, value: [0.5, 0.5] },
        uResolution: {
          name: "uResolution",
          type: "2f" as const,
          value: [window.innerWidth, window.innerHeight],
        },
        uStrength: { name: "uStrength", type: "1f" as const, value: strength },
        uRadius: { name: "uRadius", type: "1f" as const, value: radius },
        uFade: { name: "uFade", type: "1f" as const, value: 0 },
        uTime: { name: "uTime", type: "1f" as const, value: 0 },
        uBaseOpacity: {
          name: "uBaseOpacity",
          type: "1f" as const,
          value: baseOpacity,
        },
        uMaxOpacity: {
          name: "uMaxOpacity",
          type: "1f" as const,
          value: maxOpacity,
        },
      },
    };

    const plane = new Plane(curtains, planeRef.current, params);
    planeInstanceRef.current = plane;

    plane.onError(() => {
      console.error("Curtains.js plane error");
    });

    const updateMouseFromEvent = (event: PointerEvent) => {
      const bounds = curtainsContainerRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      targetMouse.current.x = Math.min(Math.max(x, 0), 1);
      targetMouse.current.y = Math.min(Math.max(1 - y, 0), 1);
      isPointerInside.current = true;
      fadeTarget.current = 1;
    };

    const handlePointerLeave = () => {
      isPointerInside.current = false;
      fadeTarget.current = 0;
    };

    plane.onAfterResize(() => {
      if (plane.uniforms?.uResolution) {
        plane.uniforms.uResolution.value = [
          window.innerWidth,
          window.innerHeight,
        ];
      }
    });

    plane.onReady(() => {
      isReady = true;
      startTime = performance.now();
      fade.current = 1;
      fadeTarget.current = 1;
      if (plane.uniforms?.uFade) {
        plane.uniforms.uFade.value = 1;
      }
      // Hide the source canvas - WebGL canvas takes over
      if (canvas) {
        canvas.style.opacity = "0";
        canvas.style.pointerEvents = "none";
      }
    });

    plane.onRender(() => {
      if (!isReady || !plane.uniforms) return;

      const now = performance.now();
      const time = now - startTime;

      // Update canvas with scrolling animation
      drawToCanvas(time);

      // Update the texture from canvas
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textures = (plane as any).textures;
      if (textures?.[0]) {
        textures[0].needUpdate();
      }

      // Smooth pointer follow
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.12;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.12;

      // Fade handling
      if (!isPointerInside.current) {
        fadeTarget.current = 0;
      }
      const fadeSpeed =
        fadeTarget.current > fade.current ? fadeInSpeed : fadeOutSpeed;
      fade.current += (fadeTarget.current - fade.current) * fadeSpeed;

      if (plane.uniforms.uMouse) {
        plane.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];
      }
      if (plane.uniforms.uFade) {
        plane.uniforms.uFade.value = fade.current;
      }
      if (plane.uniforms.uTime) {
        plane.uniforms.uTime.value = time * 0.001;
      }
    });

    window.addEventListener("pointermove", updateMouseFromEvent, {
      passive: true,
    });
    window.addEventListener("pointerdown", updateMouseFromEvent, {
      passive: true,
    });

    const handleWindowMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget && event.target === document.documentElement) {
        handlePointerLeave();
      }
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        handlePointerLeave();
      }
    };
    const handleDocumentLeave = () => handlePointerLeave();
    const handleVisibilityChange = () => {
      if (document.hidden) handlePointerLeave();
    };

    document.documentElement.addEventListener(
      "mouseleave",
      handleDocumentLeave,
    );
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("mouseout", handleWindowMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", updateMouseFromEvent);
      window.removeEventListener("pointerdown", updateMouseFromEvent);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleDocumentLeave,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      planeInstanceRef.current?.remove();
      curtainsRef.current?.dispose();
    };
  }, [
    imagesLoaded,
    drawToCanvas,
    strength,
    radius,
    fadeInSpeed,
    fadeOutSpeed,
    baseOpacity,
    maxOpacity,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        overflow: "hidden",
        opacity,
      }}
      aria-hidden
    >
      {/* Curtains.js container */}
      <div
        ref={curtainsContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      >
        <div ref={planeRef} style={{ width: "100%", height: "100%" }}>
          {/* Canvas element as texture source for Curtains - hidden after WebGL takes over */}
          <canvas
            ref={canvasRef}
            data-sampler="uTexture"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SwirlBackground;
