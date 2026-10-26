import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Lock, ShieldCheck, Menu, X, ArrowRight, Sparkles, MapPin, Clock, Calendar, Ticket } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    isAdminLoggedIn,
    setIsAdminAuthOpen,
    setIsAdminPanelOpen,
    currentPage,
    setCurrentPage,
  } = useGallery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Exhibitions', href: '#exhibitions' },
    { label: 'Collection & Masters', href: '#curated-works' },
    { label: 'Studio Masters', href: '#studio-artists' },
    { label: 'Programs & Talks', href: '#programs' },
    { label: 'Plan Your Visit', href: '#visit' },
  ];

  return (
    <>
      {/* KNMA Operational Announcement Ribbon */}
      <div className="bg-[#111827] text-white text-[11px] font-sans font-medium py-1.5 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-blue-600 text-[10px] font-bold uppercase tracking-wider text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Open Today
            </span>
            <span className="text-stone-300">
              New Delhi (Saket) & Noida · Open Tue–Sun 10:30 AM – 6:30 PM
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 text-[11px]">
            <span className="hidden md:inline font-semibold text-amber-400">
              Admission is Free for All Visitors
            </span>
            <span className="hidden md:inline text-stone-600">·</span>
            <a
              href="#visit"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#visit');
              }}
              className="text-stone-200 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <Ticket className="w-3 h-3 text-blue-400" />
              <span>Visitor Guidelines</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Museum Navigation Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200 py-0'
            : 'bg-white border-b border-stone-200 py-1'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 transition-all duration-200 ${isScrolled ? 'h-16' : 'h-18 sm:h-20'}`}>
          {/* Zone 1: KNMA Identity Wordmark */}
          <button
            onClick={() => setCurrentPage('home')}
            className="group flex items-center gap-3 text-left cursor-pointer shrink-0"
          >
            {/* Geometric Monogram Emblem */}
            <div className="w-10 h-10 bg-[#111827] text-white flex items-center justify-center font-bold text-base tracking-tighter rounded-xs group-hover:bg-blue-700 transition-colors shadow-xs">
              <span>KNMA</span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-stone-900 group-hover:text-blue-700 transition-colors">
                  Kiran Nadar Museum of Art
                </span>
              </div>
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                & Dhurva Contemporary Studio
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links with Simple Font */}
          <nav className="hidden xl:flex items-center gap-7 text-xs uppercase tracking-wider font-semibold text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="nav-link-animated text-stone-700 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            {/* Dedicated Showcase & Purchase Page Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage('showcase')}
              className={`px-3.5 py-1.5 rounded-xs transition-all flex items-center gap-1.5 cursor-pointer font-bold text-xs uppercase tracking-wider ${
                currentPage === 'showcase'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Showcase & Acquisitions</span>
            </motion.button>
          </nav>

          {/* Zone 3: Actions (Plan Visit + Cart + Curator Login + Mobile Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Plan Visit CTA on Desktop */}
            <a
              href="#visit"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#visit');
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 hover:text-white border border-blue-600 hover:bg-blue-700 rounded-xs transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Pavilions</span>
            </a>

            {/* Acquisitions Bag */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCartOpen(true)}
              aria-label="View Acquisitions Cart"
              className="relative flex items-center gap-2 px-3.5 py-2 bg-[#111827] hover:bg-blue-800 text-white rounded-xs text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Acquisitions</span>
              <span className="tabular-nums font-mono text-stone-300">
                ({totalCartCount})
              </span>
            </motion.button>

            {/* Discreet Admin Lock */}
            <button
              onClick={handleAdminClick}
              title={isAdminLoggedIn ? 'Open Curator Dashboard' : 'Curator Portal Access'}
              className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 bg-stone-50 rounded-xs transition-all cursor-pointer"
            >
              {isAdminLoggedIn ? (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-stone-500" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              className="xl:hidden p-2 text-stone-800 hover:bg-stone-100 rounded-xs transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden fixed top-[100px] inset-x-0 bg-white border-b border-stone-200 shadow-xl z-30 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-2">
                {/* Mobile Showcase & Purchase Highlight */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentPage('showcase');
                  }}
                  className="w-full text-left text-xs uppercase tracking-wider font-bold text-white bg-blue-700 hover:bg-blue-800 p-3 rounded-xs flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Showcase & Acquisitions Salon</span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-900 px-2 py-0.5 rounded-xs">
                    Shop
                  </span>
                </button>

                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-xs uppercase tracking-wider font-bold text-stone-800 hover:text-blue-700 py-3 border-b border-stone-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <button
                  onClick={handleAdminClick}
                  className="w-full py-2.5 px-4 bg-[#111827] text-white text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-2"
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
