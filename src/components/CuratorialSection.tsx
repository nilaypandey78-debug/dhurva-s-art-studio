import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Award, CheckCircle, Send, FileText, Check } from 'lucide-react';

export const CuratorialSection: React.FC = () => {
  const [salonForm, setSalonForm] = useState({
    name: '',
    email: '',
    preferredDate: '',
    pavilion: 'saket',
    interests: 'paintings',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonForm.name || !salonForm.email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="craftsmanship" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 bg-white border-b border-stone-200">
      {/* 3 Pillars of Museum Acquisition Integrity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-20">
        <div className="p-8 bg-[#F9FAFB] border border-stone-200 rounded-xs flex flex-col justify-between shadow-2xs hover:border-blue-500 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xs bg-blue-700 text-white flex items-center justify-center mb-6">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Museum Provenance & COA
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every acquisition is catalogued with a signed Certificate of Authenticity and direct studio accession records registered in the official catalogue raisonné.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] font-mono text-stone-500 uppercase font-semibold">
            Institutional Standard
          </div>
        </div>

        <div className="p-8 bg-[#F9FAFB] border border-stone-200 rounded-xs flex flex-col justify-between shadow-2xs hover:border-blue-500 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xs bg-blue-700 text-white flex items-center justify-center mb-6">
              <Truck className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Insured White-Glove Art Transit
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Transported in climate-controlled fine art courier vehicles with bespoke wooden crating and dedicated art registrars handling delivery directly to your residence.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] font-mono text-stone-500 uppercase font-semibold">
            Worldwide Insured Courier
          </div>
        </div>

        <div className="p-8 bg-[#F9FAFB] border border-stone-200 rounded-xs flex flex-col justify-between shadow-2xs hover:border-blue-500 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xs bg-blue-700 text-white flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Curatorial Advisory & Escrow
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Live with the artwork in your private space. If the tonal harmony or architectural presence requires alternative curation, our team arranges complimentary exchange.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200 text-[11px] font-mono text-stone-500 uppercase font-semibold">
            Collector Protection Guarantee
          </div>
        </div>
      </div>

      {/* Private Curatorial Viewing & Acquisition Consultation Form */}
      <div
        id="private-viewing"
        className="bg-[#111827] text-white rounded-xs p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-bold">
              KNMA Private Curatorial Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Arrange a Private Viewing or Acquisition Walkthrough
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Experience masterworks in private viewing chambers at our Saket Pavilion or Noida Center, or arrange a private consultation with our curatorial registrars for your residential or corporate collection.
            </p>
            <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-1 font-mono">
              <div>KNMA Saket: DLF South Court Mall, Saket, New Delhi 110017</div>
              <div>KNMA Noida: Plot No. 3A, Sector 126, Noida, UP 201301</div>
              <div>Curatorial Desk: +91 11 4916 0000 · contact@knma.org</div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-xs">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl text-white">
                  Appointment Request Registered
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, {salonForm.name}. A senior KNMA registrar will contact you via {salonForm.email} within 24 hours to confirm your private salon portfolio.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-stone-700 hover:border-blue-500 text-xs uppercase tracking-wider text-stone-300 hover:text-white rounded-xs transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={salonForm.name}
                      onChange={(e) => setSalonForm({ ...salonForm, name: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-white rounded-xs focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. collector@domain.com"
                      value={salonForm.email}
                      onChange={(e) => setSalonForm({ ...salonForm, email: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-white rounded-xs focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Pavilion Location</label>
                    <select
                      value={salonForm.pavilion}
                      onChange={(e) => setSalonForm({ ...salonForm, pavilion: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-white rounded-xs focus:border-blue-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="saket">KNMA Saket (New Delhi)</option>
                      <option value="noida">KNMA Noida (Sector 126)</option>
                      <option value="virtual">Virtual / Digital Dossier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1 font-medium">Acquisition Interest</label>
                    <select
                      value={salonForm.interests}
                      onChange={(e) => setSalonForm({ ...salonForm, interests: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-white rounded-xs focus:border-blue-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="paintings">Monumental Paintings on Linen</option>
                      <option value="sculptures">Contemporary Sculptures</option>
                      <option value="commission">Private Artist Commission</option>
                      <option value="corporate">Institutional / Corporate Loan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Specific Artworks or Inquiries</label>
                  <textarea
                    rows={2}
                    placeholder="Mention specific artists, wall dimensions, or curatorial requirements..."
                    value={salonForm.notes}
                    onChange={(e) => setSalonForm({ ...salonForm, notes: e.target.value })}
                    className="w-full p-2.5 bg-stone-950 border border-stone-700 text-white rounded-xs focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase tracking-wider font-bold transition-colors rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Private Curatorial Appointment</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
