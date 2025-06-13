import React, { useEffect, useState } from 'react';

interface FishProps {
  id: number;
  containerWidth: number;
  containerHeight: number;
}

interface Position {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const Fish: React.FC<FishProps> = ({ id, containerWidth, containerHeight }) => {
  const [position, setPosition] = useState<Position>(() => ({
    x: Math.random() * (containerWidth - 120),
    y: Math.random() * (containerHeight - 80),
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
  }));

  // Generate random gradient colors for each fish
  const gradientColors = [
    ['#ff6b6b', '#ee5a24'],
    ['#4834d4', '#686de0'],
    ['#00d2d3', '#01a3a4'],
    ['#ff9ff3', '#f368e0'],
    ['#feca57', '#ff9f43'],
    ['#48dbfb', '#0abde3'],
    ['#1dd1a1', '#10ac84'],
    ['#fd79a8', '#e84393'],
    ['#fdcb6e', '#e17055'],
    ['#6c5ce7', '#a29bfe'],
  ];

  const fishGradient = gradientColors[id % gradientColors.length];
  // Generate a random size ONCE per fish, not on every render
  const [fishSize] = useState(0.8 + Math.random() * 0.4); // Random size between 0.8 and 1.2
  const gradientId = `fishGradient-${id}`;

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        let { x, y, dx, dy } = prev;
        x += dx;
        y += dy;
        // Bounce off walls
        if (x <= 0 || x >= containerWidth - 120) {
          dx = -dx;
          x = Math.max(0, Math.min(containerWidth - 120, x));
        }
        if (y <= 0 || y >= containerHeight - 80) {
          dy = -dy;
          y = Math.max(0, Math.min(containerHeight - 80, y));
        }
        // Random direction changes
        if (Math.random() < 0.01) {
          dx += (Math.random() - 0.5) * 0.5;
          dy += (Math.random() - 0.5) * 0.5;
          // Limit speed
          const speed = Math.sqrt(dx * dx + dy * dy);
          if (speed > 3) {
            dx = (dx / speed) * 3;
            dy = (dy / speed) * 3;
          }
        }
        return { x, y, dx, dy };
      });
    };
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [containerWidth, containerHeight]);

  const isMovingLeft = position.dx < 0;

  return (
    <div
      className="absolute transition-all duration-75 ease-linear"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${fishSize}) ${isMovingLeft ? 'scaleX(-1)' : ''}`,
      }}
    >
      <svg 
        width="100"
        height="100"
        viewBox="0 -0.5 25 25" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fishGradient[0]} />
            <stop offset="100%" stopColor={fishGradient[1]} />
          </linearGradient>
        </defs>
        {/* Fish body */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M5.5054 9.89526C5.55475 9.66558 5.72029 9.47825 5.94216 9.40102C6.16403 9.3238 6.41011 9.36785 6.5914 9.51726L7.9354 10.4173C8.11049 10.5229 8.32272 10.5475 8.51733 10.4848C8.71194 10.4221 8.86989 10.2782 8.9504 10.0903C11.4544 5.05926 17.6994 6.56326 19.4634 11.7773C19.512 11.922 19.512 12.0786 19.4634 12.2233C17.6994 17.4373 11.4544 18.9413 8.9504 13.9103C8.86953 13.7224 8.71124 13.5787 8.51641 13.5164C8.32158 13.4541 8.10931 13.4792 7.9344 13.5853L6.5904 14.4853C6.40884 14.6342 6.16278 14.6777 5.94115 14.6001C5.71952 14.5225 5.55438 14.3349 5.5054 14.1053C5.49312 14.0207 5.50348 13.9345 5.5354 13.8553L6.0994 12.2513C6.1558 12.0894 6.1558 11.9132 6.0994 11.7513L5.5364 10.1513C5.50306 10.0703 5.49235 9.98183 5.5054 9.89526Z" 
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Fish eye */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M16.4994 12.0002C16.4994 12.5525 16.0517 13.0002 15.4994 13.0002C14.9471 13.0002 14.4994 12.5525 14.4994 12.0002C14.4994 11.448 14.9471 11.0002 15.4994 11.0002C15.7646 11.0002 16.019 11.1056 16.2065 11.2931C16.394 11.4807 16.4994 11.735 16.4994 12.0002Z" 
          fill="white"
          stroke="rgba(0,0,0,0.8)" 
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Eye pupil */}
        <circle 
          cx="15.5" 
          cy="12" 
          r="0.3" 
          fill="black"
        />
        {/* Eye highlight */}
        <circle 
          cx="15.7" 
          cy="11.8" 
          r="0.15" 
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Fish;