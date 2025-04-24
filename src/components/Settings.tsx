import React, { useState } from 'react';
import { 
  X, 
  Monitor, 
  Paintbrush, 
  Code, 
  Bell, 
  Keyboard, 
  Zap, 
  HardDrive, 
  FileJson, 
  Cloud, 
  Search,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('appearance');
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [fontSize, setFontSize] = useState<number>(14);
  const [fontFamily, setFontFamily] = useState<string>('JetBrains Mono');
  const [lineNumbers, setLineNumbers] = useState<boolean>(true);
  const [minimap, setMinimap] = useState<boolean>(true);
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [tabSize, setTabSize] = useState<number>(2);
  const [autoSave, setAutoSave] = useState<'off' | 'onFocusChange' | 'afterDelay'>('afterDelay');
  const [formatOnSave, setFormatOnSave] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState<boolean>(false);
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setTheme('dark');
    setFontSize(14);
    setFontFamily('JetBrains Mono');
    setLineNumbers(true);
    setMinimap(true);
    setWordWrap(true);
    setTabSize(2);
    setAutoSave('afterDelay');
    setFormatOnSave(true);
    toast.success('Settings reset to defaults');
  };

  const handleSave = () => {
    // Would save settings in a real app
    toast.success('Settings saved successfully');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-4/5 h-4/5 max-w-5xl bg-ide-background border border-ide-border rounded-lg shadow-ide flex flex-col overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 bg-ide-header border-b border-ide-border">
          <h2 className="text-lg font-medium">Settings</h2>
          <button 
            className="p-1.5 hover:bg-ide-hover rounded"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-ide-border bg-ide-sidebar overflow-y-auto">
            <div className="p-3">
              <div className="relative mb-4">
                <Search size={16} className="absolute left-2.5 top-2.5 text-ide-muted pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search settings..."
                  className="w-full pl-9 pr-3 py-2 bg-ide-active-background border border-ide-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ide-accent"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-0.5">
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'appearance' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('appearance')}
                >
                  <Paintbrush size={16} />
                  <span>Appearance</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'editor' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('editor')}
                >
                  <Code size={16} />
                  <span>Editor</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'keyboard' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('keyboard')}
                >
                  <Keyboard size={16} />
                  <span>Keyboard Shortcuts</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'notifications' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={16} />
                  <span>Notifications</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'performance' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('performance')}
                >
                  <Zap size={16} />
                  <span>Performance</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'workspace' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('workspace')}
                >
                  <HardDrive size={16} />
                  <span>Workspace</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'formats' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('formats')}
                >
                  <FileJson size={16} />
                  <span>Format & Lint</span>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    activeTab === 'sync' ? 'bg-ide-accent text-white' : 'hover:bg-ide-hover'
                  }`}
                  onClick={() => setActiveTab('sync')}
                >
                  <Cloud size={16} />
                  <span>Sync Settings</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Appearance</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="flex gap-3">
                      <button 
                        className={`relative w-20 h-20 rounded border ${theme === 'dark' ? 'border-ide-accent' : 'border-ide-border'} overflow-hidden group`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="absolute inset-0 bg-ide-background">
                          <div className="h-5 bg-ide-header"></div>
                          <div className="h-3 mt-1 mx-2 bg-ide-hover rounded"></div>
                          <div className="h-3 mt-1 mx-2 bg-ide-hover rounded"></div>
                        </div>
                        <div className="absolute inset-0 bg-ide-accent/0 group-hover:bg-ide-accent/10 transition-colors"></div>
                        {theme === 'dark' && (
                          <div className="absolute right-1.5 top-1.5 w-4 h-4 bg-ide-accent rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-0 right-0 text-center text-xs">Dark</div>
                      </button>
                      
                      <button 
                        className={`relative w-20 h-20 rounded border ${theme === 'light' ? 'border-ide-accent' : 'border-ide-border'} overflow-hidden group`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="absolute inset-0 bg-white">
                          <div className="h-5 bg-gray-100"></div>
                          <div className="h-3 mt-1 mx-2 bg-gray-200 rounded"></div>
                          <div className="h-3 mt-1 mx-2 bg-gray-200 rounded"></div>
                        </div>
                        <div className="absolute inset-0 bg-ide-accent/0 group-hover:bg-ide-accent/10 transition-colors"></div>
                        {theme === 'light' && (
                          <div className="absolute right-1.5 top-1.5 w-4 h-4 bg-ide-accent rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-black">Light</div>
                      </button>
                      
                      <button 
                        className={`relative w-20 h-20 rounded border ${theme === 'system' ? 'border-ide-accent' : 'border-ide-border'} overflow-hidden group`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="absolute inset-0">
                          <div className="absolute left-0 top-0 w-1/2 h-full bg-ide-background">
                            <div className="h-5 bg-ide-header"></div>
                            <div className="h-3 mt-1 mx-2 bg-ide-hover rounded"></div>
                          </div>
                          <div className="absolute right-0 top-0 w-1/2 h-full bg-white">
                            <div className="h-5 bg-gray-100"></div>
                            <div className="h-3 mt-1 mx-2 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-ide-accent/0 group-hover:bg-ide-accent/10 transition-colors"></div>
                        {theme === 'system' && (
                          <div className="absolute right-1.5 top-1.5 w-4 h-4 bg-ide-accent rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-0 right-0 text-center text-xs">System</div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="10" 
                        max="24" 
                        value={fontSize}
                        onChange={e => setFontSize(parseInt(e.target.value))}
                        className="w-64 accent-ide-accent"
                      />
                      <span className="w-8 text-center">{fontSize}px</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Family</label>
                    <select 
                      value={fontFamily}
                      onChange={e => setFontFamily(e.target.value)}
                      className="w-64 px-3 py-2 bg-ide-active-background border border-ide-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ide-accent"
                    >
                      <option value="JetBrains Mono">JetBrains Mono</option>
                      <option value="Fira Code">Fira Code</option>
                      <option value="Menlo">Menlo</option>
                      <option value="Consolas">Consolas</option>
                      <option value="Courier New">Courier New</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="line-numbers" 
                        checked={lineNumbers}
                        onChange={e => setLineNumbers(e.target.checked)}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="line-numbers" className="text-sm">Show Line Numbers</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="minimap" 
                        checked={minimap}
                        onChange={e => setMinimap(e.target.checked)}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="minimap" className="text-sm">Show Minimap</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="word-wrap" 
                        checked={wordWrap}
                        onChange={e => setWordWrap(e.target.checked)}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="word-wrap" className="text-sm">Word Wrap</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'editor' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Editor</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tab Size</label>
                    <select 
                      value={tabSize}
                      onChange={e => setTabSize(parseInt(e.target.value))}
                      className="w-64 px-3 py-2 bg-ide-active-background border border-ide-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ide-accent"
                    >
                      <option value="2">2 spaces</option>
                      <option value="4">4 spaces</option>
                      <option value="8">8 spaces</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Auto Save</label>
                    <select 
                      value={autoSave}
                      onChange={e => setAutoSave(e.target.value as 'off' | 'onFocusChange' | 'afterDelay')}
                      className="w-64 px-3 py-2 bg-ide-active-background border border-ide-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ide-accent"
                    >
                      <option value="off">Off</option>
                      <option value="onFocusChange">On Focus Change</option>
                      <option value="afterDelay">After Delay (1s)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="format-on-save" 
                      checked={formatOnSave}
                      onChange={e => setFormatOnSave(e.target.checked)}
                      className="accent-ide-accent"
                    />
                    <label htmlFor="format-on-save" className="text-sm">Format On Save</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="auto-brackets" 
                      checked={true}
                      readOnly
                      className="accent-ide-accent"
                    />
                    <label htmlFor="auto-brackets" className="text-sm">Auto Close Brackets</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="auto-indent" 
                      checked={true}
                      readOnly
                      className="accent-ide-accent"
                    />
                    <label htmlFor="auto-indent" className="text-sm">Auto Indent</label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="enable-notifications" 
                        checked={notifications}
                        onChange={e => setNotifications(e.target.checked)}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="enable-notifications" className="text-sm">Enable Notifications</label>
                    </div>
                    
                    <button 
                      className="ide-button text-xs"
                      onClick={() => toast.info('Notification permissions requested')}
                    >
                      Request Permissions
                    </button>
                  </div>
                  
                  <div className="space-y-2 pl-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="notify-errors" 
                        checked={true}
                        readOnly
                        disabled={!notifications}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="notify-errors" className={`text-sm ${!notifications && 'opacity-50'}`}>Error Notifications</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="notify-warnings" 
                        checked={true}
                        readOnly
                        disabled={!notifications}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="notify-warnings" className={`text-sm ${!notifications && 'opacity-50'}`}>Warning Notifications</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="notify-info" 
                        checked={true}
                        readOnly
                        disabled={!notifications}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="notify-info" className={`text-sm ${!notifications && 'opacity-50'}`}>Info Notifications</label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="notify-success" 
                        checked={true}
                        readOnly
                        disabled={!notifications}
                        className="accent-ide-accent"
                      />
                      <label htmlFor="notify-success" className={`text-sm ${!notifications && 'opacity-50'}`}>Success Notifications</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium mb-4">Performance</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="telemetry" 
                      checked={telemetry}
                      onChange={e => setTelemetry(e.target.checked)}
                      className="accent-ide-accent"
                    />
                    <label htmlFor="telemetry" className="text-sm">Enable Telemetry</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="hardware-acceleration" 
                      checked={true}
                      readOnly
                      className="accent-ide-accent"
                    />
                    <label htmlFor="hardware-acceleration" className="text-sm">Hardware Acceleration</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="large-file-optimizations" 
                      checked={true}
                      readOnly
                      className="accent-ide-accent"
                    />
                    <label htmlFor="large-file-optimizations" className="text-sm">Large File Optimizations</label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other tabs would be implemented similarly, with relevant settings */}
          </div>
        </div>
        
        <div className="p-4 border-t border-ide-border bg-ide-header flex justify-between">
          <button 
            className="ide-button text-xs flex items-center gap-1"
            onClick={handleReset}
          >
            <RotateCcw size={14} />
            Reset to Defaults
          </button>
          
          <div className="flex gap-3">
            <button 
              className="ide-button text-xs"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="ide-button-primary text-xs flex items-center gap-1"
              onClick={handleSave}
            >
              <Save size={14} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
