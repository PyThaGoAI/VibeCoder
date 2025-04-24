
import React, { useState } from 'react';
import { 
  Folder, ChevronRight, ChevronDown, File, 
  FilePlus, FolderPlus, FileText, Code, 
  MoreVertical, FileCode, Database, Archive,
  Edit, Trash, Copy, Download, Upload
} from 'lucide-react';
import { toast } from 'sonner';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  expanded?: boolean;
}

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onFileStructureChange: (files: FileItem[]) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect, onFileStructureChange }) => {
  const [contextMenuPos, setContextMenuPos] = useState<{x: number, y: number, itemId: string} | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<{type: 'file' | 'folder', parentId: string} | null>(null);
  const [newItemName, setNewItemName] = useState<string>('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemName, setEditingItemName] = useState<string>('');
  
  const toggleFolder = (id: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === id && item.type === 'folder') {
          return { ...item, expanded: !item.expanded };
        } else if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };
    
    const newFiles = updateFiles(files);
    onFileStructureChange(newFiles);
  };

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuPos({x: e.clientX, y: e.clientY, itemId: id});
  };

  const closeContextMenu = () => {
    setContextMenuPos(null);
  };

  const findItemById = (id: string, items: FileItem[]): FileItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentItemById = (id: string, items: FileItem[]): { parent: FileItem | null, index: number } => {
    for (const [index, item] of items.entries()) {
      if (item.children) {
        for (const child of item.children) {
          if (child.id === id) return { parent: item, index };
        }
        const found = findParentItemById(id, item.children);
        if (found.parent) return found;
      }
    }
    return { parent: null, index: -1 };
  };

  const handleCreateNew = (type: 'file' | 'folder', parentId: string) => {
    closeContextMenu();
    setIsCreatingNew({ type, parentId });
    setNewItemName('');
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName.trim()) {
      toast.error(`Please enter a ${isCreatingNew?.type} name`);
      return;
    }
    
    if (isCreatingNew) {
      const { type, parentId } = isCreatingNew;
      
      const updateFilesWithNewItem = (items: FileItem[]): FileItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            const newItem: FileItem = {
              id: `${parentId}-${Date.now()}`,
              name: newItemName,
              type,
              ...(type === 'folder' ? { children: [], expanded: true } : { content: '' })
            };
            
            return {
              ...item,
              expanded: true,
              children: [...(item.children || []), newItem]
            };
          } else if (item.children) {
            return { ...item, children: updateFilesWithNewItem(item.children) };
          }
          return item;
        });
      };
      
      // If parentId is root, add to top level
      if (parentId === 'root') {
        const newItem: FileItem = {
          id: `root-${Date.now()}`,
          name: newItemName,
          type,
          ...(type === 'folder' ? { children: [], expanded: true } : { content: '' })
        };
        onFileStructureChange([...files, newItem]);
      } else {
        onFileStructureChange(updateFilesWithNewItem(files));
      }
      
      setIsCreatingNew(null);
      setNewItemName('');
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`);
    }
  };

  const handleDeleteItem = (id: string) => {
    const deleteItem = (items: FileItem[]): FileItem[] => {
      return items.filter(item => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = deleteItem(item.children);
        }
        return true;
      });
    };
    
    onFileStructureChange(deleteItem(files));
    closeContextMenu();
    toast.success('Item deleted');
  };

  const handleRenameItem = (id: string) => {
    const item = findItemById(id, files);
    if (item) {
      setEditingItemId(id);
      setEditingItemName(item.name);
      closeContextMenu();
    }
  };

  const handleSubmitRename = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingItemName.trim()) {
      toast.error('Please enter a name');
      return;
    }
    
    const updateItemName = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === editingItemId) {
          return { ...item, name: editingItemName };
        } else if (item.children) {
          return { ...item, children: updateItemName(item.children) };
        }
        return item;
      });
    };
    
    onFileStructureChange(updateItemName(files));
    setEditingItemId(null);
    toast.success('Item renamed');
  };

  // Handle clicks outside the context menu
  React.useEffect(() => {
    const handleOutsideClick = () => {
      closeContextMenu();
    };

    if (contextMenuPos) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [contextMenuPos]);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.py')) {
      return <Code size={14} className="text-blue-400" />;
    } else if (fileName.endsWith('.csv')) {
      return <Database size={14} className="text-green-400" />;
    } else if (fileName.endsWith('.txt')) {
      return <FileText size={14} className="text-gray-400" />;
    } else if (fileName.endsWith('.zip') || fileName.endsWith('.tar.gz')) {
      return <Archive size={14} className="text-yellow-400" />;
    } else {
      return <File size={14} className="text-ide-muted" />;
    }
  };

  const renderFileItem = (item: FileItem, level = 0) => {
    const paddingLeft = level * 12 + 8;
    
    if (item.type === 'folder') {
      return (
        <div key={item.id} className="animate-fade-in" style={{animationDelay: `${level * 50}ms`}}>
          <div 
            className="file-item"
            onClick={() => toggleFolder(item.id)}
            onContextMenu={(e) => handleContextMenu(e, item.id)}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            {item.expanded ? <ChevronDown size={14} className="text-ide-muted file-item-icon" /> : <ChevronRight size={14} className="text-ide-muted file-item-icon" />}
            <Folder size={14} className="text-ide-accent file-item-icon" />
            
            {editingItemId === item.id ? (
              <form onSubmit={handleSubmitRename} className="flex-1">
                <input 
                  type="text" 
                  className="bg-ide-background border border-ide-accent rounded p-0.5 text-xs w-full"
                  value={editingItemName}
                  onChange={e => setEditingItemName(e.target.value)}
                  autoFocus
                  onBlur={handleSubmitRename}
                  onClick={(e) => e.stopPropagation()}
                />
              </form>
            ) : (
              <span className="text-sm">{item.name}</span>
            )}
            
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={12} className="text-ide-muted" />
            </span>
          </div>
          
          {item.expanded && item.children && (
            <div className="overflow-hidden transition-all">
              {item.children.map(child => renderFileItem(child, level + 1))}
              
              {isCreatingNew && isCreatingNew.parentId === item.id && (
                <div className="file-item" style={{ paddingLeft: `${paddingLeft + 16}px` }}>
                  {isCreatingNew.type === 'folder' ? 
                    <Folder size={14} className="text-ide-accent" /> : 
                    <File size={14} className="text-ide-muted" />
                  }
                  <form onSubmit={handleSubmitNew} className="flex-1 ml-1">
                    <input 
                      type="text" 
                      className="bg-ide-background border border-ide-accent rounded p-0.5 text-xs w-full"
                      placeholder={`New ${isCreatingNew.type}...`}
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      autoFocus
                      onBlur={() => setIsCreatingNew(null)}
                    />
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div 
          key={item.id}
          className="file-item"
          onClick={() => onFileSelect(item)}
          onContextMenu={(e) => handleContextMenu(e, item.id)}
          style={{ paddingLeft: `${paddingLeft + 16}px` }}
        >
          {getFileIcon(item.name)}
          
          {editingItemId === item.id ? (
            <form onSubmit={handleSubmitRename} className="flex-1 ml-1">
              <input 
                type="text" 
                className="bg-ide-background border border-ide-accent rounded p-0.5 text-xs w-full"
                value={editingItemName}
                onChange={e => setEditingItemName(e.target.value)}
                autoFocus
                onBlur={handleSubmitRename}
                onClick={(e) => e.stopPropagation()}
              />
            </form>
          ) : (
            <span className="text-sm">{item.name}</span>
          )}
          
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={12} className="text-ide-muted" />
          </span>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-ide-sidebar border-r border-ide-border backdrop-blur-sm bg-opacity-95">
      {/* Header */}
      <div className="p-2 flex items-center justify-between border-b border-ide-border">
        <span className="text-ide-accent font-bold text-sm flex items-center gap-1.5">
          <Folder size={14} className="mb-0.5" />
          Explorer
        </span>
        <div className="flex space-x-1">
          <button 
            className="p-1 hover:bg-ide-hover rounded transition-colors duration-200" 
            title="New File"
            onClick={() => handleCreateNew('file', 'root')}
          >
            <FilePlus size={14} className="text-ide-muted hover:text-ide-foreground transition-colors" />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded transition-colors duration-200" 
            title="New Folder"
            onClick={() => handleCreateNew('folder', 'root')}
          >
            <FolderPlus size={14} className="text-ide-muted hover:text-ide-foreground transition-colors" />
          </button>
        </div>
      </div>
      
      {/* Files list */}
      <div className="overflow-y-auto flex-grow relative">
        {files.map(item => renderFileItem(item))}
        
        {isCreatingNew && isCreatingNew.parentId === 'root' && (
          <div className="file-item" style={{ paddingLeft: '8px' }}>
            {isCreatingNew.type === 'folder' ? 
              <Folder size={14} className="text-ide-accent" /> : 
              <File size={14} className="text-ide-muted" />
            }
            <form onSubmit={handleSubmitNew} className="flex-1 ml-1">
              <input 
                type="text" 
                className="bg-ide-background border border-ide-accent rounded p-0.5 text-xs w-full"
                placeholder={`New ${isCreatingNew.type}...`}
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                autoFocus
                onBlur={() => setIsCreatingNew(null)}
              />
            </form>
          </div>
        )}
        
        {/* Context menu */}
        {contextMenuPos && (
          <div 
            className="absolute bg-ide-panel border border-ide-border shadow-ide rounded-md overflow-hidden z-10 w-48 text-sm"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          >
            <div 
              className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2"
              onClick={() => {
                const item = findItemById(contextMenuPos.itemId, files);
                if (item && item.type === 'file') {
                  onFileSelect(item);
                  closeContextMenu();
                }
              }}
            >
              <FileText size={14} />
              <span>Open</span>
            </div>
            
            <div 
              className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2"
              onClick={() => handleRenameItem(contextMenuPos.itemId)}
            >
              <Edit size={14} />
              <span>Rename</span>
            </div>
            
            <div 
              className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2"
              onClick={() => handleDeleteItem(contextMenuPos.itemId)}
            >
              <Trash size={14} className="text-ide-danger" />
              <span>Delete</span>
            </div>
            
            <div className="border-t border-ide-border"></div>
            
            {(() => {
              const item = findItemById(contextMenuPos.itemId, files);
              if (item && item.type === 'folder') {
                return (
                  <>
                    <div 
                      className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2"
                      onClick={() => handleCreateNew('file', contextMenuPos.itemId)}
                    >
                      <FilePlus size={14} />
                      <span>New File</span>
                    </div>
                    <div 
                      className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2"
                      onClick={() => handleCreateNew('folder', contextMenuPos.itemId)}
                    >
                      <FolderPlus size={14} />
                      <span>New Folder</span>
                    </div>
                    <div className="border-t border-ide-border"></div>
                  </>
                );
              }
              return null;
            })()}
            
            <div className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2">
              <Copy size={14} />
              <span>Copy Path</span>
            </div>
            
            {(() => {
              const item = findItemById(contextMenuPos.itemId, files);
              if (item && item.type === 'file') {
                return (
                  <div className="hover:bg-ide-hover px-3 py-1.5 cursor-pointer flex items-center gap-2">
                    <Download size={14} />
                    <span>Download</span>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        )}
        
        {/* Empty state for presentation */}
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-ide-muted p-4">
            <FolderPlus size={32} className="mb-2 opacity-50" />
            <p className="text-sm text-center">No files yet</p>
            <p className="text-xs text-center mt-1">Create a new file or folder to get started</p>
            <button 
              className="ide-button mt-4 text-xs"
              onClick={() => handleCreateNew('file', 'root')}
            >
              Create New File
            </button>
          </div>
        )}
      </div>
      
      {/* Footer - Project info */}
      <div className="border-t border-ide-border p-2 text-xs flex items-center justify-between">
        <div className="flex items-center text-ide-muted gap-1">
          <FileCode size={12} />
          <span>Project</span>
        </div>
        <span className="text-ide-accent text-[10px] bg-ide-accent/10 px-1.5 py-0.5 rounded">Python</span>
      </div>
    </div>
  );
};

export default FileExplorer;
