import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "../../utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  // Trigger animation when 80% of the element is visible in the viewport
  const isInView = useInView(scope, { amount: 0.8, once: true });
  
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.05),
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-serif", className)}>
      <div className="mt-4">
        {/* Updated to Serif font for premium vibe, consistent Stone-900 color */}
        <div className="text-stone-900 text-2xl md:text-[2.5rem] font-serif leading-[1.3] tracking-tight">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};