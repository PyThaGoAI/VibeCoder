
import React from 'react';
import { FileJson } from 'lucide-react';

const JsonPanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <FileJson className="text-ide-accent" />
        <h2 className="text-lg font-semibold">JSON Tools</h2>
      </div>
      <div className="space-y-4">
        <button className="text-sm bg-ide-accent text-white px-3 py-1.5 rounded hover:bg-opacity-90 w-full">
          Format JSON
        </button>
        <textarea
          placeholder="Paste your JSON here..."
          className="w-full h-48 px-3 py-2 bg-ide-background border border-ide-border rounded text-sm font-mono"
        />
      </div>
    </div>
  );
};

export default JsonPanel;
