import React, { useState } from 'react';
import { Sparkles, Compass, Target, Clock, ArrowRight, Download, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

const GEMINI_API_KEY = "AIzaSyDm2ODVscz6kNEsHPo4yWlyyRMiGXWFLQA";

const PersonalizedRoadmap = () => {
  const [topic, setTopic] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [priorKnowledge, setPriorKnowledge] = useState('beginner');
  const [depth, setDepth] = useState('overview');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const generateRoadmap = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const prompt = `
        Create a personalized learning roadmap with the following parameters:
        
        Topic: ${topic}
        Time Limit: ${timeLimit}
        Prior Knowledge Level: ${priorKnowledge}
        Desired Depth: ${depth}
        
        Please format your response as follows (use standard markdown, strictly adhere to format):
        
        # LEARNING ROADMAP: ${topic.toUpperCase()}
        
        ## TECHNOLOGIES AND TOPICS
        (List all technologies and topics to learn with estimated time allocation for each)
        
        ## STEP-BY-STEP GUIDE
        (Provide a detailed timeline and sequence of learning activities to complete within the ${timeLimit} timeframe)
        
        ## ADDITIONAL RESOURCES AND RECOMMENDATIONS
        (Include any relevant information, tips, or resources that would be helpful)
      `;
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }], 
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Error generating roadmap');
      }
      
      const roadmapText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!roadmapText) {
        throw new Error('No roadmap was generated');
      }
      
      setRoadmap(roadmapText);
    } catch (err) {
      console.error('Error:', err);
      // Fallback text if API fails due to rate limits or invalid key
      setError("AI generation failed. Please check network connection or API Key limits.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 4) generateRoadmap();
    else setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);
  const isStepComplete = () => {
    switch (step) {
      case 1: return topic.trim() !== '';
      case 2: return timeLimit.trim() !== '';
      default: return true;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isStepComplete()) nextStep();
  };

  const processMarkdownLine = (line, index) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-black mt-8 mb-6 text-indigo-500 uppercase tracking-tight">{line.substring(2)}</h1>;
    } else if (line.startsWith('## ')) {
      return (
        <div key={index} className="flex items-center gap-3 mt-10 mb-6">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
             <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-gray-100">{line.substring(3)}</h2>
        </div>
      );
    } else if (line.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-emerald-500">{line.substring(4)}</h3>;
    } else if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    } else if (line.trim().startsWith('* ')) {
      const content = line.trim().substring(2);
      return (
        <div key={index} className="flex items-start mb-3 group">
          <div className="mt-1 mr-3 w-4 h-4 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-gray-500 group-hover:bg-white transition-colors" />
          </div>
          <div className="text-slate-700 dark:text-gray-300 leading-relaxed font-medium">{processInlineFormatting(content)}</div>
        </div>
      );
    } else if (line.trim().startsWith('- ')) {
      const content = line.trim().substring(2);
      return (
        <div key={index} className="flex items-start mb-3 group">
          <div className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
          <div className="text-slate-700 dark:text-gray-300 leading-relaxed">{processInlineFormatting(content)}</div>
        </div>
      );
    } else {
      return <p key={index} className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">{processInlineFormatting(line)}</p>;
    }
  };

  const processInlineFormatting = (text) => {
    const parts = [];
    let currentIndex = 0;
    let boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > currentIndex) parts.push({ text: text.substring(currentIndex, match.index), bold: false });
      parts.push({ text: match[1], bold: true });
      currentIndex = match.index + match[0].length;
    }
    if (currentIndex < text.length) parts.push({ text: text.substring(currentIndex), bold: false });
    if (parts.length === 0) return text;
    
    return parts.map((part, i) => 
      part.bold ? <strong key={i} className="font-bold text-slate-900 dark:text-white mx-0.5">{part.text}</strong> : <span key={i}>{part.text}</span>
    );
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([roadmap], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.toLowerCase().replace(/\s+/g, '-')}-roadmap.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const stepInfo = [
    { num: 1, label: "Target Topic", icon: Target },
    { num: 2, label: "Timeframe", icon: Clock },
    { num: 3, label: "Current Level", icon: BrainCircuit },
    { num: 4, label: "Depth Goal", icon: Compass }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-500 relative overflow-hidden py-12 px-4">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[150px] transition-all duration-700" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] transition-all duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 tracking-wide uppercase">Generative AI Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Roadmap</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Answer 4 quick questions and let the AI instantly forge a custom learning path tailored perfectly to your goals.
          </p>
        </div>

        {!roadmap && (
          <div className="w-full bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Stepper Header */}
            <div className="flex items-center justify-between mb-12 relative z-10 px-2 md:px-8">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-white/5 -translate-y-1/2 rounded-full z-0" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              
              {stepInfo.map((s) => {
                const isPast = step > s.num;
                const isCurrent = step === s.num;
                const Icon = s.icon;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                      isPast 
                        ? 'bg-indigo-500 border-indigo-200 dark:border-indigo-900 text-white shadow-lg' 
                        : isCurrent
                          ? 'bg-white dark:bg-[#111116] border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-xl scale-110'
                          : 'bg-slate-100 dark:bg-gray-800 border-white dark:border-gray-700 text-slate-400 dark:text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`absolute -bottom-7 text-xs font-bold whitespace-nowrap hidden sm:block ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-gray-500'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stepper Content */}
            <div className="min-h-[220px] flex flex-col justify-center relative z-10">
              {step === 1 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white">What do you want to master?</h2>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">Be specific! Example: React Native, Systems Design, Advanced SQL.</p>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Target className="h-6 w-6 text-indigo-500/50 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      autoFocus
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="block w-full pl-12 pr-4 py-4 md:py-5 bg-slate-50 dark:bg-[#111116] border border-slate-200 dark:border-white/10 rounded-2xl text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-inner transition-all"
                      placeholder="e.g., Quantum Computing Basics"
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white">What's your timeline?</h2>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">How much time can you dedicate to complete this roadmap?</p>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Clock className="h-6 w-6 text-indigo-500/50 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      autoFocus
                      type="text"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="block w-full pl-12 pr-4 py-4 md:py-5 bg-slate-50 dark:bg-[#111116] border border-slate-200 dark:border-white/10 rounded-2xl text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-inner transition-all"
                      placeholder="e.g., 30 Days, 3 Months, 2 Hours a week"
                    />
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white">Current Experience Level?</h2>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">Select where you currently stand with this topic.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => { setPriorKnowledge(level); }}
                        className={`py-4 px-6 rounded-2xl font-bold capitalize transition-all border ${
                          priorKnowledge === level 
                            ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-md ring-2 ring-indigo-500/20' 
                            : 'bg-slate-50 dark:bg-[#111116] border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-indigo-300 hover:bg-white dark:hover:bg-white/5'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div className="animate-in slide-in-from-right-8 fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white">Desired Learning Depth?</h2>
                  <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">How deeply do you want the AI to formulate the plan?</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'overview', title: 'High-Level Overview' },
                      { id: 'moderate', title: 'Moderate Depth' },
                      { id: 'in-depth', title: 'Complete Mastery (In-Depth)' }
                    ].map(d => (
                      <button
                        key={d.id}
                        onClick={() => { setDepth(d.id); }}
                        className={`py-4 px-4 rounded-2xl font-bold transition-all border flex flex-col gap-2 items-center text-center ${
                          depth === d.id 
                            ? 'bg-indigo-600 dark:bg-indigo-500/10 border-indigo-500 text-white dark:text-indigo-400 shadow-md ring-2 ring-indigo-500/20' 
                            : 'bg-slate-50 dark:bg-[#111116] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-indigo-300 hover:bg-white dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="text-[0.95rem]">{d.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            {error && (
               <div className="w-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium p-4 rounded-xl text-center text-sm mb-6 border border-red-200 dark:border-red-500/20 shadow-sm animate-in fade-in">
                 <span className="font-bold flex items-center justify-center gap-2">
                   <Zap className="w-4 h-4" /> Wait a second...
                 </span>
                 {error}
               </div>
            )}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-white/10 relative z-10">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 font-bold rounded-xl transition-colors ${
                  step === 1 
                    ? 'text-transparent cursor-default' 
                    : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-white/5'
                }`}
              >
                Go Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={!isStepComplete() || (step === 4 && loading)}
                className={`group flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  isStepComplete() && !loading
                    ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black shadow-lg hover:shadow-xl active:scale-95 cursor-pointer' 
                    : 'bg-slate-200 dark:bg-gray-800 text-slate-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                {step === 4 ? (
                  loading ? (
                    <><Zap className="w-5 h-5 animate-pulse text-indigo-500" /> Generating Magic...</>
                  ) : 'Generate Roadmap'
                ) : (
                  <>Next Step <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Roadmap Display */}
        {roadmap && (
          <div className="w-full bg-white/90 dark:bg-[#111116]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 fade-in duration-700">
            {/* Header Gradient Block */}
            <div className="p-8 pb-10 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 dark:from-indigo-900/40 dark:to-purple-900/40 border-b border-indigo-100 dark:border-indigo-500/20 text-center relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
               <div className="inline-flex w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 shadow-xl items-center justify-center mb-4 transform -rotate-3 border border-slate-100 dark:border-gray-800">
                 <Compass className="w-8 h-8 text-indigo-500" />
               </div>
               <h2 className="text-3xl font-black text-slate-900 dark:text-white">Your Success Blueprint</h2>
               <p className="text-slate-600 dark:text-gray-400 mt-2 font-medium">Custom generated for {topic} • {timeLimit}</p>
            </div>

            <div className="p-6 md:p-10 prose max-w-none w-full overflow-y-auto custom-scrollbar" style={{ maxHeight: '60vh' }}>
              {roadmap.split('\n').map((line, index) => processMarkdownLine(line, index))}
            </div>

            <div className="p-6 md:p-8 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400 font-bold rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Save as Document
              </button>
              <button
                onClick={() => {
                  setRoadmap(null);
                  setStep(1);
                  setTopic('');
                  setTimeLimit('');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                Create Another Path <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedRoadmap;
