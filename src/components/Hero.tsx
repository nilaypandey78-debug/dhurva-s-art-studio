import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Eye, Sparkles, Compass, ShieldCheck, Clock, MapPin, Award, Globe, Landmark } from 'lucide-react';
import { HERO_IMAGE } from '../data/artworks';
import { useGallery } from '../context/GalleryContext';
import { AnimatedCounter } from './AnimatedCounter';

// Atmospheric floating atelier dust & pigment particles
const PIGMENT_MOTES = [
  { id: 1, left: '6%', top: '22%', size: 7, color: 'bg-emerald-500/35', duration: 7.2, delay: 0 },
  { id: 2, left: '91%', top: '18%', size: 8, color: 'bg-amber-400/40', duration: 8.6, delay: 1.1 },
  { id: 3, left: '16%', top: '78%', size: 6, color: 'bg-rose-400/30', duration: 9.2, delay: 2.3 },
  { id: 4, left: '84%', top: '74%', size: 8, color: 'bg-teal-400/35', duration: 10.4, delay: 0.7 },
  { id: 5, left: '48%', top: '88%', size: 7, color: 'bg-indigo-400/30', duration: 8.1, delay: 1.8 },
  { id: 6, left: '32%', top: '14%', size: 5, color: 'bg-emerald-400/35', duration: 7.8, delay: 2.9 },
  { id: 7, left: '72%', top: '38%', size: 6, color: 'bg-amber-500/30', duration: 9.6, delay: 1.4 },
];

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
    <section
      className="relative pt-8 pb-16 lg:pb-24 border-b-2 border-[#072316] overflow-hidden bg-gradient-to-b from-stone-50/70 via-white/80 to-stone-100/50"
      style={{ borderColor: '#072316' }}
    >
      {/* Animated Deep Emerald & Gold Gilded Border Glint */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] overflow-hidden pointer-events-none z-20">
        <motion.div
          animate={{ x: ['-100%', '220%'] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 via-amber-300 to-transparent blur-[0.5px]"
        />
      </div>

      {/* Floating Atelier Pigment Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {PIGMENT_MOTES.map((mote) => (
          <motion.div
            key={mote.id}
            animate={{
              y: [0, -22, 0, 16, 0],
              x: [0, 14, 0, -14, 0],
              scale: [1, 1.4, 0.95, 1],
              opacity: [0.25, 0.75, 0.35, 0.25],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: mote.delay,
            }}
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
            }}
            className={`absolute rounded-full blur-[0.5px] ${mote.color}`}
          />
        ))}

        {/* Ambient Deep Forest Emerald Gradient Orb */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.95, 1],
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            opacity: [0.12, 0.24, 0.12],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#072316]/25 via-emerald-800/15 to-transparent blur-3xl"
        />

        {/* Ambient Warm Golden Sienna Orb */}
        <motion.div
          animate={{
            scale: [0.95, 1.2, 1, 0.95],
            x: [0, -30, 25, 0],
            y: [0, 20, -25, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-amber-400/20 via-orange-400/15 to-transparent blur-3xl"
        />
      </div>

      {/* Targeted Element: Animated Entry Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Curatorial Header & Intro - Animated with Rich Atelier Pigments */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 bg-white/70 backdrop-blur-md border border-amber-200/70 shadow-[0_12px_45px_rgba(7,35,22,0.06)] overflow-hidden">
          {/* Animated Artistic Color Pigment Halos */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl -z-10" aria-hidden="true">
            {/* Amber Gold Pigment Glow */}
            <motion.div
              animate={{
                scale: [1, 1.25, 0.95, 1],
                x: [0, 30, -20, 0],
                y: [0, -18, 12, 0],
                opacity: [0.35, 0.6, 0.35],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-14 -left-10 w-80 h-80 rounded-full bg-gradient-to-br from-amber-400/40 via-yellow-300/25 to-transparent blur-3xl"
            />
            {/* Carmine Vermilion Pigment Glow */}
            <motion.div
              animate={{
                scale: [0.95, 1.2, 1, 0.95],
                x: [0, -35, 20, 0],
                y: [0, 25, -15, 0],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-400/20 to-transparent blur-3xl"
            />
            {/* Cobalt Ultramarine Pigment Glow */}
            <motion.div
              animate={{
                scale: [1, 1.18, 0.9, 1],
                x: [0, -25, 30, 0],
                y: [0, -20, 18, 0],
                opacity: [0.25, 0.55, 0.25],
              }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-tl from-indigo-500/30 via-sky-400/25 to-transparent blur-3xl"
            />
            {/* Emerald Jade Pigment Glow */}
            <motion.div
              animate={{
                scale: [0.9, 1.15, 1, 0.9],
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              className="absolute top-8 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400/25 via-teal-300/20 to-transparent blur-3xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            <div className="lg:col-span-8">
              {/* Badge & Atelier Pigments Palette */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-600 font-medium mb-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold">Salon No. IV</span>
                </div>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-700">Contemporary Masterworks</span>
                <span className="text-stone-300" aria-hidden="true">·</span>

                {/* Animated Palette Dots */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200/80 shadow-2xs">
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"
                    title="Venetian Gold"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs"
                    title="Crimson Carmine"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-xs"
                    title="Cobalt Ultramarine"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"
                    title="Veronese Emerald"
                  />
                  <span className="text-[10px] tracking-widest text-stone-500 font-sans ml-1">PALETTE</span>
                </div>
              </motion.div>

              {/* Animated Cinematic Word-by-Word Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-normal text-stone-900 tracking-[-0.015em] leading-[1.1] relative smooth-font"
                style={{ textWrap: 'balance' }}
              >
                <span className="inline-block overflow-hidden mr-2">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    Where
                  </motion.span>
                </span>
                <span className="inline-block overflow-hidden mr-2">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    Pure
                  </motion.span>
                </span>
                <span className="inline-block overflow-hidden mr-2">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.29, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    Form
                  </motion.span>
                </span>
                <span className="inline-block overflow-hidden mr-3">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    Meets
                  </motion.span>
                </span>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="bg-gradient-to-r from-amber-600 via-rose-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] bg-clip-text text-transparent font-medium italic drop-shadow-xs smooth-gradient-text"
                  >
                    Contemplative Silence.
                  </motion.span>
                </motion.span>
              </h1>

              {/* Shimmering Animated Chromatic Accent Ribbon */}
              <div className="relative mt-5">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{ originX: 0 }}
                  className="w-48 h-[3px] rounded-full bg-gradient-to-r from-amber-500 via-rose-500 via-purple-500 to-indigo-500 shadow-sm"
                />
                <motion.div
                  animate={{ x: [0, 170, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 w-8 h-[3px] bg-white/90 rounded-full blur-[1px] pointer-events-none"
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:pl-6 border-l-0 lg:border-l border-amber-200/60">
              <motion.p
                variants={itemVariants}
                className="text-stone-700 text-sm leading-relaxed mb-6 font-normal smooth-font"
              >
                Dhurva's Art Studio & Gallery curates singular, museum-pedigree artworks—from monumental textured oils on Belgian linen to hand-carved alabaster and patinated bronzes. Every acquisition includes verified provenance and insured white-glove courier delivery worldwide.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 text-xs tracking-wider uppercase font-medium"
              >
                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="#curated-works"
                  className="px-5 py-3.5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:from-amber-950 hover:via-stone-900 hover:to-amber-950 text-amber-50 transition-all rounded-md inline-flex items-center gap-2.5 shadow-md hover:shadow-lg hover:shadow-amber-950/20 cursor-pointer ring-1 ring-amber-400/25 animate-shimmer-sweep group"
                >
                  <span>View Collection</span>
                  <ArrowDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-1 transition-transform" />
                </motion.a>
                {spotlightArt && (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedArtwork(spotlightArt)}
                    className="px-4 py-3.5 border border-amber-300/80 hover:border-amber-500 bg-white/80 hover:bg-white text-stone-800 hover:text-amber-950 transition-all rounded-md inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:shadow-md hover:shadow-amber-500/15"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inspect Feature</span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase with Ambient Lighting, Floating Motion & Glass Sheen */}
        <motion.div
          variants={imageShowcaseVariants}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative rounded-lg overflow-hidden aspect-[16/9] max-h-[580px] w-full bg-stone-950 shadow-2xl border border-stone-800/80 group"
        >
          {/* Museum Vitrine Corner Framing Accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-300/70 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-300/70 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-300/70 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-300/70 z-20 pointer-events-none" />

          {/* Floating Live Gallery Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/75 backdrop-blur-md border border-white/20 text-white text-xs tracking-wider uppercase font-medium shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-sans text-stone-200">Main Exhibition Hall · Salon 2026</span>
          </div>

          <img
            src={HERO_IMAGE}
            alt="Dhurva's Art Studio and Gallery Main Exhibition Hall"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Measured Scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Exhibition Spotlight Beam Animation */}
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1/4 left-1/3 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.22)_0%,transparent_70%)] pointer-events-none blur-2xl z-10"
          />

          {/* Animated Gallery Glass Reflection / Light Sweep */}
          <motion.div
            animate={{
              x: ['-140%', '260%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-y-0 w-60 bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-25 pointer-events-none z-10"
          />

          {/* Foreground Exhibition Details Ribbon */}
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white z-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-200/90 font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
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
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-wider transition-all rounded-sm whitespace-nowrap hover:shadow-md"
              >
                Exhibition Notes
              </a>
              {spotlightArt && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedArtwork(spotlightArt)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-medium text-xs uppercase tracking-wider transition-all rounded-sm whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg hover:shadow-amber-500/25 animate-shimmer-sweep"
                >
                  Acquire Spotlight Piece
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Operational Institutional Ribbon with Staggered Entrance & Micro-Animations */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 font-sans"
        >
          <div className="flex items-center gap-2 hover:text-stone-900 transition-colors">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-semibold uppercase tracking-wider text-stone-800">Hours:</span>
            <span>Tuesday – Sunday 10:00 – 19:00</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2 hover:text-stone-900 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span className="font-semibold uppercase tracking-wider text-stone-800">Flagship:</span>
            <span>18 Place Vendôme, 75001 Paris</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2 hover:text-stone-900 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold uppercase tracking-wider text-stone-800">Assurance:</span>
            <span>Certified Provenance & Insured Art Freight</span>
          </div>
          <span className="hidden md:inline text-stone-300">·</span>
          <div className="flex items-center gap-2 hover:text-stone-900 transition-colors">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold uppercase tracking-wider text-stone-800">Advisory:</span>
            <span>Private Curatorial Concierge</span>
          </div>
        </motion.div>

        {/* Animated Museum Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 pt-6 border-t border-amber-200/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-3 bg-white/60 backdrop-blur-xs border border-stone-200/70 rounded-sm">
            <div className="text-2xl sm:text-3xl font-cormorant font-bold text-stone-900 smooth-font">
              <AnimatedCounter value={28} prefix="$" suffix="M+" duration={2} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-stone-500 mt-0.5">
              Curated Acquisitions
            </div>
          </div>

          <div className="p-3 bg-white/60 backdrop-blur-xs border border-stone-200/70 rounded-sm">
            <div className="text-2xl sm:text-3xl font-cormorant font-bold text-stone-900 smooth-font">
              <AnimatedCounter value={100} suffix="%" duration={1.6} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-stone-500 mt-0.5">
              Verified Provenance
            </div>
          </div>

          <div className="p-3 bg-white/60 backdrop-blur-xs border border-stone-200/70 rounded-sm">
            <div className="text-2xl sm:text-3xl font-cormorant font-bold text-stone-900 smooth-font">
              <AnimatedCounter value={4} duration={1.2} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-stone-500 mt-0.5">
              Studio Masters
            </div>
          </div>

          <div className="p-3 bg-white/60 backdrop-blur-xs border border-stone-200/70 rounded-sm">
            <div className="text-2xl sm:text-3xl font-cormorant font-bold text-stone-900 smooth-font">
              <AnimatedCounter value={45} suffix="+" duration={1.8} />
            </div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-stone-500 mt-0.5">
              Countries Delivered
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
