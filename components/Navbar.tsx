
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: '01' },
    { name: 'Archive', href: '#gallery', id: '02' },
    { name: 'Sanctuaries', href: '#rooms', id: '03' },
    { name: 'Reviews', href: '#reviews', id: '04' },
    { name: 'Inquire', href: '#contact', id: '05' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Ghost Frame Navigation */}
      <div className="fixed inset-x-0 top-0 z-[100] pointer-events-none p-8 md:p-12 flex justify-between items-start">
        {/* Brand - Top Left */}
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <div className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl tracking-tighter text-stone-900 group-hover:italic transition-all duration-500">Ship Inn.</span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-stone-400 font-bold mt-1">Stanley</span>
          </div>
        </motion.a>

        {/* Triggers - Top Right */}
        <div className="flex items-center gap-8 md:gap-16 pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="group flex flex-col items-end gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 group-hover:text-stone-400 transition-colors">Menu</span>
            <div className="w-8 h-[1px] bg-stone-900 group-hover:w-12 transition-all duration-500" />
          </button>

          <a href="#contact" className="hidden md:block relative overflow-hidden px-10 py-4 bg-stone-900 text-white rounded-full group">
            <span className="relative z-10 text-[9px] uppercase tracking-[0.4em] font-bold">Reserve</span>
            <div className="absolute inset-0 bg-stone-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </div>
      </div>

      {/* Full Screen Exhibition Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-stone-50 flex flex-col"
          >
            {/* Menu Header (Closing Button) */}
            <div className="p-8 md:p-12 flex justify-end">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col items-end gap-2"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900">Close</span>
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute w-8 h-[1px] bg-stone-900 rotate-45" />
                  <span className="absolute w-8 h-[1px] bg-stone-900 -rotate-45" />
                </div>
              </button>
            </div>

            {/* Menu Body - Editorial Index Style */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 px-8 md:px-24 overflow-y-auto lg:overflow-visible">
              <div className="lg:col-span-8 flex flex-col justify-center space-y-4 py-20 lg:py-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a 
                      href={link.href} 
                      onClick={handleLinkClick}
                      className="group flex items-baseline gap-8 md:gap-16"
                    >
                      <span className="text-stone-300 font-serif text-2xl md:text-3xl italic tabular-nums">{link.id}</span>
                      <span className="text-5xl md:text-9xl font-serif tracking-tighter text-stone-900 group-hover:italic group-hover:text-stone-400 transition-all duration-700">
                        {link.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar Detail (Right) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="hidden lg:flex lg:col-span-4 flex-col justify-center border-l border-stone-200 pl-24 space-y-24"
              >
                <div>
                  <h5 className="text-[9px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-6 italic">Registry</h5>
                  <div className="space-y-2">
                    <p className="text-xl font-serif text-stone-900">+61 3 6458 1234</p>
                    <p className="text-xl font-serif text-stone-900">stay@shipinnstanley.com.au</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-[9px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-6 italic">Coordinates</h5>
                  <p className="text-xl font-serif text-stone-900">40.7629° S <br/> 145.2974° E</p>
                </div>
                <div className="flex gap-8">
                  {['Instagram', 'Journal', 'Archive'].map(item => (
                    <a key={item} href="#" className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 hover:text-stone-900 transition-colors">{item}</a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Menu Footer */}
            <div className="p-8 md:p-12 border-t border-stone-100 flex justify-between items-center text-[8px] uppercase tracking-[0.5em] text-stone-400 font-bold">
              <span>© 2025 Ship Inn Stanley</span>
              <span className="hidden md:block">Heritage Accommodations — All Rights Reserved</span>
              <span>Available — Season '25</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
