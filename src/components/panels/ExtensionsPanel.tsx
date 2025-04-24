
import React from 'react';
import { PlusSquare } from 'lucide-react';

const ExtensionsPanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <PlusSquare className="text-ide-accent" />
        <h2 className="text-lg font-semibold">Extensions</h2>
      </div>
      <div className="space-y-4">
        <input
          type="search"
          placeholder="Search extensions..."
          className="w-full px-3 py-1.5 bg-ide-background border border-ide-border rounded text-sm"
        />
        <div className="space-y-2">
          <div className="p-2 hover:bg-ide-hover rounded cursor-pointer">
            <h3 className="text-sm font-medium">Python</h3>
            <p className="text-xs text-ide-muted">Language support for Python</p>
          </div>
          <div className="p-2 hover:bg-ide-hover rounded cursor-pointer">
            <h3 className="text-sm font-medium">Git History</h3>
            <p className="text-xs text-ide-muted">View git log, file or line history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPanel;
