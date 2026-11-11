"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "wearroiye:launch-intro:seen:v1";

type LaunchIntroProps = {
  replayToken: number;
  onDismiss: () => void;
};

export function LaunchIntro({ replayToken, onDismiss }: LaunchIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"brand" | "film">("brand");
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Storage can be blocked; the intro must still be dismissible.
    }
    setVisible(false);
    document.body.style.overflow = "";
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    const isReplay = replayToken > 0;
    let phaseTimer = 0;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      seen = false;
    }

    const setupTimer = window.setTimeout(() => {
      if (seen && !isReplay) {
        setVisible(false);
        onDismiss();
        return;
      }

      setVisible(true);
      setPhase("brand");
      setMuted(true);
      setManualPlay(false);
      document.body.style.overflow = "hidden";

      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const dataSaver = Boolean(connection?.saveData || connection?.effectiveType === "2g");
      const delay = reduceMotion ? 350 : 2450;
      phaseTimer = window.setTimeout(() => {
        setPhase("film");
        setManualPlay(dataSaver);
      }, delay);
    }, 0);

    return () => {
      window.clearTimeout(setupTimer);
      window.clearTimeout(phaseTimer);
      document.body.style.overflow = "";
    };
  }, [onDismiss, reduceMotion, replayToken]);

  useEffect(() => {
    if (phase !== "film" || manualPlay) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setPlaying(true)).catch(() => setManualPlay(true));
  }, [manualPlay, phase]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (visible && event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss, visible]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
      setManualPlay(false);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const enterWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    setManualPlay(false);
    await video.play();
    setPlaying(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="launch-intro"
          role="dialog"
          aria-modal="true"
          aria-label="Wearroiye launch film"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.65 }}
        >
          <AnimatePresence mode="wait">
            {phase === "brand" ? (
              <motion.div
                key="brand"
                className="launch-brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.7 }}
              >
                <motion.span
                  className="launch-stem"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.65, 0, 0.35, 1] }}
                />
                <motion.div
                  className="launch-art"
                  initial={{ clipPath: "inset(50% 0 50% 0)" }}
                  animate={{ clipPath: "inset(0% 0 0% 0)" }}
                  transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 1.1 }}
                >
                  <Image
                    src="/media/brand/dreams-turned-reality.jpeg"
                    alt="Dreams Turned Reality, 11.11"
                    fill
                    priority
                    sizes="100vw"
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 1.45, duration: 0.55 }}
                >
                  becoming your own standard
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="film"
                className="launch-film"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="launch-video-stage">
                  <video
                    ref={videoRef}
                    className="launch-video"
                    src="/media/videos/launch-day.mp4"
                    playsInline
                    muted={muted}
                    preload="auto"
                    onCanPlay={() => setVideoReady(true)}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={dismiss}
                    aria-label="Wearroiye Dreams Turned Reality launch film"
                  />
                </div>
                <div className="film-shade" />
                {!videoReady && <p className="film-loading">Preparing the film…</p>}
                {manualPlay && (
                  <button className="film-enter" type="button" onClick={enterWithSound}>
                    <span>Enter the story</span>
                    <small>Play with sound</small>
                  </button>
                )}
                <div className="film-controls">
                  <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause film" : "Play film"}>
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextMuted = !muted;
                      setMuted(nextMuted);
                      if (videoRef.current) videoRef.current.muted = nextMuted;
                    }}
                    aria-label={muted ? "Turn sound on" : "Mute film"}
                  >
                    {muted ? "Sound on" : "Mute"}
                  </button>
                  <button type="button" onClick={dismiss}>Skip film</button>
                </div>
                <p className="film-index">Prologue / The dream</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
