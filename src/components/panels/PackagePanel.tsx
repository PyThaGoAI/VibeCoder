
import React from 'react';
import { Package } from 'lucide-react';

const PackagePanel = () => {
  return (
    <div className="h-full p-4 bg-ide-background text-ide-foreground">
      <div className="flex items-center gap-2 mb-4">
        <Package className="text-ide-accent" />
        <h2 className="text-lg font-semibold">Package Manager</h2>
      </div>
      <div className="space-y-4">
        <div className="p-3 rounded border border-ide-border">
          <h3 className="text-sm font-medium mb-2">Installed Packages</h3>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span>react</span>
              <span className="text-ide-muted">^18.3.1</span>
            </li>
            <li className="flex justify-between">
              <span>typescript</span>
              <span className="text-ide-muted">^5.0.0</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackagePanel;
