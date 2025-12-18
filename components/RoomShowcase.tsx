import React, { useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';
import { Room } from '../types';

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden group/img ${className}`}>
      <motion.img 
        style={{ y }}
        src={src} 
        alt={alt} 
        className="absolute top-0 left-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover/img:scale-105"
      />
    </div>
  );
};

const RoomDetailModal: React.FC<{ room: Room; onClose: () => void }> = ({ room, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-6 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#FAF9F6] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        <div className="relative h-64 lg:h-full overflow-hidden">
          <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>

        <div className="p-10 md:p-20 overflow-y-auto flex flex-col justify-between">
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-stone-400 font-serif italic text-2xl">Nº {room.id}</span>
              <div className="w-12 h-px bg-stone-200" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Luxury Sanctuary</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-none">{room.name}</h2>
            
            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed mb-12 italic border-l-2 border-stone-100 pl-8">
              {room.description}
            </p>

            <div className="grid grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-300 mb-4">Specifications</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li>Area: {room.size}</li>
                  <li>Accommodates: 2 Adults</li>
                  <li>View: Coastal / Historic</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] uppercase tracking-widest font-bold text-stone-300 mb-4">Inclusions</h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  {room.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-stone-100">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-300 block mb-1">Nightly Rate</span>
              <span className="text-4xl font-serif text-stone-900">${room.price}<span className="text-sm font-sans italic text-stone-400 ml-2">AUD</span></span>
            </div>
            <a href="#contact" onClick={onClose} className="px-12 py-6 bg-stone-900 text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all shadow-xl">
              Check Availability
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const RoomShowcase: React.FC = () => {
  const { config } = useSiteConfig();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const rooms: Room[] = useMemo(() => [
    {
      id: '01',
      name: 'The Heritage Atelier',
      description: 'Our premier sanctuary within the original 1849 wing. Features hand-crafted Tasmanian timber, original stone walls, and bespoke antique furnishings that whisper stories of Stanley’s maritime past.',
      price: 450,
      size: '65m²',
      features: ['Original Stone', 'King Bed', 'Curated Antiques'],
      image: config.rooms[0]
    },
    {
      id: '02',
      name: 'The Harbour Loft',
      description: 'Elevated luxury with sweeping views of the Stanley wharf. A masterclass in light and texture, featuring reclaimed shipwreck timbers and contemporary linens for a perfect coastal repose.',
      price: 620,
      size: '85m²',
      features: ['Wharf Views', 'Reclaimed Timber', 'Soaking Tub'],
      image: config.rooms[1]
    },
    {
      id: '03',
      name: 'Nut Vista Suite',
      description: 'Designed to frame the majestic volcanic plug of The Nut. Large windows invite the changing Tasmanian light, while the interior provides a cocoon of sophisticated warmth.',
      price: 1200,
      size: '120m²',
      features: ['The Nut View', 'Fireplace', 'Private Library'],
      image: config.rooms[2]
    },
    {
      id: '04',
      name: 'Coastal Sanctuary',
      description: 'A dedicated space for deep restoration. Features an integrated reading nook, organic woollen throws from local mills, and a personalized aromatherapy menu inspired by the Bass Strait breeze.',
      price: 580,
      size: '72m²',
      features: ['Reading Nook', 'Organic Linens', 'Aromatherapy'],
      image: config.rooms[3]
    },
    {
      id: '05',
      name: "The Captain's Quarters",
      description: 'A bold, historic haven with high ceilings and mahogany accents. This room houses a rotating selection of local maritime art and historical navigation artifacts.',
      price: 490,
      size: '80m²',
      features: ['Mahogany Accents', 'Loft Space', 'Maritime Art'],
      image: config.rooms[4]
    },
    {
      id: '06',
      name: 'The Veranda Wing',
      description: 'Timeless elegance with direct access to our shared heritage veranda. Perfect for enjoying a morning coffee while watching the mist clear from the coastal headlands.',
      price: 550,
      size: '68m²',
      features: ['Veranda Access', 'Garden View', 'Classic Decor'],
      image: config.rooms[5]
    }
  ], [config.rooms]);

  return (
    <section id="rooms" className="py-60 px-6 bg-[#FAF9F6] text-stone-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-20 mb-52">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-12">
              <span className="w-12 h-[1px] bg-stone-300"></span>
              <span className="text-stone-400 uppercase text-[10px] tracking-[0.6em] font-bold">Curated Spaces</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-7xl md:text-[9rem] font-serif leading-[0.8] tracking-tighter">
              Selected <br/> <span className="italic text-stone-400">Sanctuaries</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} className="lg:max-w-sm lg:pt-20">
            <p className="text-stone-500 text-lg font-light leading-relaxed border-l border-stone-200 pl-10 italic">A private collection of habitats designed for those who seek beauty in the unsaid and luxury in the understated.</p>
          </motion.div>
        </div>

        <div className="space-y-80">
          {/* Main Featured Room */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-8 relative">
              <div 
                onClick={() => setSelectedRoom(rooms[0])} 
                className="cursor-pointer group relative overflow-hidden shadow-2xl"
                data-cursor="View"
              >
                <ParallaxImage src={rooms[0].image} alt={rooms[0].name} className="aspect-[16/10]" />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
              </div>
              <div className="absolute -top-12 -left-12 hidden lg:block">
                <span className="text-[12rem] font-serif text-stone-900/[0.03] leading-none select-none">01</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="lg:col-span-4 lg:pt-20">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6 block">Nº 01 / Primary Wing</span>
              <h3 className="text-5xl font-serif mb-8">{rooms[0].name}</h3>
              <p className="text-stone-500 font-light text-lg leading-relaxed mb-10">{rooms[0].description}</p>
              <button 
                onClick={() => setSelectedRoom(rooms[0])} 
                className="group relative flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900"
                data-cursor="Details"
              >
                <span>View Perspective</span>
                <span className="w-12 h-[1px] bg-stone-900 group-hover:w-20 transition-all duration-500"></span>
              </button>
            </motion.div>
          </div>

          {/* Grid Rooms 2 & 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
            {rooms.slice(1, 3).map((room, idx) => (
              <motion.div key={room.id} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: idx * 0.2 }} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:mt-40' : ''}`}>
                <div 
                  onClick={() => setSelectedRoom(room)} 
                  className="relative group overflow-hidden mb-16 shadow-xl cursor-pointer"
                  data-cursor="Discover"
                >
                   <ParallaxImage src={room.image} alt={room.name} className="aspect-[4/5] lg:aspect-square" />
                  <div className="absolute top-8 right-8 w-16 h-16 bg-white flex items-center justify-center shadow-lg group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
                    <span className="text-sm font-serif">{room.id}</span>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex justify-between items-baseline mb-6">
                    <h3 className="text-4xl font-serif">{room.name}</h3>
                    <span className="text-xl font-serif text-stone-400">${room.price}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedRoom(room)} 
                    className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    Details & Booking
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Staggered Final Grid Rooms 4, 5, 6 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            {rooms.slice(3, 6).map((room, idx) => (
              <motion.div 
                key={room.id} 
                initial={{ opacity: 0, y: 60 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1, delay: idx * 0.15 }}
                className={`flex flex-col ${idx === 1 ? 'lg:-translate-y-24' : idx === 2 ? 'lg:translate-y-24' : ''}`}
              >
                <div 
                  onClick={() => setSelectedRoom(room)} 
                  className="relative group overflow-hidden mb-10 shadow-lg cursor-pointer aspect-[3/4]"
                  data-cursor="Enter"
                >
                  <ParallaxImage src={room.image} alt={room.name} className="h-full" />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">Explore</span>
                  </div>
                </div>
                <div className="px-2">
                  <span className="text-[9px] uppercase tracking-widest text-stone-300 font-bold mb-3 block">Perspective {room.id}</span>
                  <h3 className="text-2xl font-serif mb-4">{room.name}</h3>
                  <button onClick={() => setSelectedRoom(room)} className="flex items-center gap-3 text-stone-900 hover:gap-6 transition-all duration-500">
                    <span className="text-[9px] uppercase tracking-widest font-bold">View</span>
                    <div className="w-6 h-[1px] bg-stone-900" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <RoomDetailModal 
            room={selectedRoom} 
            onClose={() => setSelectedRoom(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default RoomShowcase;