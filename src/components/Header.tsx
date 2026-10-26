import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Lock, ShieldCheck, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    isAdminLoggedIn,
    setIsAdminAuthOpen,
    setIsAdminPanelOpen,
  } = useGallery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Monitor scroll depth for dynamic navbar elevation and blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const navLinks = [
    { label: 'Curated Works', href: '#curated-works' },
    { label: 'Studio Artists', href: '#studio-artists' },
    { label: 'Exhibitions', href: '#exhibitions' },
    { label: 'Provenance', href: '#craftsmanship' },
    { label: 'Private Salon', href: '#private-viewing' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(28,25,23,0.06)] border-b border-stone-200/90 py-0'
            : 'bg-[#FBF9F5]/85 backdrop-blur-sm border-b border-stone-200/60 py-1'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 transition-all duration-300 ${isScrolled ? 'h-16 md:h-18' : 'h-18 md:h-20'}`}>
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-base sm:text-lg md:text-xl font-cormorant tracking-[0.18em] uppercase text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-900 transition-colors smooth-font"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500/80 group-hover:scale-125 transition-transform" />
            <span className="font-semibold">Dhurva's Art Studio & Gallery</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links with animated underline */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-animated text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Cart + Discreet Curator Portal + Mobile Hamburger) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Discreet Admin Lock / Curator Access */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdminClick}
              title={isAdminLoggedIn ? 'Open Curator Dashboard' : 'Curator Portal Access'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-amber-400/80 bg-white/70 hover:bg-white rounded-sm transition-all whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span className="hidden sm:inline font-medium text-amber-800">Curator Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden sm:inline">Curator</span>
                </>
              )}
            </motion.button>

            {/* Acquisition Bag / Cart with scale pop animation */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              aria-label="View Acquisitions Cart"
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:from-amber-950 hover:to-stone-900 text-stone-50 rounded-sm text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap shrink-0 shadow-sm cursor-pointer ring-1 ring-amber-400/20"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Acquisitions</span>
              <motion.span
                key={totalCartCount}
                initial={{ scale: 1.4, color: '#FCD34D' }}
                animate={{ scale: 1, color: '#D6D3D1' }}
                transition={{ duration: 0.3 }}
                className="tabular-nums font-mono text-stone-300"
              >
                ({totalCartCount})
              </motion.span>
            </motion.button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-sm transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[64px] inset-x-0 bg-[#FBF9F5]/98 backdrop-blur-lg border-b border-stone-300 shadow-xl z-30 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest font-medium text-stone-800 hover:text-amber-800 py-2 border-b border-stone-200/60 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </motion.a>
                ))}
              </nav>

              <div className="pt-3 flex items-center justify-between gap-4">
                <button
                  onClick={handleAdminClick}
                  className="w-full py-2.5 px-4 bg-stone-900 text-stone-100 text-xs uppercase tracking-wider font-medium rounded-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Curator Management Portal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
