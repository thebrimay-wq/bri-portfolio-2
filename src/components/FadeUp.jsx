import { motion, useReducedMotion } from 'framer-motion';

/**
 * FadeUp — reusable section reveal.
 * opacity 0→1, translateY 24→0, respects prefers-reduced-motion.
 */
export default function FadeUp({ children, delay = 0, duration = 0.65, className, style }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reduce ? 0 : duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
