import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  // Fixed variants type error by casting the object to any
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Fixed variants type error by casting the object to any
  const itemVariants: any = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="contact" className="py-60 px-6 bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
      
      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-32 items-stretch">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:w-5/12 flex flex-col justify-between"
          >
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
                <span className="w-16 h-[1px] bg-stone-500"></span>
                <span className="text-stone-500 uppercase text-[10px] tracking-[0.8em] font-bold">Registry & Access</span>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-8xl md:text-[9.5rem] font-serif leading-[0.85] tracking-tighter mb-20">
                Let us <br/>
                <span className="italic text-stone-500">host</span> <br/>
                you.
              </motion.h2>

              <motion.p variants={itemVariants} className="text-stone-400 text-xl font-light leading-relaxed max-w-sm mb-20 border-l border-stone-800 pl-10 italic">
                "Our team is at your disposal to craft a stay that resonates with the rich heritage of Stanley."
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-12">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-bold mb-4">Direct</h4>
                  <p className="text-lg font-serif text-stone-300">+61 3 6458 1234</p>
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] text-stone-600 font-bold mb-4">Digital</h4>
                  <p className="text-lg font-serif text-stone-300">stay@shipinnstanley.com.au</p>
                </div>
              </div>
              
              <div className="pt-12 border-t border-stone-800 flex justify-between items-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">7331 Stanley, TAS</span>
                <div className="flex gap-6">
                  {['IG', 'FB', 'TR'].map(s => (
                    <a key={s} href="#" className="text-[10px] text-stone-600 hover:text-white transition-colors">{s}</a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:w-7/12 relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              // Fixed easing type error by casting ease array to any
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
              className="h-full bg-stone-850/50 backdrop-blur-3xl border border-stone-800/50 p-12 md:p-24 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-stone-700/30 rounded-full hidden lg:block" />
              
              <div className="mb-20">
                <h3 className="text-3xl font-serif text-white mb-4">Personal Inquiry</h3>
                <p className="text-stone-500 text-sm font-light">Fields marked with an asterisk are required for our tailored hospitality.</p>
              </div>

              <form className="space-y-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="peer w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-all placeholder:text-transparent"
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name"
                      className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:font-bold pointer-events-none"
                    >
                      Your Name *
                    </label>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="peer w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-all placeholder:text-transparent"
                      placeholder="Email"
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:font-bold pointer-events-none"
                    >
                      Email Address *
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <select 
                    id="stay-type"
                    className="peer w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-stone-900" value="leisure">Leisure Retreat</option>
                    <option className="bg-stone-900" value="heritage">Heritage Discovery</option>
                    <option className="bg-stone-900" value="coastal">Coastal Escape</option>
                  </select>
                  <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold">Purpose of Stay</label>
                  <div className="absolute right-0 bottom-4 pointer-events-none">
                    <svg className="w-4 h-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    rows={4}
                    className="peer w-full bg-transparent border-b border-stone-800 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-all placeholder:text-transparent resize-none"
                    placeholder="Message"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-placeholder-shown:font-serif peer-placeholder-shown:capitalize peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:font-bold pointer-events-none"
                    >
                    A Note to the Team
                  </label>
                </div>

                <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <p className="text-[10px] text-stone-600 italic max-w-[200px] leading-relaxed">
                    Personal data is handled with the utmost discretion.
                  </p>
                  
                  <button className="group relative w-full md:w-auto overflow-hidden bg-white text-stone-900 px-16 py-8 transition-all hover:bg-stone-200">
                    <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] font-bold">Submit Request</span>
                    <div className="absolute inset-0 bg-stone-100 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none py-10 opacity-5">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[15vw] font-serif italic text-white"
        >
          Ship Inn Stanley — Crafted for the Sublime — Ship Inn Stanley — Crafted for the Sublime — 
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;