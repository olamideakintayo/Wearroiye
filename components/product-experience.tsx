"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  buildWhatsAppHref,
  CollectionVariant,
  formatPrice,
} from "@/src/content/catalogue";

export function ProductExperience({ variant }: { variant: CollectionVariant }) {
  const [size, setSize] = useState<"L" | "XL">("L");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (activeImage === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((current) => current === null ? null : (current + 1) % variant.gallery.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((current) => current === null ? null : (current - 1 + variant.gallery.length) % variant.gallery.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, variant.gallery.length]);

  const stepImage = (direction: number) => {
    setActiveImage((current) => {
      if (current === null) return null;
      return (current + direction + variant.gallery.length) % variant.gallery.length;
    });
  };

  return (
    <main className="product-page">
      <header className="product-nav">
        <Link className="wordmark" href="/">wear<span>roiye</span></Link>
        <Link href="/#drop">← Back to the drop</Link>
        <span>Dreams turned reality / {variant.number}</span>
      </header>

      <section className="product-hero">
        <motion.div
          className="product-hero-image"
          layoutId={`product-${variant.slug}`}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            className="product-hero-backdrop"
            src={variant.heroImage.src}
            alt=""
            fill
            priority
            aria-hidden="true"
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <Image
            className="product-hero-foreground"
            src={variant.heroImage.src}
            alt={variant.heroImage.alt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 58vw"
            quality={90}
          />
          <span className="product-image-index">WR / {variant.number}</span>
        </motion.div>
        <motion.div
          className="product-details"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.65 }}
        >
          <div>
            <p className="eyebrow">Drop 001 / Dreams Turned Reality</p>
            <h1>{variant.name}</h1>
            <p className="product-story">{variant.story}</p>
          </div>
          <div className="product-commerce">
            <div className="price-row">
              <strong>{formatPrice(variant.price.amountMinor)}</strong>
              <span><i /> In stock</span>
            </div>
            <fieldset>
              <legend>Select your size</legend>
              <div className="size-options">
                {variant.sizes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={size === item ? "is-selected" : ""}
                    onClick={() => setSize(item)}
                    aria-pressed={size === item}
                  >
                    <span>{item}</span>
                    <small>{item === "L" ? "Large" : "Extra large"}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <motion.a
              className="whatsapp-cta"
              href={buildWhatsAppHref(variant, size)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <span>Enquire on WhatsApp</span>
              <span>{size} selected ↗</span>
            </motion.a>
            <p className="commerce-note">Direct conversation. No payment is collected on this website.</p>
          </div>
        </motion.div>
      </section>

      <section className="product-gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">The full story</p>
            <h2 id="gallery-title">Every angle.<br /><em>Every becoming.</em></h2>
          </div>
          <p>{String(variant.gallery.length).padStart(2, "0")} photographs<br />Tap any image to enter the frame.</p>
        </div>
        <div className="masonry-grid">
          {variant.gallery.map((photo, index) => (
            <motion.button
              type="button"
              key={photo.src}
              className={index % 5 === 0 ? "gallery-image gallery-image-wide" : "gallery-image"}
              onClick={() => setActiveImage(index)}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.6, delay: (index % 3) * 0.05 }}
              aria-label={`Open image ${index + 1} of ${variant.gallery.length}: ${photo.alt}`}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="next-piece">
        <p>Continue becoming</p>
        <Link href="/#drop">Explore the complete drop <span>↗</span></Link>
      </section>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${variant.name} image viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)}>Close</button>
            <button className="lightbox-prev" type="button" onClick={() => stepImage(-1)} aria-label="Previous image">←</button>
            <motion.figure
              key={variant.gallery[activeImage].src}
              className="lightbox-frame"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) stepImage(1);
                if (info.offset.x > 80) stepImage(-1);
              }}
            >
              <Image
                src={variant.gallery[activeImage].src}
                alt={variant.gallery[activeImage].alt}
                fill
                sizes="95vw"
                quality={90}
              />
              <figcaption>
                <span>{variant.gallery[activeImage].alt}</span>
                <span>{String(activeImage + 1).padStart(2, "0")} / {String(variant.gallery.length).padStart(2, "0")}</span>
              </figcaption>
            </motion.figure>
            <button className="lightbox-next" type="button" onClick={() => stepImage(1)} aria-label="Next image">→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
