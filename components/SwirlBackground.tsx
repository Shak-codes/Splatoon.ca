"use client";

import { useEffect, useRef } from "react";
import { Curtains, Plane } from "curtainsjs";

type SwirlBackgroundProps = {
  /** Overall distortion strength on desktop (smaller = subtler). */
  strength?: number;
  /** Radius of the radial falloff (in UV space, 0–1). */
  radius?: number;
  /** Additional multiplier applied on coarse pointers / mobile. */
  mobileStrengthFactor?: number;
  /** How far the idle fallback moves the focus point (UV units). */
  idleAmplitude?: number;
  /** Path to the image served from /public (e.g. "/bg.webp"). */
  imageSrc?: string;
  /** Speed for easing the effect in (0–1). */
  fadeInSpeed?: number;
  /** Speed for easing the effect out (0–1). Lower = slower reset. */
  fadeOutSpeed?: number;
};

// Minimal vertex shader: forwards UVs to the fragment shader and positions the plane.
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

// Fragment shader:
// - Uses a radial falloff around the pointer (uMouse)
// - Applies a swirl (rotation) and a gentle pinch (scale toward the center)
// - Multiplies by uFade so the distortion can ease out when the pointer leaves
// - Adds a tiny time-based wobble so idle mode still feels alive on touch devices
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
  uniform float uMobileFactor;

  void main() {
    vec2 uv = vTextureCoord;
    float aspect = uResolution.x / uResolution.y;


    // Vector from current pixel to the pointer in UV space (aspect-corrected).
    vec2 toMouse = uv - uMouse;
    vec2 toMouseAspect = vec2(toMouse.x * aspect, toMouse.y);
    float dist = length(toMouseAspect);

    // Radial falloff: 1.0 at the center, 0.0 at / beyond the radius.
    // The pow() tightens the effect so the pinch/swirl is focused near the cursor.
    float falloff = smoothstep(uRadius, 0.0, dist);
    falloff = pow(falloff, 1.6);

    // Combined strength:
    // - uStrength: base tweak knob
    // - uMobileFactor: set from JS to reduce intensity on mobile
    // - falloff: localized effect
    // - uFade: lets JS fade the effect when the pointer leaves
    float effect = uFade * falloff * uStrength * uMobileFactor;

    // Swirl: rotate around the pointer. Higher multiplier = stronger swirl.
    float angle = effect * 1.0;
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotatedAspect = vec2(
      toMouseAspect.x * c - toMouseAspect.y * s,
      toMouseAspect.x * s + toMouseAspect.y * c
    );

    // Center flip: rotate 180deg right at the core.
    float flipFalloff = smoothstep(0.08, 0.0, dist);
    flipFalloff = pow(flipFalloff, 1.6);
    float flipAngle = 3.14159265 * flipFalloff;
    float fs = sin(flipAngle);
    float fc = cos(flipAngle);
    rotatedAspect = vec2(
      rotatedAspect.x * fc - rotatedAspect.y * fs,
      rotatedAspect.x * fs + rotatedAspect.y * fc
    );

    // Pinch: scale UVs toward the pointer for a strong "void" core.
    // Invert pinch so center content gets crushed (sample from farther out).
    float pinchFalloff = smoothstep(0.3, 0.0, dist);
    float pinch = 1.0 + pinchFalloff * effect * 5.0;
    rotatedAspect *= pinch;

    // Convert back to UV space after aspect correction.
    vec2 rotated = vec2(rotatedAspect.x / aspect, rotatedAspect.y);

    vec2 distortedUV = uMouse + rotated;

    // Gentle idle wobble keeps things alive when there is no pointer movement.
    distortedUV += 0.0025 * sin(vec2(1.2, 1.7) * uTime);

    // Avoid sampling outside the texture.
    distortedUV = clamp(distortedUV, vec2(0.0), vec2(1.0));

    gl_FragColor = texture2D(uTexture, distortedUV);
  }
