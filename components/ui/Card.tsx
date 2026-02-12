import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, glow = false }) => {
  const baseClass = 'glass-card';
  const hoverClass = hover ? '' : 'hover:transform-none hover:shadow-md';
  const glowClass = glow ? 'glow-purple' : '';

  return (
    <div className={`${baseClass} ${hoverClass} ${glowClass} ${className}`}>
      {children}
    </div>
  );
};
