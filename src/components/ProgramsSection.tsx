import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const programs = [
    {
      id: 'prog-01',
      title: 'Modern Mineral Pigments & Gold Leaf Masterclass',
      category: 'Artist Workshop',
      audience: 'Adults & Art Students',
      date: 'Saturday, November 7, 2026',
      time: '11:00 AM – 2:00 PM',
      venue: 'KNMA Noida Pavilion · Atelier Studio 3',
      seats: '14 Seats Left',
      instructor: 'Dhurva Studio Master Painters',
      description: 'Hands-on workshop exploring natural ochre grinding, cold-wax preparations, and traditional 24k gold leaf application on raw Belgian linen.',
    },
    {
      id: 'prog-02',
      title: 'South Asian Modernism: The Progressive Artists Dialogue',
      category: 'Symposium & Talk',
      audience: 'Open to All',
      date: 'Friday, November 13, 2026',
      time: '5:30 PM – 7:30 PM',
      venue: 'KNMA Saket Auditorium, New Delhi',
      seats: 'Open Registration',
      instructor: 'Panel with International Curators & Art Historians',
      description: 'Critical discussion on the philosophical departures of S.H. Raza, Gaitonde, and F.N. Souza, followed by a Q&A and evening gallery walkthrough.',
    },
    {
      id: 'prog-03',
      title: 'Children’s Creative Lab: Sacred Geometry & Color',
      category: 'Youth & Family',
      audience: 'Ages 6 – 14 (Family Welcome)',
      date: 'Sunday, November 22, 2026',
      time: '10:30 AM – 1:00 PM',
      venue: 'KNMA Saket Workshop Zone, New Delhi',
      seats: '8 Seats Left',
      instructor: 'KNMA Museum Education Faculty',
      description: 'Interactive creative session introducing younger minds to balance, concentric circle formations, and expressive abstract painting.',
    },
  ];

  const handleRegister = (id: string) => {
    setRegisteredEventId(id);
    setTimeout(() => {
      setRegisteredEventId(null);
    }, 3500);
  };

  return (
    <section id="programs" className="py-20 lg:py-28 max-w-7xl mx-auto px-6 border-b border-stone-200 bg-white">
      {/* Header with Simple Sans-Serif Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-700 font-bold mb-2">
            <span>KNMA Engage</span>
            <span className="text-stone-300">·</span>
            <span>Workshops, Masterclasses & Talks</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Public Programs & Educational Workshops
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            KNMA hosts weekly hands-on artist workshops, scholarly symposia, family labs, and curatorial conversations designed to democratize art appreciation in India.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-500 hidden sm:block text-right">
          <div>Community & Education</div>
          <div className="text-stone-400">All materials provided complimentary</div>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {programs.map((prog) => {
          const isRegistered = registeredEventId === prog.id;

          return (
            <div
              key={prog.id}
              className="bg-[#FAFAFA] border border-stone-200 hover:border-blue-500 rounded-xs p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-[10px] uppercase font-bold tracking-wider rounded-xs border border-blue-200">
                    {prog.category}
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">
                    {prog.audience}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {prog.description}
                </p>

                <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{prog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{prog.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span className="truncate">{prog.venue}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono pt-1">
                    Faculty: <strong className="text-stone-800">{prog.instructor}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-700 font-bold">
                  {prog.seats}
                </span>

                <button
                  onClick={() => handleRegister(prog.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isRegistered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#111827] hover:bg-blue-700 text-white'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Seat Reserved</span>
                    </>
                  ) : (
                    <>
                      <span>Register Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
