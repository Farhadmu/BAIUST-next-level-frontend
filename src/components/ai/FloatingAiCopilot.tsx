'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Minimize2, Maximize2, Loader2, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const FloatingAiCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am your **BAIUST AI Copilot**.\n\nI have access to your CSE academic semester, career goals, skill gaps, and project evidence. How can I help you accelerate your engineering journey today?`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatWithCopilot(updatedMessages);
      const assistantReply = res.reply || 'I processed your query. Let me know if you would like deeper technical details!';
      setMessages([...updatedMessages, { role: 'assistant', content: assistantReply }]);
    } catch (err: any) {
      // Deterministic client fallback if network offline
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: `**[BAIUST Offline Advisor]** Based on your target CSE role:\n\n- Focus on closing your highest priority skill gap.\n- Verify your latest code on GitHub to earn cryptographic proof points.\n- Sync your weekly hours with your active semester coursework.\n\n*(Notice: Backend AI gateway is connecting...)*`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What should I learn next?',
    'Analyze my skill gaps',
    'Recommend a portfolio project',
    'Prepare me for a mock interview',
    'Sync roadmap with my semester courses',
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B241A] border-2 border-[#39D98A] shadow-[0_0_25px_rgba(57,217,138,0.35)] hover:shadow-[0_0_35px_rgba(57,217,138,0.55)] text-[#F2F5F3] font-mono text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39D98A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39D98A]"></span>
        </span>
        <Sparkles className="h-4 w-4 text-[#39D98A] group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide">AI COPILOT</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] rounded-2xl border border-[#1D533C] bg-[#07100C]/95 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
        isMinimized ? 'h-16' : 'h-[620px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#143526] bg-[#0B241A]/80">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#07100C] border border-[#39D98A] flex items-center justify-center">
            <Bot className="h-4 w-4 text-[#39D98A]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold text-[#F2F5F3]">BAIUST AI COPILOT</span>
              <span className="font-mono text-[9px] text-[#39D98A] bg-[#0E2F22] px-1.5 py-0.2 rounded border border-[#1D533C]">
                CSE INTEL
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#8A9A92]">Context: Department of CSE • Live Session</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#8A9A92]">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:text-[#F2F5F3] hover:bg-[#07100C] rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:text-red-400 hover:bg-[#07100C] rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 items-start ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="h-6 w-6 rounded bg-[#0B241A] border border-[#39D98A]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-[#39D98A]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3 rounded-xl border leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#0E2F22] border-[#1D533C] text-[#F2F5F3] rounded-tr-none'
                      : 'bg-[#0B241A] border-[#143526] text-[#E0E6E2] rounded-tl-none shadow-md'
                  }`}
                >
                  {m.content}
                </div>

                {m.role === 'user' && (
                  <div className="h-6 w-6 rounded bg-[#143526] border border-[#39D98A]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-[#39D98A]" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#39D98A] pl-8">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Thinking with CSE intelligence...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-[#143526] bg-[#07100C] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-[#0B241A] border border-[#143526] hover:border-[#39D98A] font-mono text-[10px] text-[#8A9A92] hover:text-[#F2F5F3] transition-colors flex items-center gap-1"
              >
                <span>{prompt}</span>
                <ArrowRight className="h-2.5 w-2.5 opacity-50" />
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-[#143526] bg-[#0B241A]/60 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot about roadmaps, DSA, or projects..."
              className="flex-1 bg-[#07100C] border border-[#143526] focus:border-[#39D98A] rounded-xl px-3.5 py-2 font-sans text-xs text-[#F2F5F3] placeholder-[#556B60] outline-none transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-[#39D98A] hover:bg-[#2fc47a] disabled:opacity-40 disabled:hover:bg-[#39D98A] text-[#07100C] transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
