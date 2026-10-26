import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Package,
  Layers,
  BarChart3,
  Search,
  CheckCircle,
  Clock,
  Truck,
  Plus,
  LogOut,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  FileText,
  DollarSign,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { CustomerOrder, ArtworkStatus, Artwork } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    isAdminLoggedIn,
    logoutAdmin,
    orders,
    updateOrderStatus,
    artworks,
    updateArtworkStatus,
    updateArtworkPrice,
    addNewArtwork,
    resetAllData,
  } = useGallery();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'metrics'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForSlip, setSelectedOrderForSlip] = useState<CustomerOrder | null>(null);

  // New Artwork Form State
  const [isAddingArtwork, setIsAddingArtwork] = useState(false);
  const [newArt, setNewArt] = useState({
    title: '',
    artist: 'Dhurva',
    artistId: 'artist-dhurva',
    artistOrigin: '',
    year: 2026,
    medium: '',
    dimensions: '',
    price: 5000,
    category: 'painting' as 'painting' | 'sculpture' | 'limited-edition',
    image: '/src/assets/images/art_painting_solitude_1792846059367.jpg',
    exhibition: 'Spring Salon: New Horizons',
    provenance: 'Acquired directly from artist atelier',
    description: '',
    status: 'Available' as ArtworkStatus,
    scaleHeightCm: 120,
  });

  const isOpen = isAdminPanelOpen && isAdminLoggedIn;

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.phone.includes(orderSearch) ||
      ord.customer.city.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus =
      orderStatusFilter === 'all' || ord.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalArtworksSold = orders.reduce((sum, ord) => sum + ord.items.length, 0);
  const inTransitCount = orders.filter((ord) => ord.status === 'In Transit (Insured)').length;
  const processingCount = orders.filter((ord) => ord.status === 'Processing').length;

  const handleCreateArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArt.title || !newArt.artist) return;

    addNewArtwork(newArt);
    setIsAddingArtwork(false);
    setNewArt({
      title: '',
      artist: 'Dhurva',
      artistId: 'artist-dhurva',
      artistOrigin: '',
      year: 2026,
      medium: '',
      dimensions: '',
      price: 5000,
      category: 'painting',
      image: '/src/assets/images/art_painting_solitude_1792846059367.jpg',
      exhibition: 'Spring Salon: New Horizons',
      provenance: 'Acquired directly from artist atelier',
      description: '',
      status: 'Available',
      scaleHeightCm: 120,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md flex flex-col justify-start p-2 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-7xl mx-auto bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm flex flex-col min-h-[92vh] overflow-hidden"
          >
          {/* Top Admin Navigation Bar */}
          <div className="px-6 py-4 bg-stone-900 text-stone-100 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-amber-300/90 font-semibold">
                Curator Backstage
              </span>
              <span className="text-stone-600">|</span>
              <h2 className="text-sm font-serif tracking-wide text-white font-medium">
                Dhurva's Art Studio & Gallery Registrar & Acquisitions Control
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm flex items-center gap-1.5 transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-stone-100 text-stone-900 shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Customer Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm flex items-center gap-1.5 transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-stone-100 text-stone-900 shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Art Inventory ({artworks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm flex items-center gap-1.5 transition-colors ${
                  activeTab === 'metrics'
                    ? 'bg-stone-100 text-stone-900 shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Financials</span>
              </button>
            </div>

            {/* Logout and Exit */}
            <div className="flex items-center gap-2">
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Portal</span>
              </button>

              <button
                onClick={() => setIsAdminPanelOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-sm"
                title="Close and return to gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* TAB 1: CUSTOMER ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Client Orders & Acquisition Records
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Full collector records including contact numbers, shipping addresses, purchased artworks, and live courier status.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search collector, email, phone, city..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-white border border-stone-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-stone-900 w-64"
                    />
                  </div>

                  {/* Status Filter */}
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="py-1.5 px-3 bg-white border border-stone-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="Curated & Packaged">Curated & Packaged</option>
                    <option value="In Transit (Insured)">In Transit (Insured)</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="py-20 text-center text-stone-500">
                  <p className="font-serif text-base">No collector orders match your search.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-stone-300/90 rounded-sm shadow-xs overflow-hidden"
                    >
                      {/* Order Banner */}
                      <div className="px-6 py-3.5 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-stone-900 text-sm">
                            {order.orderNumber}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="font-medium text-stone-700">
                            {order.paymentMethod}
                          </span>
                        </div>

                        {/* Order Status Select */}
                        <div className="flex items-center gap-3">
                          <span className="text-stone-500 text-[11px] uppercase tracking-wider font-mono">
                            Status:
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as any)
                            }
                            className={`py-1 px-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider cursor-pointer border ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : order.status === 'In Transit (Insured)'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : order.status === 'Curated & Packaged'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-stone-200 text-stone-800 border-stone-300'
                            }`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Curated & Packaged">Curated & Packaged</option>
                            <option value="In Transit (Insured)">In Transit (Insured)</option>
                            <option value="Delivered">Delivered</option>
                          </select>

                          <button
                            onClick={() => setSelectedOrderForSlip(order)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 border border-stone-300 rounded-sm bg-white"
                            title="View / Print Archival Collector Slip"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* 2-Column Details: Collector & Delivery / Items & Pricing */}
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                        {/* Column 1: Comprehensive Client Info */}
                        <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-stone-200 lg:pr-6 pb-4 lg:pb-0">
                          <h4 className="text-[11px] uppercase tracking-widest text-stone-400 font-mono font-semibold">
                            Collector & Delivery Dossier
                          </h4>

                          <div className="space-y-2">
                            <div>
                              <div className="font-semibold text-stone-900 text-sm">
                                {order.customer.fullName}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-stone-600">
                              <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <a
                                href={`mailto:${order.customer.email}`}
                                className="underline hover:text-stone-900"
                              >
                                {order.customer.email}
                              </a>
                            </div>

                            <div className="flex items-center gap-2 text-stone-600">
                              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              <a
                                href={`tel:${order.customer.phone}`}
                                className="font-mono hover:text-stone-900"
                              >
                                {order.customer.phone}
                              </a>
                            </div>

                            <div className="flex items-start gap-2 text-stone-600 pt-1">
                              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                              <div>
                                <div>{order.customer.address}</div>
                                {order.customer.suite && <div>{order.customer.suite}</div>}
                                <div>
                                  {order.customer.city}, {order.customer.state}{' '}
                                  {order.customer.postalCode}
                                </div>
                                <div className="font-semibold text-stone-800">
                                  {order.customer.country}
                                </div>
                              </div>
                            </div>

                            {order.customer.deliveryInstructions && (
                              <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-[11px] text-stone-700 mt-2">
                                <span className="font-semibold text-stone-900 block mb-0.5">
                                  Special Courier Instructions:
                                </span>
                                {order.customer.deliveryInstructions}
                              </div>
                            )}

                            <div className="text-[11px] text-stone-500 font-mono pt-1">
                              Tracking ID: <span className="font-semibold text-stone-800">{order.courierTracking}</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Artworks & Financial breakdown */}
                        <div className="lg:col-span-7 space-y-4">
                          <h4 className="text-[11px] uppercase tracking-widest text-stone-400 font-mono font-semibold">
                            Acquired Artworks & Specs ({order.items.length})
                          </h4>

                          <div className="space-y-3">
                            {order.items.map((artItem, idx) => (
                              <div
                                key={idx}
                                className="p-3 bg-stone-50 border border-stone-200/90 rounded-sm flex items-center justify-between gap-4"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={artItem.image}
                                    alt={artItem.title}
                                    referrerPolicy="no-referrer"
                                    className="w-14 h-14 object-cover border border-stone-300 rounded-xs shrink-0"
                                  />
                                  <div>
                                    <div className="font-serif font-semibold text-stone-900 text-sm">
                                      {artItem.title}
                                    </div>
                                    <div className="text-[11px] text-stone-600">
                                      {artItem.artist} · {artItem.medium}
                                    </div>
                                    <div className="text-[10px] text-stone-400 font-mono">
                                      {artItem.dimensions} · Frame: {artItem.framingName}
                                    </div>
                                    <div className="text-[10px] text-stone-500 font-mono">
                                      Certificate: #{artItem.certificateCode}
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="font-serif font-bold text-stone-900 tabular-nums text-sm">
                                    ${(artItem.price + artItem.framingPrice).toLocaleString()}
                                  </div>
                                  <div className="text-[10px] text-stone-400 uppercase">
                                    Archival Spec
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Total & Payment Summary */}
                          <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                            <div className="text-stone-500 text-[11px]">
                              <span>Freight: {order.shippingOption.name}</span>
                              <span className="block font-mono text-stone-400">
                                Ref: {order.paymentReference}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] uppercase tracking-wider text-stone-500 block">
                                Total Settled
                              </span>
                              <span className="text-xl font-serif font-bold text-stone-900 tabular-nums">
                                ${order.totalAmount.toLocaleString()} USD
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARTWORK INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Art Collection & Vault Inventory
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Modify prices, toggle availability between Available, Reserved, or Sold, or register new masterworks into the public gallery.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingArtwork(!isAddingArtwork)}
                  className="px-4 py-2 bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs uppercase tracking-wider font-medium rounded-sm flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingArtwork ? 'Cancel Registration' : 'Register New Artwork'}</span>
                </button>
              </div>

              {/* Add New Artwork Form Drawer */}
              {isAddingArtwork && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleCreateArtwork}
                  className="p-6 bg-stone-100 border border-stone-300 rounded-sm space-y-4 text-xs"
                >
                  <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider">
                    New Masterwork Registration Dossier
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Artwork Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nocturne in Azure"
                        value={newArt.title}
                        onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Artist Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Lin / Hélène Vance"
                        value={newArt.artist}
                        onChange={(e) => setNewArt({ ...newArt, artist: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Artist Origin</label>
                      <input
                        type="text"
                        placeholder="e.g. Kyoto, Japan / Milan, Italy"
                        value={newArt.artistOrigin}
                        onChange={(e) => setNewArt({ ...newArt, artistOrigin: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Category</label>
                      <select
                        value={newArt.category}
                        onChange={(e) => setNewArt({ ...newArt, category: e.target.value as any })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm cursor-pointer"
                      >
                        <option value="painting">Painting</option>
                        <option value="sculpture">Sculpture</option>
                        <option value="limited-edition">Limited Edition</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Acquisition Price ($ USD) *</label>
                      <input
                        type="number"
                        required
                        value={newArt.price}
                        onChange={(e) => setNewArt({ ...newArt, price: Number(e.target.value) })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Year Created</label>
                      <input
                        type="number"
                        value={newArt.year}
                        onChange={(e) => setNewArt({ ...newArt, year: Number(e.target.value) })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Dimensions</label>
                      <input
                        type="text"
                        placeholder="120 × 90 cm"
                        value={newArt.dimensions}
                        onChange={(e) => setNewArt({ ...newArt, dimensions: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Medium & Support</label>
                      <input
                        type="text"
                        placeholder="Oil and marble dust on Belgian linen"
                        value={newArt.medium}
                        onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        value={newArt.image}
                        onChange={(e) => setNewArt({ ...newArt, image: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-sm font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Curatorial Description & Narrative</label>
                    <textarea
                      rows={2}
                      placeholder="Artistic concept, material dialogue, and aesthetic notes..."
                      value={newArt.description}
                      onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingArtwork(false)}
                      className="px-4 py-2 border border-stone-300 hover:bg-stone-200 rounded-sm text-stone-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-sm"
                    >
                      Publish to Gallery
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Artworks Table / Cards */}
              <div className="space-y-4">
                {artworks.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 bg-white border border-stone-200 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={art.image}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover border border-stone-200 rounded-xs shrink-0"
                      />
                      <div>
                        <div className="font-serif font-bold text-stone-900 text-sm">
                          {art.title}
                        </div>
                        <div className="text-stone-500">
                          {art.artist} · {art.year} · <span className="capitalize">{art.category}</span>
                        </div>
                        <div className="text-[11px] font-mono text-stone-400">
                          COA: {art.certificateCode} · {art.dimensions}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Price Editor */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-stone-400 font-mono">$</span>
                        <input
                          type="number"
                          value={art.price}
                          onChange={(e) =>
                            updateArtworkPrice(art.id, Number(e.target.value))
                          }
                          className="w-24 p-1.5 border border-stone-300 rounded-sm font-mono tabular-nums text-xs"
                        />
                      </div>

                      {/* Status Toggle */}
                      <select
                        value={art.status}
                        onChange={(e) =>
                          updateArtworkStatus(art.id, e.target.value as any)
                        }
                        className={`py-1.5 px-3 rounded-sm text-xs font-semibold uppercase tracking-wider cursor-pointer border ${
                          art.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : art.status === 'Reserved'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-stone-500 border-stone-300'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS & METRICS */}
          {activeTab === 'metrics' && (
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Gallery Performance & Collector Network
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Financial volume, acquisition trends, and private collector relationship records.
                </p>
              </div>

              {/* 4-KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white border border-stone-200 rounded-sm">
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                    Total Gross Acquisitions
                  </span>
                  <div className="text-3xl font-serif font-bold text-stone-900 mt-2 tabular-nums">
                    ${totalRevenue.toLocaleString()} <span className="text-xs font-sans text-stone-400">USD</span>
                  </div>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-sm">
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                    Artworks Transferred
                  </span>
                  <div className="text-3xl font-serif font-bold text-stone-900 mt-2 tabular-nums">
                    {totalArtworksSold}
                  </div>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-sm">
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                    In Transit (Insured)
                  </span>
                  <div className="text-3xl font-serif font-bold text-blue-900 mt-2 tabular-nums">
                    {inTransitCount}
                  </div>
                </div>

                <div className="p-6 bg-white border border-stone-200 rounded-sm">
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                    Pending Dispatch
                  </span>
                  <div className="text-3xl font-serif font-bold text-amber-800 mt-2 tabular-nums">
                    {processingCount}
                  </div>
                </div>
              </div>

              {/* Unique Collectors List */}
              <div className="bg-white border border-stone-200 rounded-sm p-6">
                <h4 className="text-sm font-serif font-bold text-stone-900 mb-4 uppercase tracking-wider">
                  Patron Registry (Registered Collectors)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider font-mono">
                        <th className="pb-3">Collector Name</th>
                        <th className="pb-3">Direct Phone</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Location</th>
                        <th className="pb-3">Acquisitions Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50">
                          <td className="py-3 font-semibold text-stone-900">
                            {ord.customer.fullName}
                          </td>
                          <td className="py-3 font-mono text-stone-600">
                            {ord.customer.phone}
                          </td>
                          <td className="py-3 text-stone-600">
                            {ord.customer.email}
                          </td>
                          <td className="py-3 text-stone-600">
                            {ord.customer.city}, {ord.customer.country}
                          </td>
                          <td className="py-3 font-mono font-medium text-stone-900">
                            {ord.items.length} works (${ord.totalAmount.toLocaleString()})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Reset to Factory Data */}
              <div className="p-6 bg-stone-100 border border-stone-200 rounded-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Reset Archival State
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Restore default seed artworks, default sample orders, and clear cart storage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Reset gallery orders and inventory to default archival state?')) {
                      resetAllData();
                    }
                  }}
                  className="px-4 py-2 border border-stone-300 hover:border-red-600 text-stone-700 hover:text-red-700 text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Factory Data</span>
                </button>
              </div>
            </div>
          )}

          {/* Modal / Slip for Single Order Print */}
          {selectedOrderForSlip && (
            <div className="fixed inset-0 z-60 bg-stone-950/80 flex items-center justify-center p-4">
              <div className="bg-white max-w-xl w-full p-8 rounded-sm shadow-2xl space-y-6 text-xs">
                <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                  <div>
                    <span className="font-mono text-stone-400 uppercase">Dhurva's Art Studio & Gallery</span>
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      Acquisition Manifest & Waybill
                    </h3>
                    <div className="font-mono text-stone-600">{selectedOrderForSlip.orderNumber}</div>
                  </div>
                  <button
                    onClick={() => setSelectedOrderForSlip(null)}
                    className="p-1 text-stone-400 hover:text-stone-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-stone-900">
                    Collector: {selectedOrderForSlip.customer.fullName}
                  </div>
                  <div>Telephone: {selectedOrderForSlip.customer.phone}</div>
                  <div>Email: {selectedOrderForSlip.customer.email}</div>
                  <div>
                    Delivery: {selectedOrderForSlip.customer.address}, {selectedOrderForSlip.customer.city},{' '}
                    {selectedOrderForSlip.customer.country}
                  </div>
                  {selectedOrderForSlip.customer.deliveryInstructions && (
                    <div className="p-2 bg-stone-50 border border-stone-200 italic">
                      Notes: {selectedOrderForSlip.customer.deliveryInstructions}
                    </div>
                  )}
                </div>

                <div className="border-t border-stone-200 pt-3">
                  <div className="font-semibold text-stone-900 mb-2">Registered Pieces:</div>
                  {selectedOrderForSlip.items.map((it, i) => (
                    <div key={i} className="flex justify-between py-1 font-mono">
                      <span>{it.title} ({it.artist})</span>
                      <span>${(it.price + it.framingPrice).toLocaleString()} USD</span>
                    </div>
                  ))}
                  <div className="border-t border-stone-200 pt-2 mt-2 flex justify-between font-bold text-stone-900">
                    <span>Total Settled:</span>
                    <span>${selectedOrderForSlip.totalAmount.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-stone-900 text-white rounded-sm hover:bg-stone-800"
                  >
                    Print Manifest
                  </button>
                  <button
                    onClick={() => setSelectedOrderForSlip(null)}
                    className="px-4 py-2 border border-stone-300 rounded-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};
