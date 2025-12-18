
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, ConfigContextType } from '../types';

const DEFAULT_CONFIG: SiteConfig = {
  hero: {
    bg: "https://images.squarespace-cdn.com/content/v1/5c9b1392815512293441a1a7/1563254444535-W9O4E7W7P7W7W7W7W7W7/Ship+Inn+Stanley+Exterior.jpg",
    title: "Ship",
    subtitle: "Inn Stanley.",
    tagline: "A collection of heritage-listed sanctuaries nestled at the base of the iconic Circular Head Nut."
  },
  content: {
    aboutTitle: "About Us",
    aboutDescription: "At Ship Inn Stanley™ we specialize in connecting guests with exceptional Tasmanian hospitality. With years of expertise and a guest-first approach, we make heritage luxury simple and stress-free.",
    philosophyTitle: "A symphony of natural elegance.",
    philosophyDescription: "We believe luxury isn't about excess, but the perfect harmony between silence, space, and spirit."
  },
  rooms: [
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616594831818-844000302b0c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-3979ff6942bc?q=80&w=2070&auto=format&fit=crop'
  ],
  gallery: [
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506450654448-65f04e0ba6ad?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590515152220-4c407c742c0c?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff43c63faf76?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
  ],
  features: {
    main: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    spa: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db874?q=80&w=2070&auto=format&fit=crop',
    culinary: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop'
  },
  loading: [
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590515152220-4c407c742c0c?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506450654448-65f04e0ba6ad?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=500&auto=format&fit=crop'
  ],
  videoUrl: "https://www.youtube.com/embed/b0PwAGnD8Cc"
};

const STORAGE_KEY = 'shipinn_heritage_vault_v1';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure any new structure is handled
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved registry config", e);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useSiteConfig must be used within ConfigProvider');
  return context;
};
