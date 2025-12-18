import React from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  size: string;
}

export interface Amenity {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  hero: {
    bg: string;
    title: string;
    subtitle: string;
    tagline: string;
  };
  content: {
    aboutTitle: string;
    aboutDescription: string;
    philosophyTitle: string;
    philosophyDescription: string;
  };
  rooms: string[]; // 6 images
  gallery: string[]; // 8 images
  features: {
    main: string;
    spa: string;
    culinary: string;
  };
  loading: string[]; // 4 images
  videoUrl: string;
}

export interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: any) => void;
  resetConfig: () => void;
}