import React from 'react';
import { GalleryProvider } from './context/GalleryContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArtworkGrid } from './components/ArtworkGrid';
import { ExhibitionSection } from './components/ExhibitionSection';
import { ArtistsSection } from './components/ArtistsSection';
import { CuratorialSection } from './components/CuratorialSection';
import { Footer } from './components/Footer';
import { ArtworkModal } from './components/ArtworkModal';
import { RoomScaleSimulator } from './components/RoomScaleSimulator';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminPanel } from './components/AdminPanel';

import { WelcomingIntroPopup } from './components/WelcomingIntroPopup';

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* 3-Second Smooth Welcoming Popup Overlay */}
      <WelcomingIntroPopup />

      {/* 1-Row 3-Zone Header */}
      <Header />

      {/* Main Welcoming Experience & Storefront */}
      <main className="flex-1">
        {/* Welcoming Page Intro & Spotlight */}
        <Hero />

        {/* Curated Masterworks (Paintings & Sculptures) */}
        <ArtworkGrid />

        {/* Dedicated Artists & Portfolios */}
        <ArtistsSection />

        {/* Curated Current Exhibition Feature */}
        <ExhibitionSection />

        {/* Provenance, Archival Integrity & Private Salon Appointment */}
        <CuratorialSection />
      </main>

      {/* Institutional Editorial Footer */}
      <Footer />

      {/* Modals & Interactive Systems */}
      <ArtworkModal />
      <RoomScaleSimulator />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <AdminAuthModal />
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <GalleryProvider>
      <AppContent />
    </GalleryProvider>
  );
}
