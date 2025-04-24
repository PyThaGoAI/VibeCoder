
import React, { useState, useEffect } from 'react';
import IDE from '../components/IDE';
import LoadingScreen from '../components/LoadingScreen';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome to VibeCoder - Premium IDE Experience!', {
        style: {
          backgroundColor: '#131723', 
          color: '#e2e8f0',
          border: '1px solid rgba(255,255,255,0.1)'
        },
        description: 'Press ⌘K (or Ctrl+K) to open the command palette',
        className: 'dark-toast'
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="h-screen overflow-hidden relative">
          <IDE />
        </div>
      )}
    </>
  );
};

export default Index;
