
import React, { useState } from 'react';
import { Code, Search, Plus, Copy, X as XIcon } from 'lucide-react';

const SnippetsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Snippets' },
    { id: 'react', name: 'React' }, 
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'css', name: 'CSS' },
    { id: 'favorites', name: 'Favorites' },
  ];
  
  const snippets = [
    {
      id: 1,
      title: 'React Functional Component',
      category: 'react',
      code: 'import React from \'react\';\n\ninterface Props {\n  // Define your props here\n}\n\nconst Component: React.FC<Props> = (props) => {\n  return (\n    <div>\n      {/* Your component JSX */}\n    </div>\n  );\n};\n\nexport default Component;',
    },
    {
      id: 2, 
      title: 'React useState Hook',
      category: 'react',
      code: 'import React, { useState } from \'react\';\n\nconst Component: React.FC = () => {\n  const [state, setState] = useState(initialValue);\n  \n  const handleChange = () => {\n    setState(newValue);\n  };\n  \n  return (\n    <div>\n      <p>Current state: {state}</p>\n      <button onClick={handleChange}>Update State</button>\n    </div>\n  );\n};',
    },
    {
      id: 3,
      title: 'Python Class Definition',
      category: 'python',
      code: 'class MyClass:\n    def __init__(self, param1, param2):\n        self.param1 = param1\n        self.param2 = param2\n        \n    def method1(self):\n        """Description of method1"""\n        return self.param1 + self.param2\n    \n    def method2(self, value):\n        """Description of method2"""\n        return self.param1 * value\n\n# Usage\ninstance = MyClass(10, 20)\nresult = instance.method1()',
    },
    {
      id: 4,
      title: 'JavaScript Promise',
      category: 'javascript',
      code: 'const fetchData = () => {\n  return new Promise((resolve, reject) => {\n    // Async operation\n    fetch(\'https://api.example.com/data\')\n      .then(response => {\n        if (!response.ok) {\n          throw new Error(\'Network response was not ok\');\n        }\n        return response.json();\n      })\n      .then(data => resolve(data))\n      .catch(error => reject(error));\n  });\n};\n\n// Usage\nfetchData()\n  .then(data => console.log(data))\n  .catch(error => console.error(error));',
    },
    {
      id: 5,
      title: 'CSS Flexbox Layout',
      category: 'css',
      code: '.container {\n  display: flex;\n  flex-direction: row; /* or column */\n  justify-content: space-between; /* flex-start, center, flex-end, space-around */\n  align-items: center; /* flex-start, flex-end, stretch, baseline */\n  flex-wrap: wrap; /* or nowrap */\n  gap: 10px; /* space between items */\n}\n\n.item {\n  flex: 1; /* flex-grow, flex-shrink, flex-basis combined */\n  /* Or use individual properties: */\n  /* flex-grow: 1; */\n  /* flex-shrink: 0; */\n  /* flex-basis: auto; */\n}',
    },
  ];
  
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || snippet.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // You would add toast notification here
    console.log('Copied to clipboard');
  };
  
  return (
    <div className="h-full bg-ide-background text-ide-foreground flex flex-col">
      <div className="p-4 border-b border-ide-border">
        <div className="flex items-center gap-2 mb-4">
          <Code className="text-ide-accent" />
          <h2 className="text-lg font-semibold">Code Snippets</h2>
        </div>
        
        <div className="relative mb-3">
          <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-ide-muted" />
          <input
            type="text"
            placeholder="Search snippets..."
            className="w-full bg-ide-active-background border border-ide-border rounded pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-ide-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-ide-muted hover:text-ide-foreground"
              onClick={() => setSearchTerm('')}
            >
              <XIcon size={14} />
            </button>
          )}
        </div>
        
        <div className="flex gap-1 overflow-x-auto pb-2 text-xs">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-2 py-1 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-ide-accent text-white'
                  : 'bg-ide-active-background text-ide-foreground hover:bg-ide-hover'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {filteredSnippets.length > 0 ? (
          <div className="space-y-3">
            {filteredSnippets.map(snippet => (
              <div key={snippet.id} className="p-3 rounded bg-ide-active-background border border-ide-border">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">{snippet.title}</h3>
                  <button 
                    className="p-1 hover:bg-ide-hover rounded"
                    onClick={() => handleCopyCode(snippet.code)}
                    title="Copy to clipboard"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <div className="bg-[#0e1116] p-2 rounded text-xs font-mono overflow-x-auto">
                  <pre>{snippet.code}</pre>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-ide-muted">
            <div className="text-sm mb-2">No snippets found</div>
            <button className="flex items-center gap-1 text-xs bg-ide-active-background hover:bg-ide-hover px-2 py-1 rounded">
              <Plus size={12} />
              Create New Snippet
            </button>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-ide-border">
        <button className="flex items-center gap-1 justify-center w-full text-xs bg-ide-accent text-white px-3 py-1.5 rounded hover:bg-opacity-90">
          <Plus size={14} />
          New Snippet
        </button>
      </div>
    </div>
  );
};

export default SnippetsLibrary;
