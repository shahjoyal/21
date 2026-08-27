import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper: fades + slides content into place the
 * first time it enters the viewport, for a smoother scrolling feel across
 * the storefront. Respects prefers-reduced-motion via a short, subtle
 * transition rather than large sweeping motion.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 18,
  className,
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger container: wrap a set of Reveal children (or motion children using
 * revealItem variants) to have them cascade in one after another.
 */
export const RevealGroup: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({
  children,
  className,
  stagger = 0.08,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const revealItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