`;

export function SwirlBackground({
  strength = 0.32,
  radius = 0.7,
  mobileStrengthFactor = 0.55,
  idleAmplitude = 0.02,
  imageSrc = "/backgrounds/torontoroka/base.webp",
  fadeInSpeed = 0.12,
  fadeOutSpeed = 0.04,
}: SwirlBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const curtainsRef = useRef<Curtains | null>(null);
  const planeInstanceRef = useRef<Plane | null>(null);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const fade = useRef(0);
  const fadeTarget = useRef(0);
  const lastInput = useRef<number>(0);
  const isCoarse = useRef(false);
  const isPointerInside = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !planeRef.current) return;

    lastInput.current = performance.now();

    isCoarse.current =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0);

    // Wait for image to load before initializing Curtains
    const img = planeRef.current.querySelector("img");
    if (!img) return;

    let updateMouseFromEvent: ((event: PointerEvent) => void) | null = null;
    let handlePointerLeave: (() => void) | null = null;
    let handleWindowMouseOut: ((event: MouseEvent) => void) | null = null;
    let handleVisibilityChange: (() => void) | null = null;

    const initCurtains = () => {
      const curtains = new Curtains({
        container: containerRef.current!,
        watchScroll: false,
        productionPipeline: true,
        pixelRatio: Math.min(1.6, window.devicePixelRatio || 1),
        autoRender: true,
      });

      curtainsRef.current = curtains;

      // Ensure the WebGL canvas fills the viewport.
      const canvas = curtains.canvas;
      if (canvas) {
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
      }

      const mobileScale = isCoarse.current ? mobileStrengthFactor : 1;

      const params = {
        vertexShader,
        fragmentShader,
        uniforms: {
          uMouse: {
            name: "uMouse",
            type: "2f",
            value: [mouse.current.x, mouse.current.y],
          },
          uResolution: {
            name: "uResolution",
            type: "2f",
            value: [window.innerWidth, window.innerHeight],
          },
          uStrength: {
            name: "uStrength",
            type: "1f",
            value: strength,
          },
          uRadius: {
            name: "uRadius",
            type: "1f",
            value: radius,
          },
          uFade: {
            name: "uFade",
            type: "1f",
            value: 1, // Start visible, will be updated in onReady
          },
          uTime: {
            name: "uTime",
            type: "1f",
            value: 0,
          },
          uMobileFactor: {
            name: "uMobileFactor",
            type: "1f",
            value: mobileScale,
          },
        },
      };

      const plane = new Plane(curtains, planeRef.current, params);
      planeInstanceRef.current = plane;

      // Handle shader errors
      plane.onError(() => {
        console.error("Curtains.js plane error");
      });

      updateMouseFromEvent = (event: PointerEvent) => {
        const bounds = planeRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        targetMouse.current.x = Math.min(Math.max(x, 0), 1);
        // Flip Y because WebGL UVs are bottom-left origin.
        targetMouse.current.y = Math.min(Math.max(1 - y, 0), 1);
        isPointerInside.current = true;
        fadeTarget.current = 1;
        lastInput.current = performance.now();
      };

      handlePointerLeave = () => {
        isPointerInside.current = false;
        fadeTarget.current = 0;
      };

      plane.onAfterResize(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (plane.uniforms?.uResolution) {
          plane.uniforms.uResolution.value = [w, h];
        }
      });

      const startTime = performance.now();
      let isReady = false;

      plane.onReady(() => {
        isReady = true;
        // Hide the source image so only the WebGL canvas is visible.
        img.style.opacity = "0";
        img.style.pointerEvents = "none";
        // Initialize fade to 1 so effect is visible immediately
        fade.current = 1;
        fadeTarget.current = 1;
        if (plane.uniforms?.uFade) {
          plane.uniforms.uFade.value = 1;
        }
      });

      plane.onRender(() => {
        if (!isReady || !plane.uniforms) return;

        const planeUniforms = plane.uniforms;
        const time = (performance.now() - startTime) * 0.001;

        // Idle fallback for touch / when pointer stops moving.
        const now = performance.now();
        const idle = now - lastInput.current > 1000;
        const idleForMobile = isCoarse.current && idle;

        if (idleForMobile) {
          targetMouse.current.x = 0.5 + Math.sin(time * 0.4) * idleAmplitude;
          targetMouse.current.y = 0.5 + Math.cos(time * 0.35) * idleAmplitude;
        }

        // Keep a small baseline effect on touch devices so the background feels alive.
        if (idleForMobile) {
          fadeTarget.current = Math.max(fadeTarget.current, 0.35);
        }

        // Desktop: if the pointer leaves the viewport, remove the effect.
        if (!isCoarse.current && !isPointerInside.current) {
          fadeTarget.current = 0;
        }

        // Smooth pointer follow.
        mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.12;
        mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.12;

        // Ease in quickly, ease out slowly.
        const fadeSpeed =
          fadeTarget.current > fade.current ? fadeInSpeed : fadeOutSpeed;
        fade.current += (fadeTarget.current - fade.current) * fadeSpeed;

        if (planeUniforms.uMouse) {
          planeUniforms.uMouse.value = [mouse.current.x, mouse.current.y];
        }
        if (planeUniforms.uFade) {
          planeUniforms.uFade.value = fade.current;
        }
        if (planeUniforms.uTime) {
          planeUniforms.uTime.value = time;
        }
      });

      window.addEventListener("pointermove", updateMouseFromEvent, {
        passive: true,
      });
      window.addEventListener("pointerdown", updateMouseFromEvent, {
        passive: true,
      });
      window.addEventListener("pointerenter", updateMouseFromEvent, {
        passive: true,
      });
      handleWindowMouseOut = (event: MouseEvent) => {
        if (!event.relatedTarget) {
          handlePointerLeave?.();
        }
      };
      handleVisibilityChange = () => {
        if (document.hidden) {
          handlePointerLeave?.();
        }
      };

      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("mouseout", handleWindowMouseOut);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handlePointerLeave);
    };

    // Initialize Curtains when image is loaded
    if (img.complete) {
      initCurtains();
    } else {
      img.addEventListener("load", initCurtains, { once: true });
      img.addEventListener("error", () => {
        console.error("Failed to load image:", imageSrc);
      });
    }

    return () => {
      if (updateMouseFromEvent) {
        window.removeEventListener("pointermove", updateMouseFromEvent);
        window.removeEventListener("pointerdown", updateMouseFromEvent);
        window.removeEventListener("pointerenter", updateMouseFromEvent);
      }
      if (handlePointerLeave) {
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("blur", handlePointerLeave);
      }
      if (handleWindowMouseOut) {
        window.removeEventListener("mouseout", handleWindowMouseOut);
      }
      if (handleVisibilityChange) {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }

      planeInstanceRef.current?.remove();
      curtainsRef.current?.dispose();
    };
  }, [idleAmplitude, mobileStrengthFactor, radius, strength, imageSrc]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <div
        ref={planeRef}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        {/* Curtains requires a plain <img> as the sampler source. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          data-sampler="uTexture"
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default SwirlBackground;
