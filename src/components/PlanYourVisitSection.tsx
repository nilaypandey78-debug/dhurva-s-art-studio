import React, { useState } from 'react';
import { MapPin, Clock, Ticket, Compass, Phone, Mail, Navigation, CheckCircle, ShieldCheck } from 'lucide-react';

export const PlanYourVisitSection: React.FC = () => {
  const [activePavilion, setActivePavilion] = useState<'saket' | 'noida'>('saket');
  const [tourForm, setTourForm] = useState({
    name: '',
    email: '',
    date: '',
    attendees: '1',
    pavilion: 'saket',
  });
  const [booked, setBooked] = useState(false);

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourForm.name || !tourForm.email) return;
    setBooked(true);
  };

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#F9FAFB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 font-bold mb-2">
              <span>Visitor Information</span>
              <span className="text-stone-300">·</span>
              <span>Open Tuesday to Sunday · Free Admission</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              Plan Your Visit to KNMA
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              We welcome you to experience South Asian modern and contemporary art across our two iconic gallery pavilions in the National Capital Region.
            </p>
          </div>

          {/* Pavilion Selector Tabs */}
          <div className="flex items-center p-1 bg-white border border-stone-300 rounded-xs">
            <button
              onClick={() => setActivePavilion('saket')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer ${
                activePavilion === 'saket'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Saket Pavilion (New Delhi)
            </button>
            <button
              onClick={() => setActivePavilion('noida')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer ${
                activePavilion === 'noida'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Noida Pavilion (Sector 126)
            </button>
          </div>
        </div>

        {/* Pavilion Cards & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-stretch">
          {/* Left Column: Pavilion Details */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xs p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            {activePavilion === 'saket' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 block">
                      South Delhi Flagship
                    </span>
                    <h3 className="text-2xl font-bold text-stone-900 mt-1">
                      KNMA Saket, New Delhi
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-xs border border-emerald-200">
                    Admission Free
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Address:</span>
                    <p className="text-stone-600 leading-relaxed">
                      145, DLF South Court Mall, Saket District Centre, New Delhi, Delhi 110017
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Nearest Metro:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Malviya Nagar Metro Station (Yellow Line) or Saket Metro Station (Gate No. 2)
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Museum Timings:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Tuesday – Sunday: 10:30 AM to 6:30 PM<br />
                      <span className="text-red-600 font-semibold">Closed on Mondays & National Holidays</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Accessibility:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Wheelchair accessible, braille guides, elevator access, and climate-controlled galleries.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-600 space-y-2">
                  <div className="font-bold text-stone-800">On-Site Amenities:</div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Museum Art Café</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Research Library</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Bookshop & Catalogues</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Audio Walkthroughs</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 block">
                      NCR Innovation Hub
                    </span>
                    <h3 className="text-2xl font-bold text-stone-900 mt-1">
                      KNMA Sector 126, Noida
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-xs border border-emerald-200">
                    Admission Free
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Address:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Plot No. 3A, Sector 126, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Nearest Metro:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Okhla Bird Sanctuary Metro Station (Magenta Line) or Botanical Garden Interchange
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Museum Timings:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Tuesday – Sunday: 10:30 AM to 6:30 PM<br />
                      <span className="text-red-600 font-semibold">Closed on Mondays & National Holidays</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-stone-900 block uppercase font-mono text-[11px]">Sculpture Gardens:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Sprawling outdoor sculpture lawns, monumental installations, and dedicated workshop amphitheater.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-600 space-y-2">
                  <div className="font-bold text-stone-800">On-Site Amenities:</div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Sculpture Lawn</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Children's Art Studio</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Conservation Lab</span>
                    <span className="bg-white px-2 py-0.5 border border-stone-200 rounded-xs">Free Visitor Parking</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 font-mono">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>+91 11 4916 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <span>visit@knma.org</span>
              </div>
            </div>
          </div>

          {/* Right Column: Free Guided Tour & Group Booking Form */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xs p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                <Ticket className="w-4 h-4 text-blue-700" />
                <span>Complimentary Curator Guided Walk</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Book a Free Walkthrough Tour
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Join our expert museum docents for an insightful 45-minute walkthrough of current exhibitions and masterworks.
              </p>

              {booked ? (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Free Tour Confirmation Sent</span>
                  </div>
                  <p className="text-stone-600">
                    We look forward to welcoming you, {tourForm.name}! A museum pass and guide meeting details have been sent to {tourForm.email}.
                  </p>
                  <button
                    onClick={() => setBooked(false)}
                    className="text-emerald-800 underline font-semibold mt-2 cursor-pointer"
                  >
                    Book for another date
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookTour} className="mt-5 space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarti Sharma"
                      value={tourForm.name}
                      onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xs focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarti@example.com"
                      value={tourForm.email}
                      onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xs focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={tourForm.date}
                        onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xs focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Attendees</label>
                      <select
                        value={tourForm.attendees}
                        onChange={(e) => setTourForm({ ...tourForm, attendees: e.target.value })}
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xs focus:border-blue-600 focus:outline-hidden cursor-pointer"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3-5">3 – 5 Persons</option>
                        <option value="group">School / Group (6+)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Confirm Free Walkthrough Pass
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex items-center gap-1.5 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>Complimentary admission sponsored by Kiran Nadar Art Foundation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
