import React, { useState, useEffect, useRef } from 'react';

// Enhanced AI Chatbot Component
const SocialChatbot = ({ platformName, themeColorText, themeColorBg, themeColorBorder, themeColorHover, chatbotPrompts }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatHistory = [...chatHistory, { role: 'user', content: userMessage }];
    setChatHistory(newChatHistory);
    setUserMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDm2ODVscz6kNEsHPo4yWlyyRMiGXWFLQA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Reformat your response to be clean, professional, and without markdown or asterisks. Use clear bullet points if listing steps. Context is about optimizing a user's ${platformName} profile. ${userMessage}` 
            }] 
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      const cleanedResponse = aiResponse
        .replace(/\*+/g, '')
        .replace(/^#+\s*/gm, '')
        .trim();

      setChatHistory([...newChatHistory, { role: 'ai', content: cleanedResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([
        ...newChatHistory, 
        { role: 'ai', content: 'Sorry, there was an error processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false); 
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className={`bg-gradient-to-br ${themeColorBg} dark:bg-slate-800 dark:bg-none p-6 rounded-2xl shadow-xl border ${themeColorBorder} dark:border-slate-700`}>
      <h2 className={`text-2xl font-bold mb-4 ${themeColorText} dark:text-gray-100 flex items-center justify-between`}>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${themeColorText} dark:text-gray-100`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {platformName} Assistant
        </span>
        <button 
          onClick={() => {
            const lastAiMessage = chatHistory.filter(msg => msg.role === 'ai').pop();
            if (lastAiMessage) toggleSpeech(lastAiMessage.content);
          }}
          className={`flex items-center justify-center p-2 rounded-full transition-colors dark:text-gray-300 dark:hover:bg-slate-700 ${
            isSpeaking ? `bg-gray-800 text-white` : `${themeColorText} ${themeColorHover}`
          }`}
          title={isSpeaking ? "Stop speaking" : "Read aloud"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
      </h2>

      {chatHistory.length === 0 && (
        <div className={`${themeColorBg} dark:bg-slate-700/50 border ${themeColorBorder} dark:border-slate-600 rounded-lg p-4 mb-4 ${themeColorText} dark:text-gray-200`}>
          <p className="font-medium">Welcome to your {platformName} Profile Assistant!</p>
          <p className="text-sm mt-1">Ask me anything about improving your {platformName} profile and best practices.</p>
        </div>
      )}
      
      <div 
        ref={chatContainerRef}
        className={`h-64 overflow-y-auto mb-4 border ${themeColorBorder} dark:border-slate-600 p-4 bg-white dark:bg-[#111116] rounded-xl scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600`}
      >
        {chatHistory.length > 0 ? (
          chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white ml-auto shadow-sm dark:bg-indigo-600' 
                  : 'bg-gray-100 border border-gray-200 text-gray-800 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200 mr-auto shadow-sm'
              }`}
            >
              <div className="flex items-start">
                <div className={msg.role === 'user' ? 'text-sm' : 'text-sm'}>{msg.content}</div>
              </div>
            </div>
          ))
        ) : null}
        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask about ${platformName} profile enhancement...`}
          className="flex-grow p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#111116] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
        <button 
          onClick={handleSendMessage} 
          disabled={isLoading || !userMessage.trim()}
          className={`text-white px-6 py-3 rounded-lg transition-all flex items-center space-x-2 ${
            isLoading || !userMessage.trim()
              ? 'bg-gray-400 dark:bg-slate-600 cursor-not-allowed opacity-70' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
          }`}
        >
          <span>Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      
      <div className="mt-4">
        <p className={`text-xs ${themeColorText} dark:text-gray-400 mb-2`}>Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {chatbotPrompts.map((question, idx) => (
            <button 
              key={idx}
              onClick={() => setUserMessage(question)}
              className={`text-xs ${themeColorBg} dark:bg-slate-700/50 ${themeColorHover} dark:hover:bg-slate-700 ${themeColorText} dark:text-gray-300 py-1 px-2 rounded-full border ${themeColorBorder} dark:border-slate-600 transition-colors bg-opacity-50`}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Tips Card Component
const TipCard = ({ icon, title, description, platformName }) => (
  <div className="bg-white dark:bg-[#111116] rounded-xl shadow-md hover:shadow-lg transition-all p-8 flex flex-col items-center text-center border border-gray-100 dark:border-white/10 h-full transform hover:-translate-y-1">
    <div className="mb-5 text-5xl">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">{description}</p>
  </div>
);

const GenericSocialPage = ({ 
  platformName, 
  gradientFrom, 
  gradientTo, 
  themeColorText, 
  themeColorBg, 
  themeColorBorder, 
  themeColorHover,
  icon,
  tipsEssentials,
  tipsEngagement,
  features,
  youtubeVideos,
  chatbotPrompts
}) => {
  const [activeSection, setActiveSection] = useState('tips');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-72px)] w-full bg-gradient-to-br ${gradientFrom} ${gradientTo} dark:from-[#0A0A0A] dark:to-[#111116] transition-colors duration-200`}>
      
      {/* Sticky Top Nav within the Page */}
      <nav className="bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md shadow-sm sticky top-[72px] z-10 border-b border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 text-2xl flex items-center">
                {icon}
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight hidden sm:block">
                {platformName} Mastery
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide">
              <button onClick={() => scrollToSection('tips')} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeSection === 'tips' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                Tips
              </button>
              <button onClick={() => scrollToSection('features')} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeSection === 'features' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                Features
              </button>
              <button onClick={() => scrollToSection('videos')} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeSection === 'videos' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                Videos
              </button>
              <button onClick={() => scrollToSection('assistant')} className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${activeSection === 'assistant' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' : 'text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Assistant
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="mx-auto bg-gray-900 dark:bg-white/10 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full inline-block mb-6 shadow-sm border border-transparent dark:border-white/10">
            Boost Your Digital Presence
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Optimize your <br className="hidden sm:block" />
            <span className={themeColorText}>{platformName}</span> Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
            Transform your professional online footprint to unlock new career opportunities, rank higher in searches, and stand out.
          </p>
        </header>

        {/* Enhancement Tips Section */}
        <section id="tips" className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Profile Strategies</h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
          </div>
          <div className="bg-white dark:bg-[#111116] rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-white/5">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6 flex flex-col items-start bg-gray-50/50 dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                <h3 className={`text-xl font-bold ${themeColorText} dark:text-white flex items-center gap-2`}>
                  <span className={`w-8 h-8 rounded-lg ${themeColorBg} dark:bg-white/10 flex items-center justify-center`}>✨</span>
                  Profile Essentials
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {tipsEssentials.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${themeColorText} dark:text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6 flex flex-col items-start bg-gray-50/50 dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                <h3 className={`text-xl font-bold ${themeColorText} dark:text-white flex items-center gap-2`}>
                  <span className={`w-8 h-8 rounded-lg ${themeColorBg} dark:bg-white/10 flex items-center justify-center`}>🚀</span>
                  Engagement Tactics
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium text-sm">
                  {tipsEngagement.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${themeColorText} dark:text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="mb-24 scroll-mt-28">
           <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Core Features</h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <TipCard key={i} {...feature} platformName={platformName} />
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section id="videos" className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Video Masterclass</h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeVideos.map((video, index) => (
              <div key={index} className="bg-white dark:bg-[#111116] rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col group">
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  ></iframe>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{video.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-auto">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant Section */}
        <section id="assistant" className="scroll-mt-28 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
               Ask AI 
               <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse outline outline-4 outline-blue-500/20"></span>
            </h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
          </div>
          <SocialChatbot 
            platformName={platformName}
            themeColorText={themeColorText}
            themeColorBg={themeColorBg}
            themeColorBorder={themeColorBorder}
            themeColorHover={themeColorHover}
            chatbotPrompts={chatbotPrompts}
          />
        </section>
      </div>
    </div>
  );
};

export default GenericSocialPage;
