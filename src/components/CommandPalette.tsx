
import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, FileText, Settings, Play, Code, Package, RefreshCw, X, Star } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CommandItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: 'file' | 'action' | 'view' | 'settings';
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCode: () => void;
  onOpenFile?: (fileId: string) => void;
  onSettings?: () => void;
  recentFiles?: Array<{ id: string, name: string }>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose, 
  onRunCode,
  onOpenFile,
  onSettings,
  recentFiles = []
}) => {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Define commands
  const commands: CommandItem[] = [
    {
      id: 'run',
      name: 'Run current file',
      icon: <Play size={18} className="text-ide-success" />,
      shortcut: '⌘R',
      action: () => {
        onRunCode();
        toast.success('Running current file');
        onClose();
      },
      category: 'action'
    },
    {
      id: 'settings',
      name: 'Open settings',
      icon: <Settings size={18} className="text-ide-info" />,
      shortcut: '⌘,',
      action: () => {
        if (onSettings) onSettings();
        onClose();
      },
      category: 'settings'
    },
    {
      id: 'format',
      name: 'Format document',
      icon: <Code size={18} className="text-ide-accent" />,
      shortcut: '⇧⌘P',
      action: () => {
        toast.success('Document formatted');
        onClose();
      },
      category: 'action'
    },
    {
      id: 'install',
      name: 'Install package',
      icon: <Package size={18} className="text-ide-warning" />,
      action: () => {
        toast('Opening package installer');
        onClose();
      },
      category: 'action'
    },
    {
      id: 'restart',
      name: 'Restart application',
      icon: <RefreshCw size={18} className="text-ide-muted" />,
      action: () => {
        toast('Restarting application...');
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      category: 'action'
    },
    ...recentFiles.map(file => ({
      id: `file-${file.id}`,
      name: `Open ${file.name}`,
      icon: <FileText size={18} className="text-ide-muted" />,
      action: () => {
        if (onOpenFile) onOpenFile(file.id);
        onClose();
      },
      category: 'file' as const
    })),
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter(command => 
    command.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[activeIndex]) {
            filteredCommands[activeIndex].action();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, filteredCommands, isOpen, onClose]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeItem = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div className="command-palette" onClick={onClose}>
      <div 
        className="w-[600px] max-w-[90vw] bg-white/90 dark:bg-[#131723] rounded-lg shadow-xl border border-ide-border dark:border-white/10 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-ide-border dark:border-[#2d3748]">
          <Command className="mx-3 text-ide-muted" size={16} />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Type a command or search..."
            className="command-palette-input"
            autoComplete="off"
          />
          <button 
            className="p-2 mx-2 rounded hover:bg-ide-hover dark:hover:bg-[#1e2433]"
            onClick={onClose}
          >
            <X size={16} className="text-ide-muted" />
          </button>
        </div>

        <div ref={resultsRef} className="command-palette-results">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-ide-muted">
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <div
                key={command.id}
                data-index={index}
                className={`command-palette-item ${activeIndex === index ? 'bg-ide-hover dark:bg-[#1e2433]' : ''}`}
                onClick={() => command.action()}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="flex-shrink-0">{command.icon}</span>
                <span className="flex-grow">{command.name}</span>
                {command.shortcut && (
                  <kbd className="px-2 py-1 text-xs bg-ide-background dark:bg-[#0a0c13] rounded">
                    {command.shortcut}
                  </kbd>
                )}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-ide-border dark:border-[#2d3748] p-2 text-xs text-center text-ide-muted">
          ↑↓ to navigate • Enter to select • Esc to close
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
