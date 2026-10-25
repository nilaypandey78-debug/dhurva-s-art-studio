import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthOpen, setIsAdminAuthOpen, loginAdmin } = useGallery();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#FBF9F5] border border-stone-300 shadow-2xl rounded-sm p-8 text-center"
        >
          <button
            onClick={() => {
              setIsAdminAuthOpen(false);
              setError(false);
            }}
            className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>

          <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-1">
            Private Access
          </div>
          <h2 className="text-xl font-serif text-stone-900 font-bold mb-2">
            Curator & Registrar Portal
          </h2>
          <p className="text-xs text-stone-600 mb-6 leading-relaxed">
            This administrative zone is restricted to gallery directors. Enter your security passcode to manage customer orders, client records, and collection catalog.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter curator password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full py-2.5 px-4 pr-10 bg-white border ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-stone-900'
                  } rounded-sm text-sm focus:outline-none focus:ring-1`}
                />
                <KeyRound className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
              </div>

              {error && (
                <div className="mt-2 text-left flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Invalid curator passcode. Please check credentials.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm"
            >
              Authenticate Access
            </button>
          </form>

          {/* Discreet helper hint for testing */}
          <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-500">
            <span>Standard Access Passcode: </span>
            <code className="px-1.5 py-0.5 bg-stone-200/80 rounded font-mono text-stone-800 font-bold">
              curator2026
            </code>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
