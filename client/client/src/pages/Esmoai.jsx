import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Bot, Copy, Check, Volume2, VolumeX, Mic, MicOff, Download, Sparkles, User } from 'lucide-react';

const genAI = new GoogleGenerativeAI('AIzaSyDzYHVthRT3e9Hy9UNu9CBGgBfRqjWYKVw');

export function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef(null);
  const speechSynthRef = useRef(null);
  const recognitionRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again or check your API key/network.' }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev ? prev + ' ' + transcript.trim() : transcript.trim());
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.abort();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    }
  };

  const formatText = (text) => {
    const segments = [];
    const codeBlockRegex = /```([\w]*)\n([\s\S]*?)\n```/g;
    
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      segments.push({ type: 'code', language: match[1] || 'code', content: match[2] });
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      segments.push({ type: 'text', content: text.substring(lastIndex) });
    }
    
    return segments;
  };
  
  const formatTextContent = (content) => {
    if (!content) return null;
    let withFormatting = content.replace(/^\s*\*\s+(.*?)$/gm, '<li>$1</li>');
    withFormatting = withFormatting.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    withFormatting = withFormatting.replace(/\*\*\*(.*?)\*\*\*/g, '<h3 class="text-lg font-bold my-2 text-indigo-400">$1</h3>');
    withFormatting = withFormatting.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-white/10 text-indigo-300 font-mono text-sm">$1</code>');
    
    withFormatting = withFormatting.replace(/<li>(.*?)<\/li>/g, (match) => {
      return `<ul class="list-disc ml-6 my-2 marker:text-indigo-500">${match}</ul>`;
    });
    withFormatting = withFormatting.replace(/<\/ul>\s*<ul[^>]*>/g, '');
   
    const paragraphs = withFormatting.split('\n\n');
    withFormatting = paragraphs.map(p => {
      if (!p.includes('<h3') && !p.includes('<ul') && p.trim() !== '') {
        return `<p class="mb-4 leading-relaxed">${p}</p>`;
      }
      return p;
    }).join('\n');
    
    return <div dangerouslySetInnerHTML={{ __html: withFormatting }} />;
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const textOnlyContent = text.replace(/```[\s\S]*?```/g, 'Code block omitted for speech');
    const utterance = new SpeechSynthesisUtterance(textOnlyContent);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const downloadChat = () => {
    if (messages.length === 0) return;
    let chatContent = "# AI Learning Assistant Chat\n\n";
    messages.forEach((message) => {
      const role = message.role === 'user' ? 'You' : 'AI Assistant';
      chatContent += `## ${role}:\n${message.content}\n\n`;
    });
    const blob = new Blob([chatContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = `ai-chat-${formattedDate}.md`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-500 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[120px] transition-all duration-700" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 flex flex-col flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 pb-6">
        
        {/* Header Content */}
        {!messages.length && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center p-1 mb-6 shadow-2xl shadow-indigo-500/20">
              <div className="w-full h-full bg-white dark:bg-[#0A0A0A] rounded-[1.3rem] flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-indigo-500" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              AI Tutor <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Assistant</span>
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-lg mb-8">
              Ask any programming question, get code explanations, or brainstorm project ideas. I'm here to help you master tech skills.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl text-sm">
              {['Explain React Hooks', 'Write a Python script', 'Help me debug this CSS', 'What is OOP?'].map(txt => (
                <button 
                  key={txt} 
                  onClick={() => setInput(txt)}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all cursor-pointer backdrop-blur-md"
                >
                  {txt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        {messages.length > 0 && (
          <div className="flex justify-between items-center mb-4 bg-white/60 dark:bg-white/5 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/40 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white -mb-1">AI Tutor Session</h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium tracking-wide uppercase">Generative AI</span>
              </div>
            </div>
            <button
              onClick={downloadChat}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="Download Conversation"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        )}

        {messages.length > 0 && (
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto scrollbar-hide space-y-6 lg:px-4 py-4"
          >
            {messages.map((message, idx) => {
              const formattedSegments = formatText(message.content);
              const isUser = message.role === 'user';
              
              return (
                <div key={idx} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-1">
                      {isUser ? (
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-white/10 shadow-sm">
                          <User className="w-5 h-5 text-slate-600 dark:text-gray-400" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`group relative flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-4 rounded-[1.5rem] shadow-sm backdrop-blur-md ${
                        isUser 
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm' 
                          : 'bg-white border border-slate-200 text-slate-800 dark:bg-[#1A1A24] dark:border-white/10 dark:text-gray-200 rounded-tl-sm'
                      }`}>
                        
                        {!isUser && (
                          <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-lg rounded-full overflow-hidden z-10">
                            <button 
                              onClick={() => speakText(message.content)}
                              className="p-2 text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                              title={isSpeaking ? "Stop Voice" : "Listen"}
                            >
                              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => copyToClipboard(message.content, `msg-${idx}`)}
                              className="p-2 text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-l border-slate-200 dark:border-white/10"
                              title="Copy Text"
                            >
                              {copiedIndex === `msg-${idx}` ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        )}

                        <div className="text-[0.95rem] space-y-2 break-words text-left">
                          {isUser ? (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          ) : (
                            formattedSegments.map((segment, sIdx) => {
                              const sKey = `${idx}-${sIdx}`;
                              if (segment.type === 'text') {
                                return <div key={sKey}>{formatTextContent(segment.content)}</div>;
                              } else {
                                return (
                                  <div key={sKey} className="my-5 rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 bg-[#0F111A]">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#1A1D27] border-b border-slate-700/50">
                                      <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">{segment.language || 'code'}</span>
                                      <button 
                                        onClick={() => copyToClipboard(segment.content, sKey)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                      >
                                        {copiedIndex === sKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                      </button>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                                      <code>{segment.content}</code>
                                    </pre>
                                  </div>
                                );
                              }
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex w-full justify-start animate-in fade-in duration-300">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
                     <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-5 py-4 rounded-[1.5rem] rounded-tl-sm bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div className="h-4" /> {/* Spacer */}
          </div>
        )}

        {/* Unified Input Box below chat (or pinned to bottom) */}
        <div className={`mt-auto pt-4 ${!messages.length ? 'w-full max-w-3xl mx-auto' : ''}`}>
          <div className="relative group rounded-[2rem] bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AI Tutor..."
              rows={1}
              className="w-full bg-transparent px-6 text-slate-900 dark:text-white placeholder-slate-400 outline-none resize-none pt-4 pb-14 min-h-[60px] max-h-[200px]"
              style={{ overflowY: input.split('\n').length > 3 ? 'auto' : 'hidden' }}
            />
            
            <div className="absolute bottom-2 left-4 right-2 flex justify-between items-center bg-white/5 dark:bg-[#111116]/5 backdrop-blur-sm pt-2">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                  isListening 
                    ? 'bg-red-500/10 text-red-500 pulse-animation' 
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-gray-200 dark:hover:bg-white/10'
                }`}
                title={isListening ? "Listening..." : "Use voice input"}
              >
                {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-medium mt-3">Press Shift+Enter for a new line. AI can make mistakes. Consider verifying important information.</p>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;
