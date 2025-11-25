'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

interface Message {
  id: string;
  chatId: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: string;
  name: string;
  type: 'one-to-one' | 'group';
  avatar: string | null;
  participants?: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  currentUserName: string;
}

export default function ChatPanel({ isOpen, onClose, currentUserId, currentUserName }: ChatPanelProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch chats
  useEffect(() => {
    if (isOpen) {
      fetch('/api/chats')
        .then(res => res.json())
        .then(data => setChats(data.chats || []))
        .catch(console.error);
    }
  }, [isOpen]);

  // Fetch messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setLoading(true);
      fetch(`/api/chats/${selectedChat.id}/messages`)
        .then(res => res.json())
        .then(data => {
          setMessages(data.messages || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate realtime typing indicator
  const simulateTyping = useCallback(() => {
    if (selectedChat) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  }, [selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedChat) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      const response = await fetch(`/api/chats/${selectedChat.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: messageText,
          authorId: currentUserId,
          authorName: currentUserName,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        simulateTyping();
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const formatMessageTime = (dateStr: string) => {
    return format(parseISO(dateStr), 'HH:mm', { locale: it });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read':
        return (
          <svg className="w-3 h-3 text-neon-cyan" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-3 h-3 text-lightPurple" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed right-0 top-0 h-full w-full md:w-96 bg-gradient-neon-dashboard border-l border-neon-violet/30 shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {selectedChat ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedChat(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-white"
                  aria-label="Torna alla lista chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <div className="flex-1 ml-3">
                  <h3 className="font-bold text-white">{selectedChat.name}</h3>
                  {selectedChat.type === 'group' && (
                    <p className="text-xs text-lightPurple">{selectedChat.participants?.join(', ')}</p>
                  )}
                </div>
              </>
            ) : (
              <h3 className="text-lg font-bold text-white">Chat</h3>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-lightPurple"
              aria-label="Chiudi chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {selectedChat ? (
              // Messages view
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 neon-scrollbar">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-neon-violet border-t-transparent" />
                    </div>
                  ) : (
                    <>
                      {messages.map((message, index) => {
                        const isOwn = message.authorId === currentUserId;
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                isOwn
                                  ? 'bg-neon-violet text-white rounded-tr-none'
                                  : 'bg-white/10 text-white rounded-tl-none'
                              }`}
                            >
                              {!isOwn && (
                                <p className="text-xs text-neon-cyan font-medium mb-1">
                                  {message.authorName}
                                </p>
                              )}
                              <p className="text-sm">{message.text}</p>
                              <div className={`flex items-center justify-end space-x-1 mt-1 ${isOwn ? 'text-white/70' : 'text-lightPurple/70'}`}>
                                <span className="text-xs">{formatMessageTime(message.createdAt)}</span>
                                {isOwn && getStatusIcon(message.status)}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}

                      {/* Typing indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3">
                            <div className="typing-indicator flex space-x-1">
                              <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                              <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                              <span className="w-2 h-2 bg-neon-cyan rounded-full" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    {/* Attachment button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-lightPurple"
                      aria-label="Allega file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </motion.button>

                    {/* Text input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Scrivi un messaggio..."
                      className="flex-1 px-4 py-2 bg-white/10 border border-neon-violet/30 rounded-full text-white placeholder-lightPurple/50 focus:outline-none focus:ring-2 focus:ring-neon-violet focus:border-transparent"
                      aria-label="Messaggio"
                    />

                    {/* Emoji button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors focus-neon text-lightPurple"
                      aria-label="Emoji"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.button>

                    {/* Send button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={!newMessage.trim()}
                      className="p-2 rounded-full bg-neon-violet hover:bg-neon-violet/90 transition-colors focus-neon text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-neon"
                      aria-label="Invia"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                </form>
              </div>
            ) : (
              // Chat list view
              <div className="p-4 space-y-3 overflow-y-auto neon-scrollbar h-full">
                {chats.map((chat, index) => (
                  <motion.button
                    key={chat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChat(chat)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors focus-neon text-left"
                  >
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-neon-violet/30">
                      {chat.avatar ? (
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${chat.avatar})` }}
                          role="img"
                          aria-label={chat.name}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neon-violet to-neon-magenta flex items-center justify-center">
                          {chat.type === 'group' ? (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      )}
                      {chat.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-magenta rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white truncate">{chat.name}</h4>
                        <span className="text-xs text-lightPurple/70">
                          {format(parseISO(chat.lastMessageAt), 'HH:mm')}
                        </span>
                      </div>
                      <p className="text-sm text-lightPurple/70 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </motion.button>
                ))}

                {chats.length === 0 && (
                  <p className="text-center text-lightPurple/70 py-8">
                    Nessuna chat disponibile
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
