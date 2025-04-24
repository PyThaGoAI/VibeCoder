
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Home, RefreshCw } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ide-background text-ide-foreground p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-ide-panel border border-ide-border shadow-lg">
            <Code size={64} className="text-ide-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2">404</h1>
        <p className="text-xl text-center mb-8 text-ide-muted">Page not found</p>
        
        <div className="flex flex-col items-center space-y-4">
          <p className="text-center text-ide-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/" className="ide-button-primary flex items-center gap-2 py-2 px-4">
              <Home size={16} />
              Return to IDE
            </Link>
            
            <button 
              onClick={() => window.location.reload()}
              className="ide-button flex items-center gap-2 py-2 px-4"
            >
              <RefreshCw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
