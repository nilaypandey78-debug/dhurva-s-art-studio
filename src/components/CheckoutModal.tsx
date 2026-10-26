import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CreditCard, Building2, Lock, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { CustomerDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    buyNowItem,
    isBuyNowMode,
    createOrder,
  } = useGallery();

  // Active items being acquired
  const checkoutItems = isBuyNowMode && buyNowItem ? [buyNowItem] : cart;

  // Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    suite: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    deliveryInstructions: '',
  });

  const [shippingOption, setShippingOption] = useState<{
    name: string;
    price: number;
    description: string;
  }>({
    name: 'White-Glove Climate Controlled Art Freight',
    price: 0,
    description: 'Suspension-cushioned vehicle, temperature monitored & professional uncrating.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isOpenAndValid = isCheckoutOpen && checkoutItems.length > 0;

  const subtotal = checkoutItems.reduce((acc, item) => {
    return acc + (item.artwork.price + item.framing.price) * item.quantity;
  }, 0);

  const totalAmount = subtotal + shippingOption.price;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form validation
    if (!customer.fullName.trim()) {
      setErrorMessage('Please provide collector full name.');
      return;
    }
    if (!customer.email.trim() || !customer.email.includes('@')) {
      setErrorMessage('Please provide a valid email for provenance documents.');
      return;
    }
    if (!customer.phone.trim()) {
      setErrorMessage('Please provide a telephone number for courier scheduling.');
      return;
    }
    if (!customer.address.trim() || !customer.city.trim() || !customer.postalCode.trim()) {
      setErrorMessage('Please provide a complete physical delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = checkoutItems.map((item) => ({
        artworkId: item.artwork.id,
        title: item.artwork.title,
        artist: item.artwork.artist,
        price: item.artwork.price,
        framingName: item.framing.name,
        framingPrice: item.framing.price,
        image: item.artwork.image,
        medium: item.artwork.medium,
        dimensions: item.artwork.dimensions,
        certificateCode: item.artwork.certificateCode,
      }));

      const paymentReference =
        paymentMethod === 'card'
          ? `AUTH-COL-${Math.floor(100000 + Math.random() * 900000)}`
          : `WIRE-ESC-${Math.floor(100000 + Math.random() * 900000)}`;

      createOrder({
        customer,
        items: orderItems,
        subtotal,
        shippingOption,
        totalAmount,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Collector Platinum / Visa'
            : 'Bank Wire / Curatorial Escrow',
        paymentReference,
        status: 'Processing',
        courierTracking: `ARTLOG-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      });

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpenAndValid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-200 bg-stone-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-serif uppercase tracking-widest text-stone-900 font-bold">
                  Archival Acquisition Checkout
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

          {/* Form and Summary Container */}
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Left Column: Customer & Delivery Info */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px] font-mono">1</span>
                  Collector Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Full Name / Entity *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Croft / Croft Trust"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="collector@example.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <span className="text-[10px] text-stone-400">For Certificate of Authenticity</span>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Direct Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <span className="text-[10px] text-stone-400">For courier appointment</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px] font-mono">2</span>
                  White-Glove Delivery Destination
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 740 Park Avenue"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-stone-600 font-medium mb-1">Apt / Suite / Salon</label>
                      <input
                        type="text"
                        placeholder="Penthouse A"
                        value={customer.suite}
                        onChange={(e) => setCustomer({ ...customer, suite: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="New York"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Postal Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="10021"
                        value={customer.postalCode}
                        onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">State / Province</label>
                      <input
                        type="text"
                        placeholder="NY"
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Country</label>
                      <select
                        value={customer.country}
                        onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">
                      Courier Instructions (Gate access, floor elevator, uncrating preferences)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please notify private security at gate; service lift is available on north side."
                      value={customer.deliveryInstructions}
                      onChange={(e) => setCustomer({ ...customer, deliveryInstructions: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Transit & Packaging Selection */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-700" />
                  White-Glove Art Transit Options
                </h3>
                <div className="space-y-2 text-xs">
                  <label
                    className={`block p-3 border rounded-sm cursor-pointer transition-colors ${
                      shippingOption.price === 0
                        ? 'border-stone-900 bg-stone-100/90'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption.price === 0}
                          onChange={() =>
                            setShippingOption({
                              name: 'White-Glove Climate Controlled Art Freight',
                              price: 0,
                              description: 'Climate monitored, shock-isolated vehicle & museum delivery.',
                            })
                          }
                          className="accent-stone-900"
                        />
                        <span className="font-semibold text-stone-900">White-Glove Climate Art Courier</span>
                      </div>
                      <span className="font-mono text-emerald-800 font-medium">Complimentary</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 pl-5">
                      Fully insured, climate controlled with 2-person archival placement.
                    </p>
                  </label>

                  <label
                    className={`block p-3 border rounded-sm cursor-pointer transition-colors ${
                      shippingOption.price === 250
                        ? 'border-stone-900 bg-stone-100/90'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption.price === 250}
                          onChange={() =>
                            setShippingOption({
                              name: 'Armored Vault Courier & Custom Timber Crate',
                              price: 250,
                              description: 'Fumigated export-grade timber crate with security seal and armed escort.',
                            })
                          }
                          className="accent-stone-900"
                        />
                        <span className="font-semibold text-stone-900">Armored Transit & Custom Timber Crate</span>
                      </div>
                      <span className="font-mono text-stone-900">+$250 USD</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 pl-5">
                      Fumigated museum-grade timber crating with tamper-evident digital seal.
                    </p>
                  </label>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-700" />
                  Acquisition Settlement
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-sm flex items-center justify-center gap-2 font-medium ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / Amex Centurion</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 border rounded-sm flex items-center justify-center gap-2 font-medium ${
                      paymentMethod === 'wire'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Escrow / Wire</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-3 bg-white p-4 border border-stone-200 rounded-sm text-xs">
                    <div>
                      <label className="block text-stone-500 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-500 mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-500 mb-1">Security CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-stone-100 border border-stone-200 rounded-sm text-xs text-stone-700 space-y-1">
                    <p className="font-semibold text-stone-900">Curatorial Wire Escrow Instructions:</p>
                    <p>Upon submission, your artwork will be immediately reserved under lock.</p>
                    <p className="font-mono text-[11px] text-stone-600">
                      IBAN: CH93 0076 2011 6238 5290 · SWIFT: ELPAGB2L
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Review */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F5F2EB]/90 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-4">
                  Acquisition Summary ({checkoutItems.length})
                </h3>

                {/* Items preview */}
                <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2 divide-y divide-stone-200">
                  {checkoutItems.map((item) => (
                    <div key={item.artwork.id} className="pt-3 first:pt-0 flex gap-3 text-xs">
                      <img
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover border border-stone-200 rounded-xs shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-stone-900">{item.artwork.title}</div>
                        <div className="text-[11px] text-stone-500">{item.artwork.artist}</div>
                        <div className="text-[11px] text-stone-400 font-mono">
                          Frame: {item.framing.name}
                        </div>
                        <div className="text-stone-900 font-bold font-mono mt-1 tabular-nums">
                          ${(item.artwork.price + item.framing.price).toLocaleString()} USD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="mt-6 pt-4 border-t border-stone-300 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Artwork Total</span>
                    <span className="font-mono tabular-nums">${subtotal.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Transit & Insurance</span>
                    <span className="font-mono">
                      {shippingOption.price === 0 ? 'Complimentary' : `$${shippingOption.price} USD`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Certificate of Authenticity</span>
                    <span className="font-mono text-emerald-800">Included</span>
                  </div>
                  <div className="pt-3 border-t border-stone-300 flex justify-between text-base font-bold text-stone-950">
                    <span>Total Investment</span>
                    <span className="font-serif text-lg tabular-nums">
                      ${totalAmount.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-sm">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-600 text-stone-50 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Securing Archival Acquisition...</span>
                  ) : (
                    <>
                      <span>Confirm & Acquire Masterpiece</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>256-Bit Encrypted Curatorial Escrow Settlement</span>
                </div>
              </div>
            </div>
          </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
