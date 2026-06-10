import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ArrowRight } from 'lucide-react';
import { chatWithMatanPersona } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIPersonaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: "01 / TECH STACK", text: "What is your main enterprise stack?" },
    { label: "02 / BUYFLOW", text: "What did you build for Altice?" },
    { label: "03 / ANALYTICS", text: "How do you automate GA4 event tracking?" },
    { label: "04 / RAW IRON", text: "How does powerlifting help your dev work?" }
  ];

  // Auto-initialize on page load via useEffect
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Hi, I am Matan's AI Digital Twin. I have exactly 4 years of software developer experience in enterprise checkouts and analytics automation. Ask me anything—I will answer briefly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const mappedHistory = [...messages, userMessage].map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const reply = await chatWithMatanPersona(mappedHistory);

      const modelMessage: ChatMessage = {
        id: Math.random().toString(),
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: 'err-' + Math.random(),
        role: 'model',
        text: "Brief connection issue. Let's talk over email: MaTaN2288@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 border border-zinc-200 rounded-lg bg-white overflow-hidden text-left shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Header Info */}
      <div className="border-b border-zinc-150 bg-zinc-50 px-5 py-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="font-mono text-[10px] tracking-wider text-zinc-900 uppercase font-semibold">
            Matan // Twin Dialogue (Brief Mode)
          </span>
        </div>
        <span className="font-mono text-[9px] text-zinc-400">Gemini 3.5 Active</span>
      </div>

      {/* Message Feed */}
      <div className="p-5 h-[280px] overflow-y-auto space-y-4 bg-white border-b border-zinc-150">
        {messages.map((m) => {
          const isModel = m.role === 'model';
          return (
            <div key={m.id} className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}>
              <div 
                className={`max-w-[90%] rounded px-4 py-3 border ${
                  isModel 
                    ? 'bg-zinc-50/50 border-zinc-200 text-zinc-800 rounded-bl-none' 
                    : 'bg-zinc-900 border-zinc-900 text-white rounded-br-none'
                }`}
              >
                <p className="text-xs font-sans leading-relaxed whitespace-pre-line">{m.text}</p>
                <div 
                  className={`text-[8px] mt-1.5 font-mono ${
                    isModel ? 'text-zinc-400' : 'text-zinc-300'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-50 border border-zinc-200 rounded rounded-bl-none px-4 py-3 flex items-center gap-2">
              <Loader2 className="animate-spin text-zinc-400" size={12} />
              <span className="text-[10px] font-mono text-zinc-500">Formulating concise reply...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Questions Quick Grid */}
      <div className="p-3 bg-zinc-50 border-b border-zinc-150 grid grid-cols-2 gap-2">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q.text)}
            disabled={loading}
            className="text-left py-1.5 px-3 rounded border border-zinc-200 bg-white hover:border-zinc-900 text-[10px] text-zinc-600 hover:text-zinc-900 transition-all font-mono tracking-tight flex items-center justify-between cursor-pointer outline-none"
          >
            <span>{q.label}</span>
            <ArrowRight size={10} className="text-zinc-400" />
          </button>
        ))}
      </div>

      {/* Input Row */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="p-3 bg-white flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about checkout projects, GA4 tracking..."
          className="flex-grow bg-white border border-zinc-200 rounded px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded bg-zinc-900 text-white px-3.5 py-2 hover:bg-zinc-800 transition-colors disabled:opacity-35 flex items-center justify-center cursor-pointer outline-none font-mono text-xs"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
        </button>
      </form>
    </div>
  );
};
