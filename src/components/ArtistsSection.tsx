import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
  Check,
  MapPin,
  GraduationCap,
  Award,
  ChevronDown,
  X,
  Send,
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

  // Get all artworks by this active artist
  const artistArtworks = artworks.filter(
    (art) =>
      art.artistId === activeArtist.id ||
      art.artist.toLowerCase() === activeArtist.name.toLowerCase() ||
      art.artist.toLowerCase().includes(activeArtist.name.toLowerCase())
  );

  const handleSelectArtist = (artist: Artist) => {
    setActiveArtistId(artist.id);
    setCommissionSent(false);
    
    // Smooth scroll down slightly to ensure the artworks are directly visible in viewport
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
    <section id="studio-artists" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-b border-stone-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-stone-500 font-mono font-medium mb-2">
            <span>Studio Masters</span>
            <span aria-hidden="true">·</span>
            <span>Touch An Artist To Reveal Their Artworks</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight">
            Studio Artists & Their Creations
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Click on any artist below to see all their original paintings and sculptures displayed directly on this page for immediate acquisition.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-500 hidden sm:block text-right">
          <div>Dhurva's Art Studio & Gallery</div>
          <div className="text-stone-400">Inline Masterworks Catalog</div>
        </div>
      </div>

      {/* Artists Roster Cards - Touching selects and expands inline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-10">
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
              className={`group cursor-pointer rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 border text-left ${
                isSelected
                  ? 'border-stone-900 ring-2 ring-stone-900 bg-[#F5F2EB] shadow-md -translate-y-1'
                  : 'border-stone-200 hover:border-stone-400 bg-white hover:-translate-y-0.5'
              }`}
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                <img
                  src={artist.portrait}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {isDhurva && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] uppercase tracking-wider font-mono bg-stone-900 text-amber-300 px-2 py-0.5 font-bold flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>Founder</span>
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-stone-300 line-clamp-1">
                    {artist.origin}
                  </div>
                  <h3 className="text-sm font-serif font-bold text-white leading-tight">
                    {artist.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer with Selection Cue */}
              <div className="p-3 text-xs flex flex-col justify-between flex-1">
                <span className="text-[11px] text-stone-500 font-mono">
                  {artCount} Artwork{artCount === 1 ? '' : 's'}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider mt-2 flex items-center gap-1 ${
                    isSelected ? 'text-amber-800' : 'text-stone-700 group-hover:text-stone-900'
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

      {/* INLINE ARTWORKS SHOWCASE (Reveals right here on the same page when an artist is touched!) */}
      <div ref={portfolioRef} className="mt-14 scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArtist.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-[#F8F5EE] border border-stone-300/90 rounded-sm p-6 sm:p-10 shadow-xs"
          >
            {/* Active Artist Header Dossier */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-300/80">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-stone-400 shrink-0 shadow-sm">
                  <img
                    src={activeArtist.portrait}
                    alt={activeArtist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-mono">
                    <span>{activeArtist.origin}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeArtist.role}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
                    {activeArtist.name}'s Studio Collection
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-xl italic">
                    "{activeArtist.statement}"
                  </p>
                </div>
              </div>

              {/* Status and summary */}
              <div className="flex items-center gap-4 text-xs font-mono text-stone-600 self-start lg:self-center">
                <span className="px-3 py-1 bg-white border border-stone-300 rounded-sm font-semibold text-stone-900">
                  {artistArtworks.length} Original Works Available
                </span>
              </div>
            </div>

            {/* ARTWORKS GRID FOR PURCHASING */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm uppercase tracking-widest font-semibold text-stone-800 font-mono">
                  Available Masterpieces Ready for Acquisition:
                </h4>
                <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                  Includes White-Glove Insured Delivery & Certificate
                </span>
              </div>

              {artistArtworks.length === 0 ? (
                <div className="py-16 text-center bg-white/70 border border-stone-200 rounded-sm">
                  <p className="text-stone-600 font-serif text-base">
                    All current originals by {activeArtist.name} are currently housed in private collections.
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    You can request a bespoke dimensional studio commission below.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {artistArtworks.map((art) => {
                    const isSold = art.status === 'Sold';
                    const isReserved = art.status === 'Reserved';

                    return (
                      <div
                        key={art.id}
                        className="bg-white border border-stone-200/90 rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
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
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Status Tag */}
                          <div className="absolute top-2.5 left-2.5">
                            {isSold ? (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-stone-900 text-stone-200 font-semibold border border-stone-700">
                                Sold · Private Vault
                              </span>
                            ) : isReserved ? (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-50 text-amber-800 font-semibold border border-amber-300">
                                Under Reserve
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white/95 text-stone-800 font-semibold border border-stone-200">
                                Original Available
                              </span>
                            )}
                          </div>

                          {/* Hover Inspect Overlay */}
                          <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-white/95 text-stone-900 text-xs uppercase tracking-wider font-medium rounded-sm shadow-md flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect Specs</span>
                            </span>
                          </div>
                        </div>

                        {/* Metadata & Actions */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="text-[11px] font-mono text-stone-400 uppercase">
                              {art.year} · {art.category} · {art.dimensions}
                            </div>
                            <h5
                              onClick={() => setSelectedArtwork(art)}
                              className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors cursor-pointer mt-0.5"
                            >
                              {art.title}
                            </h5>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-2 italic">
                              {art.medium}
                            </p>
                          </div>

                          {/* Price & Immediate Purchase Buttons */}
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-base font-serif font-bold text-stone-900 tabular-nums">
                                ${art.price.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
                              </div>
                            </div>

                            {!isSold ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => handleQuickAdd(art, e)}
                                  title="Add to Acquisition Bag"
                                  className="p-2 border border-stone-300 hover:border-stone-900 text-stone-800 rounded-sm transition-colors cursor-pointer"
                                >
                                  {addedNoticeId === art.id ? (
                                    <Check className="w-4 h-4 text-emerald-700" />
                                  ) : (
                                    <ShoppingBag className="w-4 h-4" />
                                  )}
                                </button>

                                <button
                                  onClick={(e) => handleQuickBuy(art, e)}
                                  className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors shadow-xs cursor-pointer"
                                >
                                  Buy Now
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-stone-400 font-mono uppercase">
                                Archived
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

            {/* In-Line Bespoke Commission Accordion */}
            <div className="mt-12 pt-8 border-t border-stone-300/80">
              <div className="bg-white/80 border border-stone-300 rounded-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-mono font-semibold">
                      Private Commission
                    </span>
                    <h5 className="font-serif font-bold text-lg text-stone-900 mt-0.5">
                      Commission an Original Work by {activeArtist.name}
                    </h5>
                  </div>
                </div>

                {commissionSent ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Commission request transmitted. Our studio registrar will present your brief to {activeArtist.name} within 24 hours.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleCommissionSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={commissionForm.name}
                      onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                      className="p-2.5 bg-white border border-stone-300 rounded-sm focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address *"
                      value={commissionForm.email}
                      onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                      className="p-2.5 bg-white border border-stone-300 rounded-sm focus:border-stone-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Atelier Commission</span>
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
