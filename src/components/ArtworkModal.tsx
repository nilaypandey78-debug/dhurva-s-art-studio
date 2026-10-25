import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut, ShoppingBag, Check, ShieldCheck, Maximize2, Compass } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { FRAMING_OPTIONS } from '../data/artworks';
import { FramingOption } from '../types';

export const ArtworkModal: React.FC = () => {
  const {
    selectedArtwork,
    setSelectedArtwork,
    addToCart,
    startBuyNow,
    setIsRoomSimulatorOpen,
  } = useGallery();

  const [selectedFraming, setSelectedFraming] = useState<FramingOption>(FRAMING_OPTIONS[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedArtwork) return null;

  const isSold = selectedArtwork.status === 'Sold';
  const totalPrice = selectedArtwork.price + selectedFraming.price;

  const handleAddToCart = () => {
    addToCart(selectedArtwork, selectedFraming);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    startBuyNow(selectedArtwork, selectedFraming);
  };

  const handleOpenRoomView = () => {
    setIsRoomSimulatorOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Accession Number & Close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#F5F2EB]/80 shrink-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-mono">
              <span>Accession:</span>
              <span className="font-semibold text-stone-800">{selectedArtwork.certificateCode}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600">{selectedArtwork.exhibition}</span>
            </div>

            <button
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close modal"
              className="p-1 text-stone-500 hover:text-stone-900 transition-colors rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Split 2-Column Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Left Column: Visual Gallery Viewer */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F3EFEA] flex flex-col items-center justify-between min-h-[420px] relative">
              {/* Scale Simulator & Zoom Controls */}
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <button
                  onClick={handleOpenRoomView}
                  className="px-3 py-1.5 bg-white/90 hover:bg-white text-stone-800 border border-stone-300 text-xs uppercase tracking-wider font-medium rounded-sm shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View in Gallery Room</span>
                </button>

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-3 py-1.5 bg-white/90 hover:bg-white text-stone-800 border border-stone-300 text-xs uppercase tracking-wider font-medium rounded-sm shadow-xs transition-colors flex items-center gap-1.5"
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span>{isZoomed ? 'Fit Frame' : 'High-Res Detail'}</span>
                </button>
              </div>

              {/* Artwork Display Container */}
              <div
                className={`relative w-full flex items-center justify-center transition-all duration-300 ${
                  isZoomed ? 'cursor-zoom-out overflow-auto p-0' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isZoomed ? 'scale-150 py-12' : 'scale-100 max-h-[460px]'
                  }`}
                >
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[460px] object-contain shadow-lg rounded-xs"
                  />
                </div>
              </div>

              {/* Figure Caption Underneath */}
              <div className="w-full text-center mt-4">
                <p className="text-xs font-serif italic text-stone-500">
                  Fig. 1 — {selectedArtwork.title}, {selectedArtwork.year}. {selectedArtwork.medium}.
                </p>
              </div>
            </div>

            {/* Right Column: Curatorial Dossier & Purchase Module */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FBF9F5]">
              <div>
                {/* Artist & Title Lockup */}
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedArtwork(null);
                      const el = document.getElementById('studio-artists');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-stone-900 hover:underline font-semibold text-stone-700 cursor-pointer"
                    title={`View artist studio and original artworks`}
                  >
                    {selectedArtwork.artist}
                  </button>
                  <span>({selectedArtwork.artistOrigin})</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1 leading-snug">
                  {selectedArtwork.title}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <div className="text-2xl font-serif text-stone-900 tabular-nums font-semibold">
                    ${totalPrice.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
                  </div>
                  {selectedFraming.price > 0 && (
                    <span className="text-xs text-stone-500 font-mono">
                      (Includes ${selectedFraming.price} custom frame)
                    </span>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="mt-2 text-xs font-sans">
                  {isSold ? (
                    <span className="text-stone-500 italic">
                      Private Collector Archive · Inquiries Welcome
                    </span>
                  ) : (
                    <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Original Available for Immediate Acquisition
                    </span>
                  )}
                </div>

                {/* Curatorial Essay Excerpt */}
                <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                  {selectedArtwork.description}
                </p>

                {/* Accession Metadata List */}
                <dl className="mt-6 pt-4 border-t border-stone-200 text-xs divide-y divide-stone-200/70">
                  <div className="py-2 flex justify-between gap-4">
                    <dt className="text-stone-500 uppercase tracking-wider font-mono">Medium</dt>
                    <dd className="text-stone-800 text-right font-medium">{selectedArtwork.medium}</dd>
                  </div>
                  <div className="py-2 flex justify-between gap-4">
                    <dt className="text-stone-500 uppercase tracking-wider font-mono">Dimensions</dt>
                    <dd className="text-stone-800 text-right font-mono">{selectedArtwork.dimensions}</dd>
                  </div>
                  <div className="py-2 flex justify-between gap-4">
                    <dt className="text-stone-500 uppercase tracking-wider font-mono">Provenance</dt>
                    <dd className="text-stone-800 text-right italic">{selectedArtwork.provenance}</dd>
                  </div>
                  <div className="py-2 flex justify-between gap-4">
                    <dt className="text-stone-500 uppercase tracking-wider font-mono">Authenticity</dt>
                    <dd className="text-stone-800 text-right font-mono">
                      Signed verso + Dhurva's Art Studio Certificate #{selectedArtwork.certificateCode}
                    </dd>
                  </div>
                </dl>

                {/* Framing Options Selector */}
                {!isSold && (
                  <div className="mt-6">
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Conservation Framing Selection:
                    </label>
                    <div className="space-y-2">
                      {FRAMING_OPTIONS.map((frame) => (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFraming(frame)}
                          className={`w-full text-left p-3 rounded-sm border text-xs transition-all ${
                            selectedFraming.id === frame.id
                              ? 'border-stone-900 bg-stone-100 shadow-xs'
                              : 'border-stone-200 bg-white hover:border-stone-400'
                          }`}
                        >
                          <div className="flex justify-between items-center font-medium text-stone-900">
                            <span>{frame.name}</span>
                            <span className="font-mono tabular-nums">
                              {frame.price === 0 ? 'Included' : `+$${frame.price}`}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{frame.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                {!isSold ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-3 px-4 border border-stone-900 text-stone-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm flex items-center justify-center gap-2"
                      >
                        {addedNotice ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-700" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleBuyNow}
                        className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm shadow-sm"
                      >
                        Acquire Now
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-[11px] text-stone-500">
                        Insured climate-controlled courier shipping included · 14-day archival inspection guarantee
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-stone-100 border border-stone-200 rounded-sm text-center">
                    <p className="text-xs text-stone-600 font-serif">
                      This piece is currently housed in a private collection.
                    </p>
                    <button
                      onClick={() => setSelectedArtwork(null)}
                      className="mt-2 text-xs uppercase tracking-wider text-stone-900 underline font-medium"
                    >
                      Browse Available Paintings & Sculptures
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
