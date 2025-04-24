
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ide-background text-ide-foreground">
      <div className="p-6">
        <Link to="/" className="ide-button flex items-center gap-2 mb-6 w-fit">
          <ArrowLeft size={16} />
          Back to IDE
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-ide-panel border border-ide-border rounded-lg p-6 text-center">
          <p className="text-lg mb-4">Settings page coming soon</p>
          <p className="text-ide-muted">This page is under development</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
