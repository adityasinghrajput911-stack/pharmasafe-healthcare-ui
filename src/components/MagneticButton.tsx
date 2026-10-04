import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  maxOffset?: number; // max translation in pixels (default 5px)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  maxOffset = 5,
  onClick,
  disabled,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Smooth tight spring physics as requested (stiffness: 300, damping: 15)
  const springConfig = { stiffness: 300, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Constrain offset between -maxOffset and maxOffset
    const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, (distanceX / (rect.width / 2)) * maxOffset));
    const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, (distanceY / (rect.height / 2)) * maxOffset));

    x.set(constrainedX);
    y.set(constrainedY);
  };

  const handleMouseLeave = () => {
    // Snap back to origin
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};
