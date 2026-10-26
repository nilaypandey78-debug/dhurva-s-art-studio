import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Printer, X, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setIsAdminPanelOpen, isAdminLoggedIn } = useGallery();

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {confirmedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setConfirmedOrder(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm overflow-hidden flex flex-col"
          >
          {/* Top Banner */}
          <div className="p-6 bg-stone-900 text-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-stone-400 font-mono">
                  Acquisition Confirmed
                </span>
                <h3 className="text-lg font-serif tracking-wide">
                  Order #{confirmedOrder.orderNumber}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="text-stone-400 hover:text-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Receipt Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            {/* Note to Collector */}
            <div className="border-b border-stone-200 pb-4">
              <p className="text-sm font-serif text-stone-800 leading-relaxed">
                Thank you, <strong className="font-semibold">{confirmedOrder.customer.fullName}</strong>. Your acquisition has been officially registered in the Dhurva's Art Studio and Gallery Archives. An accession portfolio and Certificate of Authenticity have been dispatched to{' '}
                <span className="font-mono text-xs font-semibold">{confirmedOrder.customer.email}</span>.
              </p>
            </div>

            {/* Courier Dispatch Summary */}
            <div className="p-4 bg-stone-100/90 border border-stone-200 rounded-sm text-xs space-y-1">
              <div className="flex justify-between items-center font-medium text-stone-900">
                <span className="uppercase tracking-wider font-mono">White-Glove Courier Logistics:</span>
                <span className="font-mono text-emerald-800">Assigned</span>
              </div>
              <p className="text-stone-600">
                Tracking Dossier: <span className="font-mono font-semibold">{confirmedOrder.courierTracking}</span>
              </p>
              <p className="text-stone-600">
                Destination: {confirmedOrder.customer.address}, {confirmedOrder.customer.city},{' '}
                {confirmedOrder.customer.country}
              </p>
              <p className="text-stone-500 italic">
                Contact: {confirmedOrder.customer.phone} · Delivery Method: {confirmedOrder.shippingOption.name}
              </p>
            </div>

            {/* Acquired Artworks List */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-600 mb-3">
                Registered Artworks:
              </h4>
              <div className="space-y-3">
                {confirmedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-stone-200 rounded-sm flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover border border-stone-200 rounded-xs"
                      />
                      <div>
                        <div className="font-medium text-stone-900">{item.title}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.artist} · {item.medium}
                        </div>
                        <div className="text-[10px] font-mono text-stone-400">
                          COA: {item.certificateCode} · Frame: {item.framingName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-serif font-bold text-stone-900 tabular-nums">
                      ${(item.price + item.framingPrice).toLocaleString()} USD
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Investment Summary */}
            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-xs">
              <span className="uppercase tracking-wider font-semibold text-stone-600">
                Settled Investment ({confirmedOrder.paymentMethod}):
              </span>
              <span className="text-lg font-serif font-bold text-stone-900 tabular-nums">
                ${confirmedOrder.totalAmount.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-800 text-stone-800 text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Archival Receipt</span>
            </button>

            <div className="flex items-center gap-3">
              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    setIsAdminPanelOpen(true);
                  }}
                  className="px-4 py-2 border border-stone-800 text-stone-900 hover:bg-stone-200 text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  View in Curator Panel
                </button>
              )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmedOrder(null)}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer"
                >
                  Return to Gallery
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
