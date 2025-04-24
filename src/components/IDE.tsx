import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileExplorer, { FileItem } from './FileExplorer';
import Editor from './Editor';
import OutputPanel from './OutputPanel';
import RightSidebar from './RightSidebar';
import StatusBar from './StatusBar';
import Terminal from './Terminal';
import Settings from './Settings';
import SearchPanel from './SearchPanel';
import GitPanel from './GitPanel';
import SnippetsLibrary from './SnippetsLibrary';
import DebugPanel from './panels/DebugPanel';
import ExtensionsPanel from './panels/ExtensionsPanel';
import DatabasePanel from './panels/DatabasePanel';
import ApiPanel from './panels/ApiPanel';
import JsonPanel from './panels/JsonPanel';
import PackagePanel from './panels/PackagePanel';
import DocsPanel from './panels/DocsPanel';
import AiAssistant from './AiAssistant';
import CollaborationPanel from './CollaborationPanel';
import CommandPalette from './CommandPalette';
import Tutorial from './Tutorial';
import { toast } from 'sonner';
import { 
  Search, 
  GitBranch,
  Code, 
  Terminal as TerminalIcon,
  Settings as SettingsIcon,
  Folder,
  PanelRight,
  Code as CodeIcon,
  Search as SearchIcon,
  GitBranch as GitBranchIcon,
  Globe,
  BookOpen,
  PlusSquare,
  Play,
  Database,
  Bug,
  FileJson,
  Package,
  MessageCircle,
  Users,
  HelpCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DEFAULT_FILES: FileItem[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: 'main.py',
        name: 'main.py',
        type: 'file',
        content: 'print("Welcome to Modern IDE!")\n\n# This is a Python code editor\n# Try running this code!\n\ndefault_message = "Hello, world!"\n\ndef greet(name):\n    """A simple greeting function"""\n    return f"Hello, {name}!"\n\n# Call the function\nprint(greet("User"))'
      },
      {
        id: 'utils.py',
        name: 'utils.py',
        type: 'file',
        content: 'def add(a, b):\n    """Add two numbers"""\n    return a + b\n\ndef subtract(a, b):\n    """Subtract b from a"""\n    return a - b\n\ndef multiply(a, b):\n    """Multiply two numbers"""\n    return a * b\n\ndef divide(a, b):\n    """Divide a by b"""\n    if b == 0:\n        raise ValueError("Cannot divide by zero")\n    return a / b'
      }
    ]
  },
  {
    id: 'data',
    name: 'data',
    type: 'folder',
    expanded: false,
    children: [
      {
        id: 'data.csv',
        name: 'data.csv',
        type: 'file',
        content: 'id,name,age\n1,Alice,28\n2,Bob,32\n3,Charlie,45\n4,David,19\n5,Eva,37'
      }
    ]
  }
];

const STORAGE_KEY = 'modern-ide-state';

