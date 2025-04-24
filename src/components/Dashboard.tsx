
import React from 'react';
import { 
  Activity, Clock, Code, FileText, Star, 
  GitBranch, MessageSquare, Box, Users 
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface DashboardProps {
  recentFiles?: Array<{ id: string; name: string; lastOpened: string }>;
  stats?: {
    totalFiles: number;
    codeLines: number;
    activeTime: string;
    collaborators: number;
  };
  onFileSelect?: (fileId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  recentFiles = [],
  stats = {
    totalFiles: 12,
    codeLines: 1458,
    activeTime: '4h 23m',
    collaborators: 3
  },
  onFileSelect 
}) => {
  const commitHistory = [
    { message: 'Update main function', author: 'User', time: '2h ago', hash: 'a1b2c3d' },
    { message: 'Fix styling issues', author: 'Collaborator', time: '1d ago', hash: '4e5f6g' },
    { message: 'Initial commit', author: 'User', time: '3d ago', hash: '7h8i9j' }
  ];
  
  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 glow-text flex items-center gap-2">
          <Activity size={24} className="text-ide-accent" />
          Project Dashboard
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-ide-info" />
              <span className="text-xs text-ide-muted">FILES</span>
            </div>
            <span className="stat-value">{stats.totalFiles}</span>
            <span className="stat-label">Total files in project</span>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Code size={16} className="text-ide-warning" />
              <span className="text-xs text-ide-muted">CODE</span>
            </div>
            <span className="stat-value">{stats.codeLines}</span>
            <span className="stat-label">Lines of code</span>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-ide-success" />
              <span className="text-xs text-ide-muted">TIME</span>
            </div>
            <span className="stat-value">{stats.activeTime}</span>
            <span className="stat-label">Active coding time</span>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-ide-accent" />
              <span className="text-xs text-ide-muted">TEAM</span>
            </div>
            <span className="stat-value">{stats.collaborators}</span>
            <span className="stat-label">Collaborators</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="dashboard-card mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-ide-info" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {recentFiles.length > 0 ? (
                  recentFiles.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-ide-hover dark:hover:bg-[#1e2433] cursor-pointer"
                      onClick={() => onFileSelect && onFileSelect(file.id)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-ide-muted" />
                        <span>{file.name}</span>
                      </div>
                      <span className="text-xs text-ide-muted">{file.lastOpened}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-ide-muted text-sm">
                    No recent files found
                  </div>
                )}
                
                {recentFiles.length > 0 && (
                  <button className="ide-button w-full flex justify-center items-center gap-2 mt-2">
                    <span>View all activity</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code size={18} className="text-ide-warning" />
                Code Snippet
              </h2>
              
              <div className="code-snippet">
                <div className="code-snippet-header">
                  <span className="text-xs font-medium">main.py</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-ide-hover dark:hover:bg-[#1e2433] rounded">
                      <Star size={14} className="text-ide-muted" />
                    </button>
                    <button className="p-1 hover:bg-ide-hover dark:hover:bg-[#1e2433] rounded">
                      <Code size={14} className="text-ide-muted" />
                    </button>
                  </div>
                </div>
                <pre className="code-snippet-content">
                  <span className="text-blue-600 dark:text-blue-400">def</span>{" "}
                  <span className="text-yellow-600 dark:text-yellow-300">greet</span>
                  (name):
                  {"\n"}{"  "}
                  <span className="text-green-600 dark:text-green-400">"""A simple greeting function"""</span>
                  {"\n"}{"  "}
                  <span className="text-blue-600 dark:text-blue-400">return</span> f
                  <span className="text-green-600 dark:text-green-400">"Hello, {"{"}name{"}"}!"</span>
                  {"\n\n"}
                  <span className="text-purple-600 dark:text-purple-400"># Call the function</span>
                  {"\n"}
                  <span className="text-yellow-600 dark:text-yellow-300">print</span>(greet(
                  <span className="text-green-600 dark:text-green-400">"User"</span>))
                </pre>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="dashboard-card mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GitBranch size={18} className="text-ide-success" />
                Git Activity
              </h2>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Current branch:</span>
                <span className="ide-badge flex items-center gap-1">
                  <GitBranch size={12} />
                  main
                </span>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="recent-commits" className="border-ide-border dark:border-[#2d3748]">
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    Recent Commits
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      {commitHistory.map((commit, index) => (
                        <div 
                          key={index} 
                          className="p-2 rounded hover:bg-ide-hover dark:hover:bg-[#1e2433] cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-ide-accent font-mono text-xs">{commit.hash.slice(0, 7)}</span>
                            <span className="text-xs text-ide-muted">{commit.time}</span>
                          </div>
                          <div className="mt-1">{commit.message}</div>
                          <div className="text-xs text-ide-muted mt-1">by {commit.author}</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-4">
                <button className="ide-button w-full flex justify-center items-center gap-2 mt-2">
                  <GitBranch size={14} />
                  <span>View repository</span>
                </button>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-ide-accent" />
                Comments & Notes
              </h2>
              
              <div className="space-y-3">
                <div className="p-2 border-l-2 border-ide-warning bg-ide-warning/5 rounded">
                  <div className="flex items-center gap-2 text-xs text-ide-muted mb-1">
                    <span>TODO</span>
                    <span>•</span>
                    <span>main.py:42</span>
                  </div>
                  <p className="text-sm">Implement error handling for API responses</p>
                </div>
                
                <div className="p-2 border-l-2 border-ide-info bg-ide-info/5 rounded">
                  <div className="flex items-center gap-2 text-xs text-ide-muted mb-1">
                    <span>NOTE</span>
                    <span>•</span>
                    <span>utils.py:15</span>
                  </div>
                  <p className="text-sm">Consider refactoring this function for better performance</p>
                </div>
                
                <div className="p-2 border-l-2 border-ide-danger bg-ide-danger/5 rounded">
                  <div className="flex items-center gap-2 text-xs text-ide-muted mb-1">
                    <span>BUG</span>
                    <span>•</span>
                    <span>data.py:87</span>
                  </div>
                  <p className="text-sm">Fix potential division by zero error</p>
                </div>
              </div>
              
              <button className="ide-button w-full flex justify-center items-center gap-2 mt-4">
                <Box size={14} />
                <span>Manage project tasks</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
