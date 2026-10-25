import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    setIsCheckoutOpen,
  } = useGallery();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    return acc + (item.artwork.price + item.framing.price) * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#FBF9F5] border-l border-stone-300 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-100/70">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-stone-800" />
                <h3 className="text-sm font-serif uppercase tracking-widest text-stone-900 font-bold">
                  Acquisitions Bag ({cart.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 divide-y divide-stone-200">
              {cart.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-stone-500 font-serif text-base">Your acquisitions bag is empty.</p>
                  <p className="text-xs text-stone-400 mt-2">
                    Browse our gallery to discover unique paintings and sculptures.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider rounded-sm hover:bg-stone-800 transition-colors"
                  >
                    View Curated Works
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotal = (item.artwork.price + item.framing.price) * item.quantity;

                  return (
                    <div key={item.artwork.id} className="py-5 flex gap-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-stone-100 border border-stone-200 rounded-xs overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={item.artwork.image}
                          alt={item.artwork.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-[11px] font-sans uppercase tracking-widest text-stone-500 font-medium">
                                {item.artwork.artist}
                              </div>
                              <h4 className="text-sm font-serif font-semibold text-stone-900">
                                {item.artwork.title}
                              </h4>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.artwork.id)}
                              className="text-stone-400 hover:text-red-700 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-stone-500 mt-1">
                            <span>Frame: {item.framing.name}</span>
                            {item.framing.price > 0 && (
                              <span className="font-mono text-stone-700"> (+${item.framing.price})</span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-baseline mt-2">
                          <span className="text-xs text-stone-400 font-mono">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-serif font-bold text-stone-900 tabular-nums">
                            ${itemTotal.toLocaleString()} USD
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer with Subtotal & Proceed */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-stone-50/80 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums font-medium text-stone-900">
                      ${subtotal.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                      White-Glove Art Freight
                    </span>
                    <span className="font-mono text-emerald-800 font-medium">Complimentary</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                    <span>Total Estimated</span>
                    <span className="font-serif text-base tabular-nums font-bold">
                      ${subtotal.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to White-Glove Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  Includes museum provenance documentation & transit insurance
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
