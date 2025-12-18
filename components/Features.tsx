import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

const Features: React.FC = () => {
  const { config } = useSiteConfig();

  const philosophyPillars = useMemo(() => [
    {
      title: 'Organic Spa',
      tag: 'Holistic',
      description: 'Ancient treatments reimagined with locally sourced botanicals and mountain-fresh minerals.',
      image: config.features.spa
    },
    {
      title: 'Culinary Art',
      tag: 'Michelin',
      description: 'A sensory journey led by world-class chefs focusing on sustainable, garden-to-table excellence.',
      image: config.features.culinary
    }
  ], [config.features]);

  return (
    <section id="wellness" className="py-32 px-6 bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(44,44,42,0.8),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row items-baseline justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-stone-500"></div>
              <span className="text-stone-500 uppercase text-[10px] tracking-[0.3em] font-bold">Our Philosophy</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="text-5xl md:text-7xl font-serif leading-[1.1]">
              {config.content.philosophyTitle}
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="text-stone-400 text-lg leading-relaxed max-w-sm font-light">
            {config.content.philosophyDescription}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="md:col-span-7 group relative">
            <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[2.5rem] relative">
              <img src={config.features.main} alt="Meditation Space" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
          <div className="md:col-span-5 flex flex-col gap-12 md:pt-24">
            {philosophyPillars.map((pillar, idx) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.2 }} className="flex flex-col group">
                <div className="aspect-square w-full mb-8 overflow-hidden rounded-[2.5rem] relative">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest font-bold">{pillar.tag}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;