
import React from 'react';
import { motion } from 'framer-motion';

const MarqueeSection: React.FC = () => {
  const words = [
    "Ship Inn Stanley",
    "Heritage Luxury",
    "Tasmanian Spirit",
    "Bespoke Comfort",
    "The Nut Vista",
    "Coastal Elegance"
  ];

  return (
    <section className="bg-stone-900 py-20 overflow-hidden border-y border-stone-800">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-20 pr-20"
        >
          {/* Repeat twice for seamless loop */}
          {[...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-20">
              <span className="text-[12vw] md:text-[8vw] font-serif font-bold text-white tracking-tighter leading-none">
                {word}
              </span>
              <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-stone-700" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;
