
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Terminal as TerminalIcon, 
  RefreshCw, 
  PlusSquare, 
  Settings,
  CheckSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isVisible, onClose }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'problems'>('terminal');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
    
    if (isVisible && history.length === 0) {
      setHistory([
        'Welcome to VibeCoder Terminal v1.2.0',
        'Type "help" for a list of commands',
        ''
      ]);
    }
  }, [isVisible, history.length]);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Automatically expand on mobile
  useEffect(() => {
    if (isMobile && isVisible) {
      setIsExpanded(true);
    }
  }, [isMobile, isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add command to history
    const newHistory = [...history, `> ${input}`];
    
    // Process command
    const command = input.trim().toLowerCase();
    
    setHistory(newHistory);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
    
    // Simulate processing
    setIsProcessing(true);
    
    setTimeout(() => {
      let response: string[] = [];
      
      switch (command) {
        case 'help':
          response = [
            'Available commands:',
            '  help - Show this help message',
            '  clear - Clear the terminal',
            '  run - Run the current file',
            '  version - Show VibeCoder version',
            '  exit - Close the terminal'
          ];
          break;
        case 'clear':
          setHistory([]);
          setIsProcessing(false);
          return;
        case 'version':
          response = ['VibeCoder v1.2.0 (build 2025-04-12)'];
          break;
        case 'run':
          response = [
            'Executing main.py...',
            'Welcome to Modern IDE!',
            'Hello, User!'
          ];
          break;
        case 'exit':
          onClose();
          return;
        default:
          if (command.startsWith('echo ')) {
            response = [command.substring(5)];
          } else {
            response = [`Command not found: ${command}`, 'Type "help" for a list of commands'];
          }
      }
      
      setHistory(prev => [...prev, ...response, '']);
      setIsProcessing(false);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
        return;
      }
      
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      // Simple tab completion for commands
      const commands = ['help', 'clear', 'run', 'version', 'exit', 'echo '];
      const currentInput = input.toLowerCase();
      
      if (currentInput) {
        const matched = commands.find(cmd => cmd.startsWith(currentInput));
        if (matched) {
          setInput(matched);
        }
      }
    }
  };
  
  const handleCopy = () => {
    const text = history.join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Terminal output copied to clipboard');
  };
  
  if (!isVisible) return null;

  // Calculate terminal height based on various conditions
  let terminalHeight = "h-80";
  if (isExpanded) terminalHeight = "top-0 h-full";
  else if (isMobile) terminalHeight = "h-[75vh]";

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 ${terminalHeight} 
      bg-ide-background border-t border-ide-border flex flex-col transition-all z-40 
      shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]`}
    >
      <div className="flex items-center justify-between p-2 bg-ide-header border-b border-ide-border">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1.5">
            <div 
              className="window-control bg-red-500 cursor-pointer" 
              onClick={onClose} 
              title="Close terminal"
            ></div>
            <div 
              className="window-control bg-yellow-500 cursor-pointer" 
              onClick={() => setIsExpanded(!isExpanded)} 
              title={isExpanded ? "Minimize terminal" : "Maximize terminal"}
            ></div>
            <div 
              className="window-control bg-green-500 cursor-pointer" 
              onClick={handleCopy} 
              title="Copy terminal content"
            ></div>
          </div>
          
          <div className="flex border-b border-transparent">
            <button 
              className={`px-3 py-1 text-xs font-medium flex items-center gap-1.5 
              ${activeTab === 'terminal' ? 'border-b-2 border-ide-accent text-ide-accent' : 'text-ide-muted hover:text-ide-foreground'}`}
              onClick={() => setActiveTab('terminal')}
            >
              <TerminalIcon size={12} />
              Terminal
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium flex items-center gap-1.5 
              ${activeTab === 'output' ? 'border-b-2 border-ide-accent text-ide-accent' : 'text-ide-muted hover:text-ide-foreground'}`}
              onClick={() => setActiveTab('output')}
            >
              <CheckSquare size={12} />
              Output
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium flex items-center gap-1.5 
              ${activeTab === 'problems' ? 'border-b-2 border-ide-accent text-ide-accent' : 'text-ide-muted hover:text-ide-foreground'}`}
              onClick={() => setActiveTab('problems')}
            >
              <Settings size={12} />
              Problems
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={() => setHistory([])}
            title="Clear terminal"
          >
            <RefreshCw size={14} />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={() => toast.info('New terminal created')}
            title="New terminal"
          >
            <PlusSquare size={14} />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Minimize terminal" : "Maximize terminal"}
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={onClose}
            title="Close terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-grow bg-ide-active-background overflow-auto p-2 font-mono text-xs dark:bg-[#1a1f2c]"
      >
        {history.map((line, index) => (
          <div key={index} className={`${line.startsWith('>') ? 'text-ide-info' : 'text-ide-foreground'} mb-1`}>
            {line}
          </div>
        ))}
        {isProcessing && (
          <div className="text-ide-accent flex items-center gap-1">
            <RefreshCw size={12} className="animate-spin" />
            Processing...
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center border-t border-ide-border bg-ide-active-background p-2 dark:bg-[#1a1f2c]">
        <span className="text-ide-accent mr-2 font-mono text-xs">$</span>
        <input 
          ref={inputRef}
          type="text" 
          className="flex-grow bg-transparent border-none outline-none text-ide-foreground font-mono text-xs"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or 'help'"
        />
      </form>
    </div>
  );
};

export default Terminal;
