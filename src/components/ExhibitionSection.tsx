import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Eye, Ticket, Clock } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const ExhibitionSection: React.FC = () => {
  const { artworks, setSelectedArtwork } = useGallery();
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'touring'>('current');

  const exhibitions = [
    {
      id: 'ex-01',
      type: 'current',
      title: 'Cosmic Geometry & The Void: Modern Indian Abstraction',
      subtitle: 'Philosophical stillness from post-independence masters to contemporary atelier creations.',
      venue: 'KNMA Saket Pavilion, New Delhi',
      dates: 'Ongoing · Open Tuesday to Sunday',
      hours: '10:30 AM – 6:30 PM',
      curators: 'Kiran Nadar & Roobina Karode',
      admission: 'Free Public Admission',
      artworks: [artworks[0], artworks[6] || artworks[1]],
      description: 'Bringing together seminal works exploring sacred geometry, bindu archetypes, and meditative silence. Featuring monumental oils by Dhurva alongside historical permanent collection loans.',
    },
    {
      id: 'ex-02',
      type: 'current',
      title: 'Material Whispers: Stone, Bronze & Impasto',
      subtitle: 'A tactile survey of sculptured masses and thick mineral pigment strata.',
      venue: 'KNMA Noida Pavilion, Sector 126',
      dates: 'October 15, 2026 – January 31, 2027',
      hours: '10:30 AM – 6:30 PM',
      curators: 'Dhurva Studio Curatorial Team',
      admission: 'Free Public Admission',
      artworks: [artworks[1], artworks[2]],
      description: 'Showcasing the interplay of carved Spanish alabaster, lost-wax patinated bronzes, and cold-wax palette knife oils that invite visceral optical contemplation.',
    },
    {
      id: 'ex-03',
      type: 'upcoming',
      title: 'South Asian Avant-Garde: 1947 to Present',
      subtitle: 'Major historical retrospective charting seventy years of progressive modernism.',
      venue: 'Grand Central Galleries, Saket',
      dates: 'Opens February 15, 2027',
      hours: '10:30 AM – 6:30 PM',
      curators: 'KNMA Senior Curatorial Board',
      admission: 'Free Public Admission',
      artworks: [artworks[3], artworks[4] || artworks[0]],
      description: 'A comprehensive survey tracking how South Asian masters developed distinct visual vocabularies in dialogue with international modernism and indigenous cultural craft.',
    },
  ];

  const filteredExhibitions = exhibitions.filter((ex) => {
    if (activeTab === 'current') return ex.type === 'current';
    if (activeTab === 'upcoming') return ex.type === 'upcoming';
    return true;
  });

  return (
    <section id="exhibitions" className="py-20 lg:py-28 bg-[#F9FAFB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Simple Clean Sans-Serif Font */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 font-bold mb-2">
              <span>What's On</span>
              <span className="text-stone-300">·</span>
              <span>KNMA Exhibition Schedule 2026–2027</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              Museum Exhibitions & Retrospectives
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Explore ongoing physical exhibitions across our Saket (New Delhi) and Noida pavilions. Admission to all public exhibitions is completely free.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center p-1 bg-white border border-stone-300 rounded-xs">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer ${
                activeTab === 'current'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Current Shows
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Upcoming Shows
            </button>
          </div>
        </div>

        {/* Exhibition Cards */}
        <div className="space-y-8 mt-10">
          {filteredExhibitions.map((ex) => (
            <div
              key={ex.id}
              className="bg-white border border-stone-200 rounded-xs p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-bold rounded-xs uppercase tracking-wider text-[11px] border border-blue-200">
                    {ex.venue}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-emerald-700 font-bold">{ex.admission}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                  {ex.title}
                </h3>

                <p className="text-sm font-medium text-stone-700">
                  {ex.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {ex.description}
                </p>

                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>{ex.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>{ex.hours}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-500 font-mono text-[11px]">
                    Curated by: <strong className="text-stone-800">{ex.curators}</strong>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <a
                    href="#visit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111827] hover:bg-blue-700 text-white text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Plan Your Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Featured Exhibition Artworks Previews */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {ex.artworks.filter(Boolean).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArtwork(art)}
                    className="group cursor-pointer bg-stone-50 border border-stone-200 rounded-xs overflow-hidden hover:border-blue-500 transition-colors"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                      <img
                        src={art.image}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-1.5 bg-white rounded-xs text-stone-900 shadow-sm">
                          <Eye className="w-4 h-4 text-blue-700" />
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <span className="block text-[11px] font-bold text-stone-900 truncate">
                        {art.title}
                      </span>
                      <span className="block text-[10px] text-stone-500 font-mono uppercase">
                        {art.artist}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
