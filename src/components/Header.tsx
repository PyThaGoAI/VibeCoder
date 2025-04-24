
import React, { useState } from 'react';
import { 
  Play, 
  Settings as SettingsIcon, 
  Terminal, 
  Save, 
  User, 
  ChevronDown, 
  Package, 
  Image, 
  File, 
  FileText, 
  Menu,
  Command,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface HeaderProps {
  onRun: () => void;
  onSettings: () => void;
  onTerminal: () => void;
  onMobileMenuToggle?: () => void;
  onCommandPalette?: () => void;
  onTutorial?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onRun, 
  onSettings, 
  onTerminal,
  onMobileMenuToggle,
  onCommandPalette,
  onTutorial,
  isMobile
}) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const [isNewMenuOpen, setIsNewMenuOpen] = useState<boolean>(false);
  
  return (
    <header className="h-12 flex items-center justify-between px-2 bg-ide-header border-b border-ide-border shadow-sm backdrop-blur-md dark:bg-gradient-dark dark:shadow-lg dark:shadow-black/20">
      {/* Left section */}
      <div className="flex items-center">
        {isMobile && (
          <button 
            className="mr-2 p-1 hover:bg-ide-hover rounded dark:hover:bg-ide-hover"
            onClick={onMobileMenuToggle}
          >
            <Menu size={20} />
          </button>
        )}
        
        <div className="relative">
          <button 
            className="ide-button flex items-center gap-2 glow-border"
            onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
          >
            <span>New</span>
            <ChevronDown size={14} />
          </button>
          
          {isNewMenuOpen && (
            <div 
              className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-ide-panel border border-ide-border z-10 dark:bg-ide-active-background dark:border-white/5 dark:shadow-xl dark:shadow-black/40"
              onMouseLeave={() => setIsNewMenuOpen(false)}
            >
              <div className="py-1">
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">
                  <File size={16} />
                  <span>New File</span>
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">
                  <FileText size={16} />
                  <span>New Project</span>
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">
                  <Package size={16} />
                  <span>Install Package</span>
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">
                  <Image size={16} />
                  <span>Add Image</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button 
          className="ide-button ml-2 flex items-center gap-1 glow-border"
          onClick={() => {
            if (onCommandPalette) onCommandPalette();
            else toast.info('Command palette shortcut: Ctrl+K / ⌘+K');
          }}
        >
          <Command size={14} />
          <span className={isMobile ? 'hidden' : ''}>Command</span>
          <kbd className="hidden sm:inline-flex items-center justify-center ml-1 px-1.5 py-0.5 text-xs bg-ide-hover dark:bg-[#1a1f2c] rounded border border-ide-border dark:border-[#2d3748] font-mono">⌘K</kbd>
        </button>
        
        <button 
          className="ide-button ml-2 flex items-center gap-1 glow-border"
          onClick={() => {
            if (onTutorial) onTutorial();
            else toast.info('Tutorial will help you get started');
          }}
        >
          <HelpCircle size={14} />
          <span className={isMobile ? 'hidden' : ''}>Help</span>
        </button>
      </div>
      
      {/* Center section with title */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold tracking-wide glow-text">VibeCoder IDE</h1>
      </div>
      
      {/* Right section */}
      <div className="flex items-center space-x-2">
        <button 
          className="ide-button-primary flex items-center gap-1"
          onClick={onRun}
        >
          <Play size={14} />
          <span className={isMobile ? 'hidden' : ''}>Run</span>
        </button>
        
        <button 
          className="ide-button flex items-center gap-1 glow-border"
          onClick={onTerminal}
        >
          <Terminal size={14} />
          <span className={isMobile ? 'hidden' : ''}>Terminal</span>
        </button>
        
        <button 
          className="ide-button flex items-center gap-1 glow-border"
          onClick={onSettings}
        >
          <SettingsIcon size={14} />
          <span className={isMobile ? 'hidden' : ''}>Settings</span>
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-premium text-white hover:opacity-90 transition-opacity dark:shadow-glow"
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          >
            <User size={16} />
          </button>
          
          {isAccountMenuOpen && (
            <div 
              className="absolute top-full right-0 mt-1 w-48 rounded-md shadow-lg bg-ide-panel border border-ide-border z-10 dark:bg-ide-active-background dark:shadow-xl dark:border-white/5"
              onMouseLeave={() => setIsAccountMenuOpen(false)}
            >
              <div className="py-1">
                <div className="px-4 py-2 border-b border-ide-border dark:border-opacity-20">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-ide-muted">user@example.com</p>
                </div>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">Profile</button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">Export Project</button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">Settings</button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-ide-hover dark:hover:bg-ide-hover/70">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
