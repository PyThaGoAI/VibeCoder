
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  GitBranch, 
  GitPullRequest, 
  Info, 
  AlertTriangle, 
  X, 
  Check, 
  ChevronsUpDown, 
  Wifi,
  WifiOff,
  Zap,
  MessageSquare,
  Clock,
  Heart,
  Coffee
} from 'lucide-react';
import { toast } from 'sonner';

interface StatusBarProps {
  onTerminalClick: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onTerminalClick }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [warnings, setWarnings] = useState<number>(2);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState<string>('');
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [codingStreak, setCodingStreak] = useState<number>(3); // Days coding streak

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      
      // Simulate fluctuating resource usage
      setCpuUsage(Math.floor(Math.random() * 30) + 5);
      setMemoryUsage(Math.floor(Math.random() * 40) + 20);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
    toast.success(`${isConnected ? 'Disconnected from' : 'Connected to'} server`);
  };

  const showCodeStats = () => {
    toast.info('Coding statistics', {
      description: (
        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <span>Lines written today:</span>
            <span className="font-semibold">142</span>
          </div>
          <div className="flex justify-between">
            <span>Coding streak:</span>
            <span className="font-semibold">{codingStreak} days</span>
          </div>
          <div className="flex justify-between">
            <span>Time coding today:</span>
            <span className="font-semibold">2h 35m</span>
          </div>
        </div>
      ),
      duration: 5000
    });
  };

  return (
    <div className="h-6 bg-ide-header border-t border-ide-border flex items-center justify-between text-xs text-ide-muted">
      <div className="flex items-center divide-x divide-ide-border/40">
        <button 
          className="px-3 hover:bg-ide-hover flex items-center gap-1.5 h-full"
          onClick={onTerminalClick}
        >
          <Terminal size={12} />
          <span>Terminal</span>
        </button>
        
        <div className="px-3 flex items-center gap-1.5 h-full">
          <GitBranch size={12} className="text-ide-success" />
          <span>main</span>
        </div>
        
        <div className="px-3 flex items-center gap-1.5 h-full">
          <GitPullRequest size={12} className="text-ide-info" />
          <span>0 pending</span>
        </div>
        
        <div className="px-3 flex items-center gap-1.5 h-full cursor-pointer" onClick={() => toast.info('No errors in your code!')}>
          <Check size={12} className="text-ide-success" />
          <span className="text-ide-success">0 errors</span>
        </div>
        
        {warnings > 0 && (
          <div className="px-3 flex items-center gap-1.5 h-full cursor-pointer" onClick={() => toast.warning('2 warnings in your code')}>
            <AlertTriangle size={12} className="text-ide-warning" />
            <span className="text-ide-warning">{warnings} warnings</span>
          </div>
        )}
        
        <div className="px-3 flex items-center gap-1.5 h-full cursor-pointer" onClick={showCodeStats}>
          <Heart size={12} className="text-ide-accent" />
          <span className="flex items-center gap-1">
            {codingStreak} day streak
            <Coffee size={12} className="ml-1" />
          </span>
        </div>
      </div>
      
      <div className="flex items-center divide-x divide-ide-border/40">
        <div className="px-3 flex items-center gap-1.5 h-full">
          <Zap size={12} className={cpuUsage > 20 ? "text-ide-warning" : "text-ide-success"} />
          <span>CPU: {cpuUsage}%</span>
        </div>
        
        <div className="px-3 flex items-center gap-1.5 h-full">
          <ChevronsUpDown size={12} className={memoryUsage > 40 ? "text-ide-warning" : "text-ide-success"} />
          <span>Memory: {memoryUsage}%</span>
        </div>
        
        <button 
          className="px-3 h-full flex items-center gap-1.5 hover:bg-ide-hover transition-colors"
          onClick={handleToggleConnection}
        >
          {isConnected ? <Wifi size={12} className="text-ide-success" /> : <WifiOff size={12} className="text-ide-danger" />}
          <span>{isConnected ? 'Connected' : 'Offline'}</span>
        </button>

        <button 
          className="px-3 h-full flex items-center gap-1.5 hover:bg-ide-hover transition-colors"
          onClick={() => toast.info('Chat support is available')}
        >
          <MessageSquare size={12} className="text-ide-accent" />
          <span>Support</span>
        </button>
        
        <div className="px-3 flex items-center gap-1.5 h-full">
          <Clock size={12} className="text-ide-muted" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
