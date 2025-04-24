
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Code, Play, Settings, FileText, Terminal, GitBranch } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CodeEditor from './CodeEditor';
import { toast } from 'sonner';

interface TutorialStep {
  title: string;
  description: React.ReactNode;
  image?: string;
  codeExample?: string;
  action?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
}

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const steps: TutorialStep[] = [
    {
      title: 'Welcome to VibeCoder IDE',
      description: (
        <div className="space-y-4">
          <p>
            Welcome to VibeCoder, your premium cloud-based IDE for modern development.
            This quick tutorial will help you get started with the main features.
          </p>
          <p>
            You'll learn how to navigate the interface, edit files, run code, and use
            advanced features to boost your productivity.
          </p>
        </div>
      ),
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=300',
      action: {
        label: 'Get Started',
        icon: <ArrowRight size={16} />,
        onClick: () => {
          setCurrentStep(1);
          setCompletedSteps([...completedSteps, 0]);
        }
      }
    },
    {
      title: 'Interface Overview',
      description: (
        <div className="space-y-4">
          <p>
            VibeCoder has an intuitive interface divided into several parts:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>File Explorer:</strong> Browse and manage your project files</li>
            <li><strong>Editor:</strong> Write and edit your code</li>
            <li><strong>Terminal:</strong> Run commands and see output</li>
            <li><strong>Sidebar:</strong> Access tools like Git, Debugging, and Extensions</li>
          </ul>
        </div>
      ),
      action: {
        label: 'Next: Editing Code',
        icon: <ArrowRight size={16} />,
        onClick: () => {
          setCurrentStep(2);
          setCompletedSteps([...completedSteps, 1]);
        }
      }
    },
    {
      title: 'Editing Code',
      description: (
        <div className="space-y-4">
          <p>
            The code editor is the heart of VibeCoder. It features:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Syntax highlighting for multiple languages</li>
            <li>Intelligent code completion</li>
            <li>Error detection</li>
            <li>Code formatting</li>
          </ul>
          <p>Try editing the Python code example below:</p>
        </div>
      ),
      codeExample: 'def greet(name):\n    """A simple greeting function"""\n    return f"Hello, {name}!"\n\n# Edit this line\nprint(greet("Your Name"))',
      action: {
        label: 'Next: Running Code',
        icon: <ArrowRight size={16} />,
        onClick: () => {
          setCurrentStep(3);
          setCompletedSteps([...completedSteps, 2]);
        }
      }
    },
    {
      title: 'Running Your Code',
      description: (
        <div className="space-y-4">
          <p>
            To run your code, click the <strong>Run</strong> button in the header or use the <kbd>⌘R</kbd> keyboard shortcut.
          </p>
          <p>
            The output will appear in the Output Panel at the bottom of your screen.
            You can toggle the panel's visibility as needed.
          </p>
        </div>
      ),
      action: {
        label: 'Try Running Code',
        icon: <Play size={16} />,
        onClick: () => {
          toast.success('Code executed successfully!', {
            description: 'Hello, Your Name!'
          });
          setCompletedSteps([...completedSteps, 3]);
        }
      }
    },
    {
      title: 'Advanced Features',
      description: (
        <div className="space-y-4">
          <p>
            VibeCoder includes many advanced features to enhance your development experience:
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-ide-background rounded-lg border border-ide-border">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={16} className="text-ide-accent" />
                <strong>Integrated Terminal</strong>
              </div>
              <p className="text-xs">Run commands directly in your project</p>
            </div>
            <div className="p-3 bg-ide-background rounded-lg border border-ide-border">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch size={16} className="text-ide-success" />
                <strong>Git Integration</strong>
              </div>
              <p className="text-xs">Manage your repositories with ease</p>
            </div>
            <div className="p-3 bg-ide-background rounded-lg border border-ide-border">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-ide-warning" />
                <strong>File Explorer</strong>
              </div>
              <p className="text-xs">Organize your project files efficiently</p>
            </div>
            <div className="p-3 bg-ide-background rounded-lg border border-ide-border">
              <div className="flex items-center gap-2 mb-2">
                <Code size={16} className="text-ide-info" />
                <strong>Extensions</strong>
              </div>
              <p className="text-xs">Extend functionality with plugins</p>
            </div>
          </div>
        </div>
      ),
      action: {
        label: 'Finish Tutorial',
        icon: <Check size={16} />,
        onClick: () => {
          setCompletedSteps([...completedSteps, 4]);
          toast.success('Tutorial completed! Start coding now.', {
            duration: 5000
          });
          onClose();
        }
      }
    }
  ];
  
  const currentStepData = steps[currentStep];
  const progress = Math.round(((completedSteps.length) / steps.length) * 100);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-ide-background dark:bg-[#131723] border border-ide-border dark:border-[#2d3748]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Code className="text-ide-accent" />
            {currentStepData.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-ide-border dark:bg-[#2d3748] rounded-full overflow-hidden">
          <div 
            className="h-full bg-ide-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="py-4">
          {/* Content */}
          <div className="space-y-4">
            {currentStepData.image && (
              <img 
                src={currentStepData.image} 
                alt={currentStepData.title} 
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            
            <div className="text-sm">
              {currentStepData.description}
            </div>
            
            {currentStepData.codeExample && (
              <div className="mt-4">
                <CodeEditor 
                  initialValue={currentStepData.codeExample} 
                  height="150px"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button 
            className="ide-button flex items-center gap-2"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          
          {currentStepData.action && (
            <button 
              className="ide-button-primary flex items-center gap-2"
              onClick={currentStepData.action.onClick}
            >
              {currentStepData.action.label}
              {currentStepData.action.icon}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
