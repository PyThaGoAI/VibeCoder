
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lightbulb, 
  Loader, 
  MessageCircle, 
  RefreshCw, 
  Star, 
  ThumbsDown, 
  ThumbsUp, 
  User, 
  X,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI coding assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse = '';
      
      // Generate simple responses based on user message
      const userQ = inputValue.toLowerCase();
      if (userQ.includes('hello') || userQ.includes('hi')) {
        aiResponse = "Hello! How can I assist with your code today?";
      } else if (userQ.includes('help with') || userQ.includes('how to')) {
        aiResponse = "I'd be happy to help with that. Could you share the specific code you're working with so I can provide better assistance?";
      } else if (userQ.includes('error') || userQ.includes('bug')) {
        aiResponse = "I see you're having an issue. Let's debug this together. Can you share the error message and the relevant code section?";
      } else if (userQ.includes('explain') || userQ.includes('what is')) {
        aiResponse = "That's a good question. Let me explain it in simple terms: the concept you're asking about is a fundamental part of programming that involves organizing code into reusable patterns.";
      } else {
        aiResponse = "I understand what you're asking. Let me analyze this further. Based on best practices, I would suggest approaching this problem by breaking it down into smaller parts and solving each component separately.";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    toast.success(`Thanks for your ${type === 'like' ? 'positive' : 'negative'} feedback!`);
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 bottom-6 w-96 h-[500px] bg-ide-panel border border-ide-border rounded-lg shadow-ide overflow-hidden z-50 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-3 bg-ide-header border-b border-ide-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-premium flex items-center justify-center">
            <Sparkles size={14} className="text-black" />
          </div>
          <span className="font-medium text-sm">AI Assistant</span>
          <span className="premium-badge">Premium</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={() => {
              setMessages([
                {
                  id: '1',
                  content: "Hi there! I'm your AI coding assistant. How can I help you today?",
                  sender: 'ai',
                  timestamp: new Date()
                }
              ]);
              toast.success('Conversation reset');
            }}
          >
            <RefreshCw size={14} />
          </button>
          <button 
            className="p-1 hover:bg-ide-hover rounded"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === 'user' 
                ? 'bg-ide-accent text-white rounded-tr-none' 
                : 'bg-ide-active-background text-ide-foreground rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'user' ? (
                  <>
                    <span className="text-xs opacity-80">You</span>
                    <User size={12} className="opacity-80" />
                  </>
                ) : (
                  <>
                    <Lightbulb size={12} className="text-yellow-400" />
                    <span className="text-xs text-ide-accent">AI Assistant</span>
                  </>
                )}
                <span className="text-xs opacity-60 ml-auto">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm">{message.content}</p>
              
              {message.sender === 'ai' && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-ide-border/30">
                  <div className="flex gap-2">
                    <button 
                      className="p-1 hover:bg-ide-hover rounded"
                      onClick={() => handleFeedback('like')}
                      title="This was helpful"
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button 
                      className="p-1 hover:bg-ide-hover rounded"
                      onClick={() => handleFeedback('dislike')}
                      title="This wasn't helpful"
                    >
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                  <button 
                    className="p-1 hover:bg-ide-hover rounded"
                    title="Save response"
                    onClick={() => toast.success('Response saved to snippets')}
                  >
                    <Star size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-ide-active-background rounded-lg p-3 rounded-tl-none">
              <div className="flex items-center gap-2">
                <Loader size={12} className="animate-spin" />
                <span className="text-xs">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested questions */}
      <div className="p-3 border-t border-ide-border bg-ide-sidebar overflow-x-auto">
        <div className="flex gap-2">
          <button 
            className="px-2 py-1 bg-ide-active-background rounded-full text-xs whitespace-nowrap hover:bg-ide-hover"
            onClick={() => handleSuggestion('Help me optimize this code')}
          >
            Help me optimize this code
          </button>
          <button 
            className="px-2 py-1 bg-ide-active-background rounded-full text-xs whitespace-nowrap hover:bg-ide-hover"
            onClick={() => handleSuggestion('Explain this error')}
          >
            Explain this error
          </button>
          <button 
            className="px-2 py-1 bg-ide-active-background rounded-full text-xs whitespace-nowrap hover:bg-ide-hover"
            onClick={() => handleSuggestion('Generate a unit test')}
          >
            Generate a unit test
          </button>
          <button 
            className="px-2 py-1 bg-ide-active-background rounded-full text-xs whitespace-nowrap hover:bg-ide-hover"
            onClick={() => handleSuggestion('Document this function')}
          >
            Document this function
          </button>
        </div>
      </div>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-ide-border bg-ide-sidebar">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI a question..."
            className="flex-grow px-3 py-2 bg-ide-active-background border border-ide-border rounded text-sm focus:outline-none focus:border-ide-accent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            className="p-2 bg-ide-accent text-white rounded hover:bg-ide-accent/90"
            type="submit"
            disabled={isLoading || !inputValue.trim()}
          >
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-xs text-ide-muted">
            <MessageCircle size={12} />
            <span>Powered by GPT-4</span>
          </div>
          <span className="text-xs text-ide-muted">
            AI may produce inaccurate code
          </span>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;
