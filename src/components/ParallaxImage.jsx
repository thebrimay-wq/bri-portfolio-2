import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ParallaxImage — image with subtle upward parallax + hover scale.
 * The image moves upward slightly slower than surrounding content
 * (translateY range: +20px → -20px as element scrolls through viewport).
 * Hover scales to 1.02 with a smooth premium transition.
 * Respects prefers-reduced-motion.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  style,
  parallaxRange = 20,   // px — keep small for restraint
  hoverScale = 1.02,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [parallaxRange, -parallaxRange]
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        whileHover={reduce ? {} : { scale: hoverScale }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}
