import type { SVGProps } from "react";
import {
  LOCKUP_GAP_RATIO,
  LOCKUP_MARK_RATIO,
  MARK_D,
  MARK_FAVICON_D,
  MARK_GRID,
  WORDMARK_BASELINE_Y,
  WORDMARK_CAP_HEIGHT,
  WORDMARK_CAP_TOP_Y,
  WORDMARK_H,
  WORDMARK_PATHS,
  WORDMARK_W,
} from "@/lib/brand";

type Variant = "mark" | "markSmall" | "wordmark" | "lockup" | "stacked";

type LogoProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  variant?: Variant;
  /**
   * Square variants only. Sets both dimensions. The mark is a disc, so a
   * square box is correct and there is nothing to crop.
   */
  size?: number;
  /**
   * Non-square variants. Sets the height only; the width follows the asset's
   * real aspect ratio, so it can never be distorted and never needs
   * object-fit to stay intact.
   */
  height?: number;
  /**
   * Accessible name. Omit it when adjacent text already names the brand, as in
   * the header and footer, and the SVG is hidden from assistive tech instead
   * of repeating the name.
   */
  title?: string;
};

const ACCESSIBLE = {
  role: "img",
  focusable: "false",
} as const;

/**
 * Lockup geometry, derived from the wordmark's own cap metrics so the mark
 * and the wordmark can never disagree about their relationship.
 *
 * The mark is sized against CAP height, never the ascender: 'l' and 't'
 * overshoot the cap line, so a mark sized to the ascender reads visibly
 * oversized next to lowercase.
 *
 * Returned in wordmark units, so the mark's 64-unit grid is scaled into the
 * same space and the whole lockup shares one viewBox.
 */
function horizontalLockup() {
  const scale = (WORDMARK_CAP_HEIGHT * LOCKUP_MARK_RATIO) / MARK_GRID;
  const markSize = MARK_GRID * scale;
  const capMid = (WORDMARK_CAP_TOP_Y + WORDMARK_BASELINE_Y) / 2;
  const markTop = capMid - markSize / 2;
  const gap = WORDMARK_CAP_HEIGHT * LOCKUP_GAP_RATIO;

  const x = 0;
  const width = markSize + gap + WORDMARK_W;
  const y0 = Math.min(0, markTop);
  const y1 = Math.max(WORDMARK_H, markTop + markSize);
  const height = y1 - y0;

  return { scale, markTop, width, height, wordX: markSize + gap, y0 };
}

function stackedLockup() {
  // A stacked mark reads larger per unit, so the ratio is pulled back.
  const scale = (WORDMARK_CAP_HEIGHT * LOCKUP_MARK_RATIO * 0.82) / MARK_GRID;
  const markSize = MARK_GRID * scale;
  const gap = WORDMARK_CAP_HEIGHT * 0.62;
  const width = Math.max(markSize, WORDMARK_W);
  // The wordmark sits below the mark, so it has to be part of the height or the
  // viewBox cuts it off. This must match public/brand/lockup-stacked.svg.
  const height = markSize + gap + WORDMARK_H;
  return { scale, markSize, gap, width, height, wordX: (width - WORDMARK_W) / 2 };
}

function Glyphs() {
  return (
    <>
      {WORDMARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

export default function Logo({
  variant = "mark",
  size,
  height,
  title,
  className,
  ...rest
}: LogoProps) {
  const decorative = title === undefined;
  const a11y = decorative
    ? { role: undefined, "aria-hidden": true as const, focusable: "false" as const }
    : { ...ACCESSIBLE, "aria-hidden": undefined, "aria-label": title };

  // ---- square variants ------------------------------------------------
  if (variant === "mark" || variant === "markSmall") {
    const box = size ?? 40;
    return (
      <svg
        viewBox={`0 0 ${MARK_GRID} ${MARK_GRID}`}
        width={box}
        height={box}
        fill="currentColor"
        className={className}
        {...a11y}
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        <path fillRule="evenodd" d={variant === "mark" ? MARK_D : MARK_FAVICON_D} />
      </svg>
    );
  }

  const boxH = height ?? 24;

  if (variant === "wordmark") {
    return (
      <svg
        viewBox={`0 0 ${WORDMARK_W} ${WORDMARK_H}`}
        height={boxH}
        width={(boxH * WORDMARK_W) / WORDMARK_H}
        fill="currentColor"
        className={className}
        {...a11y}
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        <Glyphs />
      </svg>
    );
  }

  if (variant === "lockup") {
    const L = horizontalLockup();
    return (
      <svg
        viewBox={`0 0 ${L.width} ${L.height}`}
        height={boxH}
        width={(boxH * L.width) / L.height}
        fill="currentColor"
        className={className}
        {...a11y}
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        <g transform={`translate(0 ${L.markTop - L.y0}) scale(${L.scale})`}>
          <path fillRule="evenodd" d={MARK_D} />
        </g>
        <g transform={`translate(${L.wordX} ${-L.y0})`}>
          <Glyphs />
        </g>
      </svg>
    );
  }

  // stacked
  const S = stackedLockup();
  return (
    <svg
      viewBox={`0 0 ${S.width} ${S.height}`}
      height={boxH}
      width={(boxH * S.width) / S.height}
      fill="currentColor"
      className={className}
      {...a11y}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g transform={`translate(${(S.width - S.markSize) / 2} 0) scale(${S.scale})`}>
        <path fillRule="evenodd" d={MARK_D} />
      </g>
      <g transform={`translate(${S.wordX} ${S.markSize + S.gap})`}>
        <Glyphs />
      </g>
    </svg>
  );
}
