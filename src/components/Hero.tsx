import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Eye, Sparkles, MapPin, Clock, Ticket, Award, Globe, ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/artworks';
import { useGallery } from '../context/GalleryContext';
import { AnimatedCounter } from './AnimatedCounter';

export const Hero: React.FC = () => {
  const { setSelectedArtwork, artworks, setCurrentPage } = useGallery();
  const spotlightArt = artworks[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative pt-6 pb-16 lg:pb-24 border-b border-stone-200 bg-white">
      {/* Subtle KNMA Diamond Lattice Texture */}
      <div className="absolute inset-0 opacity-25 pointer-events-none knma-lattice-bg" aria-hidden="true" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Curatorial Header & Intro in Simple Sans-Serif */}
        <div className="border border-stone-200 bg-[#FAFAFA] rounded-sm p-6 sm:p-8 lg:p-10 mb-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              {/* Institutional Eyebrow */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-wider text-stone-600 font-semibold mb-4"
              >
                <span className="px-2.5 py-1 bg-blue-700 text-white rounded-xs font-bold text-[10px]">
                  KNMA · CURRENT PROGRAM
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-800">Saket (New Delhi) & Noida</span>
                <span className="text-stone-300">·</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Free Public Admission
                </span>
              </motion.div>

              {/* Bold, Simple, Modern Sans Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1]"
              >
                Where South Asian Heritage Meets Modern Expression.
              </motion.h1>

              {/* Blue Institutional Accent Bar */}
              <div className="w-20 h-1 bg-blue-700 mt-4 mb-4" />
            </div>

            <div className="lg:col-span-4 lg:pl-6 border-l-0 lg:border-l border-stone-200">
              <motion.p
                variants={itemVariants}
                className="text-stone-600 text-sm leading-relaxed mb-6 font-normal"
              >
                The Kiran Nadar Museum of Art (KNMA) bridges the gap between historical South Asian masters and contemporary studio practices. In collaboration with Dhurva Contemporary Studio, explore curated museum retrospectives and acquire museum-pedigree original paintings and sculptures.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase font-semibold"
              >
                {/* Primary Action: Showcase & Purchase */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage('showcase')}
                  className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white transition-all rounded-xs inline-flex items-center gap-2 shadow-xs cursor-pointer font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Showcase & Acquisitions</span>
                </motion.button>

                {/* Secondary Action: Explore Exhibitions */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#exhibitions"
                  className="px-4 py-3 border border-stone-300 hover:border-stone-900 bg-white text-stone-800 transition-all rounded-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Exhibitions</span>
                  <ArrowDown className="w-3.5 h-3.5 text-stone-500" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase: Clean Museum Presentation */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-xs overflow-hidden aspect-[16/9] max-h-[560px] w-full bg-stone-950 shadow-lg border border-stone-200 group"
        >
          {/* Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#111827]/90 text-white text-xs tracking-wider uppercase font-bold border border-stone-700 shadow-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>KNMA Main Pavilion · New Delhi Retrospective</span>
          </div>

          <img
            src={HERO_IMAGE}
            alt="Kiran Nadar Museum of Art Main Gallery Space"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
          />

          {/* Measured Scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Foreground Exhibition Details Ribbon */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white z-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-blue-300 font-bold mb-1">
                <Ticket className="w-3.5 h-3.5 text-blue-400" />
                <span>Featured Retrospective Exhibition · Free Entry</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Cosmic Geometry, Void & The Modern Indian Canvas
              </h2>
              <p className="text-xs md:text-sm text-stone-300 mt-1 line-clamp-2">
                A landmark presentation exploring philosophical stillness, sacred geometry, and modern abstraction by S.H. Raza, Gaitonde, and Dhurva Studio originals.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#visit"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-xs whitespace-nowrap cursor-pointer"
              >
                Plan Museum Visit
              </a>
              {spotlightArt && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedArtwork(spotlightArt)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all rounded-xs whitespace-nowrap cursor-pointer shadow-md"
                >
                  View Featured Masterwork
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Operational Institutional Ribbon */}
        <motion.div
          variants={itemVariants}
          className="mt-6 py-4 px-5 bg-stone-50 border border-stone-200 rounded-xs flex flex-wrap items-center justify-between gap-4 text-xs text-stone-700 font-medium"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-700" />
            <span className="font-bold uppercase tracking-wider text-stone-900">Visiting Hours:</span>
            <span>Tuesday – Sunday 10:30 AM – 6:30 PM (Closed Mondays)</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span className="font-bold uppercase tracking-wider text-stone-900">Pavilions:</span>
            <span>Saket (DLF South Court) & Sector 126 (Noida)</span>
          </div>

          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-emerald-700" />
            <span className="font-bold uppercase tracking-wider text-stone-900">Admission:</span>
            <span>Always Free for General Public & Students</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-700" />
            <span className="font-bold uppercase tracking-wider text-stone-900">Acquisitions:</span>
            <span>Museum Verified Provenance</span>
          </div>
        </motion.div>

        {/* Museum Statistics Strip in Simple Sans Tabular Figures */}
        <motion.div
          variants={itemVariants}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              <AnimatedCounter value={16000} suffix="+" duration={1.8} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Collection Artworks
            </div>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 tabular-nums">
              <AnimatedCounter value={100} suffix="%" duration={1.5} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Free Public Admission
            </div>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              <AnimatedCounter value={2} duration={1.2} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Landmark Pavilions (Saket & Noida)
            </div>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-2xs">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              <AnimatedCounter value={40} suffix="+" duration={1.6} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mt-1">
              Global Museum Partnerships
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
