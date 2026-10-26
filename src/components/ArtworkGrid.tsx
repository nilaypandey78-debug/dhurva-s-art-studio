import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, ShoppingBag, Check, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types';
import { useGallery } from '../context/GalleryContext';

// Museum-grade animation variants for smooth artwork entry
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const filterBarVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const artworkCardVariants = {
  hidden: {
    opacity: 0,
    y: 38,
    scale: 0.96,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 20,
    filter: 'blur(3px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ArtworkGrid: React.FC = () => {
  const { artworks, artists, setSelectedArtwork, addToCart, startBuyNow } = useGallery();
  const [activeCategory, setActiveCategory] = useState<ArtworkCategory>('all');
  const [selectedArtistFilter, setSelectedArtistFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        if (activeCategory !== 'all' && art.category !== activeCategory) {
          return false;
        }
        if (selectedArtistFilter !== 'all') {
          if (
            art.artistId !== selectedArtistFilter &&
            !art.artist.toLowerCase().includes(selectedArtistFilter.toLowerCase())
          ) {
            return false;
          }
        }
        if (onlyAvailable && art.status !== 'Available') {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [artworks, activeCategory, selectedArtistFilter, onlyAvailable, sortBy]);

  const handleQuickAdd = (art: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(art);
    setAddedAnimationId(art.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const handleQuickBuy = (art: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    startBuyNow(art);
  };

  return (
    <section id="curated-works" className="relative py-16 lg:py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Animated Artistic Color Pigment Halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Amber Gold Pigment Glow */}
        <motion.div
          animate={{
            scale: [1, 1.22, 0.96, 1],
            x: [0, 25, -20, 0],
            y: [0, -15, 10, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400/35 via-yellow-300/20 to-transparent blur-3xl"
        />
        {/* Cobalt Ultramarine Pigment Glow */}
        <motion.div
          animate={{
            scale: [0.95, 1.2, 1, 0.95],
            x: [0, -20, 25, 0],
            y: [0, 20, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-400/20 to-transparent blur-3xl"
        />
        {/* Carmine Rose Pigment Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            x: [0, 15, -25, 0],
            y: [0, -18, 15, 0],
            opacity: [0.2, 0.38, 0.2],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tl from-rose-500/25 via-pink-400/15 to-transparent blur-3xl"
        />
        {/* Emerald Jade Pigment Glow */}
        <motion.div
          animate={{
            scale: [0.9, 1.18, 0.9],
            opacity: [0.18, 0.38, 0.18],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400/20 via-teal-300/15 to-transparent blur-3xl"
        />
      </div>

      {/* Section Header with smooth entrance & rich colors */}
      <motion.div
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-amber-200/60"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-stone-600 font-medium mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">Catalogue Raisonné</span>
            </div>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="text-stone-700">Current Acquisitions</span>
            <span className="text-stone-300" aria-hidden="true">·</span>

            {/* Atelier Pigment Dots */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200/80 shadow-2xs">
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full bg-amber-500 shadow-xs"
                title="Venetian Gold"
              />
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-rose-500 shadow-xs"
                title="Crimson Carmine"
              />
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="w-2 h-2 rounded-full bg-indigo-600 shadow-xs"
                title="Cobalt Ultramarine"
              />
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs"
                title="Veronese Emerald"
              />
              <span className="text-[10px] tracking-widest text-stone-500 font-sans ml-0.5">CURATED</span>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight">
            Original{' '}
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="bg-gradient-to-r from-amber-600 via-rose-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] bg-clip-text text-transparent font-medium italic drop-shadow-xs"
            >
              Paintings & Sculptures
            </motion.span>
          </h2>

          {/* Shimmering Animated Chromatic Accent Ribbon */}
          <div className="relative mt-3 mb-2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ originX: 0 }}
              className="w-44 h-[2.5px] rounded-full bg-gradient-to-r from-amber-500 via-rose-500 via-purple-500 to-indigo-500 shadow-sm"
            />
            <motion.div
              animate={{ x: [0, 160, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-8 h-[2.5px] bg-white/90 rounded-full blur-[1px] pointer-events-none"
            />
          </div>

          <p className="text-sm text-stone-600 mt-2 max-w-xl">
            Each artwork is a certified original accompanied by an archival certificate of authenticity, direct artist provenance, and museum conservation packaging.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs with smooth active animations */}
          <div className="flex items-center p-1 bg-stone-200/80 rounded-sm border border-stone-300/60 relative">
            {(['all', 'painting', 'sculpture'] as ArtworkCategory[]).map((cat) => {
              const label = cat === 'all' ? 'All Works' : cat === 'painting' ? 'Paintings' : 'Sculptures';
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors z-10 cursor-pointer ${
                    isActive ? 'text-amber-100 font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-sm shadow-sm ring-1 ring-amber-400/25 -z-10"
                    />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs uppercase tracking-wider bg-white/90 border border-amber-300/70 hover:border-amber-500 rounded-sm px-3 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer shadow-2xs transition-colors"
          >
            <option value="featured">Curatorial Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Availability Toggle */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider border rounded-sm transition-all shadow-2xs cursor-pointer ${
              onlyAvailable
                ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold ring-1 ring-amber-400/40'
                : 'border-stone-300 bg-white/80 text-stone-600 hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {onlyAvailable ? 'Showing Available Only' : 'Available Only'}
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Artist Select Bar with smooth animated entrance */}
      <motion.div
        variants={filterBarVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="mt-6 pt-4 border-t border-amber-200/50 flex flex-wrap items-center gap-2"
      >
        <span className="text-xs uppercase tracking-wider text-stone-500 font-mono mr-1">
          Artist:
        </span>
        <button
          onClick={() => setSelectedArtistFilter('all')}
          className={`px-3 py-1.5 text-xs rounded-sm font-medium uppercase tracking-wider transition-all cursor-pointer ${
            selectedArtistFilter === 'all'
              ? 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 ring-1 ring-amber-400/30 shadow-xs'
              : 'bg-white/80 border border-stone-200/90 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-900'
          }`}
        >
          All Studio Masters
        </button>
        {artists.map((artist) => (
          <button
            key={artist.id}
            onClick={() => setSelectedArtistFilter(artist.id)}
            className={`px-3 py-1.5 text-xs rounded-sm font-medium uppercase tracking-wider transition-all cursor-pointer ${
              selectedArtistFilter === artist.id
                ? 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 ring-1 ring-amber-400/30 shadow-xs'
                : 'bg-white/80 border border-stone-200/90 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-900'
            }`}
          >
            {artist.name}
          </button>
        ))}
        {selectedArtistFilter !== 'all' && (
          <button
            onClick={() => setSelectedArtistFilter('all')}
            className="text-xs text-amber-800 hover:text-amber-950 underline font-mono ml-2 cursor-pointer font-medium"
          >
            Show All Artists
          </button>
        )}
      </motion.div>

      {/* Grid of Artworks */}
      {filteredArtworks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-24 text-center"
        >
          <p className="text-stone-500 font-serif text-lg">No artworks match your selected criteria.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedArtistFilter('all');
              setOnlyAvailable(false);
            }}
            className="mt-4 px-4 py-2 border border-stone-400 text-xs uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-colors rounded-sm"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art) => {
              const isSold = art.status === 'Sold';
              const isReserved = art.status === 'Reserved';

              return (
                <motion.article
                  key={art.id}
                  layout
                  variants={artworkCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }}
                  onClick={() => setSelectedArtwork(art)}
                  className="group cursor-pointer flex flex-col justify-between bg-[#FDFCFA] border border-stone-200/90 hover:border-amber-400/80 transition-all duration-500 rounded-sm overflow-hidden shadow-xs hover:shadow-[0_20px_50px_rgba(217,119,6,0.14)] relative"
                >
                  {/* Artwork Media Frame with smooth image reveal */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden flex items-center justify-center p-4">
                    <motion.img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />

                    {/* Curatorial Status Ribbon */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest z-10">
                      {isSold ? (
                        <span className="text-stone-500 bg-white/95 px-2.5 py-1 border border-stone-300 font-medium shadow-xs">
                          Acquired · Private Collection
                        </span>
                      ) : isReserved ? (
                        <span className="text-amber-800 bg-amber-50/95 px-2.5 py-1 border border-amber-300/80 font-medium shadow-xs">
                          Under Reserve
                        </span>
                      ) : (
                        <span className="text-stone-700 bg-white/95 px-2.5 py-1 border border-stone-200 font-medium shadow-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
                          Original Available
                        </span>
                      )}
                    </div>

                    {/* Subtle art shadow floor reflection */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-stone-900/5 to-transparent pointer-events-none" />

                    {/* Hover Quick Actions Overlay with fluid fade & slide */}
                    <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2.5 p-4 backdrop-blur-[1.5px]">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtwork(art);
                        }}
                        className="px-3.5 py-2 bg-white text-stone-900 text-xs uppercase tracking-wider font-medium hover:bg-amber-50 transition-all shadow-md rounded-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-600" />
                        <span>Inspect</span>
                      </motion.button>

                      {!isSold && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleQuickBuy(art, e)}
                          className="px-3.5 py-2 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 hover:from-amber-900 hover:to-stone-900 text-amber-50 text-xs uppercase tracking-wider font-medium transition-all shadow-md rounded-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 ring-1 ring-amber-400/30 animate-shimmer-sweep cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                          <span>Buy Now</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Metadata & Details */}
                  <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-medium mb-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArtistFilter(art.artistId || art.artist);
                          }}
                          className="hover:text-amber-800 hover:underline transition-colors text-stone-800 font-semibold cursor-pointer"
                          title={`Show only artworks by ${art.artist}`}
                        >
                          {art.artist}
                        </button>
                        <span aria-hidden="true">·</span>
                        <span>{art.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{art.category}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-cormorant text-stone-900 group-hover:text-amber-950 transition-colors leading-snug smooth-font font-medium">
                        {art.title}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1 line-clamp-1 italic">
                        {art.medium}
                      </p>
                    </div>

                    {/* Dimensions, Price & Acquisition CTA */}
                    <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-stone-400 font-mono tracking-tight">
                          {art.dimensions}
                        </div>
                        <div className="text-lg font-serif font-medium text-stone-900 tabular-nums">
                          ${art.price.toLocaleString()} <span className="text-xs font-sans text-stone-500 uppercase">USD</span>
                        </div>
                      </div>

                      {!isSold ? (
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => handleQuickAdd(art, e)}
                            title="Add to Acquisition Cart"
                            className="p-2 border border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50/50 text-stone-800 hover:text-amber-950 rounded-sm transition-all cursor-pointer"
                          >
                            {addedAnimationId === art.id ? (
                              <Check className="w-4 h-4 text-emerald-700 animate-bounce" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => handleQuickBuy(art, e)}
                            className="px-3.5 py-2 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:from-amber-950 hover:to-stone-900 text-amber-50 text-xs uppercase tracking-wider font-medium rounded-sm transition-all whitespace-nowrap shadow-xs hover:shadow-md ring-1 ring-amber-400/20 cursor-pointer"
                          >
                            Acquire
                          </motion.button>
                        </div>
                      ) : (
                        <span className="text-xs text-stone-400 uppercase tracking-wider font-mono">
                          Archived
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};
