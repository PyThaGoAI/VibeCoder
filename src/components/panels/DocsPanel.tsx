
import React from 'react';
import { BookOpen } from 'lucide-react';

const DocsPanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-ide-accent" />
        <h2 className="text-lg font-semibold">Documentation</h2>
      </div>
      <div className="space-y-4">
        <input
          type="search"
          placeholder="Search documentation..."
          className="w-full px-3 py-1.5 bg-ide-background border border-ide-border rounded text-sm"
        />
        <div className="space-y-2">
          <div className="p-2 hover:bg-ide-hover rounded cursor-pointer">
            <h3 className="text-sm font-medium">Getting Started</h3>
            <p className="text-xs text-ide-muted">Learn the basics of the IDE</p>
          </div>
          <div className="p-2 hover:bg-ide-hover rounded cursor-pointer">
            <h3 className="text-sm font-medium">Keyboard Shortcuts</h3>
            <p className="text-xs text-ide-muted">View all keyboard shortcuts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPanel;
