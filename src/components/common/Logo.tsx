import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background rounded square */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="20"
          ry="20"
          fill="url(#gradient)"
        />
        
        {/* Checkmark */}
        <path
          d="M30 50 L42 62 L70 34"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Pencil/Edit icon */}
        <path
          d="M65 25 L75 35 L45 65 L35 65 L35 55 Z"
          fill="white"
          opacity="0.9"
        />
        <path
          d="M65 25 L70 20 L80 30 L75 35 Z"
          fill="white"
          opacity="0.7"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;