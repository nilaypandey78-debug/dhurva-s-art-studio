import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const RoomScaleSimulator: React.FC = () => {
  const {
    isRoomSimulatorOpen,
    setIsRoomSimulatorOpen,
    selectedArtwork,
    addToCart,
    startBuyNow,
  } = useGallery();

  const [wallColor, setWallColor] = useState<'alabaster' | 'limestone' | 'charcoal'>('limestone');

  if (!isRoomSimulatorOpen || !selectedArtwork) return null;

  const isSold = selectedArtwork.status === 'Sold';

  const wallBgClasses = {
    alabaster: 'bg-[#F7F5F0]',
    limestone: 'bg-[#EAE4DC]',
    charcoal: 'bg-[#262423] text-stone-100',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-5xl bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm overflow-hidden flex flex-col"
        >
          {/* Header Controls */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-100">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">
                Architectural Scale Simulation
              </span>
              <h3 className="text-sm font-serif font-bold text-stone-900">
                {selectedArtwork.title} — {selectedArtwork.dimensions}
              </h3>
            </div>

            {/* Wall Tone Toggles */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-mono hidden sm:inline">
                Wall Tone:
              </span>
              <button
                onClick={() => setWallColor('limestone')}
                className={`px-2.5 py-1 text-xs rounded-sm border ${
                  wallColor === 'limestone'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700'
                }`}
              >
                Limestone
              </button>
              <button
                onClick={() => setWallColor('alabaster')}
                className={`px-2.5 py-1 text-xs rounded-sm border ${
                  wallColor === 'alabaster'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700'
                }`}
              >
                Alabaster
              </button>
              <button
                onClick={() => setWallColor('charcoal')}
                className={`px-2.5 py-1 text-xs rounded-sm border ${
                  wallColor === 'charcoal'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-300 bg-white text-stone-700'
                }`}
              >
                Charcoal
              </button>

              <button
                onClick={() => setIsRoomSimulatorOpen(false)}
                className="ml-3 p-1 text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Virtual Wall Simulator Stage */}
          <div
            className={`relative w-full h-[460px] ${wallBgClasses[wallColor]} transition-colors duration-500 flex flex-col items-center justify-between p-8 overflow-hidden`}
          >
            {/* Ambient Ceiling Spotlight Effect */}
            <div className="absolute top-0 inset-x-1/4 h-64 bg-gradient-to-b from-white/30 to-transparent blur-2xl pointer-events-none" />

            {/* Scale Height Reference Line */}
            <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest uppercase opacity-60">
              Gallery Standard Ceiling: 3.8m · Eye-level datum: 155cm
            </div>

            {/* Artwork Rendered to Scale */}
            <div className="flex-1 flex items-center justify-center relative z-10 w-full pt-4">
              <div
                className="relative shadow-2xl transition-all duration-300 max-h-[280px]"
                style={{
                  height: selectedArtwork.category === 'painting' ? '250px' : '220px',
                }}
              >
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  referrerPolicy="no-referrer"
                  className="h-full object-contain filter drop-shadow-2xl"
                />

                {/* Minimalist gallery accent light glow */}
                <div className="absolute -inset-1 bg-amber-500/10 blur-md -z-10 rounded-xs" />
              </div>
            </div>

            {/* Minimalist Floor & Architecture Interior Silhouette */}
            <div className="w-full relative z-10 flex flex-col items-center">
              {/* Minimalist Scandinavian Oak Bench / Plinth */}
              <div className="w-80 h-10 border-t border-stone-400/40 bg-stone-300/40 backdrop-blur-xs flex items-center justify-center text-[10px] uppercase font-mono tracking-widest text-stone-600/80">
                Gallery Travertine Bench (210 cm)
              </div>

              {/* Floor Surface Divider */}
              <div className="w-full h-8 border-t border-stone-400/30 bg-stone-400/20" />
            </div>
          </div>

          {/* Footer Bar with Scale Specs and Direct Checkout */}
          <div className="p-5 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
              <span>{selectedArtwork.dimensions}</span>
              <span>·</span>
              <span className="font-serif font-bold text-stone-900 text-sm">
                ${selectedArtwork.price.toLocaleString()} USD
              </span>
              <span>·</span>
              <span className="capitalize">{selectedArtwork.medium}</span>
            </div>

            {!isSold && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedArtwork);
                    setIsRoomSimulatorOpen(false);
                  }}
                  className="px-4 py-2 border border-stone-800 text-stone-900 hover:bg-stone-100 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => {
                    setIsRoomSimulatorOpen(false);
                    startBuyNow(selectedArtwork);
                  }}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
                >
                  Acquire Now
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
