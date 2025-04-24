
import React, { useState } from 'react';
import { 
  Play, Trash2, ArrowRight, Clock, Activity, 
  Layers, Database, ChevronDown, ChevronUp, 
  Settings, RefreshCw, Code, Bug, Plus, 
  Terminal, Eye, EyeOff, Lightbulb
} from 'lucide-react';

interface RightSidebarProps {
  onRunCode: () => void;
  onClearOutput: () => void;
  onSettings: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  onRunCode, 
  onClearOutput,
  onSettings
}) => {
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    variables: false,
    actions: false,
    layers: false,
    debug: false,
    aiAssist: false
  });

  const toggleSection = (section: keyof typeof sectionsCollapsed) => {
    setSectionsCollapsed(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const PanelHeader = ({ title, icon, section }: { title: string, icon: React.ReactNode, section: keyof typeof sectionsCollapsed }) => (
    <div 
      className="flex justify-between items-center cursor-pointer hover:text-ide-accent transition-colors p-1"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="ide-panel-title m-0 p-0">{title}</h3>
      </div>
      {sectionsCollapsed[section] ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
    </div>
  );

  return (
    <div className="h-full w-[300px] bg-ide-sidebar border-l border-ide-border flex flex-col divide-y divide-ide-border">
      {/* Variables Section */}
      <div className="ide-panel-section bg-opacity-95">
        <PanelHeader 
          title="Variables" 
          icon={<Database size={16} className="text-ide-info" />}
          section="variables"
        />
        
        {!sectionsCollapsed.variables && (
          <div className="text-xs space-y-2 mt-2">
            <div className="p-1.5 rounded bg-ide-highlight flex justify-between transition-all hover:bg-opacity-70">
              <div className="flex flex-col">
                <span className="text-ide-accent font-medium">hello</span>
                <span className="text-ide-muted text-[10px]">function</span>
              </div>
              <div className="bg-ide-accent/20 px-2 rounded-sm flex items-center text-[10px]">
                <Code size={10} className="mr-1" />callable
              </div>
            </div>
            
            <div className="p-1.5 rounded bg-ide-highlight flex justify-between transition-all hover:bg-opacity-70">
              <div className="flex flex-col">
                <span className="text-ide-accent font-medium">x</span>
                <span className="text-ide-muted text-[10px]">int</span>
              </div>
              <div className="text-ide-muted">42</div>
            </div>
            
            <div className="p-1.5 rounded bg-ide-highlight flex justify-between transition-all hover:bg-opacity-70">
              <div className="flex flex-col">
                <span className="text-ide-accent font-medium">message</span>
                <span className="text-ide-muted text-[10px]">str</span>
              </div>
              <div className="text-ide-info">"Hello"</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Actions Section */}
      <div className="ide-panel-section bg-opacity-95">
        <PanelHeader 
          title="Actions" 
          icon={<Activity size={16} className="text-ide-success" />}
          section="actions"
        />
        
        {!sectionsCollapsed.actions && (
          <div className="flex flex-col space-y-2 mt-2">
            <button 
              className="ide-button-primary flex items-center justify-center gap-1 group"
              onClick={onRunCode}
            >
              <Play size={14} />
              <span>Run Cell</span>
              <span className="ml-auto bg-white/20 text-[10px] px-1.5 py-0.5 rounded group-hover:bg-white/30 transition-colors">⌘+Enter</span>
            </button>
            
            <button 
              className="ide-button flex items-center justify-center gap-1"
              onClick={onClearOutput}
            >
              <Trash2 size={14} />
              <span>Clear Output</span>
            </button>
            
            <button className="ide-button flex items-center justify-center gap-1">
              <ArrowRight size={14} />
              <span>Debug Step</span>
            </button>
            
            <button className="ide-button flex items-center justify-center gap-1">
              <RefreshCw size={14} />
              <span>Reset Environment</span>
            </button>

            <button 
              className="ide-button flex items-center justify-center gap-1"
              onClick={onSettings}
            >
              <Settings size={14} />
              <span>Open Settings</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Layers Section */}
      <div className="ide-panel-section bg-opacity-95">
        <PanelHeader 
          title="Layers" 
          icon={<Layers size={16} className="text-ide-warning" />}
          section="layers"
        />
        
        {!sectionsCollapsed.layers && (
          <div className="text-xs space-y-2 mt-2">
            <div className="flex items-center justify-between p-1.5 rounded bg-ide-highlight transition-all hover:bg-opacity-70">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-ide-success mr-2"></div>
                <span>Layer 1</span>
              </div>
              <span className="ide-badge ide-badge-success">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-1.5 rounded transition-all hover:bg-ide-highlight">
              <div className="flex items-center opacity-60">
                <div className="w-2 h-2 rounded-full bg-ide-muted mr-2"></div>
                <span>Layer 2</span>
              </div>
              <button className="text-xs flex items-center gap-1 hover:text-ide-accent">
                <Eye size={12} />
                <span>Show</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded transition-all hover:bg-ide-highlight">
              <div className="flex items-center opacity-60">
                <div className="w-2 h-2 rounded-full bg-ide-muted mr-2"></div>
                <span>Layer 3</span>
              </div>
              <button className="text-xs flex items-center gap-1 hover:text-ide-accent">
                <EyeOff size={12} />
                <span>Hidden</span>
              </button>
            </div>

            <button className="ide-button w-full flex items-center justify-center gap-1 text-xs mt-2">
              <Plus size={12} />
              <span>Add Layer</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Debug Section */}
      <div className="ide-panel-section bg-opacity-95">
        <PanelHeader 
          title="Breakpoints" 
          icon={<Bug size={16} className="text-ide-danger" />}
          section="debug"
        />
        
        {!sectionsCollapsed.debug && (
          <div className="space-y-2 mt-2">
            <div className="text-xs py-1 italic text-ide-muted flex items-center justify-center border border-dashed border-ide-muted/30 rounded p-2">
              No breakpoints set
            </div>
            
            <button className="ide-button w-full flex items-center justify-center gap-1 text-xs">
              <Plus size={12} />
              <span>Add Breakpoint</span>
            </button>
          </div>
        )}
      </div>

      {/* AI Assistant Section */}
      <div className="ide-panel-section bg-opacity-95">
        <PanelHeader 
          title="AI Assistant" 
          icon={<Lightbulb size={16} className="text-yellow-400" />}
          section="aiAssist"
        />
        
        {!sectionsCollapsed.aiAssist && (
          <div className="space-y-2 mt-2">
            <div className="text-xs p-2 bg-ide-highlight rounded">
              <p className="mb-2">Ask AI to help with your code:</p>
              <textarea 
                className="w-full bg-ide-background border border-ide-border rounded p-2 resize-none"
                placeholder="Ask a question about your code..."
                rows={3}
              />
              <button className="ide-button-primary w-full mt-2 flex items-center justify-center gap-1 text-xs">
                <Lightbulb size={12} />
                <span>Get AI Suggestion</span>
              </button>
            </div>
            
            <div className="text-xs p-2 bg-ide-highlight rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Suggestions</span>
                <span className="text-[10px]">Auto-generated</span>
              </div>
              <ul className="space-y-1 mt-1">
                <li className="hover:bg-ide-hover p-1 rounded cursor-pointer flex items-center gap-1">
                  <Code size={10} />
                  <span>Optimize imports</span>
                </li>
                <li className="hover:bg-ide-hover p-1 rounded cursor-pointer flex items-center gap-1">
                  <Code size={10} />
                  <span>Refactor function</span>
                </li>
                <li className="hover:bg-ide-hover p-1 rounded cursor-pointer flex items-center gap-1">
                  <Code size={10} />
                  <span>Add documentation</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-grow"></div>
      
      {/* Settings Panel */}
      <div className="p-3 text-xs border-t border-ide-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-ide-muted" />
            <span className="text-ide-muted">Session: 2h 15m</span>
          </div>
          <button 
            className="ide-button p-1" 
            title="Settings"
            onClick={onSettings}
          >
            <Settings size={14} />
          </button>
        </div>
        
        <div className="mt-2 flex items-center">
          <div className="w-full bg-ide-border h-1 rounded-full overflow-hidden">
            <div className="bg-ide-success h-full rounded-full" style={{ width: '64%' }}></div>
          </div>
          <span className="ml-2 text-ide-success">64%</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
