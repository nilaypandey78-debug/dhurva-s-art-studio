import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Award, CheckCircle, Send } from 'lucide-react';

export const CuratorialSection: React.FC = () => {
  const [salonForm, setSalonForm] = useState({
    name: '',
    email: '',
    preferredDate: '',
    interests: 'paintings',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonForm.name || !salonForm.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // keep confirmation visible
    }, 500);
  };

  return (
    <section id="craftsmanship" className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
      {/* 3 Pillars of Acquisition Integrity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        <div className="p-8 bg-[#F5F2EB]/50 border border-stone-200 rounded-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center mb-6">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-3">
              Certified Provenance
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every acquisition is catalogued with a signed certificate of authenticity and direct atelier accession documents. Our provenance ledger links directly to the artist’s official catalogue raisonné.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200/80 text-[11px] font-mono text-stone-400 uppercase">
            Conservation Grade Archive
          </div>
        </div>

        <div className="p-8 bg-[#F5F2EB]/50 border border-stone-200 rounded-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center mb-6">
              <Truck className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-3">
              Insured White-Glove Freight
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Transported in climate-controlled vehicles with air-suspension and dedicated art handlers. Artworks are uncrated and positioned in your residence or private salon under professional supervision.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200/80 text-[11px] font-mono text-stone-400 uppercase">
            Global Door-to-Door Escort
          </div>
        </div>

        <div className="p-8 bg-[#F5F2EB]/50 border border-stone-200 rounded-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-serif text-stone-900 mb-3">
              14-Day Private Salon Review
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Live with the artwork in your home environment. If the scale, tonal presence, or architecture does not harmonize perfectly with your space, our curatorial team arranges complimentary return transit.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-200/80 text-[11px] font-mono text-stone-400 uppercase">
            Collector Assurance Policy
          </div>
        </div>
      </div>

      {/* Private Salon Booking / Consultation Form */}
      <div id="private-viewing" className="bg-[#242220] text-stone-100 rounded-sm p-8 sm:p-12 lg:p-16 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-mono font-medium">
              Private Salon Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-normal leading-tight">
              Arrange a Private Viewing or Curatorial Consultation
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Experience masterworks in our intimate Paris viewing salons or arrange a private in-situ loan for architectural review. Our senior curators assist discerning collectors, architects, and trusts worldwide.
            </p>
            <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-1">
              <div>Paris Flagship: 18 Place Vendôme, 75001 Paris</div>
              <div>Geneva Salon: 12 Rue du Rhône, 1204 Genève</div>
              <div>Direct Curatorial Line: +33 1 42 68 00 22</div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-stone-900/90 border border-stone-800 p-6 sm:p-8 rounded-sm">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-white">
                  Viewing Request Registered
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, {salonForm.name}. Our head curator will contact you via {salonForm.email} within 24 hours to coordinate your private viewing portfolio.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-stone-700 hover:border-stone-500 text-xs uppercase tracking-wider text-stone-300 rounded-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor De Witt"
                      value={salonForm.name}
                      onChange={(e) => setSalonForm({ ...salonForm, name: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-stone-100 rounded-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. e.dewitt@collection.org"
                      value={salonForm.email}
                      onChange={(e) => setSalonForm({ ...salonForm, email: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-stone-100 rounded-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={salonForm.preferredDate}
                      onChange={(e) => setSalonForm({ ...salonForm, preferredDate: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-stone-100 rounded-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Acquisition Interest</label>
                    <select
                      value={salonForm.interests}
                      onChange={(e) => setSalonForm({ ...salonForm, interests: e.target.value })}
                      className="w-full p-2.5 bg-stone-950 border border-stone-700 text-stone-100 rounded-sm focus:border-amber-400 focus:outline-none cursor-pointer"
                    >
                      <option value="paintings">Monumental Paintings</option>
                      <option value="sculptures">Contemporary Sculptures</option>
                      <option value="commission">Private Artist Commission</option>
                      <option value="curatorial">Corporate / Architectural Project</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Specific Artworks or Spatial Requirements</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on ceiling height, intended location, or specific artist interests..."
                    value={salonForm.notes}
                    onChange={(e) => setSalonForm({ ...salonForm, notes: e.target.value })}
                    className="w-full p-2.5 bg-stone-950 border border-stone-700 text-stone-100 rounded-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Private Viewing Appointment</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
