import React from 'react';

interface LogoProps {
  size?: number;
}

export const NexusLogo: React.FC<LogoProps> = ({ size = 56 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="nexus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1a1a1a' }} />
          <stop offset="50%" style={{ stopColor: '#121212' }} />
          <stop offset="100%" style={{ stopColor: '#0a0a0a' }} />
        </linearGradient>
        <linearGradient id="nexus-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
          <stop offset="100%" style={{ stopColor: '#0891b2' }} />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#nexus-gradient)"
        filter="url(#glow)"
      />

      {/* Inner circle border */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />

      {/* Neural network nodes - representing AI connections */}
      <g opacity="0.9">
        {/* Center node (main) */}
        <circle cx="50" cy="50" r="6" fill="white"/>

        {/* Outer nodes */}
        <circle cx="50" cy="25" r="4" fill="url(#nexus-accent)"/>
        <circle cx="71" cy="35" r="4" fill="url(#nexus-accent)"/>
        <circle cx="71" cy="65" r="4" fill="url(#nexus-accent)"/>
        <circle cx="50" cy="75" r="4" fill="url(#nexus-accent)"/>
        <circle cx="29" cy="65" r="4" fill="url(#nexus-accent)"/>
        <circle cx="29" cy="35" r="4" fill="url(#nexus-accent)"/>

        {/* Connections (lines) */}
        <g stroke="white" strokeWidth="1.5" opacity="0.4">
          <line x1="50" y1="50" x2="50" y2="25"/>
          <line x1="50" y1="50" x2="71" y2="35"/>
          <line x1="50" y1="50" x2="71" y2="65"/>
          <line x1="50" y1="50" x2="50" y2="75"/>
          <line x1="50" y1="50" x2="29" y2="65"/>
          <line x1="50" y1="50" x2="29" y2="35"/>
        </g>

        {/* Outer ring connections */}
        <g stroke="url(#nexus-accent)" strokeWidth="1" opacity="0.3">
          <line x1="50" y1="25" x2="71" y2="35"/>
          <line x1="71" y1="35" x2="71" y2="65"/>
          <line x1="71" y1="65" x2="50" y2="75"/>
          <line x1="50" y1="75" x2="29" y2="65"/>
          <line x1="29" y1="65" x2="29" y2="35"/>
          <line x1="29" y1="35" x2="50" y2="25"/>
        </g>
      </g>

      {/* Letter "N" stylized in the center */}
      <g transform="translate(50, 50)">
        <path
          d="M -8 -12 L -8 12 M -8 -12 L 8 12 M 8 -12 L 8 12"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
      </g>

      {/* Outer border */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
      />
    </svg>
  );
};
