
import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Plus, 
  FilePlus, 
  FileEdit, 
  FileX, 
  RefreshCcw,
  Upload,
  Download,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ChangedFile {
  id: string;
  path: string;
  status: 'added' | 'modified' | 'deleted';
}

const GitPanel: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useState<string>('main');
  const [isCommitting, setIsCommitting] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [files, setFiles] = useState<ChangedFile[]>([
    { id: '1', path: 'src/components/Editor.tsx', status: 'modified' },
    { id: '2', path: 'src/utils/fileUtils.ts', status: 'added' },
    { id: '3', path: 'README.md', status: 'modified' },
    { id: '4', path: 'package.json', status: 'modified' },
    { id: '5', path: 'src/deprecated/OldComponent.tsx', status: 'deleted' }
  ]);

  const handleStageAll = () => {
    toast.success('All changes staged');
  };

  const handleCommit = () => {
    if (!commitMessage.trim()) {
      toast.error('Please enter a commit message');
      return;
    }
    
    toast.success('Changes committed successfully');
    setCommitMessage('');
    setIsCommitting(false);
  };

  const handlePush = () => {
    toast.success('Changes pushed to remote');
  };

  const handlePull = () => {
    toast.success('Latest changes pulled from remote');
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'added': return <FilePlus size={14} className="git-status-added" />;
      case 'modified': return <FileEdit size={14} className="git-status-modified" />;
      case 'deleted': return <FileX size={14} className="git-status-deleted" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 flex items-center justify-between border-b border-ide-border">
        <div className="flex items-center gap-2">
          <GitBranch size={14} className="text-ide-accent" />
          <span className="text-sm font-medium">{currentBranch}</span>
        </div>
        <div className="flex gap-1">
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={handlePull}
            title="Pull"
          >
            <Download size={14} />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={handlePush}
            title="Push"
          >
            <Upload size={14} />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            title="Refresh"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-3 border-b border-ide-border">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">Changes</h3>
          <button 
            className="text-xs hover:bg-ide-hover px-1.5 py-0.5 rounded flex items-center gap-1"
            onClick={handleStageAll}
          >
            <Check size={12} />
            Stage All
          </button>
        </div>
        
        <div className="space-y-1 max-h-[200px] overflow-y-auto">
          {files.map(file => (
            <div key={file.id} className="git-changed-file">
              {getStatusIcon(file.status)}
              <span className="text-xs truncate">{file.path}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3">
        {isCommitting ? (
          <div className="space-y-2">
            <textarea 
              className="w-full bg-ide-background border border-ide-border rounded p-2 text-sm resize-none"
              placeholder="Enter commit message..."
              rows={3}
              value={commitMessage}
              onChange={e => setCommitMessage(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button 
                className="ide-button text-xs"
                onClick={() => setIsCommitting(false)}
              >
                Cancel
              </button>
              <button 
                className="ide-button-primary text-xs flex items-center gap-1"
                onClick={handleCommit}
              >
                <GitCommit size={12} />
                Commit
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="ide-button w-full flex items-center justify-center gap-1"
            onClick={() => setIsCommitting(true)}
          >
            <GitCommit size={14} />
            Commit Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default GitPanel;
