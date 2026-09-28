# Health Root brand assets

Source of truth for the logo. `src/lib/brand.ts` is generated from the SVGs in
this folder, and `src/components/Logo.tsx` renders that geometry inline so the
mark can inherit `currentColor`. **Do not hand-edit the paths in
`src/lib/brand.ts`** — change the SVG here, then regenerate.

## The mark

A disc with a person whose body becomes roots. One idea, one colour, no
stroke, no gradient, no mask, no filter, and no raster data.

Two cuts exist, because a logo has to survive a 16px favicon:

| File | Grid | Use |
| --- | --- | --- |
| `mark.svg` | 64, disc inset 2u | Anything ~24px and up |
| `mark-favicon.svg` | 64, full bleed, heavier figure | Below ~24px, favicons |

The negative space is a real knockout, not a white shape: each file is a single
`<path fill-rule="evenodd">`, so the figure stays transparent on any
background. Verified invariants: exact mirror symmetry, minimum ring thickness
`8.31u` (mark) / `6.89u` (favicon), head gap `3u` / `3.9u`.

## The wordmark

"Health Root" as outlined paths in Plus Jakarta Sans ExtraBold `800`, so it
renders identically everywhere with no font dependency and no FOUT. Geometry
lives in `wordmark.metrics.json`:

- advance `5620`, cap height `745`, baseline `761`, cap top `16`
- real GPOS kerning pairs (`l+t -10`, `R+o -30`, `o+t -10`) honoured
- tracking `-15/1000 em`, word space `300/1000 em`

Never re-typeset the wordmark by hand. If a future revision ships a new
wordmark, regenerate this file and the module together so they cannot drift.

## Lockups

| File | Notes |
| --- | --- |
| `lockup-horizontal.svg` | Default. Mark sized against **cap height**, not ascender — `l` and `t` overshoot, so an ascender-sized mark reads oversized. |
| `lockup-stacked.svg` | Square-ish contexts. Mark ratio pulled back to `0.82` because a stacked mark reads larger per unit. |

`Logo.tsx` computes the same geometry at runtime from the shared ratios in
`brand.ts`, so the React lockups and these files stay identical.

## Raster and social

`mark-64/128/256/512.png`, `mark-white-256/512.png` (for dark backgrounds),
`lockup-horizontal.png` (`256px` tall), and `og-card.png` (`1200x630`).

`og-card.png` is referenced by `app/layout.tsx` for Open Graph and Twitter
cards. Regenerate it whenever the wordmark or palette changes.

## Regeneration

The generator scripts are not committed; they depend on `fontTools`, `brotli`,
and `numpy`, plus `sharp` for raster output. When you need to re-cut an asset,
recreate the pipeline and then update `src/lib/brand.ts` in the same change.
Note that HarfBuzz reports `glyph_count 0` on this font and is unusable here —
`fontTools` GPOS is the working path.
