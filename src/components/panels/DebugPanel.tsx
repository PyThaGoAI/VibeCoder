
import React from 'react';
import { Bug, Play, RefreshCw } from 'lucide-react'; // Changed from 'Refresh' to 'RefreshCw'

const DebugPanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Bug className="text-ide-accent" />
        <h2 className="text-lg font-semibold">Debug</h2>
        <RefreshCw size={16} className="ml-auto text-ide-muted hover:text-ide-foreground cursor-pointer" />
      </div>
      
      <button className="flex items-center gap-2 justify-center text-sm bg-ide-accent text-white px-3 py-2 rounded hover:bg-opacity-90 mb-4">
        <Play size={14} />
        Start Debugging
      </button>
      
      <div className="text-sm text-ide-muted">
        No active debug sessions
      </div>
    </div>
  );
};

export default DebugPanel;
