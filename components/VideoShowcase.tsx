
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

// Custom SVG Icons to replace lucide-react dependencies
const PlayIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
  </svg>
);

const XIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ZapIcon = ({ size = 12, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
  </svg>
);

const VideoShowcase: React.FC = () => {
  const { config } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Enhanced YouTube ID extraction to resolve potential malformed URLs
  const videoSrc = useMemo(() => {
    const url = config.videoUrl;
    if (!url) return null;
    
    // Improved regex to handle various YouTube formats more reliably
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    // If regex fails, try to see if the input itself is an ID
    const cleanId = videoId || (url.trim().length === 11 ? url.trim() : 'b0PwAGnD8Cc');
    
    // Standardizing the embed URL with essential parameters only to avoid Error 153
    // We include autoplay=1 and mute=0 (since it's user-initiated)
    return `https://www.youtube.com/embed/${cleanId}?autoplay=1&mute=0&rel=0&enablejsapi=1&origin=${window.location.origin}`;
  }, [config.videoUrl]);

  return (
    <section 
      id="atmosphere" 
      ref={containerRef} 
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black border-y border-white/10"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ scale, y }} className="relative w-full h-[120%] -top-[10%]">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-stone-400/10 mix-blend-overlay z-10" />
          <img 
            src={config.gallery[0] || config.hero.bg} 
            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
            alt="Atmospheric Background"
          />
        </motion.div>
      </div>

      {/* Grid and Vignette Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 pointer-events-none" />

      {/* Center UI */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => setIsOpen(true)}
          data-cursor="Play"
        >
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
            className="absolute -inset-16 border border-white/10 rounded-full border-dashed" 
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
            className="absolute -inset-10 border border-stone-400/30 rounded-full border-t-transparent border-l-transparent" 
          />
          
          {/* Play Button Core */}
          <div className="relative w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:scale-110 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <PlayIcon size={32} className="text-white group-hover:text-black transition-colors duration-300 ml-1.5" />
          </div>

          {/* Labeling */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ZapIcon size={12} className="text-stone-400 animate-pulse" />
              <span className="font-mono text-[9px] text-stone-400 uppercase tracking-[0.4em] font-bold">Registry Feed</span>
            </div>
            <h3 className="font-serif text-5xl font-bold italic text-white tracking-tighter relative">
              The Archive Film
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-20"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-8 right-8 text-white hover:text-stone-400 transition-colors z-[1010] group"
              data-cursor="Close"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity font-bold">Terminate_Feed</span>
                <XIcon size={40} />
              </div>
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-7xl aspect-video bg-black border border-white/10 rounded-sm overflow-hidden relative shadow-[0_0_100px_rgba(255,255,255,0.1)]"
            >
              {/* Applying the requested standard structure to ensure playback compatibility */}
              <iframe 
                width="100%" 
                height="100%" 
                src={videoSrc || ''}
                title="Ship Inn Stanley Cinematic Feed" 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
