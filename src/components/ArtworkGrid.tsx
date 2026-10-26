import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, ShoppingBag, Check, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types';
import { useGallery } from '../context/GalleryContext';

export const ArtworkGrid: React.FC = () => {
  const { artworks, artists, setSelectedArtwork, addToCart, startBuyNow, setCurrentPage, setIsRoomSimulatorOpen } = useGallery();
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
    <section id="curated-works" className="py-16 lg:py-24 max-w-7xl mx-auto px-6 border-b border-stone-200 bg-white">
      {/* Section Header with Simple Clean Sans-Serif Font */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 font-bold mb-2">
            <span>KNMA Collection</span>
            <span className="text-stone-300">·</span>
            <span>Modern Masters & Studio Originals</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Permanent Collection & Acquisitions
          </h2>

          <p className="text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
            Every masterwork is a certified original accompanied by an archival certificate of authenticity, museum cataloguing, and white-glove transport.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Tabs */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xs border border-stone-200">
            {(['all', 'painting', 'sculpture'] as ArtworkCategory[]).map((cat) => {
              const label = cat === 'all' ? 'All Mediums' : cat === 'painting' ? 'Paintings' : 'Sculptures';
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer ${
                    isActive ? 'bg-[#111827] text-white shadow-2xs' : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs uppercase tracking-wider bg-white border border-stone-300 rounded-xs px-3 py-1.5 text-stone-800 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="featured">Curator's Selection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* Availability Toggle */}
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-bold border rounded-xs transition-all cursor-pointer ${
              onlyAvailable
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-stone-300 bg-white text-stone-600 hover:text-stone-900'
            }`}
          >
            {onlyAvailable ? 'Available Only' : 'All Works'}
          </button>
        </div>
      </div>

      {/* Artist Filter Bar */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-stone-400 font-mono mr-1">
          Artist:
        </span>
        <button
          onClick={() => setSelectedArtistFilter('all')}
          className={`px-3 py-1 text-xs rounded-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            selectedArtistFilter === 'all'
              ? 'bg-[#111827] text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          All Artists
        </button>
        {artists.map((artist) => (
          <button
            key={artist.id}
            onClick={() => setSelectedArtistFilter(artist.id)}
            className={`px-3 py-1 text-xs rounded-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedArtistFilter === artist.id
                ? 'bg-[#111827] text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {artist.name}
          </button>
        ))}
      </div>

      {/* Callout to Separate Dedicated Showcase & Purchase Page */}
      <div className="mt-8 mb-8 p-5 rounded-xs bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xs bg-blue-700 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">
              Looking for our Dedicated Showcase & Purchasing Salon?
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Access live multi-currency conversion (USD, INR ₹, EUR, GBP), bespoke framing ateliers, and instant checkout.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('showcase')}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
        >
          <span>Open Showcase & Purchasing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Artworks */}
      {filteredArtworks.length === 0 ? (
        <div className="py-16 text-center text-stone-500 font-sans text-sm">
          No masterworks found matching your selected criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredArtworks.map((art) => {
            const isSold = art.status === 'Sold';
            const isReserved = art.status === 'Reserved';

            return (
              <article
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                className="group cursor-pointer flex flex-col justify-between bg-white border border-stone-200 hover:border-blue-500 transition-all duration-300 rounded-xs overflow-hidden shadow-2xs hover:shadow-lg"
              >
                {/* Artwork Media Frame */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-104"
                    loading="lazy"
                  />

                  {/* Status Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider font-bold z-10">
                    {isSold ? (
                      <span className="text-stone-400 bg-stone-900 px-2 py-0.5">
                        Acquired · Private Vault
                      </span>
                    ) : isReserved ? (
                      <span className="text-amber-800 bg-amber-100 px-2 py-0.5 border border-amber-300">
                        Under Reserve
                      </span>
                    ) : (
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Available for Acquisition
                      </span>
                    )}
                  </div>

                  {/* Accession Number */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-stone-500 bg-white/90 px-1.5 py-0.5 rounded-xs border border-stone-200">
                    #{art.certificateCode}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtwork(art);
                      }}
                      className="px-3 py-1.5 bg-white text-stone-900 text-xs uppercase tracking-wider font-bold rounded-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-stone-100"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-700" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtwork(art);
                        setIsRoomSimulatorOpen(true);
                      }}
                      className="px-3 py-1.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-bold rounded-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-stone-800"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-400" />
                      <span>Room 3D</span>
                    </button>
                  </div>
                </div>

                {/* Metadata & Details with Clean Font */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                      <span className="text-stone-900 font-bold">{art.artist}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {art.medium}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        {art.dimensions}
                      </div>
                      <div className="text-base font-bold text-stone-900 tabular-nums">
                        ${art.price.toLocaleString()} <span className="text-[11px] font-sans text-stone-500">USD</span>
                      </div>
                    </div>

                    {!isSold ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleQuickAdd(art, e)}
                          title="Add to Acquisition Bag"
                          className="p-2 border border-stone-300 hover:border-blue-600 text-stone-800 rounded-xs transition-colors cursor-pointer"
                        >
                          {addedAnimationId === art.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => handleQuickBuy(art, e)}
                          className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shadow-xs cursor-pointer"
                        >
                          Acquire
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400 uppercase font-mono">
                        In Collection
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
