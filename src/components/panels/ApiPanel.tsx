
import React from 'react';
import { Globe } from 'lucide-react';

const ApiPanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="text-ide-accent" />
        <h2 className="text-lg font-semibold">API Testing</h2>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter API endpoint..."
          className="w-full px-3 py-1.5 bg-ide-background border border-ide-border rounded text-sm"
        />
        <select className="w-full px-3 py-1.5 bg-ide-background border border-ide-border rounded text-sm">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <button className="text-sm bg-ide-accent text-white px-3 py-1.5 rounded hover:bg-opacity-90 w-full">
          Send Request
        </button>
      </div>
    </div>
  );
};

export default ApiPanel;