const IDE: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>(DEFAULT_FILES);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [output, setOutput] = useState<string>('');
  const [outputExpanded, setOutputExpanded] = useState<boolean>(false);
  const [splitView, setSplitView] = useState<boolean>(false);
  
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeSidePanel, setActiveSidePanel] = useState<string>('files');
  const [rightPanelVisible, setRightPanelVisible] = useState<boolean>(true);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isCollaborationOpen, setIsCollaborationOpen] = useState<boolean>(false);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState<boolean>(false);
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const { files, openFiles, activeFileId, output } = JSON.parse(savedState);
        setFiles(files || DEFAULT_FILES);
        setOpenFiles(openFiles || []);
        setActiveFileId(activeFileId || null);
        setOutput(output || '');
      }
    } catch (err) {
      console.error('Failed to load state from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    try {
      const state = {
        files,
        openFiles,
        activeFileId,
        output
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save state to localStorage:', err);
    }
  }, [files, openFiles, activeFileId, output]);

  useEffect(() => {
    if (isMobile) {
      setRightPanelVisible(false);
      setLeftSidebarCollapsed(true);
    } else {
      setRightPanelVisible(true);
      setLeftSidebarCollapsed(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('has-seen-tutorial');
    if (!hasSeenTutorial && isFirstVisit) {
      setTimeout(() => {
        setIsTutorialOpen(true);
        setIsFirstVisit(false);
        localStorage.setItem('has-seen-tutorial', 'true');
      }, 2000);
    }
  }, [isFirstVisit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        handleRunCode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFileId, openFiles]);

  const handleFileSelect = (file: FileItem) => {
    if (file.type === 'file') {
      const isOpen = openFiles.some(f => f.id === file.id);
      
      if (!isOpen) {
        setOpenFiles([...openFiles, file]);
      }
      
      setActiveFileId(file.id);
    }
  };

  const handleFileChange = (fileId: string, content: string) => {
    setOpenFiles(prevOpenFiles => 
      prevOpenFiles.map(file => 
        file.id === fileId ? { ...file, content } : file
      )
    );
    
    const updateFileInStructure = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === fileId) {
          return { ...item, content };
        } else if (item.children) {
          return { ...item, children: updateFileInStructure(item.children) };
        }
        return item;
      });
    };
    
    setFiles(updateFileInStructure(files));
  };

  const handleFileClose = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    if (activeFileId === fileId) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1].id : null);
    }
  };

  const handleRunCode = () => {
    const activeFile = openFiles.find(file => file.id === activeFileId);
    
    if (activeFile) {
      setOutputExpanded(true);
      setOutput(prev => {
        const timestamp = new Date().toLocaleTimeString();
        return `${prev ? prev + '\n\n' : ''}Running ${activeFile.name}...
---------------------------------------
> ${timestamp}
Output:

[Code execution simulated]`;
      });
      
      setTimeout(() => {
        if (activeFile.id.endsWith('.py')) {
          const output = `Executed Python code successfully.\nCode:\n${activeFile.content}`;
          setOutput(prev => `${prev}\n${output}`);
          toast.success("Code executed successfully!");
        } else {
          setOutput(prev => `${prev}\nCannot execute non-Python file.`);
          toast.error("Cannot execute non-Python file.");
        }
      }, 500);
    } else {
      toast.error("No file is open for execution.");
    }
  };

  const handleClearOutput = () => {
    setOutput('');
    toast("Output cleared");
  };

  const handleSaveCode = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        files,
        openFiles,
        activeFileId,
        output
      }));
      toast.success("Code saved successfully!");
    } catch (err) {
      toast.error("Failed to save code.");
      console.error('Failed to save code:', err);
    }
  };

  const toggleSidePanel = (panel: string) => {
    if (isMobile) {
      setLeftSidebarCollapsed(false);
    }
    setActiveSidePanel(activeSidePanel === panel ? 'files' : panel);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed);
  };

  const openTutorial = () => {
    setIsTutorialOpen(true);
  };

  const renderLeftSidePanel = () => {
    switch (activeSidePanel) {
      case 'files':
        return (
          <FileExplorer 
            files={files} 
            onFileSelect={handleFileSelect} 
            onFileStructureChange={setFiles}
          />
        );
      case 'search':
        return <SearchPanel />;
      case 'git':
        return <GitPanel />;
      case 'debug':
        return <DebugPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      case 'database':
        return <DatabasePanel />;
      case 'api':
        return <ApiPanel />;
      case 'json':
        return <JsonPanel />;
      case 'npm':
        return <PackagePanel />;
      case 'docs':
        return <DocsPanel />;
      case 'snippets':
        return <SnippetsLibrary />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ide-background text-ide-foreground">
      <Header 
        onRun={handleRunCode}
        onSettings={() => setIsSettingsOpen(true)}
        onTerminal={() => setIsTerminalVisible(!isTerminalVisible)}
        onMobileMenuToggle={toggleLeftSidebar}
        isMobile={isMobile}
      />
      
      <div className="flex flex-grow overflow-hidden">
        <div className={`${leftSidebarCollapsed && !isMobile ? 'w-10' : isMobile ? (leftSidebarCollapsed ? 'w-0' : 'w-full absolute z-30 left-0 top-[48px] h-[calc(100vh-48px)]') : 'w-[260px]'} 
                         transition-all duration-300 ease-in-out flex h-full bg-ide-sidebar`}>
          
          <div className={`${leftSidebarCollapsed && !isMobile ? 'w-10' : isMobile && leftSidebarCollapsed ? 'w-0' : 'w-10'} 
                          h-full border-r border-ide-border bg-[#111] flex flex-col items-center py-2 transition-all duration-300`}>
            
            <div className="flex-1 flex flex-col items-center space-y-4">
              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'files' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('files')}
                title="Files Explorer"
              >
                <Folder size={18} className={activeSidePanel === 'files' ? 'text-white' : ''} />
              </button>
              
              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'search' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('search')}
                title="Search in Files"
              >
                <Search size={18} className={activeSidePanel === 'search' ? 'text-white' : ''} />
              </button>
              
              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'git' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('git')}
                title="Source Control"
              >
                <GitBranch size={18} className={activeSidePanel === 'git' ? 'text-white' : ''} />
              </button>
              
              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'debug' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('debug')}
                title="Run and Debug"
              >
                <Bug size={18} className={activeSidePanel === 'debug' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'extensions' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('extensions')}
                title="Extensions"
              >
                <PlusSquare size={18} className={activeSidePanel === 'extensions' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'database' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('database')}
                title="Database"
              >
                <Database size={18} className={activeSidePanel === 'database' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'api' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('api')}
                title="API Testing"
              >
                <Globe size={18} className={activeSidePanel === 'api' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'json' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('json')}
                title="JSON Tools"
              >
                <FileJson size={18} className={activeSidePanel === 'json' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'npm' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('npm')}
                title="Package Manager"
              >
                <Package size={18} className={activeSidePanel === 'npm' ? 'text-white' : ''} />
              </button>

              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'docs' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('docs')}
                title="Documentation"
              >
                <BookOpen size={18} className={activeSidePanel === 'docs' ? 'text-white' : ''} />
              </button>
              
              <button 
                className={`p-1.5 rounded ${activeSidePanel === 'snippets' ? 'bg-ide-accent' : 'hover:bg-ide-hover'}`}
                onClick={() => toggleSidePanel('snippets')}
                title="Code Snippets"
              >
                <Code size={18} className={activeSidePanel === 'snippets' ? 'text-white' : ''} />
              </button>
              
              <button 
                className={`p-1.5 rounded hover:bg-ide-hover mt-4`}
                onClick={openTutorial}
                title="Tutorial"
              >
                <HelpCircle size={18} />
              </button>
            </div>

            <div className="mt-auto flex flex-col space-y-4 mb-4">
              <button
                className="p-1.5 rounded bg-gradient-premium hover:opacity-90 transition-opacity group relative"
                onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
                title="AI Assistant"
              >
                <MessageCircle size={18} className="text-black" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  AI Assistant
                </span>
              </button>
              
              <button
                className="p-1.5 rounded bg-ide-accent hover:opacity-90 transition-opacity group relative"
                onClick={() => setIsCollaborationOpen(!isCollaborationOpen)}
                title="Collaborators"
              >
                <Users size={18} className="text-white" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Collaborators
                </span>
              </button>
            </div>
          </div>

          {(!leftSidebarCollapsed || (isMobile && !leftSidebarCollapsed)) && (
            <div className={`${isMobile ? 'w-full' : 'w-[220px]'} h-full bg-ide-sidebar overflow-hidden transition-all duration-300`}>
              {renderLeftSidePanel()}
            </div>
          )}
        
          {!isMobile && (
            <button 
              className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-ide-background border border-ide-border rounded-r-md py-5 px-1 transition-all duration-300"
              style={{ 
                left: leftSidebarCollapsed ? '10px' : '260px' 
              }}
              onClick={toggleLeftSidebar}
            >
              {leftSidebarCollapsed ? <PanelRight size={16} className="transform rotate-180" /> : <PanelRight size={16} />}
            </button>
          )}
        </div>
        
        <div className={`flex-grow flex flex-col overflow-hidden transition-all duration-300 ${isMobile && !leftSidebarCollapsed ? 'opacity-30' : 'opacity-100'}`}>
          <Editor 
            openFiles={openFiles} 
            activeFileId={activeFileId}
            onFileChange={handleFileChange}
            onFileClose={handleFileClose}
            onActiveFileChange={setActiveFileId}
            onSplitViewToggle={() => setSplitView(!splitView)}
            isSplitView={splitView}
          />
          
          <OutputPanel 
            output={output} 
            isExpanded={outputExpanded} 
            onToggleExpand={() => setOutputExpanded(!outputExpanded)} 
            onClearOutput={handleClearOutput}
          />
        </div>
        
        <div className={`relative transition-all duration-300 ${rightPanelVisible ? 'w-[300px]' : 'w-0'}`}>
          <button 
            className="absolute right-full top-1/2 transform -translate-y-1/2 z-10 bg-ide-background border border-ide-border rounded-l-md py-5 px-1"
            onClick={() => setRightPanelVisible(!rightPanelVisible)}
          >
            <PanelRight size={16} className={`transform ${!rightPanelVisible && 'rotate-180'}`} />
          </button>
          
          {rightPanelVisible && (
            <RightSidebar 
              onRunCode={handleRunCode}
              onClearOutput={handleClearOutput}
              onSettings={() => setIsSettingsOpen(true)}
            />
          )}
        </div>
      </div>
      
      <StatusBar 
        onTerminalClick={() => setIsTerminalVisible(!isTerminalVisible)} 
      />
      
      <Terminal 
        isVisible={isTerminalVisible} 
        onClose={() => setIsTerminalVisible(false)} 
      />
      
      <Settings 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <AiAssistant 
        isOpen={isAiAssistantOpen} 
        onClose={() => setIsAiAssistantOpen(false)} 
      />
      
      <CollaborationPanel 
        isOpen={isCollaborationOpen}
        onClose={() => setIsCollaborationOpen(false)}
      />
      
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onRunCode={handleRunCode}
        onOpenFile={(fileId) => {
          const file = files.flatMap(f => f.type === 'folder' && f.children ? f.children : [f])
            .find(f => f.id === fileId);
          if (file) handleFileSelect(file);
        }}
        onSettings={() => setIsSettingsOpen(true)}
        recentFiles={openFiles.map(f => ({ id: f.id, name: f.name }))}
      />
      
      <Tutorial 
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};

export default IDE;
