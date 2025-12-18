import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const { config } = useSiteConfig();
  const [year, setYear] = useState(1849);
  const [flickerIndex, setFlickerIndex] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const startYear = 1849;
    const endYear = 2025;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); 
      const currentYear = Math.floor(startYear + (endYear - startYear) * easedProgress);
      
      setYear(currentYear);
      setFlickerIndex(Math.floor(currentTime / 150) % config.loading.length);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setTimeout(onLoadingComplete, 800);
      }
    };

    requestAnimationFrame(update);
  }, [onLoadingComplete, config.loading]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, scale: 1.1, filter: "blur(20px)",
          transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
        }}
        className="fixed inset-0 z-[999] bg-stone-950 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
          <motion.div 
            key={flickerIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <img 
              src={config.loading[flickerIndex]} 
              alt="Archival" 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125"
            />
          </motion.div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="font-serif text-white text-5xl md:text-8xl tracking-[0.4em] font-light uppercase text-center ml-[0.4em]">Ship Inn</h1>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-500 to-transparent my-4" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <span className="text-stone-400 font-serif italic text-3xl md:text-5xl tabular-nums tracking-tighter">{year}</span>
            <span className="text-[8px] uppercase tracking-[0.8em] text-stone-600 font-bold mt-4">Est. Stanley, Tasmania</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;