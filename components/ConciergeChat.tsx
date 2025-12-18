
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Good day. I am your Ship Inn concierge. How may I assist you with your heritage stay today?', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    const replyText = await getGeminiChatResponse(inputText);
    
    setMessages(prev => [...prev, { role: 'model', text: replyText, timestamp: new Date() }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 ${isOpen ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'}`}
        aria-label="Toggle Concierge"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            <span className="font-medium pr-1 hidden md:block">Concierge</span>
          </>
        )}
      </button>

      {/* Chat Interface */}
      <div 
        className={`
          fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden z-40
          transition-all duration-500 origin-bottom-right flex flex-col
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
        style={{ height: '500px', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="bg-stone-900 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl">Ship Inn Concierge</h3>
            <p className="text-xs text-stone-300 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              Online • AI Powered
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-stone-800 text-white rounded-br-sm' 
                    : 'bg-white text-stone-800 border border-stone-100 shadow-sm rounded-bl-sm'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
                 <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about heritage rooms, history, or Stanley..."
              className="w-full bg-stone-50 border border-stone-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-stone-400 transition-colors pr-12"
            />
            <button 
              type="submit"
              disabled={loading || !inputText.trim()}
              className="absolute right-1 top-1 bottom-1 p-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 transition-colors w-10 h-10 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ConciergeChat;
