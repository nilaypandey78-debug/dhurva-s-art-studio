import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, ArrowRight, Check, MapPin, Mail, Phone, Ticket } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Footer: React.FC = () => {
  const { isAdminLoggedIn, setIsAdminAuthOpen, setIsAdminPanelOpen, setCurrentPage } = useGallery();
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
    <footer className="bg-[#111827] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Wordmark */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 text-white font-bold text-sm flex items-center justify-center rounded-xs">
                KNMA
              </div>
              <div>
                <span className="text-base font-bold uppercase tracking-tight text-white block">
                  Kiran Nadar Museum of Art
                </span>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                  & Dhurva Contemporary Studio
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              India's first private museum of modern and contemporary art. A non-commercial philanthropic institution bridging South Asian heritage and the global public through exhibitions, research, public education, and acquisitions.
            </p>

            <div className="pt-2 text-xs text-stone-500 font-mono space-y-1">
              <div>Saket, New Delhi · Sector 126, Noida · Paris Atelier</div>
              <div>© 2026 Kiran Nadar Museum of Art (KNMA). All rights reserved.</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="uppercase tracking-wider font-bold text-white font-mono text-[11px]">
              Museum & Salon
            </h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li>
                <button
                  onClick={() => setCurrentPage('showcase')}
                  className="inline-block text-blue-400 font-bold hover:text-blue-300 transition-colors cursor-pointer text-left"
                >
                  Showcase & Acquisitions ★
                </button>
              </li>
              <li>
                <a href="#exhibitions" onClick={() => setCurrentPage('home')} className="inline-block hover:text-white transition-colors cursor-pointer">
                  Current Exhibitions
                </a>
              </li>
              <li>
                <a href="#curated-works" onClick={() => setCurrentPage('home')} className="inline-block hover:text-white transition-colors cursor-pointer">
                  Permanent Collection
                </a>
              </li>
              <li>
                <a href="#studio-artists" onClick={() => setCurrentPage('home')} className="inline-block hover:text-white transition-colors cursor-pointer">
                  Studio Masters
                </a>
              </li>
              <li>
                <a href="#programs" onClick={() => setCurrentPage('home')} className="inline-block hover:text-white transition-colors cursor-pointer">
                  Workshops & Talks
                </a>
              </li>
              <li>
                <a href="#visit" onClick={() => setCurrentPage('home')} className="inline-block hover:text-white transition-colors cursor-pointer">
                  Visitor Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Pavilions & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-wider font-bold text-white font-mono text-[11px]">
              Museum Pavilions
            </h4>
            <div className="text-stone-400 space-y-2.5">
              <div>
                <strong className="text-white block">KNMA Saket (New Delhi):</strong>
                <span>145, DLF South Court Mall, Saket District Centre</span>
              </div>
              <div>
                <strong className="text-white block">KNMA Noida (Sector 126):</strong>
                <span>Plot No. 3A, Sector 126, Noida, UP 201301</span>
              </div>
              <div className="text-amber-400 font-mono pt-1 text-[11px] font-semibold">
                Open Tuesday – Sunday 10:30 AM – 6:30 PM<br />
                Admission is Always Free
              </div>
            </div>
          </div>

          {/* Curatorial Gazette / Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="uppercase tracking-wider font-bold text-white font-mono text-[11px]">
              KNMA Art Bulletin
            </h4>
            <p className="text-xs text-stone-400">
              Receive updates on upcoming retrospective vernissages, workshop registrations, and collector acquisitions.
            </p>
            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-emerald-500/50 text-stone-200 text-xs rounded-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscription confirmed. Bulletin will arrive shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 text-white text-xs rounded-xs focus:border-blue-500 focus:outline-hidden transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Operational Bottom Ribbon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>Free Public Admission</span>
            <span>·</span>
            <span>Wheelchair Accessible</span>
            <span>·</span>
            <span>Research Library</span>
            <span>·</span>
            <span>Insured Courier Escort</span>
          </div>

          {/* Password-protected Admin Panel trigger */}
          <button
            onClick={handleCuratorClick}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer py-1 px-2.5 border border-stone-800 rounded-xs hover:border-stone-600 bg-stone-900/60"
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-300">Curator Portal (Active)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Curator Backstage</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
