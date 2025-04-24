
import React from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClearOutput: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ 
  output, 
  isExpanded, 
  onToggleExpand,
  onClearOutput
}) => {
  return (
    <div 
      className={`bg-ide-sidebar border-t border-ide-border transition-all-smooth overflow-hidden`}
      style={{ height: isExpanded ? '200px' : '30px' }}
    >
      <div className="flex justify-between items-center h-7 px-3 bg-ide-header border-b border-ide-border">
        <div className="flex items-center">
          <button 
            className="mr-2 hover:bg-ide-hover rounded p-0.5 transition-colors duration-200"
            onClick={onToggleExpand}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <span className="text-xs">Output</span>
        </div>
        
        <button 
          className="hover:bg-ide-hover rounded p-0.5 transition-colors duration-200"
          onClick={onClearOutput}
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="h-[calc(200px-28px)] bg-ide-background p-2 overflow-auto font-mono text-xs whitespace-pre-wrap">
          {output || 'No output'}
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
