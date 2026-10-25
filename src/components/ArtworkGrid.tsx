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
    <section id="curated-works" className="py-16 lg:py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Section Header with smooth entrance */}
      <motion.div
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200"
      >
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-600/70 animate-pulse" />
            <span>Catalogue Raisonné</span>
            <span aria-hidden="true">·</span>
            <span>Current Acquisitions</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight">
            Original Paintings & Sculptures
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-xl">
            Each artwork is a certified original accompanied by an archival certificate of authenticity, direct artist provenance, and museum conservation packaging.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-sm">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-all ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setActiveCategory('painting')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-all ${
                activeCategory === 'painting'
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Paintings
            </button>
            <button
              onClick={() => setActiveCategory('sculpture')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-all ${
                activeCategory === 'sculpture'
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sculptures
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs uppercase tracking-wider bg-white border border-stone-300 rounded-sm px-3 py-1.5 text-stone-700 hover:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
          >
            <option value="featured">Curatorial Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Availability Toggle */}
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider border rounded-sm transition-colors ${
              onlyAvailable
                ? 'border-stone-900 bg-stone-900 text-stone-50'
                : 'border-stone-300 text-stone-600 hover:text-stone-900'
            }`}
          >
            {onlyAvailable ? 'Showing Available Only' : 'Available Only'}
          </button>
        </div>
      </motion.div>

      {/* Quick Artist Select Bar with smooth animated entrance */}
      <motion.div
        variants={filterBarVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="mt-6 pt-4 border-t border-stone-200/60 flex flex-wrap items-center gap-2"
      >
        <span className="text-xs uppercase tracking-wider text-stone-500 font-mono mr-1">
          Artist:
        </span>
        <button
          onClick={() => setSelectedArtistFilter('all')}
          className={`px-3 py-1 text-xs rounded-sm font-medium uppercase tracking-wider transition-colors ${
            selectedArtistFilter === 'all'
              ? 'bg-stone-900 text-stone-50'
              : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
          }`}
        >
          All Studio Masters
        </button>
        {artists.map((artist) => (
          <button
            key={artist.id}
            onClick={() => setSelectedArtistFilter(artist.id)}
            className={`px-3 py-1 text-xs rounded-sm font-medium uppercase tracking-wider transition-colors ${
              selectedArtistFilter === artist.id
                ? 'bg-stone-900 text-stone-50'
                : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
            }`}
          >
            {artist.name}
          </button>
        ))}
        {selectedArtistFilter !== 'all' && (
          <button
            onClick={() => setSelectedArtistFilter('all')}
            className="text-xs text-stone-500 hover:text-stone-900 underline font-mono ml-2"
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
                  whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const } }}
                  onClick={() => setSelectedArtwork(art)}
                  className="group cursor-pointer flex flex-col justify-between bg-[#FDFCFA] border border-stone-200/90 hover:border-stone-400/90 transition-shadow duration-500 rounded-sm overflow-hidden shadow-xs hover:shadow-xl relative"
                >
                  {/* Artwork Media Frame with smooth image reveal */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden flex items-center justify-center p-4">
                    <motion.img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Curatorial Status Ribbon (Text only, zero pill cliches) */}
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
                    <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 p-4 backdrop-blur-[1.5px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtwork(art);
                        }}
                        className="px-3.5 py-2 bg-white text-stone-900 text-xs uppercase tracking-wider font-medium hover:bg-stone-100 transition-all shadow-md rounded-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      {!isSold && (
                        <button
                          onClick={(e) => handleQuickBuy(art, e)}
                          className="px-3.5 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition-all shadow-md rounded-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>
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
                          className="hover:text-stone-900 hover:underline transition-colors text-stone-800 font-semibold cursor-pointer"
                          title={`Show only artworks by ${art.artist}`}
                        >
                          {art.artist}
                        </button>
                        <span aria-hidden="true">·</span>
                        <span>{art.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{art.category}</span>
                      </div>

                      <h3 className="text-xl font-serif text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
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
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleQuickAdd(art, e)}
                            title="Add to Acquisition Cart"
                            className="p-2 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-900 rounded-sm transition-colors"
                          >
                            {addedAnimationId === art.id ? (
                              <Check className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => handleQuickBuy(art, e)}
                            className="px-3 py-2 bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors whitespace-nowrap"
                          >
                            Acquire
                          </button>
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
