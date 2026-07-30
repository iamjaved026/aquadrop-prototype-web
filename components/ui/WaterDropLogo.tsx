import React from 'react';

interface WaterDropLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const WaterDropLogo: React.FC<WaterDropLogoProps> = ({
  size = 64,
  className = '',
  glow = true
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute rounded-full bg-sky-400/30 blur-xl animate-pulse-ring"
          style={{ width: size * 1.4, height: size * 1.4 }}
        />
      )}
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-md transition-transform hover:scale-105"
      >
        <defs>
          <linearGradient id="dropOuterGrad" x1="50" y1="0" x2="50" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="dropInnerGrad" x1="30" y1="30" x2="70" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="dropHighlight" x1="30" y1="15" x2="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Drop Contour */}
        <path
          d="M50 8C50 8 12 58 12 80C12 101 29 118 50 118C71 118 88 101 88 80C88 58 50 8 50 8Z"
          fill="url(#dropOuterGrad)"
        />

        {/* Inner Curved Water Loop (Glass Swirl) */}
        <path
          d="M50 22C50 22 24 62 24 80C24 94.4 35.6 106 50 106C64.4 106 76 94.4 76 80C76 72 70 63 62 57"
          fill="none"
          stroke="url(#dropInnerGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Specular Light Reflection curve */}
        <path
          d="M32 46C26 60 26 76 30 86"
          stroke="url(#dropHighlight)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
