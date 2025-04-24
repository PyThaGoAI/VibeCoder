
import React from 'react';
import { Code } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-ide-background">
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-6">
          <div className="text-4xl font-bold mr-3">VibeCoder</div>
          <div className="text-lg bg-gradient-premium text-black py-1 px-2.5 rounded">Beta</div>
        </div>
        
        <div className="relative h-1.5 w-64 bg-ide-border rounded-full overflow-hidden mb-6">
          <div className="absolute h-full bg-gradient-premium animate-pulse rounded-full" style={{ width: '70%' }}></div>
        </div>
        
        <div className="flex items-center space-x-2 text-ide-muted">
          <Code size={18} className="animate-pulse" />
          <span>Loading your development environment...</span>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-sm text-ide-muted flex gap-1.5">
        <div className="flex space-x-1.5">
          <div className="window-control bg-red-500"></div>
          <div className="window-control bg-yellow-500"></div>
          <div className="window-control bg-green-500"></div>
        </div>
        <span className="opacity-70">Ultra Modern IDE Experience</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
