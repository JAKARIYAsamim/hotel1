
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

interface GalleryImage {
  id: string;
  title: string;
  location: string;
  technical: string;
  description: string;
  image: string;
  width: string; // Dynamic width for staggered feel
}

const Lightbox: React.FC<{ item: GalleryImage; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-20 bg-stone-950/98 backdrop-blur-3xl"
      onClick={onClose}
    >
      <motion.button 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors flex items-center gap-4 group z-[610]"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Close Perspective</span>
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 max-w-[1800px] w-full items-center relative" onClick={e => e.stopPropagation()}>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ type: 'spring', damping: 35, stiffness: 150 }}
          className="lg:col-span-8 relative group"
        >
          <img src={item.image} alt={item.title} className="w-full h-auto max-h-[85vh] object-contain shadow-2xl" />
        </motion.div>

        <motion.div 
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-12"
        >
          <div className="space-y-6">
            <span className="text-stone-500 uppercase text-[10px] tracking-[0.6em] font-bold block">Folio {item.id}</span>
            <h3 className="text-white font-serif text-6xl italic leading-none">{item.title}</h3>
            <p className="text-stone-400 text-lg font-light leading-relaxed">{item.description}</p>
          </div>
          <div className="pt-12 border-t border-white/10">
            <span className="text-stone-600 text-[9px] uppercase tracking-[0.3em] font-bold block mb-3">Specification</span>
            <p className="text-white/80 font-mono text-xs tracking-tighter">{item.technical}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const { config } = useSiteConfig();
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const images: GalleryImage[] = useMemo(() => [
    { id: '01', title: 'Heritage Facade', location: 'Main Entrance', technical: '35MM // ISO 100 // F/8', description: 'Original 1849 bluestone.', image: config.gallery[0], width: 'w-[500px] md:w-[800px]' },
    { id: '02', title: 'The Nut Vista', location: 'Headlands', technical: '50MM // ISO 200 // F/2.8', description: 'Iconic volcanic plug.', image: config.gallery[1], width: 'w-[400px] md:w-[600px]' },
    { id: '03', title: 'Blue Hour', location: 'Stanley Wharf', technical: '24MM // ISO 800 // F/4', description: 'Twilight at the wharf.', image: config.gallery[2], width: 'w-[450px] md:w-[700px]' },
    { id: '04', title: 'Suite Intimacy', location: 'The Lyon Suite', technical: '35MM // ISO 400 // NATURAL', description: 'Hand-woven Tasmanian linens.', image: config.gallery[3], width: 'w-[600px] md:w-[900px]' },
    { id: '05', title: 'Quiet Corridors', location: 'Upper Gallery', technical: '28MM // ISO 100 // F/11', description: 'Play of light in heritage halls.', image: config.gallery[4], width: 'w-[400px] md:w-[650px]' },
    { id: '06', title: 'Coastal Stillness', location: 'Private Terrace', technical: '85MM // ISO 200 // F/1.4', description: 'Morning mists over the bay.', image: config.gallery[5], width: 'w-[550px] md:w-[850px]' },
    { id: '07', title: 'The Library', location: 'Resident Lounge', technical: '35MM // ISO 1600 // LOW LIGHT', description: 'Maritime journals and history.', image: config.gallery[6], width: 'w-[500px] md:w-[750px]' },
    { id: '08', title: 'Heritage Detail', location: 'Main Staircase', technical: '50MM // MACRO // F/4', description: 'Patinated Huon Pine details.', image: config.gallery[7], width: 'w-[400px] md:w-[600px]' },
  ], [config.gallery]);

  // Combine images for infinite marquee effect
  const marqueeImages = [...images, ...images];

  return (
    <section id="gallery" className="py-60 bg-[#FAF9F6] overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 mb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="h-[1px] w-12 bg-stone-300"></div>
          <span className="text-stone-400 uppercase text-[10px] tracking-[1em] font-bold">The Heritage Folio</span>
          <div className="h-[1px] w-12 bg-stone-300"></div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[11rem] font-serif leading-[0.8] tracking-tighter text-stone-900 mb-20"
        >
          Quiet <br/> <span className="italic text-stone-300">Observation</span>.
        </motion.h2>

        <div className="flex justify-center">
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="px-12 py-4 bg-stone-900 text-white rounded-full text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl flex items-center gap-4"
          >
            Scroll to Discover
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </motion.div>
        </div>
      </div>

      {/* Right to Left Auto-scrolling Marquee */}
      <div className="relative group cursor-grab active:cursor-grabbing">
        {/* Subtle Edge Vignette */}
        <div className="absolute inset-y-0 left-0 w-40 z-20 pointer-events-none bg-gradient-to-r from-[#FAF9F6] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 z-20 pointer-events-none bg-gradient-to-l from-[#FAF9F6] to-transparent" />
        
        <motion.div 
          ref={marqueeRef}
          className="flex gap-12 px-20 select-none"
          animate={{ 
            x: [0, -5000], // Adjust based on total width for infinite feel
            transition: { 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 100,
                ease: "linear"
              }
            }
          }}
          whileHover={{ animationPlayState: 'paused' }}
          drag="x"
          dragConstraints={{ left: -10000, right: 0 }} // Dynamic constraints would be better but this works for large sets
        >
          {marqueeImages.map((item, index) => (
            <GalleryItem 
              key={`${item.id}-${index}`} 
              item={item} 
              onSelect={setSelectedItem}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const GalleryItem: React.FC<{ item: GalleryImage; onSelect: (item: GalleryImage) => void }> = ({ item, onSelect }) => {
  return (
    <motion.div 
      className={`flex-none ${item.width} aspect-[16/10] relative group bg-stone-100 shadow-2xl overflow-hidden`}
      onClick={() => onSelect(item)}
      data-cursor="Discover"
    >
      <div className="w-full h-full relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110"
        />
        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-1000" />
      </div>

      {/* Heritage Frame Metadata (The Previous UI style) */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-white text-[9px] font-mono tracking-widest bg-stone-950/40 backdrop-blur-sm px-3 py-1.5 inline-block w-fit"
        >
          INDEX_{item.id}
        </motion.span>
        <span className="text-white/50 text-[7px] font-mono tracking-[0.3em] uppercase ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          Archival Grade // S25
        </span>
      </div>

      <div className="absolute bottom-12 left-12 right-12 z-10 flex flex-col gap-4">
        <span className="text-white/70 text-[10px] uppercase tracking-[0.8em] font-bold block">
          {item.location}
        </span>
        <h3 className="text-4xl md:text-6xl font-serif text-white italic leading-none tracking-tighter group-hover:translate-x-4 transition-transform duration-[1.2s] ease-out">
          {item.title}
        </h3>
        
        <div className="pt-6 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <p className="text-white/60 font-mono text-[9px] tracking-tight">
            {item.technical}
          </p>
        </div>
      </div>

      {/* Registry Stamp Detail */}
      <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
        <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center text-white text-[7px] font-mono text-center leading-tight">
          EST. 1849<br/>TASMANIA
        </div>
      </div>

      <div className="absolute top-0 right-0 p-10 z-10">
        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-1000 rotate-[135deg] group-hover:rotate-0 bg-white/5 backdrop-blur-md">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
