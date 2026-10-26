import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  Check,
  Send,
  Award,
} from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { Artist, Artwork } from '../types';

export const ArtistsSection: React.FC = () => {
  const { artists, artworks, setSelectedArtwork, addToCart, startBuyNow } = useGallery();
  
  // Track currently expanded artist for the inline showcase (defaults to Dhurva)
  const [activeArtistId, setActiveArtistId] = useState<string>('artist-dhurva');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);
  const [commissionForm, setCommissionForm] = useState({
    name: '',
    email: '',
    notes: '',
  });
  const [commissionSent, setCommissionSent] = useState(false);

  const portfolioRef = useRef<HTMLDivElement>(null);

  const activeArtist = artists.find((a) => a.id === activeArtistId) || artists[0];

  const artistArtworks = artworks.filter(
    (art) =>
      art.artistId === activeArtist.id ||
      art.artist.toLowerCase() === activeArtist.name.toLowerCase() ||
      art.artist.toLowerCase().includes(activeArtist.name.toLowerCase())
  );

  const handleSelectArtist = (artist: Artist) => {
    setActiveArtistId(artist.id);
    setCommissionSent(false);
    
    setTimeout(() => {
      if (portfolioRef.current) {
        portfolioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleQuickAdd = (art: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(art);
    setAddedNoticeId(art.id);
    setTimeout(() => setAddedNoticeId(null), 1500);
  };

  const handleQuickBuy = (art: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    startBuyNow(art);
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commissionForm.name || !commissionForm.email) return;
    setCommissionSent(true);
  };

  return (
    <section id="studio-artists" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-b border-stone-200 bg-white">
      {/* Header with Simple Clean Sans-Serif Font */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 font-bold mb-2">
            <span>KNMA Artists & Atelier</span>
            <span className="text-stone-300">·</span>
            <span>Select An Artist To View Masterworks</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Featured Studio Masters
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Click on any artist roster card below to inspect their studio catalogue and original works available for private curation.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-500 hidden sm:block text-right">
          <div>KNMA & Dhurva Studio</div>
          <div className="text-stone-400">Curated Masterworks Roster</div>
        </div>
      </div>

      {/* Artists Roster Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
        {artists.map((artist) => {
          const isSelected = artist.id === activeArtistId;
          const isDhurva = artist.id === 'artist-dhurva';
          const artCount = artworks.filter(
            (a) =>
              a.artistId === artist.id ||
              a.artist.toLowerCase() === artist.name.toLowerCase() ||
              a.artist.toLowerCase().includes(artist.name.toLowerCase())
          ).length;

          return (
            <div
              key={artist.id}
              onClick={() => handleSelectArtist(artist)}
              className={`group cursor-pointer rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-200 border text-left ${
                isSelected
                  ? 'border-blue-700 ring-2 ring-blue-600/30 bg-blue-50/40 shadow-md'
                  : 'border-stone-200 hover:border-stone-400 bg-white hover:shadow-xs'
              }`}
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {isDhurva && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-700 text-white px-2 py-0.5 rounded-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Founder</span>
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-stone-300">
                    {artist.origin}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {artist.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 text-xs flex flex-col justify-between flex-1">
                <span className="text-[11px] text-stone-500 font-mono">
                  {artCount} Artwork{artCount === 1 ? '' : 's'}
                </span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider mt-2 flex items-center gap-1 transition-colors ${
                    isSelected ? 'text-blue-700' : 'text-stone-700 group-hover:text-blue-700'
                  }`}
                >
                  <span>{isSelected ? 'Viewing Art' : 'Show Art'}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Artworks Showcase */}
      <div ref={portfolioRef} className="mt-12 scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArtist.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAFAFA] border border-stone-200 rounded-xs p-6 sm:p-10 shadow-xs"
          >
            {/* Active Artist Header Dossier */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xs overflow-hidden border border-stone-300 shrink-0">
                  <img
                    src={activeArtist.portrait}
                    alt={activeArtist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-bold">
                    <span>{activeArtist.origin}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeArtist.role}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                    {activeArtist.name}'s Studio Collection
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-xl">
                    "{activeArtist.statement}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
                <span className="px-3 py-1.5 bg-white border border-stone-300 rounded-xs font-bold text-stone-900">
                  {artistArtworks.length} Works in Atelier
                </span>
              </div>
            </div>

            {/* Artworks Grid */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
                  Original Works Available for Acquisition:
                </h4>
                <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                  Includes Museum Conservation Packaging & Certificate
                </span>
              </div>

              {artistArtworks.length === 0 ? (
                <div className="py-12 text-center bg-white border border-stone-200 rounded-xs">
                  <p className="text-stone-600 text-sm">
                    All current originals by {activeArtist.name} are housed in private collections.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artistArtworks.map((art) => {
                    const isSold = art.status === 'Sold';
                    const isReserved = art.status === 'Reserved';

                    return (
                      <div
                        key={art.id}
                        className="bg-white border border-stone-200 hover:border-blue-500 rounded-xs overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
                      >
                        {/* Artwork Image */}
                        <div
                          onClick={() => setSelectedArtwork(art)}
                          className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer flex items-center justify-center p-4"
                        >
                          <img
                            src={art.image}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-104"
                          />

                          {/* Status Tag */}
                          <div className="absolute top-2.5 left-2.5">
                            {isSold ? (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-stone-900 text-stone-200 font-bold">
                                In Vault
                              </span>
                            ) : isReserved ? (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-100 text-amber-800 font-bold">
                                Reserved
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
                                Available
                              </span>
                            )}
                          </div>

                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-white text-stone-900 text-xs uppercase tracking-wider font-bold rounded-xs shadow-md flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-blue-700" />
                              <span>Inspect</span>
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="text-[11px] font-mono text-stone-500 uppercase font-semibold">
                              {art.year} · {art.category} · {art.dimensions}
                            </div>
                            <h5
                              onClick={() => setSelectedArtwork(art)}
                              className="font-bold text-stone-900 text-lg group-hover:text-blue-700 transition-colors cursor-pointer mt-0.5"
                            >
                              {art.title}
                            </h5>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                              {art.medium}
                            </p>
                          </div>

                          {/* Price & Immediate Purchase Buttons */}
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-base font-bold text-stone-900 tabular-nums">
                                ${art.price.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
                              </div>
                            </div>

                            {!isSold ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handleQuickAdd(art, e)}
                                  title="Add to Acquisition Bag"
                                  className="p-2 border border-stone-300 hover:border-blue-600 text-stone-800 rounded-xs transition-colors cursor-pointer"
                                >
                                  {addedNoticeId === art.id ? (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <ShoppingBag className="w-4 h-4" />
                                  )}
                                </button>

                                <button
                                  onClick={(e) => handleQuickBuy(art, e)}
                                  className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shadow-xs cursor-pointer"
                                >
                                  Buy Now
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-stone-400 font-mono uppercase">
                                In Vault
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bespoke Commission Form */}
            <div className="mt-10 pt-6 border-t border-stone-200">
              <div className="bg-white border border-stone-200 rounded-xs p-6">
                <span className="text-xs uppercase tracking-wider text-blue-700 font-mono font-bold">
                  Curatorial Commission
                </span>
                <h5 className="font-bold text-lg text-stone-900 mt-0.5">
                  Commission an Original Work by {activeArtist.name}
                </h5>

                {commissionSent ? (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Commission request transmitted. The KNMA curatorial office will coordinate with {activeArtist.name}.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleCommissionSubmit} className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={commissionForm.name}
                      onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                      className="p-2.5 bg-stone-50 border border-stone-200 rounded-xs focus:border-blue-600 focus:outline-hidden transition-all"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address *"
                      value={commissionForm.email}
                      onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                      className="p-2.5 bg-stone-50 border border-stone-200 rounded-xs focus:border-blue-600 focus:outline-hidden transition-all"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 bg-[#111827] hover:bg-blue-700 text-white font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Commission</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
