
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { FileItem } from './FileExplorer';
import { Split, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditorProps {
  openFiles: FileItem[];
  activeFileId: string | null;
  onFileChange: (fileId: string, content: string) => void;
  onFileClose: (fileId: string) => void;
  onActiveFileChange: (fileId: string) => void;
  onSplitViewToggle: () => void;
  isSplitView: boolean;
}

const Editor: React.FC<EditorProps> = ({ 
  openFiles, 
  activeFileId, 
  onFileChange, 
  onFileClose, 
  onActiveFileChange,
  onSplitViewToggle,
  isSplitView 
}) => {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const isMobile = useIsMobile();
  
  const activeFile = openFiles.find(file => file.id === activeFileId);
  const otherFiles = isSplitView ? openFiles.filter(file => file.id !== activeFileId) : [];
  const secondaryFile = otherFiles.length > 0 ? otherFiles[0] : null;

  // Effect to disable split view on mobile devices
  useEffect(() => {
    if (isMobile && isSplitView) {
      onSplitViewToggle();
    }
  }, [isMobile, isSplitView, onSplitViewToggle]);

  const handleEditorChange = (value: string, viewUpdate: any) => {
    if (activeFileId) {
      onFileChange(activeFileId, value);
    }

    // Update cursor position
    const selection = viewUpdate.state.selection.main;
    const line = viewUpdate.state.doc.lineAt(selection.head);
    setCursorPos({
      line: line.number,
      col: selection.head - line.from + 1
    });
  };

  return (
    <div className="flex flex-col h-full bg-ide-active-background">
      {/* Tabs */}
      <div className="flex items-center h-9 bg-ide-header border-b border-ide-border overflow-x-auto">
        {openFiles.map(file => (
          <div 
            key={file.id}
            className={`ide-tab ${file.id === activeFileId ? 'active' : ''}`}
            onClick={() => onActiveFileChange(file.id)}
          >
            <span className="truncate max-w-[120px]">{file.name}</span>
            <button 
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.id);
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Toolbar - Don't show split button on mobile */}
      <div className="flex items-center h-8 px-2 bg-[#333] border-b border-ide-border">
        {!isMobile && (
          <button 
            className="ide-button flex items-center gap-1"
            onClick={onSplitViewToggle}
          >
            <Split size={14} />
            <span>Split</span>
          </button>
        )}
      </div>

      {/* Editor Area */}
      <div className={`flex flex-grow ${isSplitView ? 'flex-row' : 'flex-col'}`}>
        <div className={`${isSplitView ? 'w-1/2' : 'w-full'} h-full border-r border-ide-border`}>
          {activeFile ? (
            <CodeMirror
              value={activeFile.content || ''}
              height="100%"
              theme={oneDark}
              extensions={[
                python(), 
                EditorView.lineWrapping,
              ]}
              onChange={handleEditorChange}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                autocompletion: true,
                closeBrackets: true,
                foldGutter: true,
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-ide-foreground opacity-50">
              Open a file to start editing
            </div>
          )}
        </div>
        
        {isSplitView && (
          <div className="w-1/2 h-full">
            {secondaryFile ? (
              <CodeMirror
                value={secondaryFile.content || ''}
                height="100%"
                theme={oneDark}
                extensions={[python(), EditorView.lineWrapping]}
                onChange={(value) => onFileChange(secondaryFile.id, value)}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  autocompletion: true,
                  closeBrackets: true,
                  foldGutter: true,
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-ide-foreground opacity-50">
                Open a second file to view here
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status bar with cursor position - hide on mobile */}
      <div className={`${isMobile ? 'hidden' : 'absolute'} bottom-[25px] left-[220px] right-[300px] flex justify-between items-center h-6 px-3 py-1 text-xs bg-ide-header border-t border-ide-border`}>
        <span>
          Ln {cursorPos.line}, Col {cursorPos.col}
        </span>
      </div>
    </div>
  );
};

export default Editor;
