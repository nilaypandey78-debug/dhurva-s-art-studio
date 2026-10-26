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

import { ProgramsSection } from './components/ProgramsSection';
import { PlanYourVisitSection } from './components/PlanYourVisitSection';
import { WelcomingIntroPopup } from './components/WelcomingIntroPopup';
import { ShowcasePurchasePage } from './components/ShowcasePurchasePage';
import { useGallery } from './context/GalleryContext';

export function AppContent() {
  const { currentPage } = useGallery();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      {/* 3-Second Smooth Welcoming Popup Overlay */}
      <WelcomingIntroPopup />

      {/* KNMA Navigation Header */}
      <Header />

      {/* Main Experience Router: Home vs Showcase & Purchasing Salon */}
      <main className="flex-1">
        {currentPage === 'showcase' ? (
          <ShowcasePurchasePage />
        ) : (
          <>
            {/* Welcoming Page Intro & Spotlight */}
            <Hero />

            {/* Curated Current Exhibition Feature */}
            <ExhibitionSection />

            {/* Permanent Collection & Acquisitions (Paintings & Sculptures) */}
            <ArtworkGrid />

            {/* Dedicated Artists & Portfolios */}
            <ArtistsSection />

            {/* KNMA Engage: Public Programs, Workshops & Symposiums */}
            <ProgramsSection />

            {/* Provenance, Archival Integrity & Private Salon Appointment */}
            <CuratorialSection />

            {/* Plan Your Visit to Saket & Noida Pavilions */}
            <PlanYourVisitSection />
          </>
        )}
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
