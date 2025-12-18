import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomShowcase from './components/RoomShowcase';
import Reviews from './components/Reviews';
import ConciergeChat from './components/ConciergeChat';
import Footer from './components/Footer';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import MarqueeSection from './components/MarqueeSection';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import AdminPanel from './components/AdminPanel';
import VideoShowcase from './components/VideoShowcase';
import { ConfigProvider } from './context/ConfigContext';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-stone-200 selection:text-stone-900">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`${isLoading ? 'invisible' : 'visible'} transition-all duration-0`}>
        <Navbar />
        
        <main>
          <Hero isParentLoading={isLoading} />
          
          <div className="space-y-0">
            <About />
            <Gallery />
            <VideoShowcase />
            <MarqueeSection />
            <RoomShowcase />
            <Reviews />
            <Contact />
            
            <section className="py-40 px-4 bg-stone-100 text-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-5 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,0,0,0.2)_0%,transparent_70%)]" />
               </div>
               
               <div className="relative z-10">
                 <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-5xl md:text-7xl font-serif mb-12 text-stone-900 leading-tight"
                 >
                   Ready for your <br/>
                   <span className="italic text-stone-400">next chapter?</span>
                 </motion.h2>
                 <a href="#contact" className="inline-block group relative overflow-hidden bg-stone-900 text-white px-10 py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase transition-all hover:pr-14">
                   <span className="relative z-10">Book Your Stay</span>
                   <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                 </a>
               </div>
            </section>
          </div>
        </main>

        <Footer />
        <ConciergeChat />
        <AdminPanel />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;