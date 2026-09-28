"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
} from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SWIPE_THRESHOLD = 60;

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

type Point = { x: number; y: number };

export default function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  // Tracks which image index has finished decoding. Deriving isLoading from
  // this avoids a stale "loaded" frame when stepping to the next photo.
  const [loadedIndex, setLoadedIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pointers = useRef(new Map<number, Point>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const dragStart = useRef<Point>({ x: 0, y: 0 });
  const offsetStart = useRef<Point>({ x: 0, y: 0 });
  const swipeStart = useRef<number | null>(null);
  const didPan = useRef(false);

  const image = images[index];
  const total = images.length;
  const isLoading = loadedIndex !== index;

  /* ---------------------------------------------------------------- reset */
  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    pinchStart.current = null;
  }, []);

  // Reset the zoom/pan state when stepping to another photo. Adjusted during
  // render rather than in an effect, so React re-renders once instead of
  // committing a cascading render. pinchStart is gesture-local and is always
  // rewritten on the next pointerdown, so it is intentionally not touched here.
  const [lastIndex, setLastIndex] = useState(index);
  if (index !== lastIndex) {
    setLastIndex(index);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  /* ------------------------------------------------- body scroll locking */
  useEffect(() => {
    const { body } = document;
    const root = document.documentElement;
    const prevBody = body.style.overflow;
    const prevRoot = root.style.overflow;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = prevBody;
      root.style.overflow = prevRoot;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  /* ------------------------------------------------- focus management */
  useEffect(() => {
    closeRef.current?.focus();
    return () => {
      const active = document.activeElement as HTMLElement | null;
      active?.focus?.();
    };
  }, []);

  /* ------------------------------------------------- navigation helpers */
  const goPrev = useCallback(() => {
    if (total > 1) onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const goNext = useCallback(() => {
    if (total > 1) onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  /* ------------------------------------------------- clamping panning */
  const clampOffset = useCallback(
    (next: Point, s: number): Point => {
      const stage = stageRef.current;
      const img = stage?.querySelector("img");
      if (!stage || !img || s <= 1) return { x: 0, y: 0 };

      const stageRect = stage.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const overflowX = Math.max(0, (imgRect.width - stageRect.width) / 2);
      const overflowY = Math.max(0, (imgRect.height - stageRect.height) / 2);

      return {
        x: Math.min(overflowX, Math.max(-overflowX, next.x)),
        y: Math.min(overflowY, Math.max(-overflowY, next.y)),
      };
    },
    [],
  );

  /* ------------------------------------------------- zoom controls */
  const zoomBy = useCallback(
    (factor: number) => {
      setScale((prev) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(prev * factor * 100) / 100));
        setOffset((o) => (next <= 1 ? { x: 0, y: 0 } : clampOffset(o, next)));
        return next;
      });
    },
    [clampOffset],
  );

  const setZoom = useCallback(
    (value: number) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
      setScale(next);
      setOffset((o) => (next <= 1 ? { x: 0, y: 0 } : clampOffset(o, next)));
    },
    [clampOffset],
  );

  const zoomToFit = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  /* ------------------------------------------------- wheel zoom */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.12 : 0.89);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  /* ------------------------------------------------- pointer: pan + pinch + swipe */
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      swipeStart.current = null;
      return;
    }

    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = offset;
    swipeStart.current = e.clientX;
    didPan.current = false;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    /* Pinch to zoom */
    if (pointers.current.size === 2 && pinchStart.current) {
      e.preventDefault();
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart.current.dist > 0) {
        setZoom((pinchStart.current.scale * dist) / pinchStart.current.dist);
        didPan.current = true;
      }
      return;
    }

    /* Pan while zoomed */
    if (scale > 1) {
      e.preventDefault();
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didPan.current = true;
      setOffset(clampOffset({ x: offsetStart.current.x + dx, y: offsetStart.current.y + dy }, scale));
      return;
    }

    /* Horizontal swipe to navigate while at fit scale */
    if (swipeStart.current !== null) {
      const dx = e.clientX - swipeStart.current;
      if (Math.abs(dx) > 8) didPan.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinchStart.current = null;

    if (pointers.current.size === 0) {
      setIsDragging(false);
      const start = swipeStart.current;
      swipeStart.current = null;
      if (start !== null && !didPan.current) {
        const dx = e.clientX - start;
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          if (dx > 0) goPrev();
          else goNext();
        }
      }
    }
  };

  /* ------------------------------------------------- keyboard */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "Home":
          e.preventDefault();
          onIndexChange(0);
          break;
        case "End":
          e.preventDefault();
          onIndexChange(total - 1);
          break;
        case "+":
        case "=":
          e.preventDefault();
          zoomBy(1.3);
          break;
        case "-":
        case "_":
          e.preventDefault();
          zoomBy(0.77);
          break;
        case "0":
          e.preventDefault();
          zoomToFit();
          break;
        case "Tab": {
          // Trap focus inside the dialog
          const focusables = stageRef.current?.closest(".lb")?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          );
          if (!focusables || focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, onClose, onIndexChange, total, zoomBy, zoomToFit]);

  /* ------------------------------------------------- keep active thumb in view */
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  /* ------------------------------------------------- preload neighbours */
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const neighbour = images[(i + total) % total];
      if (!neighbour) return;
      const preloader = new window.Image();
      preloader.src = neighbour.src;
    });
  }, [index, images, total]);

  if (!image) return null;

  const isZoomed = scale > 1;

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${image.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ---------------------------------------------------------- top bar */}
      <div className="lb__bar">
        <span className="lb__counter">
          {index + 1} / {total}
        </span>

        <div className="lb__tools">
          <button
            type="button"
            className="lb-btn"
            onClick={() => zoomBy(0.8)}
            disabled={!isZoomed}
            aria-label="Zoom out"
            title="Zoom out (−)"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            className="lb-btn"
            onClick={() => zoomBy(1.25)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            title="Zoom in (+)"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            className="lb-btn"
            onClick={zoomToFit}
            disabled={!isZoomed}
            aria-label="Reset zoom"
            title="Fit to screen (0)"
          >
            <RotateCcw size={18} />
          </button>
          <a
            className="lb-btn"
            href={image.src}
            download
            aria-label={`Download ${image.title}`}
            title="Download original"
          >
            <Download size={18} />
          </a>
          <button
            ref={closeRef}
            type="button"
            className="lb-btn"
            onClick={onClose}
            aria-label="Close viewer"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- stage */}
      <div
        ref={stageRef}
        className="lb__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => (isZoomed ? zoomToFit() : setZoom(2.5))}
        style={{ cursor: isDragging ? (isZoomed ? "grabbing" : "grabbing") : isZoomed ? "grab" : "zoom-in" }}
      >
        {isZoomed && (
          <span className="lb__zoom" aria-live="polite">
            {Math.round(scale * 100)}% · drag to pan
          </span>
        )}

        {total > 1 && (
          <>
            <button type="button" className="lb__nav lb__nav--prev" onClick={goPrev} aria-label="Previous image">
              <ChevronLeft size={26} />
            </button>
            <button type="button" className="lb__nav lb__nav--next" onClick={goNext} aria-label="Next image">
              <ChevronRight size={26} />
            </button>
          </>
        )}

        {isLoading && (
          <div className="lb__loading">
            <span className="chat-typing" aria-label="Loading image">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}

        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          quality={100}
          sizes="100vw"
          priority
          draggable={false}
          onLoad={() => setLoadedIndex(index)}
          className="lb__img"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.24s cubic-bezier(0.16,1,0.3,1)",
            maxWidth: isZoomed ? "none" : "100%",
            maxHeight: isZoomed ? "none" : "100%",
            width: isZoomed ? image.width : undefined,
            height: isZoomed ? image.height : undefined,
            opacity: isLoading ? 0 : 1,
            transitionProperty: isDragging ? "none" : "transform, opacity",
          }}
        />
      </div>

      {/* ---------------------------------------------------------- caption */}
      <div className="lb__caption">
        <h3>{image.title}</h3>
        <div className="lb__meta">
          <span className="badge badge-secondary">{image.category}</span>
          <span>
            {image.width} × {image.height} px
          </span>
          <span>{image.src.replace(/^.*\//, "")}</span>
        </div>
      </div>

      {/* ---------------------------------------------------------- thumbs */}
      {total > 1 && (
        <div className="lb__thumbs" role="tablist" aria-label="Image thumbnails">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              className="lb__thumb"
              aria-current={i === index}
              aria-label={`View image ${i + 1}: ${img.title}`}
              onClick={() => onIndexChange(i)}
            >
              <Image src={img.src} alt="" width={136} height={104} sizes="68px" />
            </button>
          ))}
        </div>
      )}

      {/* Hidden affordance for screen readers */}
      <p className="sr-only" aria-live="polite">
        Image {index + 1} of {total}. {image.title}. {image.category}.
      </p>
      <p className="sr-only">
        Use arrow keys to move between images, plus and minus to zoom, zero to fit, and Escape to close.
      </p>
    </div>
  );
}
