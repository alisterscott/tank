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

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-cyan-900 via-blue-800 to-blue-900 flex items-center justify-center p-0 m-0">
      <div className="relative w-full h-full">
        {/* Tank container */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700 w-full h-full"
          style={{ width: '100vw', height: '100vh' }}
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
              containerWidth={dimensions.width}
              containerHeight={dimensions.height - 50} // Account for sea floor
            />
          ))}
          
          {/* Bubbles */}
          {Array.from({ length: bubbleCount }, (_, i) => (
            <Bubble
              key={i}
              id={i}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
            />
          ))}
        </div>
        
        {/* Tank label */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Juiced Fish</h1>
        </div>
      </div>
    </div>
  );
};

export default FishTank;