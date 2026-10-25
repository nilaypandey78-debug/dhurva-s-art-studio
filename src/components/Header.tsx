import React from 'react';
import { ShoppingBag, Lock, ShieldCheck } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    isAdminLoggedIn,
    setIsAdminAuthOpen,
    setIsAdminPanelOpen,
  } = useGallery();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <a
          href="#"
          className="group flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-serif tracking-[0.16em] uppercase text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          <span>Dhurva's Art Studio & Gallery</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-stone-600">
          <a
            href="#curated-works"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Curated Works
          </a>
          <a
            href="#studio-artists"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 text-stone-900 font-semibold"
          >
            Studio Artists
          </a>
          <a
            href="#exhibitions"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Exhibitions
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Provenance
          </a>
          <a
            href="#private-viewing"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Private Salon
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Cart + Discreet Curator Portal) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Discreet Admin Lock / Curator Access */}
          <button
            onClick={handleAdminClick}
            title={isAdminLoggedIn ? 'Open Curator Dashboard' : 'Curator Portal Access'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 border border-stone-200/80 hover:border-stone-400 rounded-sm transition-all whitespace-nowrap shrink-0"
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline font-medium text-amber-800">Curator Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Curator</span>
              </>
            )}
          </button>

          {/* Acquisition Bag / Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Acquisitions Cart"
            className="relative flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Acquisitions</span>
            <span className="tabular-nums font-mono text-stone-300">
              ({totalCartCount})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
