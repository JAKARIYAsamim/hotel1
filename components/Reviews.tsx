
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  location: string;
  room: string;
  quote: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Alexander Vance",
    location: "London, UK",
    room: "The Heritage Suite",
    quote: "A symphony of history. The suite was more than a room; it was a conversation with time. Ship Inn understands the architecture of heritage luxury so well.",
    rating: 5
  },
  {
    id: 2,
    name: "Elena Rossini",
    location: "Milan, Italy",
    room: "Coastal Veranda Suite",
    quote: "The level of detail is staggering. From the curated Tasmanian timber to the specific weight of the woollen throws, Ship Inn has mastered the art of invisible luxury.",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Thorne",
    location: "Tokyo, Japan",
    room: "The Nut View Apartment",
    quote: "As someone who travels 300 days a year, I've seen it all. But the quiet strength of this historic building actually restored me. I left feeling more grounded.",
    rating: 5
  }
];

const InnerCardMarquee: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mt-12 overflow-hidden whitespace-nowrap opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
      <motion.div 
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 15, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        <span className="text-[7px] uppercase tracking-[0.4em] font-bold mr-8">
          Verified Guest • {text} • Ship Inn Stanley •
        </span>
        <span className="text-[7px] uppercase tracking-[0.4em] font-bold mr-8">
          Verified Guest • {text} • Ship Inn Stanley •
        </span>
      </motion.div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="py-60 px-6 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
        <motion.div 
          style={{ x: xTranslate }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[30vw] font-serif font-bold text-stone-900 tracking-tighter">
            VOICES & VOICES & VOICES
          </span>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-12 h-[1px] bg-stone-300"></span>
            <span className="text-stone-400 uppercase text-[10px] tracking-[0.6em] font-bold">The Guest Perspective</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl font-serif leading-[0.9] tracking-tighter text-stone-900"
          >
            Letters of <br/>
            <span className="italic text-stone-400">Gratitude</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-stone-200/40 bg-white/30 backdrop-blur-[2px]">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-16 border-r border-b border-stone-200/40 hover:bg-white/60 transition-all duration-700 group relative flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div>
                <div className="flex gap-1 mb-12">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-stone-300 group-hover:text-stone-900 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mb-20">
                  <p className="text-2xl md:text-3xl font-serif leading-snug text-stone-800 italic group-hover:text-stone-900 transition-colors">
                    "{review.quote}"
                  </p>
                </blockquote>
              </div>

              <div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900">{review.name}</span>
                  <span className="text-[11px] text-stone-400 italic font-light">{review.location}</span>
                </div>
                <InnerCardMarquee text={review.room} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
