import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string; // light vs dark custom radial spotlight
}

/**
 * SpotlightCard
 * Tracks clientX and clientY within the card to render a subtle, cursor-following
 * radial gradient mask/glow that is visible strictly when hovered.
 * Pointer-events are set to none on the overlay to preserve input & dropdown interactivity.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor,
  ...rest
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-visible ${className}`}
      {...rest}
    >
      {/* The Cursor-Tracking Spotlight Layer (No pointer events, preserves all clicks/dropdowns) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 ease-out dark:hidden"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, rgba(226, 232, 240, 0.45), transparent 75%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 ease-out hidden dark:block"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, rgba(51, 65, 85, 0.50), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
};
