"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Images, ZoomIn } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import { GALLERY_CATEGORIES, galleryByCategory, type GalleryCategory } from "@/lib/gallery";

type Filter = GalleryCategory | "All";

const FILTERS: Filter[] = ["All", ...GALLERY_CATEGORIES];

export default function GalleryContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = useMemo(() => galleryByCategory(filter), [filter]);
  const count = images.length;

  const handleFilter = useCallback((next: Filter) => {
    setFilter(next);
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <Hero
        title="Our Gallery"
        subtitle="Every photograph here is from real fieldwork. Open any image to view it full-screen — zoom in, pan around, and step through the set."
        bgImage="/images/optimized/event1.jpg"
        compact
      />

      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Field photography</span>
            <h2>Activities in action</h2>
            <p>
              Health campaigns, clean-up drives, leadership training and outreach — captured in the communities we work
              with. Select a category, then click any photo for the full-resolution viewer.
            </p>
          </Reveal>

          <div className="gallery-toolbar">
            <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
              {FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="gallery-filter"
                  aria-pressed={filter === cat}
                  onClick={() => handleFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="gallery-count" aria-live="polite">
              <Images size={15} style={{ verticalAlign: "-2px", marginRight: 6 }} aria-hidden />
              {count} {count === 1 ? "photograph" : "photographs"}
              {filter !== "All" ? ` in ${filter}` : ""}
            </p>
          </div>

          {count === 0 ? (
            <p className="gallery-empty">No photographs in this category yet.</p>
          ) : (
            <div className="gallery-grid">
              {images.map((img, idx) => (
                <button
                  key={`${img.src}-${idx}`}
                  type="button"
                  className="gallery-item"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open full-screen view of ${img.title}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                    className="gallery-item__img"
                  />
                  <span className="gallery-item__overlay">
                    <span className="badge badge-secondary">{img.category}</span>
                    <span className="gallery-item__title">{img.title}</span>
                    <span className="gallery-item__hint">
                      <ZoomIn size={13} aria-hidden /> View full screen
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <CTASection
        title="Every photo here happened because someone showed up. Come be that someone."
        buttonText="Get Involved"
        buttonHref="/contact"
        secondaryText="See our impact"
        secondaryHref="/our-impact"
      />
    </>
  );
}
