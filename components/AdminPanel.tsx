
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '../context/ConfigContext';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'hero' | 'rooms' | 'gallery' | 'features' | 'loading' | 'content' | 'cinematic'>('hero');

  const MASTER_KEY = 'shipinn1849';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_KEY) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
      // Visual feedback for error
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleUpdate = (path: string, value: string) => {
    if (path.includes('.')) {
      const [parent, child] = path.split('.');
      updateConfig({
        [parent]: { ...(config as any)[parent], [child]: value }
      });
    } else {
      updateConfig({ [path]: value });
    }
  };

  const handleArrayUpdate = (key: 'rooms' | 'gallery' | 'loading', index: number, value: string) => {
    const newArray = [...config[key]];
    newArray[index] = value;
    updateConfig({ [key]: newArray });
  };

  const closePanel = () => {
    setIsOpen(false);
    // Optional: Reset authentication on close for security
    // setIsAuthenticated(false); 
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[100] w-12 h-12 bg-stone-900/20 hover:bg-stone-900 text-white/20 hover:text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span className="absolute left-14 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 pointer-events-none">Admin Panel</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] z-[1000] bg-stone-950 text-white shadow-2xl flex flex-col border-l border-white/10"
          >
            {!isAuthenticated ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={loginError ? "text-red-500 animate-shake" : "text-stone-500"}>
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl mb-4">Registry Access</h2>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold">Heritage Management System</p>
                </motion.div>

                <form onSubmit={handleLogin} className="w-full max-w-xs space-y-6">
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ENTER MASTER KEY"
                      className={`w-full bg-stone-900/50 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-4 text-center font-mono text-xs tracking-[0.5em] focus:outline-none focus:border-white/30 transition-all placeholder:text-stone-700`}
                      autoFocus
                    />
                    {loginError && (
                      <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute -bottom-6 left-0 w-full text-[8px] uppercase tracking-widest text-red-500 font-bold"
                      >
                        Access Denied // Invalid Key
                      </motion.span>
                    )}
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-white text-stone-950 text-[10px] uppercase tracking-[0.4em] font-bold rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    Authenticate
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-[9px] uppercase tracking-[0.3em] text-stone-600 hover:text-stone-400 transition-colors"
                  >
                    Return to Site
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-stone-900/50 backdrop-blur-md">
                  <div>
                    <h2 className="font-serif text-2xl">Site Curator</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">System Online // Authorized</p>
                    </div>
                  </div>
                  <button onClick={closePanel} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>

                <div className="flex overflow-x-auto border-b border-white/5 bg-stone-900/30">
                  {(['hero', 'rooms', 'gallery', 'features', 'loading', 'content', 'cinematic'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? 'border-white text-white bg-white/5' : 'border-transparent text-stone-600 hover:text-stone-400'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                  {activeTab === 'cinematic' && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Atmosphere Video URL</label>
                        <input 
                          type="text" 
                          value={config.videoUrl} 
                          onChange={(e) => handleUpdate('videoUrl', e.target.value)} 
                          className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]"
                          placeholder="YouTube URL or Embed ID"
                        />
                        <p className="text-[8px] text-stone-500 uppercase tracking-widest leading-relaxed">
                          Supports direct YouTube links and embed IDs. Video will be automatically muted for autoplay compliance.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'hero' && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Hero Background Image</label>
                        <input type="text" value={config.hero.bg} onChange={(e) => handleUpdate('hero.bg', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Hero Heading Part 1</label>
                        <input type="text" value={config.hero.title} onChange={(e) => handleUpdate('hero.title', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Hero Heading Part 2</label>
                        <input type="text" value={config.hero.subtitle} onChange={(e) => handleUpdate('hero.subtitle', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Hero Tagline</label>
                        <textarea value={config.hero.tagline} onChange={(e) => handleUpdate('hero.tagline', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px] h-24" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'content' && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">About Title</label>
                        <input type="text" value={config.content.aboutTitle} onChange={(e) => handleUpdate('content.aboutTitle', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">About Description</label>
                        <textarea value={config.content.aboutDescription} onChange={(e) => handleUpdate('content.aboutDescription', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px] h-32" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Philosophy Title</label>
                        <input type="text" value={config.content.philosophyTitle} onChange={(e) => handleUpdate('content.philosophyTitle', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Philosophy Description</label>
                        <textarea value={config.content.philosophyDescription} onChange={(e) => handleUpdate('content.philosophyDescription', e.target.value)} className="w-full bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px] h-32" />
                      </div>
                    </div>
                  )}

                  {(activeTab === 'rooms' || activeTab === 'gallery' || activeTab === 'loading') && (
                    <div className="space-y-8">
                      {config[activeTab].map((url, idx) => (
                        <div key={idx} className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{activeTab} Asset {idx + 1}</label>
                          <div className="flex gap-4">
                            <img src={url} className="w-16 h-16 object-cover rounded bg-stone-900" />
                            <input type="text" value={url} onChange={(e) => handleArrayUpdate(activeTab, idx, e.target.value)} className="flex-1 bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-8">
                      {(Object.keys(config.features) as Array<keyof typeof config.features>).map((key) => (
                        <div key={String(key)} className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Feature Image: {String(key)}</label>
                          <div className="flex gap-4">
                            <img src={config.features[key]} className="w-16 h-16 object-cover rounded bg-stone-900" />
                            <input type="text" value={config.features[key]} onChange={(e) => handleUpdate(`features.${String(key)}`, e.target.value)} className="flex-1 bg-stone-900 border border-white/10 rounded-lg p-3 font-mono text-[10px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-8 border-t border-white/10 bg-stone-900/50 flex gap-4">
                  <button onClick={resetConfig} className="flex-1 px-6 py-4 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors">Reset Defaults</button>
                  <button onClick={closePanel} className="flex-1 px-6 py-4 bg-white text-stone-950 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl">Commit Changes</button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
