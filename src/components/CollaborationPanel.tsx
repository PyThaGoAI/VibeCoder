import React, { useState } from 'react';
import { 
  User, 
  Users, 
  MessageSquare, 
  UserPlus, 
  X, 
  MoreVertical,
  Phone,
  Monitor,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  role: 'owner' | 'editor' | 'viewer';
  location?: string; // Current file they're viewing
  lastActive?: string;
}

interface CollaborationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ isOpen, onClose }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      status: 'online',
      role: 'owner',
      location: 'main.py'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'online',
      role: 'editor',
      location: 'utils.py'
    },
    {
      id: '3',
      name: 'Mark Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'away',
      role: 'editor'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      status: 'offline',
      role: 'viewer',
      lastActive: '3 hours ago'
    }
  ]);
  
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{id: string, sender: string, avatar: string, message: string, time: string}[]>([
    {
      id: '1',
      sender: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      message: 'Hi team! Just pushed a new update to the data processing module.',
      time: '10:32 AM'
    },
    {
      id: '2',
      sender: 'You',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      message: 'Great! I\'ll take a look at it now.',
      time: '10:35 AM'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'people' | 'chat'>('people');
  const [isInviting, setIsInviting] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');

  if (!isOpen) return null;

  const getStatusColor = (status: Collaborator['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail.trim()) return;
    
    toast.success(`Invitation sent to ${inviteEmail}`);
    setIsInviting(false);
    setInviteEmail('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success('Starting collaboration call...');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast.success('Call ended');
  };

  return (
    <div className="fixed right-0 top-12 bottom-6 w-72 max-h-[calc(100vh-4.5rem)] bg-ide-panel border-l border-ide-border shadow-ide z-40 flex flex-col animate-slide-in-right overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-ide-border bg-ide-header">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Users size={16} className="text-ide-accent" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-ide-accent rounded-full text-white flex items-center justify-center text-[10px]">
              {collaborators.filter(c => c.status === 'online').length}
            </span>
          </div>
          <h3 className="text-sm font-medium">Collaborators</h3>
          <span className="premium-badge text-[10px] px-1.5">Premium</span>
        </div>
        <button 
          className="p-1 hover:bg-ide-hover rounded"
          onClick={onClose}
        >
          <X size={14} />
        </button>
      </div>
      
      <div className="flex border-b border-ide-border">
        <button 
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'people' ? 'border-b-2 border-ide-accent text-ide-accent' : 'text-ide-muted'}`}
          onClick={() => setActiveTab('people')}
        >
          People
        </button>
        <button 
          className={`flex-1 py-2 text-xs font-medium ${activeTab === 'chat' ? 'border-b-2 border-ide-accent text-ide-accent' : 'text-ide-muted'}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        {isCallActive && (
          <div className="border-b border-ide-border p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs flex items-center gap-1">
                <Clock size={12} className="text-green-500 animate-pulse" />
                <span>Call in progress (12:34)</span>
              </span>
              <button 
                className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs"
                onClick={handleEndCall}
              >
                End call
              </button>
            </div>
            
            <div className="flex justify-center gap-3 mb-3">
              <button 
                className={`p-2 ${isMuted ? 'bg-ide-accent/20' : 'bg-ide-hover'} rounded-full`}
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
              </button>
              <button 
                className={`p-2 ${!isVideoEnabled ? 'bg-ide-accent/20' : 'bg-ide-hover'} rounded-full`}
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                title={isVideoEnabled ? 'Turn off video' : 'Turn on video'}
              >
                {isVideoEnabled ? <Video size={14} /> : <VideoOff size={14} />}
              </button>
              <button 
                className="p-2 bg-ide-hover rounded-full"
                title="Settings"
              >
                <Settings size={14} />
              </button>
            </div>
            
            <div className="flex gap-1">
              <div className="w-1/3 aspect-video bg-ide-hover rounded flex items-center justify-center">
                <User size={20} className="text-ide-muted" />
              </div>
              <div className="w-1/3 aspect-video bg-ide-hover rounded flex items-center justify-center">
                <User size={20} className="text-ide-muted" />
              </div>
              <div className="w-1/3 aspect-video bg-ide-hover rounded flex items-center justify-center">
                <User size={20} className="text-ide-muted" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'people' && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs text-ide-muted">ONLINE ({collaborators.filter(c => c.status === 'online' || c.status === 'away').length})</h4>
                  {!isInviting && (
                    <button 
                      className="text-xs flex items-center gap-1 text-ide-accent hover:underline"
                      onClick={() => setIsInviting(true)}
                    >
                      <UserPlus size={12} />
                      Invite
                    </button>
                  )}
                </div>
                
                {isInviting && (
                  <form onSubmit={handleInviteUser} className="mb-3 p-2 border border-ide-border rounded bg-ide-active-background">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-medium">Invite collaborator</h4>
                      <button 
                        type="button"
                        className="text-ide-muted hover:text-ide-foreground"
                        onClick={() => setIsInviting(false)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      className="w-full mb-2 text-xs p-2 bg-ide-sidebar border border-ide-border rounded"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs">Role:</span>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-1 text-xs">
                          <input 
                            type="radio" 
                            name="role" 
                            checked={inviteRole === 'editor'} 
                            onChange={() => setInviteRole('editor')}
                          />
                          Editor
                        </label>
                        <label className="flex items-center gap-1 text-xs">
                          <input 
                            type="radio" 
                            name="role" 
                            checked={inviteRole === 'viewer'} 
                            onChange={() => setInviteRole('viewer')}
                          />
                          Viewer
                        </label>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-1.5 bg-ide-accent text-white text-xs rounded"
                    >
                      Send invitation
                    </button>
                  </form>
                )}
                
                {collaborators
                  .filter(c => c.status === 'online' || c.status === 'away')
                  .map(collaborator => (
                    <div key={collaborator.id} className="mb-2 p-2 rounded hover:bg-ide-hover flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img 
                            src={collaborator.avatar} 
                            alt={collaborator.name} 
                            className="w-6 h-6 rounded-full"
                          />
                          <span className={`absolute bottom-0 right-0 w-2 h-2 ${getStatusColor(collaborator.status)} rounded-full border border-ide-sidebar`}></span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{collaborator.name}</span>
                            {collaborator.role === 'owner' && (
                              <span className="text-[10px] text-ide-muted">(Owner)</span>
                            )}
                          </div>
                          {collaborator.location && (
                            <span className="text-[10px] text-ide-muted">
                              Editing: {collaborator.location}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {collaborator.id !== '1' && (
                          <>
                            <button 
                              className="p-1 hover:bg-ide-active-background rounded"
                              title="Message"
                              onClick={() => {
                                setActiveTab('chat');
                                toast.success(`Chat with ${collaborator.name}`);
                              }}
                            >
                              <MessageSquare size={12} />
                            </button>
                            <button 
                              className="p-1 hover:bg-ide-active-background rounded"
                              title={isCallActive ? 'In Call' : 'Call'}
                              onClick={handleStartCall}
                            >
                              {isCallActive ? <Monitor size={12} /> : <Phone size={12} />}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                ))}
                
                {collaborators.some(c => c.status === 'offline') && (
                  <>
                    <h4 className="text-xs text-ide-muted mt-4 mb-2">
                      OFFLINE ({collaborators.filter(c => c.status === 'offline').length})
                    </h4>
                    
                    {collaborators
                      .filter(c => c.status === 'offline')
                      .map(collaborator => (
                        <div key={collaborator.id} className="mb-2 p-2 rounded hover:bg-ide-hover flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <img 
                                src={collaborator.avatar} 
                                alt={collaborator.name} 
                                className="w-6 h-6 rounded-full opacity-70"
                              />
                              <span className={`absolute bottom-0 right-0 w-2 h-2 ${getStatusColor(collaborator.status)} rounded-full border border-ide-sidebar`}></span>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-ide-muted">{collaborator.name}</span>
                              {collaborator.lastActive && (
                                <div className="text-[10px] text-ide-muted">
                                  Last active: {collaborator.lastActive}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <button className="p-1 hover:bg-ide-active-background rounded">
                            <MoreVertical size={12} className="text-ide-muted" />
                          </button>
                        </div>
                    ))}
                  </>
                )}
                
                <div className="mt-6 pt-4 border-t border-ide-border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-medium">Collaboration Settings</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs flex items-center gap-2">
                        <input type="checkbox" checked readOnly />
                        <span>Show cursor positions</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-xs flex items-center gap-2">
                        <input type="checkbox" checked readOnly />
                        <span>Show edit highlights</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-xs flex items-center gap-2">
                        <input type="checkbox" checked readOnly />
                        <span>Follow collaborator activity</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-xs flex items-center gap-2">
                        <input type="checkbox" readOnly />
                        <span>Mute notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <button 
                    className={`px-4 py-1.5 rounded text-xs ${isCallActive ? 'bg-red-500/20 text-red-400' : 'bg-ide-accent text-white'} flex items-center gap-1`}
                    onClick={isCallActive ? handleEndCall : handleStartCall}
                  >
                    {isCallActive ? (
                      <>
                        <Phone size={12} />
                        End Call
                      </>
                    ) : (
                      <>
                        <Phone size={12} />
                        Start Group Call
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'chat' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3">
              {chatMessages.map(message => (
                <div key={message.id} className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender !== 'You' && (
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="w-6 h-6 rounded-full mr-2 mt-0.5"
                    />
                  )}
                  <div className={`max-w-[75%] rounded-lg p-2 ${
                    message.sender === 'You' 
                      ? 'bg-ide-accent text-white' 
                      : 'bg-ide-active-background text-ide-foreground'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{message.sender}</span>
                      <span className="text-xs opacity-70">{message.time}</span>
                    </div>
                    <p className="text-xs">{message.message}</p>
                  </div>
                  {message.sender === 'You' && (
                    <img 
                      src={message.avatar} 
                      alt={message.sender} 
                      className="w-6 h-6 rounded-full ml-2 mt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-ide-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow px-3 py-2 bg-ide-active-background border border-ide-border rounded text-xs focus:outline-none focus:border-ide-accent"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button 
                  className="p-2 bg-ide-accent text-white rounded hover:bg-ide-accent/90 disabled:bg-ide-accent/50"
                  type="submit"
                  disabled={!chatMessage.trim()}
                >
                  <MessageSquare size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;
