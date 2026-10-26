import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  Compass,
  Check,
  CreditCard,
  Lock,
  ChevronDown,
  Layers,
  LayoutGrid,
  Maximize2,
  HelpCircle,
  Clock,
  Globe,
  FileText,
  PhoneCall
} from 'lucide-react';
import { Artwork, ArtworkCategory, FramingOption } from '../types';
import { FRAMING_OPTIONS } from '../data/artworks';
import { useGallery } from '../context/GalleryContext';

// Currencies and exchange rates relative to USD
const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  { code: 'INR', symbol: '₹', rate: 86.5, label: 'INR (₹)' },
  { code: 'CHF', symbol: 'CHF ', rate: 0.90, label: 'CHF (Fr)' },
  { code: 'JPY', symbol: '¥', rate: 155, label: 'JPY (¥)' },
];

export const ShowcasePurchasePage: React.FC = () => {
  const {
    artworks,
    artists,
    setCurrentPage,
    setSelectedArtwork,
    addToCart,
    startBuyNow,
    setIsRoomSimulatorOpen,
    setIsCartOpen,
  } = useGallery();

  // Search, filter, and sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory>('all');
  const [selectedArtistFilter, setSelectedArtistFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under25' | '25to60' | 'above60'>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'wall'>('grid');

  // Currency selection
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  // Per-artwork framing selection state: { [artworkId]: FramingOption }
  const [artworkFramingMap, setArtworkFramingMap] = useState<Record<string, FramingOption>>({});

  // Feedback states
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');

  // Helper to format currency
  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * selectedCurrency.rate;
    if (selectedCurrency.code === 'JPY') {
      return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Get active framing for an artwork
  const getFramingForArt = (artId: string): FramingOption => {
    return artworkFramingMap[artId] || FRAMING_OPTIONS[0];
  };

  const setFramingForArt = (artId: string, framing: FramingOption) => {
    setArtworkFramingMap((prev) => ({ ...prev, [artId]: framing }));
  };

  // Filter & sort artworks
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = art.title.toLowerCase().includes(q);
          const matchesArtist = art.artist.toLowerCase().includes(q);
          const matchesMedium = art.medium.toLowerCase().includes(q);
          const matchesDesc = art.description.toLowerCase().includes(q);
          if (!matchesTitle && !matchesArtist && !matchesMedium && !matchesDesc) {
            return false;
          }
        }
        // Category
        if (selectedCategory !== 'all' && art.category !== selectedCategory) {
          return false;
        }
        // Artist filter
        if (selectedArtistFilter !== 'all' && art.artist !== selectedArtistFilter) {
          return false;
        }
        // Price filter
        if (priceRange === 'under25' && art.price >= 25000) return false;
        if (priceRange === '25to60' && (art.price < 25000 || art.price > 60000)) return false;
        if (priceRange === 'above60' && art.price <= 60000) return false;
        // Availability
        if (onlyAvailable && art.status !== 'Available') return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        // Featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [artworks, searchQuery, selectedCategory, selectedArtistFilter, priceRange, onlyAvailable, sortBy]);

  // Handler for direct Buy Now
  const handleInstantBuy = (art: Artwork) => {
    const framing = getFramingForArt(art.id);
    startBuyNow(art, framing);
  };

  // Handler for Add to Cart
  const handleAddToCart = (art: Artwork) => {
    const framing = getFramingForArt(art.id);
    addToCart(art, framing, 1);
    setAddedNoticeId(art.id);
    setTimeout(() => {
      setAddedNoticeId((current) => (current === art.id ? null : current));
    }, 2400);
  };

  // Handler for Room Simulator
  const handleOpenRoomSimulator = (art: Artwork) => {
    setSelectedArtwork(art);
    setIsRoomSimulatorOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail || !inquiryName) return;
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] pb-24">
      {/* Top Banner Navigation: Back to Home & Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md sticky top-16 md:top-20 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/90 border border-stone-300/80 rounded-sm transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>Back to Exhibition Home</span>
            </motion.button>

            <span className="text-stone-300 hidden sm:inline">|</span>

            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="hover:text-stone-800 cursor-pointer" onClick={() => setCurrentPage('home')}>
                Dhurva's Studio
              </span>
              <span>/</span>
              <span className="text-amber-900 font-semibold tracking-wide uppercase">
                Showcase & Purchasing Salon
              </span>
            </div>
          </div>

          {/* Quick Currency Selector & Bag Shortcut */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 bg-white border border-stone-200 px-2.5 py-1 rounded-sm shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="uppercase text-[11px] font-sans tracking-wider text-stone-400">Currency:</span>
              <select
                value={selectedCurrency.code}
                onChange={(e) => {
                  const found = CURRENCIES.find((c) => c.code === e.target.value);
                  if (found) setSelectedCurrency(found);
                }}
                className="bg-transparent font-semibold text-stone-800 cursor-pointer focus:outline-hidden"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-amber-950 text-stone-100 rounded-sm text-xs font-medium transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Acquisitions</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Showcase Hero Section */}
      <section className="relative pt-12 pb-10 px-6 overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-amber-50/40 via-stone-50/60 to-transparent">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase font-semibold bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-2xs inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
              Collector Acquisitions Salon
            </span>
            <span className="text-xs text-stone-500 font-mono hidden md:inline">
              Direct Artist Studio Access • Worldwide Insured Transit
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-normal text-stone-900 tracking-tight leading-[1.08]">
                Masterworks Showcase & Purchasing
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                Discover singular original works available for private acquisition. Every masterwork includes an archival Certificate of Authenticity signed verso, bespoke conservation framing of your choice, and insured white-glove transport to your residence or institution.
              </p>
            </div>

            {/* Quick Collector Confidence Indicators */}
            <div className="lg:col-span-4 bg-white/80 backdrop-blur-sm border border-stone-200 p-4 rounded-md shadow-xs space-y-2.5 text-xs text-stone-700 font-sans">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span><strong>100% Provenance Guaranteed:</strong> Hand-signed certificates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span><strong>White-Glove Delivery:</strong> Climate-controlled courier & crating</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span><strong>Secure Acquisition:</strong> 256-bit encrypted bank wire & cards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Control Bar */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="bg-white border border-stone-200/90 rounded-lg p-4 sm:p-5 shadow-xs space-y-4">
          {/* Row 1: Search Bar & Primary Medium Tabs */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by artwork title, artist, or medium..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 focus:border-amber-500 rounded-sm bg-stone-50/60 focus:bg-white focus:outline-hidden transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Medium Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Mediums' },
                  { id: 'painting', label: 'Oil on Linen' },
                  { id: 'sculpture', label: 'Bronze & Stone' },
                  { id: 'limited-edition', label: 'Limited Archival' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer font-medium ${
                    selectedCategory === tab.id
                      ? 'bg-stone-900 text-amber-50 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 border border-stone-200 p-0.5 rounded-sm bg-stone-50 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                title="Salon Showcase Grid"
                className={`p-1.5 rounded-xs text-xs flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-2xs text-amber-900 font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('wall')}
                title="Cinema Exhibition Wall View"
                className={`p-1.5 rounded-xs text-xs flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'wall'
                    ? 'bg-white shadow-2xs text-amber-900 font-medium'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Exhibition Wall</span>
              </button>
            </div>
          </div>

          {/* Row 2: Secondary Filters (Artist, Price, Availability, Sort) */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Artist Filter Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400 font-mono text-[11px] uppercase tracking-wider">Artist:</span>
                <select
                  value={selectedArtistFilter}
                  onChange={(e) => setSelectedArtistFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 px-2 py-1 rounded-sm text-stone-700 cursor-pointer focus:outline-hidden"
                >
                  <option value="all">All Studio Artists</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.name}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Tier Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400 font-mono text-[11px] uppercase tracking-wider">Valuation:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 px-2 py-1 rounded-sm text-stone-700 cursor-pointer focus:outline-hidden"
                >
                  <option value="all">Any Price</option>
                  <option value="under25">Under $25,000</option>
                  <option value="25to60">$25,000 — $60,000</option>
                  <option value="above60">$60,000+</option>
                </select>
              </div>

              {/* Only Available Toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded-xs text-amber-700 focus:ring-amber-500 cursor-pointer"
                />
                <span>Available for Immediate Acquisition</span>
              </label>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 font-mono text-[11px] uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 px-2 py-1 rounded-sm text-stone-700 cursor-pointer focus:outline-hidden font-medium"
              >
                <option value="featured">Curator's Selection</option>
                <option value="price-asc">Valuation: Low to High</option>
                <option value="price-desc">Valuation: High to Low</option>
                <option value="year-desc">Year: Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filter Tags */}
        <div className="flex items-center justify-between mt-4 text-xs text-stone-500 font-mono">
          <div>
            Showing <strong className="text-stone-900">{filteredArtworks.length}</strong> masterworks ready for curation & purchase
          </div>
          {(searchQuery || selectedCategory !== 'all' || selectedArtistFilter !== 'all' || priceRange !== 'all' || onlyAvailable) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedArtistFilter('all');
                setPriceRange('all');
                setOnlyAvailable(false);
              }}
              className="text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </section>

      {/* Main Artworks Showcase & Purchase Section */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        {filteredArtworks.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-lg p-16 text-center space-y-4">
            <Compass className="w-10 h-10 text-stone-300 mx-auto stroke-[1.5]" />
            <h3 className="text-xl font-cormorant text-stone-800">No Masterworks Found Matching Filter Criteria</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Please adjust your search terms, select another medium category, or view all available pieces in Dhurva's curatorial vault.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedArtistFilter('all');
                setPriceRange('all');
                setOnlyAvailable(false);
              }}
              className="px-4 py-2 bg-stone-900 text-stone-100 text-xs uppercase tracking-wider rounded-sm font-medium hover:bg-amber-950 cursor-pointer"
            >
              View Full Studio Vault
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ======================================================================== */
          /* MODE 1: CURATORIAL SALON GRID                                            */
          /* ======================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((art) => {
              const activeFraming = getFramingForArt(art.id);
              const totalArtPrice = art.price + activeFraming.price;
              const isAvailable = art.status === 'Available';
              const isAdded = addedNoticeId === art.id;

              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-lg border border-stone-200/90 hover:border-amber-400/70 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Showcase Container */}
                  <div className="relative bg-[#F4F1EA] aspect-4/3 overflow-hidden cursor-pointer">
                    <img
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onClick={() => setSelectedArtwork(art)}
                    />

                    {/* Gradient Overlay for Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Status Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs backdrop-blur-md shadow-2xs ${
                          isAvailable
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : art.status === 'Reserved'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                            : 'bg-stone-950/85 text-stone-300 border border-stone-600/40'
                        }`}
                      >
                        {isAvailable ? 'Available for Acquisition' : art.status}
                      </span>
                    </div>

                    {/* Certificate Code Badge */}
                    <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-stone-200 bg-stone-900/80 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      #{art.certificateCode}
                    </div>

                    {/* Interactive Overlay Action Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtwork(art);
                        }}
                        className="flex-1 py-1.5 px-2.5 bg-white/95 hover:bg-white text-stone-900 text-[11px] font-medium uppercase tracking-wider rounded-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>Inspect Detail</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenRoomSimulator(art);
                        }}
                        className="py-1.5 px-2.5 bg-stone-900/95 hover:bg-stone-900 text-amber-200 text-[11px] font-medium uppercase tracking-wider rounded-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Simulate artwork scale in residential salon"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Room 3D</span>
                      </button>
                    </div>
                  </div>

                  {/* Artwork Curatorial Details Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Artist & Origin */}
                      <div className="flex items-baseline justify-between gap-2 text-xs text-stone-500">
                        <span className="uppercase tracking-[0.16em] font-medium text-amber-950 font-serif">
                          {art.artist}
                        </span>
                        <span className="font-mono text-[11px] text-stone-400">{art.year}</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedArtwork(art)}
                        className="text-xl font-cormorant font-medium text-stone-900 mt-1 cursor-pointer hover:text-amber-900 transition-colors leading-snug"
                      >
                        {art.title}
                      </h3>

                      {/* Specs */}
                      <div className="mt-2 text-xs text-stone-600 space-y-1">
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-stone-400">Medium:</span>
                          <span className="text-stone-700 text-right truncate max-w-[200px]">{art.medium}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-stone-400">Dimensions:</span>
                          <span className="text-stone-700">{art.dimensions}</span>
                        </div>
                      </div>

                      {/* Framing Quick Selector */}
                      {isAvailable && (
                        <div className="mt-3 pt-3 border-t border-stone-100">
                          <div className="flex items-center justify-between text-[11px] mb-1.5">
                            <span className="text-stone-500 uppercase tracking-wider font-mono font-medium">
                              Conservation Framing:
                            </span>
                            <span className="text-amber-900 font-mono font-semibold">
                              {activeFraming.price === 0 ? 'Included' : `+${formatPrice(activeFraming.price)}`}
                            </span>
                          </div>
                          <select
                            value={activeFraming.id}
                            onChange={(e) => {
                              const found = FRAMING_OPTIONS.find((f) => f.id === e.target.value);
                              if (found) setFramingForArt(art.id, found);
                            }}
                            className="w-full text-xs bg-stone-50 border border-stone-200 py-1.5 px-2 rounded-xs text-stone-800 cursor-pointer focus:outline-hidden hover:bg-stone-100/80 transition-colors"
                          >
                            {FRAMING_OPTIONS.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name} ({f.price === 0 ? 'Included' : `+${formatPrice(f.price)}`})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Purchasing Footer with Instant Acquisition Button */}
                    <div className="pt-3 border-t border-stone-200 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">
                            Acquisition Total
                          </span>
                          <span className="text-xl font-cormorant font-semibold text-stone-900">
                            {formatPrice(totalArtPrice)}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-mono">
                          Insured Delivery Incl.
                        </span>
                      </div>

                      {isAvailable ? (
                        <div className="grid grid-cols-2 gap-2">
                          {/* Direct Buy Now (Instant Checkout) */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInstantBuy(art)}
                            className="py-2.5 px-3 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:from-amber-950 hover:to-stone-900 text-stone-50 text-xs uppercase tracking-wider font-medium rounded-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-amber-400/20"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                            <span>Buy Now</span>
                          </motion.button>

                          {/* Add to Cart */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAddToCart(art)}
                            className={`py-2.5 px-3 border text-xs uppercase tracking-wider font-medium rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                                <span>Add to Bag</span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedArtwork(art)}
                          className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors text-center cursor-pointer"
                        >
                          Inquire on Secondary Acquisition
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* ======================================================================== */
          /* MODE 2: CINEMA EXHIBITION WALL VIEW                                      */
          /* ======================================================================== */
          <div className="space-y-12">
            {filteredArtworks.map((art, idx) => {
              const activeFraming = getFramingForArt(art.id);
              const totalArtPrice = art.price + activeFraming.price;
              const isAvailable = art.status === 'Available';
              const isAdded = addedNoticeId === art.id;

              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Left Column: Monumental High-Res View */}
                    <div className="lg:col-span-7 bg-[#1C1A19] relative flex items-center justify-center p-6 sm:p-10 min-h-[380px] sm:min-h-[480px]">
                      {/* Curatorial Spotlight Lighting Effect */}
                      <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-black/60 pointer-events-none" />

                      <img
                        src={art.image}
                        alt={art.title}
                        className="max-h-[440px] max-w-full object-contain shadow-2xl rounded-xs z-10 transition-transform duration-500 hover:scale-102 cursor-pointer"
                        onClick={() => setSelectedArtwork(art)}
                      />

                      {/* Bottom Image Bar: Room Simulator & High-Res Inspection */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 text-xs">
                        <span className="font-mono text-stone-400 text-[11px] bg-black/60 px-2.5 py-1 rounded-xs backdrop-blur-xs">
                          Scale Height: {art.scaleHeightCm} cm
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenRoomSimulator(art)}
                            className="px-3 py-1.5 bg-white/90 hover:bg-white text-stone-900 rounded-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                          >
                            <Compass className="w-3.5 h-3.5 text-amber-700" />
                            <span>Preview in Room</span>
                          </button>
                          <button
                            onClick={() => setSelectedArtwork(art)}
                            className="px-3 py-1.5 bg-amber-500/90 hover:bg-amber-400 text-stone-950 rounded-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Zoom</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Curatorial Dossier & Direct Acquisition Console */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FBF9F5]">
                      <div>
                        {/* Header Lockup */}
                        <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
                          <span className="text-xs uppercase tracking-[0.2em] text-amber-900 font-semibold font-serif">
                            {art.artist} • {art.artistOrigin}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {art.status}
                          </span>
                        </div>

                        <h2
                          onClick={() => setSelectedArtwork(art)}
                          className="text-2xl sm:text-3xl font-cormorant font-medium text-stone-900 mt-3 cursor-pointer hover:text-amber-950 transition-colors"
                        >
                          {art.title}, {art.year}
                        </h2>

                        <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                          {art.description}
                        </p>

                        {/* Specs Table */}
                        <dl className="mt-4 pt-3 border-t border-stone-200/80 text-xs space-y-1.5 font-mono">
                          <div className="flex justify-between">
                            <dt className="text-stone-400 uppercase">Medium</dt>
                            <dd className="text-stone-800 font-medium text-right">{art.medium}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-400 uppercase">Dimensions</dt>
                            <dd className="text-stone-800">{art.dimensions}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-400 uppercase">Provenance</dt>
                            <dd className="text-stone-800 italic text-right truncate max-w-[220px]">
                              {art.provenance}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-stone-400 uppercase">Certificate</dt>
                            <dd className="text-amber-900 font-semibold">#{art.certificateCode}</dd>
                          </div>
                        </dl>

                        {/* Bespoke Framing Selector */}
                        {isAvailable && (
                          <div className="mt-5 pt-4 border-t border-stone-200">
                            <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-500 font-semibold mb-2">
                              Bespoke Framing Atelier:
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {FRAMING_OPTIONS.map((f) => (
                                <button
                                  key={f.id}
                                  onClick={() => setFramingForArt(art.id, f)}
                                  className={`p-2 rounded-xs border text-left text-xs transition-all cursor-pointer ${
                                    activeFraming.id === f.id
                                      ? 'border-stone-900 bg-stone-100 font-medium text-stone-900 shadow-2xs'
                                      : 'border-stone-200 bg-white hover:border-stone-400 text-stone-600'
                                  }`}
                                >
                                  <div className="truncate font-semibold">{f.name}</div>
                                  <div className="text-[10px] text-stone-400 font-mono">
                                    {f.price === 0 ? 'Included' : `+${formatPrice(f.price)}`}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Purchasing Console */}
                      <div className="pt-4 border-t border-stone-200 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-mono text-stone-400 block">
                              Total Valuation
                            </span>
                            <span className="text-2xl sm:text-3xl font-cormorant font-semibold text-stone-900">
                              {formatPrice(totalArtPrice)}
                            </span>
                          </div>
                          <div className="text-right text-[11px] text-stone-500 font-mono">
                            Includes Custom Wooden Crate & Insurance
                          </div>
                        </div>

                        {isAvailable ? (
                          <div className="flex flex-col sm:flex-row gap-2.5">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleInstantBuy(art)}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:from-amber-950 hover:to-stone-900 text-amber-50 text-xs uppercase tracking-wider font-medium rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ring-1 ring-amber-400/25"
                            >
                              <CreditCard className="w-4 h-4 text-amber-400" />
                              <span>Instant Acquisition (Checkout)</span>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAddToCart(art)}
                              className={`py-3 px-4 border text-xs uppercase tracking-wider font-medium rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                  : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span>In Bag</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-4 h-4 text-stone-600" />
                                  <span>Add to Bag</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedArtwork(art)}
                            className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer text-center"
                          >
                            Private Viewing Inquiry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* Collector Advisory, Private Viewing & Custom Commissions Module */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-2xl p-8 sm:p-12 shadow-xl border border-stone-800 relative overflow-hidden">
          {/* Subtle gold decorative accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-amber-400 text-xs font-mono tracking-[0.2em] uppercase font-semibold">
                Private Advisory & Commissions
              </span>
              <h2 className="text-3xl sm:text-4xl font-cormorant font-normal leading-tight text-white">
                Seeking a Specific Format, Scale, or Archival Private Commission?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Our curatorial director collaborates directly with private collectors, family offices, and architectural estates to arrange bespoke commissions, secondary market acquisitions, and private salon appointments in Paris, Geneva, and New York.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Museum Appraisal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>48h Direct Advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Confidential Escrow</span>
                </div>
              </div>
            </div>

            {/* In-Page Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-stone-950/70 p-6 rounded-xl border border-stone-700/80 backdrop-blur-md">
              {inquirySubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/50">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-cormorant text-white">Advisory Request Received</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Our lead curatorial director will contact you via email within 24 hours regarding your acquisition inquiry.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="text-xs text-amber-400 underline font-mono cursor-pointer"
                  >
                    Submit another advisory note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <h3 className="text-base font-cormorant text-white tracking-wide">
                    Request Collector Dossier or Private Consultation
                  </h3>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Lord Harrington / Elena Dubois"
                      className="w-full bg-stone-900/80 border border-stone-700 text-stone-100 text-xs px-3 py-2 rounded-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="curator@residence.com"
                      className="w-full bg-stone-900/80 border border-stone-700 text-stone-100 text-xs px-3 py-2 rounded-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Acquisition Interest / Commission Notes
                    </label>
                    <textarea
                      rows={2}
                      value={inquiryNote}
                      onChange={(e) => setInquiryNote(e.target.value)}
                      placeholder="Specific artwork title, residential dimensions, or private salon viewing request..."
                      className="w-full bg-stone-900/80 border border-stone-700 text-stone-100 text-xs px-3 py-2 rounded-xs focus:border-amber-400 focus:outline-hidden resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-medium uppercase tracking-wider text-xs rounded-xs transition-all shadow-md cursor-pointer"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
