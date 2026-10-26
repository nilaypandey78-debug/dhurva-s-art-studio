import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Eye } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const ExhibitionSection: React.FC = () => {
  const { artworks, setSelectedArtwork } = useGallery();

  const exhibitionWorks = artworks.slice(0, 3);

  return (
    <section id="exhibitions" className="py-20 lg:py-28 bg-[#F5F2EB]/60 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Exhibition Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-stone-500 font-mono font-medium mb-3">
            <span>Current Exhibition</span>
            <span aria-hidden="true">·</span>
            <span>Hall A & B</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cormorant text-stone-900 tracking-tight leading-tight smooth-font font-medium">
            Material Whispers: The Vernissage 2026
          </h2>

          <div className="flex flex-wrap items-center gap-6 mt-4 text-xs font-mono text-stone-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>October 15 – December 20, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-700" />
              <span>Grand Pavillon · 18 Place Vendôme, Paris</span>
            </div>
          </div>

          <p className="mt-6 text-stone-600 text-sm leading-relaxed smooth-font">
            Curated by Éléonore Duprès, <em>Material Whispers</em> explores the visceral tension between geological permanence and atmospheric translucency. The exhibition unites monumental impasto canvases with patinated bronze and carved alabaster sculptures.
          </p>
        </motion.div>

        {/* Featured Exhibition Artwork Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitionWorks.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.28 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedArtwork(art)}
              className="group cursor-pointer bg-white border border-stone-200/90 hover:border-amber-400/80 rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-[0_16px_40px_rgba(217,119,6,0.12)] transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/95 text-stone-900 text-xs uppercase tracking-wider font-medium rounded-sm shadow-md flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>View Exhibition Piece</span>
                  </motion.span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
                  Room {idx + 1} · {art.category}
                </div>
                <h3 className="text-xl font-cormorant font-bold text-stone-900 mt-1 group-hover:text-amber-900 transition-colors smooth-font">
                  {art.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 italic">{art.artist}</p>
                <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                  <span className="font-mono text-stone-500">{art.dimensions}</span>
                  <span className="font-serif font-bold text-stone-900 tabular-nums">
                    ${art.price.toLocaleString()} USD
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
