
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, ConfigContextType } from '../types';

const DEFAULT_CONFIG: SiteConfig = {
  hero: {
    bg: "https://shipinnstanley.com.au/wp-content/uploads/2023/11/Ship-Inn-Stanley-main-page-cropped.jpg",
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
    'https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/homes/2019/10/09/20726/ship-inn-stanley.jpg?fit=1920%2C1600',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxrERsdXB0dfbLOCqXY89-Pgca9Cwqfu0gg&s'
  ],
  gallery: [
    'https://www.thehotelguru.com/_images/2f/2a/2f2a6fac598a0a5a7dfe560cfdb10861/s1654x900.jpg',
    'https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/homes/2019/10/09/20726/ship-inn-stanley.jpg?fit=1920%2C1600',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/286490881.jpg?k=a3a2c31f3ab8cb6e4cf57fafe1300699c71db0e46662a8822d1ccb0781e295e6&o=',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/7a/59/c4/ship-inn-stanley.jpg?w=700&h=-1&s=1',
    'https://a0.muscache.com/im/pictures/miso/Hosting-38085970/original/849c52b1-2450-41cc-a10d-dc8f90b3db4d.jpeg?im_w=720',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxrERsdXB0dfbLOCqXY89-Pgca9Cwqfu0gg&s',
    'https://stanleyandtarkine.com.au/wp-content/uploads/2023/06/ship-inn-stanley-accommodation-2.jpg',
    'https://www.hotelscombined.co.uk/himg/37/70/08/expedia_group-722997-234553690-788764.jpg'
  ],
  features: {
    main: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    spa: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db874?q=80&w=2070&auto=format&fit=crop',
    culinary: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop'
  },
  loading: [
    'https://www.thehotelguru.com/_images/2f/2a/2f2a6fac598a0a5a7dfe560cfdb10861/s1654x900.jpg',
    'https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/homes/2019/10/09/20726/ship-inn-stanley.jpg?fit=1920%2C1600',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/286490881.jpg?k=a3a2c31f3ab8cb6e4cf57fafe1300699c71db0e46662a8822d1ccb0781e295e6&o=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxrERsdXB0dfbLOCqXY89-Pgca9Cwqfu0gg&s'
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
