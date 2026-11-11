"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { variants, formatPrice } from "@/src/content/catalogue";
import { LaunchIntro } from "./launch-intro";
import { Navigation } from "./navigation";

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export function HomeExperience() {
  const [replayToken, setReplayToken] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });

  return (
    <LayoutGroup>
      <LaunchIntro
        replayToken={replayToken}
        onDismiss={() => setIntroFinished(true)}
      />
      <motion.div className="growth-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Navigation onReplay={() => setReplayToken((value) => value + 1)} />
      <main className={introFinished ? "experience is-ready" : "experience"}>
        <Hero />
        <BecomingStory reduceMotion={Boolean(reduceMotion)} />
        <DropStory />
        <StylingFilm reduceMotion={Boolean(reduceMotion)} />
        <Garden />
      </main>
      <a
        className="floating-whatsapp"
        href={`https://wa.me/2349032592825?text=${encodeURIComponent("Hello Wearroiye, I’d like to know more about the Dreams Turned Reality drop.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire about Wearroiye on WhatsApp"
      >
        <span>Enquire</span>
        <span aria-hidden="true">↗</span>
      </a>
    </LayoutGroup>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 82, damping: 26, mass: 0.28, restDelta: 0.001 });
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "12%"]);
  const titleY = useTransform(smoothProgress, [0, 1], ["0%", "-22%"]);
  const opacity = useTransform(smoothProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-image" style={{ y: imageY }}>
        <Image
          className="hero-backdrop"
          src="/media/catalogue/catalogue-03.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          sizes="100vw"
          quality={55}
        />
        <Image
          className="hero-foreground"
          src="/media/catalogue/catalogue-03.jpg"
          alt="Wearroiye models in the Dreams Turned Reality collection"
          fill
          priority
          sizes="100vw"
          quality={82}
        />
      </motion.div>
      <div className="hero-veil" />
      <motion.div className="hero-copy" style={{ y: titleY, opacity }}>
        <p className="eyebrow">Wearroiye presents / Drop 001</p>
        <h1 id="hero-title">
          Wear your
          <em>becoming.</em>
        </h1>
        <div className="hero-meta">
          <span>Dreams turned reality</span>
          <span>11.11</span>
        </div>
      </motion.div>
      <a className="scroll-cue" href="#becoming">
        <span>Follow the story</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}

function BecomingStory({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 26, mass: 0.3, restDelta: 0.001 });
  const leftY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [72, -86]);
  const rightY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [96, -110]);

  const thoughts = [
    ["01", "you’re allowed to grow", "at your own pace."],
    ["02", "becoming", "takes time."],
    ["03", "wear your growth,", "your discipline, your quiet confidence."],
  ];

  return (
    <section ref={sectionRef} id="becoming" className="becoming section-dark" aria-labelledby="becoming-title">
      <div className="chapter-label">
        <span>Chapter one</span>
        <span>The becoming</span>
      </div>
      <h2 id="becoming-title" className="sr-only">The becoming</h2>
      <motion.figure className="becoming-photo photo-left" style={{ y: leftY }}>
        <Image
          src="/media/cuffed-long-sleeve/cuffed-02.jpg"
          alt="A Wearroiye model standing at the platform line"
          fill
          sizes="(max-width: 760px) 44vw, 22vw"
        />
      </motion.figure>
      <motion.figure className="becoming-photo photo-right" style={{ y: rightY }}>
        <Image
          src="/media/short-sleeve/short-sleeve-12.jpg"
          alt="A Wearroiye model standing between railway tracks"
          fill
          sizes="(max-width: 760px) 46vw, 24vw"
        />
      </motion.figure>
      <div className="thoughts">
        {thoughts.map(([number, lead, finish]) => (
          <motion.article
            className="thought"
            key={number}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.55 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{number}</span>
            <p>{lead}<em>{finish}</em></p>
          </motion.article>
        ))}
      </div>
      <p className="becoming-aside">Not for trends. Not for approval.<br />It’s inward, not outward.</p>
    </section>
  );
}

function DropStory() {
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "center center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 76, damping: 27, mass: 0.3, restDelta: 0.001 });
  const coverScale = useTransform(smoothProgress, [0, 1], [0.78, 1]);
  const radius = useTransform(smoothProgress, [0, 1], [28, 0]);

  return (
    <section id="drop" className="drop-section" aria-labelledby="drop-title">
      <div className="chapter-label light-label">
        <span>Chapter two</span>
        <span>The drop</span>
      </div>
      <div ref={coverRef} className="catalogue-cover-stage">
        <motion.div className="catalogue-cover" style={{ scale: coverScale, borderRadius: radius }}>
          <Image
            src="/media/catalogue/catalogue-01.jpg"
            alt="Dreams Turned Reality catalogue cover"
            fill
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </div>
      <div className="drop-intro">
        <p>Drop 001 / 11.11</p>
        <h2 id="drop-title">Dreams<br /><em>turned reality.</em></h2>
        <p className="drop-description">
          The first expression of a state of becoming. Three silhouettes. One quiet declaration.
        </p>
      </div>
      <CatalogueReel />
      <div className="collection-heading">
        <p>Explore the variations</p>
        <p>Made for you / made to be lived in</p>
      </div>
      <div className="variant-grid">
        {variants.map((variant) => (
          <article className="variant-card" key={variant.slug}>
            <Link href={`/catalogue/${variant.slug}`} aria-label={`Explore ${variant.name}`}>
              <div className="variant-stack">
                {variant.gallery.slice(0, 3).map((photo, photoIndex) => (
                  <motion.div
                    className={`stack-photo stack-${photoIndex + 1}`}
                    key={photo.src}
                    layoutId={photoIndex === 0 ? `product-${variant.slug}` : undefined}
                    whileHover={{
                      x: photoIndex === 1 ? -16 : photoIndex === 2 ? 16 : 0,
                      rotate: photoIndex === 1 ? -3 : photoIndex === 2 ? 3 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  >
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 86vw, 31vw" />
                  </motion.div>
                ))}
                <span className="view-piece">View piece ↗</span>
              </div>
              <div className="variant-info">
                <span>{variant.number}</span>
                <div>
                  <h3>{variant.name}</h3>
                  <p>{variant.story}</p>
                </div>
                <strong>{formatPrice(variant.price.amountMinor)}</strong>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CatalogueReel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: reelRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 68, damping: 24, mass: 0.35, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-14%"]);

  return (
    <div ref={reelRef} className="catalogue-reel-wrap">
      <motion.div className="catalogue-reel" style={{ x }}>
        {[2, 3, 4].map((index) => (
          <figure key={index}>
            <Image
              src={`/media/catalogue/catalogue-0${index}.jpg`}
              alt={`Dreams Turned Reality catalogue composition ${index - 1}`}
              fill
              sizes="(max-width: 760px) 84vw, 58vw"
            />
            <figcaption>Catalogue / 0{index - 1}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

function StylingFilm({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25, mass: 0.32, restDelta: 0.001 });
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.35],
    reduceMotion ? ["inset(0%)", "inset(0%)"] : ["inset(0% 31%)", "inset(0% 0%)"],
  );

  useEffect(() => {
    const video = videoRef.current;
    const section = ref.current;
    if (!video || !section) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !connection?.saveData) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={ref} id="in-motion" className="motion-story section-dark" aria-labelledby="motion-title">
      <div className="chapter-label">
        <span>Chapter three</span>
        <span>In motion</span>
      </div>
      <div className="motion-sticky">
        <motion.div className="styling-frame" style={{ clipPath }}>
          <video
            ref={videoRef}
            src="/media/videos/styling-film.mp4"
            playsInline
            muted={muted}
            preload="metadata"
            loop
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              setProgress(video.duration ? video.currentTime / video.duration : 0);
            }}
            aria-label="Wearroiye styling film"
          />
          <div className="styling-overlay" />
          <div className="styling-controls">
            <button type="button" onClick={togglePlayback}>{playing ? "Pause" : "Play"}</button>
            <button
              type="button"
              onClick={() => {
                const nextMuted = !muted;
                setMuted(nextMuted);
                if (videoRef.current) videoRef.current.muted = nextMuted;
              }}
            >
              {muted ? "Sound on" : "Mute"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!videoRef.current) return;
                videoRef.current.currentTime = 0;
                videoRef.current.play();
              }}
            >
              Replay
            </button>
          </div>
          <span className="video-progress"><i style={{ transform: `scaleX(${progress})` }} /></span>
        </motion.div>
        <div className="motion-copy">
          <p>Simple &gt; loud</p>
          <h2 id="motion-title">Clothes for the<br /><em>person you’re becoming.</em></h2>
          <p>Not a title. Not a rank.<br />A state of becoming.</p>
        </div>
      </div>
    </section>
  );
}

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
    >
      {children}<span>↗</span>
    </motion.a>
  );
}

function Garden() {
  return (
    <footer id="garden" className="garden" aria-labelledby="garden-title">
      <div className="chapter-label">
        <span>Finale</span>
        <span>The garden</span>
      </div>
      <div className="garden-mosaic" aria-hidden="true">
        {[
          "/media/cuffed-long-sleeve/cuffed-08.jpg",
          "/media/free-cuff-long-sleeve/free-cuff-10.jpg",
          "/media/short-sleeve/short-sleeve-02.jpg",
          "/media/cuffed-long-sleeve/cuffed-03.jpg",
          "/media/free-cuff-long-sleeve/free-cuff-07.jpg",
        ].map((src, index) => (
          <motion.figure
            key={src}
            initial={{ opacity: 0, scale: 0.82, rotate: index % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={src} alt="" fill sizes="(max-width: 760px) 45vw, 20vw" />
          </motion.figure>
        ))}
      </div>
      <div className="garden-copy">
        <p>You’re not building customers.<br />You’re building people who feel seen.</p>
        <h2 id="garden-title">roiye isn’t something you are.<br /><em>it’s something you grow into.</em></h2>
      </div>
      <div className="social-orbit">
        <MagneticLink href="https://instagram.com/wearroiye">Instagram</MagneticLink>
        <MagneticLink href="https://tiktok.com/@wearroiye">TikTok</MagneticLink>
        <MagneticLink href="https://x.com/wearroiye">X / Twitter</MagneticLink>
        <MagneticLink href={`https://wa.me/2349032592825?text=${encodeURIComponent("Hello Wearroiye, I’d like to enquire about the Dreams Turned Reality drop.")}`}>WhatsApp</MagneticLink>
      </div>
      <div className="footer-line">
        <span>Wearroiye © 2026</span>
        <span>For you / for the becoming</span>
        <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</a>
      </div>
    </footer>
  );
}
