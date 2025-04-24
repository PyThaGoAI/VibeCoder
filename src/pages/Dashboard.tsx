
import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { toast } from 'sonner';

const mockRecentFiles = [
  { id: 'main.py', name: 'main.py', lastOpened: '10 min ago' },
  { id: 'utils.py', name: 'utils.py', lastOpened: '35 min ago' },
  { id: 'data.csv', name: 'data.csv', lastOpened: '2h ago' },
  { id: 'config.json', name: 'config.json', lastOpened: '1d ago' },
];

const DashboardPage: React.FC = () => {
  const handleFileSelect = (fileId: string) => {
    toast.info(`Opening file: ${fileId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-ide-background">
      <Header 
        onRun={() => toast.info('Run command triggered from Dashboard')}
        onSettings={() => toast.info('Settings opened from Dashboard')}
        onTerminal={() => toast.info('Terminal opened from Dashboard')}
        isMobile={false}
      />
      <Dashboard 
        recentFiles={mockRecentFiles}
        stats={{
          totalFiles: 24,
          codeLines: 3247,
          activeTime: '12h 45m',
          collaborators: 4
        }}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

export default DashboardPage;
