import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Footer: React.FC = () => {
  const { isAdminLoggedIn, setIsAdminAuthOpen, setIsAdminPanelOpen } = useGallery();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const handleCuratorClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  return (
    <footer className="bg-[#1C1A19] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Wordmark */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xl font-serif tracking-[0.16em] uppercase text-stone-100 block">
              Dhurva's Art Studio & Gallery
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An international studio and gallery representing contemporary masters of painting and sculpture. All acquisitions are curated, certified, and dispatched via temperature-regulated fine art courier.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono space-y-1">
              <div>Paris · London · Geneva · New York</div>
              <div>© 2026 Dhurva's Art Studio & Gallery. All rights reserved.</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-stone-100 font-mono text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#curated-works" className="hover:text-stone-100 transition-colors">
                  Original Paintings
                </a>
              </li>
              <li>
                <a href="#curated-works" className="hover:text-stone-100 transition-colors">
                  Bronze & Stone Sculptures
                </a>
              </li>
              <li>
                <a href="#exhibitions" className="hover:text-stone-100 transition-colors">
                  The Vernissage 2026
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-stone-100 transition-colors">
                  Provenance Ledger
                </a>
              </li>
            </ul>
          </div>

          {/* Salons & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-stone-100 font-mono text-[11px]">
              Gallery Salons
            </h4>
            <div className="text-stone-400 space-y-2">
              <div>
                <strong className="text-stone-200 block">Paris Pavillon:</strong>
                <span>18 Place Vendôme, 75001 Paris</span>
              </div>
              <div>
                <strong className="text-stone-200 block">London Mayfair:</strong>
                <span>14 Berkeley Square, London W1J</span>
              </div>
              <div className="text-stone-500 font-mono pt-1">
                Tuesday – Sunday 10:00 – 19:00 CET
              </div>
            </div>
          </div>

          {/* Curatorial Gazette / Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="uppercase tracking-[0.2em] font-semibold text-stone-100 font-mono text-[11px]">
              Curatorial Gazette
            </h4>
            <p className="text-xs text-stone-400">
              Receive private catalog previews and invitations to vernissages before public release.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscription confirmed. Portfolio enclosed soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="collector@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full p-2 bg-stone-900 border border-stone-700 text-stone-100 text-xs rounded-sm focus:border-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold rounded-sm transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Operational Bottom Ribbon & Discreet Admin Entry */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-4">
            <span>Conservation Framing Included</span>
            <span>·</span>
            <span>Escrow & Transit Insurance</span>
            <span>·</span>
            <span>Archival Accessioning</span>
          </div>

          {/* Password-protected Admin Panel trigger */}
          <button
            onClick={handleCuratorClick}
            className="flex items-center gap-1.5 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer py-1 px-2.5 border border-stone-800 rounded-sm hover:border-stone-600"
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300">Curator Backstage (Unlocked)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Curator Backstage Access</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
