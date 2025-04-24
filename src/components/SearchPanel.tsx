
import React, { useState } from 'react';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface SearchResult {
  id: string;
  file: string;
  line: number;
  content: string;
  match: string;
}

const SearchPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Mock search implementation that would be replaced with real search
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          file: 'src/components/Editor.tsx',
          line: 42,
          content: 'const handleEditorChange = (value: string) => {',
          match: 'handleEditorChange'
        },
        {
          id: '2',
          file: 'src/components/IDE.tsx',
          line: 78,
          content: 'const handleRunCode = () => {',
          match: 'handleRunCode'
        },
        {
          id: '3',
          file: 'src/utils/codeFormatter.ts',
          line: 15,
          content: 'export function formatPythonCode(code: string): string {',
          match: 'formatPythonCode'
        }
      ].filter(result => 
        result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.file.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(mockResults);
      setIsSearching(false);
      
      if (mockResults.length === 0) {
        toast.info('No results found');
      }
    }, 500);
  };

  const handleResultClick = (result: SearchResult) => {
    toast.info(`Opening ${result.file} at line ${result.line}`);
    // Here we would implement logic to open the file at the specific line
  };

  const highlightMatch = (text: string, match: string) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => (
          regex.test(part) ? 
            <span key={i} className="search-highlight">{part}</span> : 
            <span key={i}>{part}</span>
        ))}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-ide-border">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-ide-muted" />
            <input
              type="text"
              className="w-full bg-ide-header py-1.5 px-8 rounded border border-ide-border focus:border-ide-accent transition-colors"
              placeholder="Search in project..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-ide-muted hover:text-ide-foreground"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-ide-accent"></div>
            <span className="ml-2 text-sm">Searching...</span>
          </div>
        ) : (
          <div>
            {results.map(result => (
              <div 
                key={result.id}
                className="search-result"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-center gap-1 text-xs text-ide-accent mb-1">
                  <FileText size={12} />
                  <span>{result.file}</span>
                  <span>:</span>
                  <span>{result.line}</span>
                </div>
                <div className="text-xs font-mono">
                  {highlightMatch(result.content, searchQuery)}
                </div>
              </div>
            ))}
            {results.length > 0 && (
              <div className="p-2 text-center text-xs text-ide-muted">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-ide-border bg-ide-header text-xs">
        Tip: Use quotes for exact matches. Example: "function name"
      </div>
    </div>
  );
};

export default SearchPanel;
