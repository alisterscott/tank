import React, { useState, useEffect } from 'react';
import Fish from './Fish';
import Bubble from './Bubble';

const FishTank: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [fishCount] = useState(8);
  const [bubbleCount] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tankWidth = Math.min(dimensions.width - 40, 1200);
  const tankHeight = Math.min(dimensions.height - 120, 800);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-800 to-blue-900 flex items-center justify-center p-5">
      <div className="relative">
        {/* Tank container */}
        <div
          className="relative overflow-hidden rounded-2xl border-8 border-gray-300 shadow-2xl bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700"
          style={{ width: tankWidth, height: tankHeight }}
        >
          {/* Water effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
          
          {/* Light rays */}
          <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-white/20 to-transparent transform -skew-x-12 pointer-events-none"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-white/15 to-transparent transform skew-x-12 pointer-events-none"></div>
          
          {/* Sea floor */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700/50 via-transparent to-amber-700/50"></div>
          </div>
          
          {/* Decorative seaweed */}
          <div className="absolute bottom-0 left-8">
            <div className="w-2 h-24 bg-gradient-to-t from-green-800 to-green-600 rounded-t-full transform origin-bottom animate-pulse"></div>
          </div>
          <div className="absolute bottom-0 right-12">
            <div className="w-1.5 h-20 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full transform origin-bottom animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Rocks */}
          <div className="absolute bottom-2 left-20 w-8 h-4 bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
          <div className="absolute bottom-1 right-24 w-6 h-3 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full"></div>
          <div className="absolute bottom-3 left-1/2 w-5 h-3 bg-gradient-to-t from-gray-500 to-gray-400 rounded-full"></div>
          
          {/* Fish */}
          {Array.from({ length: fishCount }, (_, i) => (
            <Fish
              key={i}
              id={i}
              containerWidth={tankWidth}
              containerHeight={tankHeight - 50} // Account for sea floor
            />
          ))}
          
          {/* Bubbles */}
          {Array.from({ length: bubbleCount }, (_, i) => (
            <Bubble
              key={i}
              id={i}
              containerWidth={tankWidth}
              containerHeight={tankHeight}
            />
          ))}
        </div>
        
        {/* Tank label */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">🐠 Virtual Aquarium</h1>
          <p className="text-cyan-200 text-sm md:text-base">Watch the fish swim in their digital ocean</p>
        </div>
      </div>
    </div>
  );
};

export default FishTank;