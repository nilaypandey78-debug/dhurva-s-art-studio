import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Eye, Clock, MapPin, Pause, Play, Award, Ticket } from 'lucide-react';
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
          key="knma-welcoming-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto bg-[#111827] text-white flex flex-col justify-between selection:bg-blue-600 selection:text-white antialiased font-sans"
        >
          {/* Background Image & Vignette */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 3.5, ease: 'easeOut' }}
              src={HERO_IMAGE}
              alt="Kiran Nadar Museum of Art Exhibition Hall"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.1]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-[#111827]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(29,78,216,0.18)_0%,transparent_75%)]" />

            {/* Subtle KNMA Diamond Lattice Grid Overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none knma-lattice-bg" />
          </div>

          {/* Top Bar */}
          <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                KNMA
              </div>
              <div>
                <span className="block text-sm sm:text-base font-bold uppercase tracking-tight text-white">
                  Kiran Nadar Museum of Art
                </span>
                <span className="block text-[11px] tracking-wider uppercase font-mono text-stone-400">
                  New Delhi (Saket) & Noida · Dhurva Contemporary Studio
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePause}
                title={isPaused ? "Resume timer" : "Pause timer"}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                onClick={handleEnter}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Enter Museum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>

          {/* Centered Experience with Simple, Clean Sans-Serif Font */}
          <main className="relative z-20 max-w-3xl mx-auto px-6 py-8 text-center my-auto flex flex-col items-center">
            {/* Museum Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-blue-950/80 border border-blue-500/40 text-xs uppercase tracking-wider text-blue-300 font-mono font-semibold mb-6">
              <Ticket className="w-3.5 h-3.5 text-blue-400" />
              <span>India's Premier Private Modern Art Museum · Admission Free</span>
            </div>

            {/* Simple, Bold Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Discover Modern & Contemporary South Asian Art
            </h1>

            {/* Editorial Statement in Simple Sans */}
            <div className="bg-stone-900/80 border border-stone-800 p-6 sm:p-7 rounded-sm backdrop-blur-md mb-8 max-w-2xl text-left sm:text-center">
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                Welcome to KNMA. Established to bridge the gap between art and the public, the museum houses over 16,000 masterworks spanning 20th-century Indian masters—from S.H. Raza and Tyeb Mehta to cutting-edge contemporary creations from Dhurva Studio.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-stone-800 text-xs text-stone-400 font-mono">
                <span>• Saket Pavilion, New Delhi</span>
                <span>• Sector 126 Pavilion, Noida</span>
                <span>• Open Tuesday–Sunday 10:30 AM–6:30 PM</span>
              </div>
            </div>

            {/* Highlights Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {CURATED_PREVIEWS.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xs bg-stone-900/90 border border-stone-700 text-left"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-xs object-cover"
                  />
                  <div className="text-[11px] leading-tight">
                    <span className="block font-semibold text-stone-100 line-clamp-1 max-w-[130px]">{art.title}</span>
                    <span className="block text-[10px] text-stone-400 font-mono">{art.artist}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Action */}
            <button
              onClick={handleEnter}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold transition-all rounded-xs flex items-center gap-3 shadow-lg hover:shadow-blue-600/30 cursor-pointer"
            >
              <span>Explore Exhibitions & Studio Works</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </main>

          {/* Footer Countdown */}
          <footer className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6">
            <div className="max-w-md mx-auto text-center space-y-3">
              <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? undefined : '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    {isPaused
                      ? 'Transition paused'
                      : `Opening museum homepage in ${timeLeft}s...`}
                  </span>
                </div>

                <button
                  onClick={handleEnter}
                  className="hover:text-white transition-colors underline cursor-pointer"
                >
                  Enter Now
                </button>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
