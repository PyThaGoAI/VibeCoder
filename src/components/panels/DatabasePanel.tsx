
import React from 'react';
import { Database } from 'lucide-react';

const DatabasePanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <Database className="text-ide-accent" />
        <h2 className="text-lg font-semibold">Database</h2>
      </div>
      <div className="space-y-4">
        <button className="text-sm bg-ide-accent text-white px-3 py-1.5 rounded hover:bg-opacity-90 w-full">
          Connect Database
        </button>
        <div className="p-3 rounded border border-ide-border">
          <p className="text-sm text-ide-muted">No active connections</p>
        </div>
      </div>
    </div>
  );
};

export default DatabasePanel;
