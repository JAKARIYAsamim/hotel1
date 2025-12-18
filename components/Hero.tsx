import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

interface HeroProps {
  isParentLoading?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isParentLoading = false }) => {
  const { config } = useSiteConfig();
  // Fixed easing type error by casting the transition object to any
  const transition: any = { duration: 1.8, ease: [0.16, 1, 0.3, 1] };
  const animationState = isParentLoading ? "hidden" : "visible";

  return (
    <section className="relative w-full h-screen bg-stone-100 overflow-hidden">
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={animationState}
        variants={{ 
          visible: { 
            scale: 1, 
            // Fixed easing type error by casting ease array to any
            transition: { duration: 4, ease: [0.16, 1, 0.3, 1] as any } 
          } 
        }}
        className="absolute inset-0"
      >
        <img 
          src={config.hero.bg} 
          alt="Ship Inn Stanley"
          className="w-full h-full object-cover brightness-[0.85] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900/50" />
      </motion.div>

      <div className="absolute left-12 top-40 hidden md:block z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={animationState}
          variants={{ 
            visible: { opacity: 1, x: 0, transition: { ...transition, delay: 1.2 } } 
          }}
          className="space-y-1"
        >
          <p className="text-[8px] uppercase tracking-[0.6em] text-white/60 font-bold">Heritage Registry</p>
          <p className="text-[10px] text-white/80 font-mono tracking-tighter">SI_STANLEY_TAS_25</p>
        </motion.div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-6 z-10">
        <div className="text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animationState}
            variants={{ visible: { opacity: 1, y: 0, transition: { ...transition, delay: 0.5 } } }}
          >
            <span className="text-[10px] uppercase tracking-[1em] text-white/90 font-bold mb-12 block drop-shadow-sm ml-[1em]">
              Heritage Excellence Since 1849
            </span>
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={animationState}
              variants={{ visible: { y: 0, transition: { ...transition, delay: 0.7 } } }}
              className="font-serif text-6xl md:text-[10rem] text-white leading-[0.85] tracking-tighter drop-shadow-2xl"
            >
              {config.hero.title} <br/>
              <span className="italic text-stone-100">{config.hero.subtitle}</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={animationState}
            variants={{ visible: { opacity: 1, transition: { ...transition, delay: 1.2 } } }}
            className="text-white/95 text-lg md:text-2xl font-light italic max-w-2xl mx-auto mb-16 leading-relaxed drop-shadow-md"
          >
            "{config.hero.tagline}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={animationState}
            variants={{ visible: { opacity: 1, scale: 1, transition: { ...transition, delay: 1.4 } } }}
          >
            <a href="#rooms" className="group relative inline-block overflow-hidden bg-white text-stone-900 px-16 py-7 rounded-full transition-all hover:bg-stone-50 hover:shadow-2xl shadow-xl">
              <span className="relative z-10 text-[11px] uppercase tracking-[0.5em] font-bold">Explore the History</span>
              <div className="absolute inset-0 bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-24 z-20">
        <div className="h-20 w-[1px] bg-white/40" />
        <span className="rotate-90 text-[8px] uppercase tracking-[1em] text-white/70 font-bold whitespace-nowrap">
          40.7629° S // 145.2974° E
        </span>
        <div className="h-20 w-[1px] bg-white/40" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={animationState}
        variants={{ visible: { opacity: 1, transition: { delay: 2 } } }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/70"
      >
        <span className="text-[9px] uppercase tracking-[0.6em] font-bold drop-shadow-sm ml-[0.6em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;