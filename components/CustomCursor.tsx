import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'view' | 'close' | 'input'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-end spring physics for that "luxury fluid" feel
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const updateCursorContext = useCallback((target: HTMLElement) => {
    // Check for explicit data-cursor attribute first
    const explicitText = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');
    
    if (explicitText) {
      setHoverState('view');
      setCursorText(explicitText);
      return;
    }

    // Context detection
    const isLink = target.tagName === 'A' || target.closest('a');
    const isButton = target.tagName === 'BUTTON' || target.closest('button');
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    const isClose = target.getAttribute('aria-label')?.toLowerCase().includes('close') || 
                    target.textContent?.toLowerCase().includes('close') ||
                    target.closest('[onclick*="onClose"]') ||
                    target.closest('[onclick*="setIsOpen(false)"]');

    if (isInput) {
      setHoverState('input');
      setCursorText('');
    } else if (isClose) {
      setHoverState('close');
      setCursorText('Close');
    } else if (isLink || isButton) {
      setHoverState('link');
      // Set specific text for buttons if it's "Reserve" or "Explore"
      const textContent = (target.textContent || '').trim();
      if (textContent.toLowerCase().includes('reserve')) setCursorText('Book');
      else if (textContent.toLowerCase().includes('explore')) setCursorText('Explore');
      else if (textContent.toLowerCase().includes('perspective')) setCursorText('Explore');
      else setCursorText('');
    } else {
      setHoverState('default');
      setCursorText('');
    }
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorContext(e.target as HTMLElement);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible, updateCursorContext]);

  if (typeof window === 'undefined') return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Outer Luxury Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-stone-900 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
          borderWidth: '0.5px'
        }}
        animate={{
          scale: isClicking ? 0.8 : (hoverState !== 'default' ? 2 : 1),
          opacity: isClicking ? 1 : (hoverState !== 'default' ? 0.4 : 0.8),
          backgroundColor: hoverState === 'view' || hoverState === 'close' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
      
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-stone-900 rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverState !== 'default' ? 0 : 1,
        }}
      />

      {/* Contextual Label - Fixed duplicate property error and refactored for smooth tracking */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              x: mouseX,
              y: mouseY,
              left: 35,
              top: -10
            }}
            className="fixed top-0 left-0 pointer-events-none"
          >
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-stone-900 mix-blend-difference whitespace-nowrap bg-white/10 backdrop-blur-sm px-3 py-1 rounded-sm">
              {cursorText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Mode Indicator */}
      {hoverState === 'input' && (
        <motion.div
          className="fixed top-0 left-0 w-[1px] h-6 bg-stone-900 mix-blend-difference"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </div>
  );
};

export default CustomCursor;