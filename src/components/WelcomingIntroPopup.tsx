import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Eye } from 'lucide-react';
import { HERO_IMAGE } from '../data/artworks';

export const WelcomingIntroPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically transition to the full gallery after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="full-welcoming-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-stone-950 text-stone-100 flex flex-col justify-between"
        >
          {/* Full-bleed Background Hero Media with Ambient Glow */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 3.5, ease: 'easeOut' }}
              src={HERO_IMAGE}
              alt="Dhurva's Art Studio & Gallery Exhibition Hall"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08]"
            />
            {/* Museum Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,179,129,0.18)_0%,transparent_70%)]" />
          </div>

          {/* Top Bar of Welcoming Page */}
          <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-serif tracking-[0.25em] uppercase text-stone-100 font-medium">
                Dhurva's Art Studio & Gallery
              </span>
            </div>

            <button
              onClick={handleEnter}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs uppercase tracking-widest font-mono rounded-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Enter Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </header>

          {/* Centered Grand Welcoming Experience */}
          <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center my-auto flex flex-col items-center">
            {/* Salutation Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-300/95 font-mono font-medium mb-4"
            >
              <span>Curatorial Salutations</span>
              <span aria-hidden="true">·</span>
              <span>Vernissage 2026</span>
              <span aria-hidden="true">·</span>
              <span>Paris & New Delhi</span>
            </motion.div>

            {/* Grand Welcome Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08] font-normal"
              style={{ textWrap: 'balance' }}
            >
              Welcome to Dhurva's Art Studio & Gallery
            </motion.h1>

            {/* Subtle Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6"
            />

            {/* Editorial Greeting Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-sm sm:text-base lg:text-lg text-stone-200 font-serif leading-relaxed max-w-2xl mx-auto italic"
            >
              "Where pure form meets contemplative silence. Explore an exclusive sanctuary of monumental paintings on raw Belgian linen, hand-cast patinated bronze, and carved alabaster sculptures."
            </motion.p>

            {/* 3 Pillars of the Studio */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-stone-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Original Studio Masterworks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Certified Provenance Archives</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Insured White-Glove Global Freight</span>
              </div>
            </motion.div>

            {/* Direct Action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={handleEnter}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-sm flex items-center gap-3 shadow-lg hover:shadow-amber-400/20 cursor-pointer"
              >
                <span>Enter The Gallery & Acquisitions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </main>

          {/* Bottom Countdown & Transit Bar */}
          <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8">
            <div className="max-w-xl mx-auto text-center space-y-3">
              {/* Animated 3-second progress bar */}
              <div className="w-full bg-stone-800/80 backdrop-blur-xs h-1 rounded-full overflow-hidden border border-stone-700/50">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-200"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Transitioning into salon in 3s...</span>
                <button
                  onClick={handleEnter}
                  className="hover:text-amber-300 transition-colors underline cursor-pointer"
                >
                  Skip Transition
                </button>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
