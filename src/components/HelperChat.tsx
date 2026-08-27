import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Bot, 
  User, 
  Check, 
  Copy, 
  Flame, 
  ChefHat, 
  BookOpen, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

interface HelperChatProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onNavigateToWorkshops?: () => void;
  onNavigateToProducts?: () => void;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'greet-1',
  role: 'assistant',
  content: "नमस्कार! I am **Helper**, your dedicated culinary guide & concierge at **२१ कळ्या Modak & Culinary Studio** (स्वादः परमानन्दः).\n\nAsk me about:\n- 🌸 **The authentic 21-pleat hand-folding technique**\n- 👨‍🍳 **Upcoming cooking workshops & masterclasses**\n- 📦 **DIY culinary kits & heirloom Ambemohar flour**\n- 🍯 **Freshness, reheating & pure A2 ghee pairings**\n\nHow can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  model: 'gemini-3.7-flash'
};

const SUGGESTED_QUESTIONS = [
  "How to pleat 21 folds at home?",
  "Which workshop is best for beginners?",
  "How to reheat steamed Ukadiche modak?",
  "What is inside the DIY Masterclass Kit?",
  "२१ कळ्यांचे अस्सल उकडीचे मोदक रेसिपी"
];

export const HelperChat: React.FC<HelperChatProps> = ({
  isOpen: externalIsOpen,
  onOpen: externalOnOpen,
  onClose: externalOnClose,
  onNavigateToWorkshops,
  onNavigateToProducts
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleOpenChat = () => {
    if (externalOnOpen) externalOnOpen();
    else setInternalIsOpen(true);
    setIsMinimized(false);
  };

  const handleCloseChat = () => {
    if (externalOnClose) externalOnClose();
    else setInternalIsOpen(false);
  };

  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('modak_helper_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [INITIAL_GREETING];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.7-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.7-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('modak_helper_chat', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom when messages change or modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Map format for server API
      const payloadMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          modelChoice: selectedModel
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am happy to assist you with our modaks and workshops.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || selectedModel
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "I'm having a slight connection moment, but I'm here! For quick help: You can explore our **Signature 21 Kalya Ukadiche Modaks** or book a seat in our **Hands-on Masterclasses** right on this page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    localStorage.removeItem('modak_helper_chat');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatContent = (content: string) => {
    // Basic Markdown formatting helper for bold, lists, and headings
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Check for bullet point
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const isNumbered = /^\d+\.\s/.test(line.trim());
      
      // Process bold formatting **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-bold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#EDA124] font-bold text-xs mt-1.5">•</span>
            <div className="flex-1 text-sm text-gray-800 leading-relaxed">
              {renderedParts.slice(1)}
            </div>
          </div>
        );
      }

      if (isNumbered) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#18564D] font-bold text-xs mt-0.5">
              {line.trim().match(/^\d+\./)?.[0]}
            </span>
            <div className="flex-1 text-sm text-gray-800 leading-relaxed">
              {renderedParts}
            </div>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="text-sm text-gray-800 leading-relaxed my-0.5">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#EDA124]/40 flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-[#18564D]">Ask Helper</span>
            <span className="text-[10px] bg-[#EDA124]/20 text-[#18564D] px-1.5 py-0.5 rounded-md font-bold">
              Gemini 3.7
            </span>
          </div>

          <button
            id="open-helper-chat-button"
            onClick={handleOpenChat}
            aria-label="Open Helper AI Chatbot"
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#18564D] to-[#0f3d36] text-[#F8EDE0] rounded-full shadow-2xl hover:shadow-[#EDA124]/30 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#EDA124]/60"
          >
            <div className="relative">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EDA124] flex items-center justify-center text-[#18564D] font-bold shadow-md">
                <ChefHat className="w-4 h-4" />
              </div>
              <Sparkles className="w-3 h-3 text-[#EDA124] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="text-left">
              <div className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#EDA124] flex items-center gap-1">
                Helper <span className="text-[9px] sm:text-[10px] font-normal text-white/80">• AI</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/90 font-devanagari font-medium hidden xs:block">
                २१ कळ्या सहाय्यक
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window Modal / Widget */}
      {isOpen && (
        <div
          id="helper-chat-widget"
          className={`fixed z-50 transition-all duration-300 ease-out shadow-2xl border border-[#EDA124]/40 bg-white rounded-3xl overflow-hidden flex flex-col ${
            isMinimized
              ? 'bottom-4 right-3 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-14 sm:h-16 rounded-2xl'
              : 'bottom-2 right-2 sm:bottom-6 sm:right-6 w-[calc(100vw-1rem)] sm:w-[420px] max-w-full h-[88vh] sm:h-[620px] max-h-[92vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#18564D] via-[#144840] to-[#0f3d36] text-white p-4 flex items-center justify-between border-b border-[#EDA124]/30 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#EDA124] to-[#c78211] p-0.5 flex items-center justify-center text-[#18564D] shadow-md">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#18564D] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#F8EDE0] flex items-center gap-1.5">
                    Helper
                    <span className="text-[10px] bg-[#EDA124]/30 text-[#EDA124] px-1.5 py-0.2 rounded font-mono font-bold">
                      AI 3.7
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-[#EDA124] font-devanagari">
                  २१ कळ्या पाककृती व कार्यशाळा मार्गदर्शक
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 hover:text-[#EDA124] hover:bg-white/10 rounded-lg transition-colors text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand chat" : "Minimize chat"}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCloseChat}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Model & Mode Selector Bar */}
              <div className="bg-[#FAF3EA] px-3.5 py-2 border-b border-amber-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#EDA124]" />
                  <span>Engine:</span>
                </div>
                <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-lg border border-amber-200">
                  <button
                    onClick={() => setSelectedModel('gemini-3.7-flash')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                      selectedModel === 'gemini-3.7-flash'
                        ? 'bg-[#18564D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    3.7 Flash
                  </button>
                  <button
                    onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                      selectedModel === 'gemini-3.1-pro-preview'
                        ? 'bg-[#18564D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    3.1 Pro
                  </button>
                  <button
                    onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                      selectedModel === 'gemini-3.1-flash-lite'
                        ? 'bg-[#18564D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    3.1 Lite
                  </button>
                </div>
              </div>

              {/* Message List Thread */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FDFBF7] to-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#18564D] to-[#0f3d36] text-[#EDA124] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`relative group max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm ${
                        msg.role === 'user'
                          ? 'bg-[#18564D] text-[#F8EDE0] rounded-tr-xs'
                          : 'bg-white text-gray-800 border border-amber-200/70 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {/* Content */}
                      <div>
                        {msg.role === 'assistant' ? formatContent(msg.content) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        )}
                      </div>

                      {/* Footer & Copy */}
                      <div className={`mt-2 pt-1 border-t flex items-center justify-between text-[10px] ${
                        msg.role === 'user' ? 'border-white/20 text-white/70' : 'border-gray-100 text-gray-400'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {msg.timestamp}
                        </span>

                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            title="Copy reply"
                            className="text-gray-400 hover:text-gray-700 transition-colors p-0.5 rounded"
                          >
                            {copiedId === msg.id ? (
                              <span className="text-emerald-600 flex items-center gap-0.5 font-bold text-[9px]">
                                <Check className="w-2.5 h-2.5" /> Copied
                              </span>
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-[#EDA124] text-[#18564D] flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-xl bg-[#18564D] text-[#EDA124] flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="bg-white border border-amber-200 p-3.5 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#18564D] animate-ping" />
                      <span className="text-xs text-gray-600 font-medium">Helper is crafting response...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3.5 py-2 bg-[#FAF3EA]/80 border-t border-amber-200/60 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#EDA124]" /> Try:
                </span>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="shrink-0 text-[11px] px-2.5 py-1 bg-white text-[#18564D] font-medium rounded-full border border-amber-200 hover:bg-[#18564D] hover:text-white hover:border-[#18564D] transition-all shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <div className="p-3 bg-white border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask Helper about 21 pleats, recipes, or workshops..."
                    disabled={isLoading}
                    className="flex-1 px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#18564D] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 bg-[#18564D] text-[#F8EDE0] rounded-xl hover:bg-[#13443d] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Navigation Footer Links */}
                <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-gray-500">
                  <span className="font-devanagari text-gray-600">२१ कळ्या पाककला सहाय्यक</span>
                  <div className="flex items-center gap-3">
                    {onNavigateToWorkshops && (
                      <button
                        onClick={onNavigateToWorkshops}
                        className="text-[#18564D] font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        <BookOpen className="w-2.5 h-2.5" /> Workshops
                      </button>
                    )}
                    {onNavigateToProducts && (
                      <button
                        onClick={onNavigateToProducts}
                        className="text-[#18564D] font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        Menu <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
