import React, { useEffect, useState } from 'react';

interface BubbleProps {
  id: number;
  containerWidth: number;
  containerHeight: number;
}

const Bubble: React.FC<BubbleProps> = ({ id, containerWidth, containerHeight }) => {
  const [position, setPosition] = useState(() => ({
    x: Math.random() * containerWidth,
    y: containerHeight,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  const bubbleSize = 4 + Math.random() * 8;
  const speed = 1 + Math.random() * 2;

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        let { x, y, opacity } = prev;
        
        y -= speed;
        x += Math.sin(y * 0.01) * 0.5; // Slight horizontal wobble
        
        // Reset bubble when it reaches the top
        if (y < -20) {
          y = containerHeight + 20;
          x = Math.random() * containerWidth;
          opacity = 0.3 + Math.random() * 0.4;
        }
        
        return { x, y, opacity };
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [containerHeight, containerWidth, speed]);

  return (
    <div
      className="absolute rounded-full bg-gradient-to-t from-cyan-200 to-white shadow-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`,
        opacity: position.opacity,
      }}
    />
  );
};

export default Bubble;