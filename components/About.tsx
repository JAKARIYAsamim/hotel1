import React from 'react';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { useSiteConfig } from '../context/ConfigContext';

const About: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section id="about" className="py-24 px-4 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
          <span className="text-stone-400 uppercase text-[11px] tracking-[0.2em] font-medium">{config.content.aboutTitle}</span>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <TextGenerateEffect words={config.content.aboutDescription} />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
           <div className="flex items-center gap-3 group">
             <svg className="w-6 h-6 text-stone-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
             <span className="font-bold text-lg font-sans tracking-tight text-stone-700">HeritageAward</span>
           </div>
           <div className="flex items-center gap-3 group">
             <svg className="w-6 h-6 text-stone-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.5 2 4 6.5 4 12s5 10 10 0c0-4-3-8-8-8z"/></svg>
             <span className="font-bold text-lg font-sans tracking-tight text-stone-700">EcoTas</span>
           </div>
           <div className="flex items-center gap-3 group">
             <svg className="w-6 h-6 text-stone-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
             <span className="font-bold text-lg font-sans tracking-tight text-stone-700">TrustedStay</span>
           </div>
           <div className="flex items-center gap-3 group">
             <svg className="w-6 h-6 text-stone-800" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z"/></svg>
             <span className="font-bold text-lg font-sans tracking-tight text-stone-700">GlobalElite</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;