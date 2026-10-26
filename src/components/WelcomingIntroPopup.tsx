import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Eye, Palette, Clock, MapPin, Pause, Play, Award } from 'lucide-react';
import { HERO_IMAGE, INITIAL_ARTWORKS } from '../data/artworks';

// Preview highlights for the welcoming teaser
const CURATED_PREVIEWS = INITIAL_ARTWORKS.slice(0, 4);

export const WelcomingIntroPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible, isPaused]);

  const handleEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsVisible(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="grand-welcoming-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: 'blur(6px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-400 selection:text-stone-950 antialiased smooth-font"
        >
          {/* Layer 1: Ambient High-Fidelity Background Gallery Atmosphere */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 4.5, ease: 'easeOut' }}
              src={HERO_IMAGE}
              alt="Dhurva's Art Studio & Gallery Exhibition Hall"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.12]"
            />

            {/* Rich Radial Vignette & Noir Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,179,129,0.18)_0%,rgba(7,35,22,0.35)_45%,transparent_85%)]" />

            {/* Animated Atmospheric Color Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                x: [0, 35, 0],
                y: [0, -25, 0],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/25 via-yellow-600/15 to-transparent blur-3xl"
            />
            <motion.div
              animate={{
                scale: [0.95, 1.2, 0.95],
                x: [0, -40, 0],
                y: [0, 30, 0],
                opacity: [0.18, 0.4, 0.18],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-10 right-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-[#072316]/40 via-emerald-700/20 to-transparent blur-3xl"
            />

            {/* Floating Atelier Gold Sparkles */}
            {[
              { id: 1, left: '12%', top: '25%', duration: 6, delay: 0 },
              { id: 2, left: '88%', top: '30%', duration: 7.5, delay: 1 },
              { id: 3, left: '20%', top: '75%', duration: 8, delay: 2 },
              { id: 4, left: '80%', top: '70%', duration: 6.8, delay: 0.5 },
            ].map((spark) => (
              <motion.div
                key={spark.id}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: spark.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: spark.delay,
                }}
                style={{ left: spark.left, top: spark.top }}
                className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              />
            ))}
          </div>

          {/* Museum Brass Corner Vitrine Brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 pointer-events-none z-30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 pointer-events-none z-30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 pointer-events-none z-30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 pointer-events-none z-30" />

          {/* Top Bar of Welcoming Page with Animated Atelier Emblem */}
          <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/25 via-amber-300/10 to-transparent border border-amber-300/50 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
              </motion.div>
              <div>
                <span className="block text-sm sm:text-base font-cormorant tracking-[0.22em] uppercase text-stone-100 font-semibold smooth-font">
                  Dhurva's Art Studio & Gallery
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-amber-200/80 smooth-font">
                  Salon No. IV · 18 Place Vendôme, Paris
                </span>
              </div>
            </motion.div>

            {/* Quick Enter Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={togglePause}
                title={isPaused ? "Resume auto-entry timer" : "Pause timer to look around"}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-700/60 text-xs font-mono smooth-font transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                className="px-5 py-2.5 bg-white/10 hover:bg-amber-400 hover:text-stone-950 backdrop-blur-md border border-amber-300/40 text-stone-100 text-xs uppercase tracking-widest font-mono smooth-font rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-400/25 group animate-shimmer-sweep"
              >
                <span>Enter Salon</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:text-stone-950 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </header>

          {/* Centered Grand Welcoming Experience */}
          <main className="relative z-20 max-w-4xl mx-auto px-6 py-6 sm:py-10 text-center my-auto flex flex-col items-center">
            {/* Salutation Kicker with refined badge animation */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-xs uppercase tracking-[0.25em] text-amber-200 font-mono font-medium mb-6 shadow-[0_0_20px_rgba(251,191,36,0.12)] smooth-font"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Curatorial Vernissage 2026</span>
              <span className="text-amber-300/40" aria-hidden="true">|</span>
              <span className="text-stone-200">Paris & New Delhi</span>
            </motion.div>

            {/* Grand Welcome Title with Silky Smooth Serif & Luster */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-cormorant text-white tracking-[-0.015em] leading-[1.06] font-normal smooth-font drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              style={{ textWrap: 'balance' }}
            >
              Welcome to Dhurva's
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="block mt-1 sm:mt-2 text-3xl sm:text-5xl lg:text-6xl italic font-cormorant font-light tracking-[-0.01em] bg-gradient-to-r from-amber-100 via-amber-300 via-rose-200 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent smooth-gradient-text drop-shadow-[0_2px_15px_rgba(251,191,36,0.25)]"
              >
                Art Studio & Curatorial Gallery
              </motion.span>
            </motion.h1>

            {/* Gilded Accent Ribbon */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.38, duration: 0.7 }}
              className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6"
            />

            {/* Curatorial Greeting Card with Parchment Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="max-w-2xl mx-auto p-6 sm:p-7 rounded-2xl bg-stone-900/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
            >
              <p className="text-base sm:text-lg lg:text-xl text-stone-100/95 font-cormorant font-normal leading-[1.75] italic tracking-wide smooth-font drop-shadow-sm">
                "Where pure form meets contemplative silence. We invite you into a dedicated studio sanctuary of monumental paintings on raw Belgian linen, hand-patinated bronzes, and carved alabaster masterworks."
              </p>

              {/* Atelier Pigment Palette Swatches */}
              <div className="flex items-center justify-center gap-2 mt-5 pt-3.5 border-t border-white/10 text-[11px] font-mono text-stone-300 smooth-font">
                <span className="text-stone-400 tracking-wider uppercase text-[10px]">Studio Pigments:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-950/70 border border-stone-700/60">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  <span>Venetian Gold</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-950/70 border border-stone-700/60">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                  <span>Carmine</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-950/70 border border-stone-700/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                  <span>Veronese Emerald</span>
                </span>
              </div>
            </motion.div>

            {/* Preview Strip of Curated Works */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto"
            >
              {CURATED_PREVIEWS.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-stone-900/80 border border-amber-300/20 backdrop-blur-xs text-left shadow-sm hover:border-amber-400/40 transition-colors"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-sm object-cover border border-amber-400/40"
                  />
                  <div className="text-[11px] leading-tight smooth-font">
                    <span className="block font-medium text-stone-100 line-clamp-1 max-w-[125px]">{art.title}</span>
                    <span className="block text-[10px] text-amber-300/85 font-mono">{art.artist}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Direct Entry CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={handleEnter}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-stone-950 text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 rounded-sm flex items-center gap-3 shadow-[0_4px_25px_rgba(251,191,36,0.35)] hover:shadow-[0_6px_35px_rgba(251,191,36,0.5)] hover:-translate-y-0.5 cursor-pointer ring-2 ring-amber-300/50 smooth-font"
              >
                <span>Explore The Studio & Collection</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>
            </motion.div>
          </main>

          {/* Bottom Countdown & Institutional Transition Bar */}
          <footer className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 md:py-8">
            <div className="max-w-xl mx-auto text-center space-y-3">
              {/* Animated 3-second progress bar */}
              <div className="w-full bg-stone-850/90 backdrop-blur-xs h-1.5 rounded-full overflow-hidden border border-stone-700/60 shadow-inner">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? undefined : '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-300/90 smooth-font">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isPaused
                      ? 'Auto-transition paused'
                      : `Transitioning into exhibition salon (${timeLeft}s)...`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePause}
                    className="hover:text-amber-300 transition-colors underline cursor-pointer"
                  >
                    {isPaused ? 'Resume Timer' : 'Pause Timer'}
                  </button>
                  <span className="text-stone-600">·</span>
                  <button
                    onClick={handleEnter}
                    className="hover:text-amber-300 transition-colors underline cursor-pointer"
                  >
                    Enter Immediately
                  </button>
                </div>
              </div>

              {/* Institutional Assurance Strip */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400/90 smooth-font">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified Provenance
                </span>
                <span className="text-stone-700">·</span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-amber-400" />
                  Museum Quality
                </span>
                <span className="text-stone-700">·</span>
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-sky-400" />
                  White-Glove Global Freight
                </span>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
