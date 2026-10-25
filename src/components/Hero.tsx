import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Eye, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/artworks';
import { useGallery } from '../context/GalleryContext';

export const Hero: React.FC = () => {
  const { setSelectedArtwork, artworks } = useGallery();
  const spotlightArt = artworks[0];

  // Orchestrated motion variants for the animated entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageShowcaseVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative pt-8 pb-16 lg:pb-24 border-b border-stone-200 overflow-hidden">
      {/* Targeted Element: Animated Entry Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6"
      >
        {/* Curatorial Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-stone-500 font-medium mb-4"
            >
              <span>Salon No. IV</span>
              <span aria-hidden="true">·</span>
              <span>Contemporary Paintings & Sculptures</span>
              <span aria-hidden="true">·</span>
              <span>Paris & Global Archives</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12] relative"
              style={{ textWrap: 'balance' }}
            >
              Where Pure Form Meets Contemplative Silence.
            </motion.h1>

            {/* Subtle animated hairline accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ originX: 0 }}
              className="w-32 h-[1.5px] bg-gradient-to-r from-amber-600/70 to-transparent mt-4"
            />
          </div>

          <div className="lg:col-span-4 lg:pl-6 border-l-0 lg:border-l border-stone-200">
            <motion.p
              variants={itemVariants}
              className="text-stone-600 text-sm leading-relaxed mb-6"
            >
              Dhurva's Art Studio & Gallery curates singular, museum-pedigree artworks—from monumental textured oils on Belgian linen to hand-carved alabaster and patinated bronzes. Every acquisition includes verified provenance and insured white-glove courier delivery worldwide.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-xs tracking-wider uppercase font-medium"
            >
              <a
                href="#curated-works"
                className="px-5 py-3 bg-stone-900 text-stone-50 hover:bg-stone-800 transition-all rounded-sm inline-flex items-center gap-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Collection</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              {spotlightArt && (
                <button
                  onClick={() => setSelectedArtwork(spotlightArt)}
                  className="px-4 py-3 border border-stone-300 hover:border-stone-800 text-stone-800 hover:text-stone-950 transition-all rounded-sm inline-flex items-center gap-2 cursor-pointer hover:bg-white"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Feature</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Hero Visual Showcase with Ambient Lighting & Animation */}
        <motion.div
          variants={imageShowcaseVariants}
          className="relative rounded-sm overflow-hidden aspect-[16/9] max-h-[580px] w-full bg-stone-900 shadow-xl border border-stone-300/60 group"
        >
          <img
            src={HERO_IMAGE}
            alt="Dhurva's Art Studio and Gallery Main Exhibition Hall"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Measured Scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Ambient Museum Spotlight Beam Animation */}
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/4 left-1/3 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl"
          />

          {/* Foreground Exhibition Details Ribbon */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-200/90 font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Current Exhibition · The Vernissage 2026</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                Dialogues Between Mass & Transparency
              </h2>
              <p className="text-xs md:text-sm text-stone-300 mt-1 line-clamp-2">
                Featuring monumental works by Dhurva, Hélène Vance, Marcus Thorne, and Camille Laurent. Available for private viewing and direct collection acquisition.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#exhibitions"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-wider transition-colors rounded-sm whitespace-nowrap"
              >
                Exhibition Notes
              </a>
              {spotlightArt && (
                <button
                  onClick={() => setSelectedArtwork(spotlightArt)}
                  className="px-4 py-2 bg-amber-500/90 hover:bg-amber-400 text-stone-950 font-medium text-xs uppercase tracking-wider transition-colors rounded-sm whitespace-nowrap cursor-pointer shadow-sm hover:shadow-md"
                >
                  Acquire Spotlight Piece
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Operational Institutional Ribbon with Staggered Entrance */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 font-sans"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-stone-800">Hours:</span>
            <span>Tuesday – Sunday 10:00 – 19:00</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-stone-800">Flagship:</span>
            <span>18 Place Vendôme, 75001 Paris</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-stone-800">Assurance:</span>
            <span>Certified Provenance & Insured Art Freight</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-stone-800">Advisory:</span>
            <span>Private Curatorial Concierge</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
