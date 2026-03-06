import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const TypingTest = () => {
  const { isDarkMode } = useTheme();
  
  // State variables
  const [words, setWords] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [timer, setTimer] = useState(30); 
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isActive, setIsActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentThemeColor, setCurrentThemeColor] = useState('indigo'); // Theme color accent
  const [customTime, setCustomTime] = useState(45);
  const [showSettings, setShowSettings] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  
  const inputRef = useRef(null);
  const wordContainerRef = useRef(null);

  // Word lists by difficulty
  const wordLists = {
    easy: [
      'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had', 'her', 'was', 'one', 
      'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 
      'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'
    ],
    medium: [
      'about', 'above', 'after', 'again', 'along', 'began', 'below', 'between', 'both', 'car', 'children', 
      'city', 'close', 'country', 'earth', 'every', 'father', 'food', 'great', 'hand', 'house', 'large', 
      'learn', 'letter', 'light', 'money', 'mother', 'mountain', 'night', 'paper', 'people', 'picture', 
      'plant', 'river', 'school', 'story', 'study', 'thing', 'thought', 'water', 'while', 'world', 'would'
    ],
    hard: [
      'algorithm', 'application', 'beautiful', 'calculation', 'challenging', 'characteristic', 'combination', 
      'competition', 'comprehensive', 'configuration', 'considerable', 'constitution', 'contemporary', 
      'contribution', 'conversation', 'corporation', 'distribution', 'documentation', 'effectiveness', 
      'environmental', 'extraordinary', 'functionality', 'implementation', 'infrastructure', 'innovation', 
      'institution', 'intelligence', 'international', 'investigation', 'mathematics', 'multiplication', 
      'negotiation', 'opportunity', 'organization', 'performance', 'perspective', 'possibility', 
      'preparation', 'productivity', 'professional', 'programming', 'qualification', 'relationship', 
      'requirement', 'responsibility', 'satisfaction', 'significance', 'subscription', 'technology', 
      'temperature', 'understanding'
    ]
  };

  // Accent Colors maps
  const accents = {
    indigo: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400',
      hoverBg: 'hover:bg-indigo-700',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-500',
      border: 'border-indigo-500',
      ring: 'focus:ring-indigo-500'
    },
    emerald: {
      primary: 'bg-emerald-600',
      secondary: 'bg-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      hoverBg: 'hover:bg-emerald-700',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-500',
      border: 'border-emerald-500',
      ring: 'focus:ring-emerald-500'
    },
    rose: {
      primary: 'bg-rose-600',
      secondary: 'bg-rose-500',
      text: 'text-rose-600 dark:text-rose-400',
      hoverBg: 'hover:bg-rose-700',
      gradientFrom: 'from-rose-500',
      gradientTo: 'to-pink-500',
      border: 'border-rose-500',
      ring: 'focus:ring-rose-500'
    }
  };

  const accent = accents[currentThemeColor];

  // Generate random words
  const generateWords = () => {
    const wordPool = wordLists[difficulty];
    const randomWords = [];
    const wordCount = 200; 
    for (let i = 0; i < wordCount; i++) {
      randomWords.push(wordPool[Math.floor(Math.random() * wordPool.length)]);
    }
    setWords(randomWords);
  };

  useEffect(() => {
    generateWords();
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(time => time - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      endTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (wordContainerRef.current && isActive) {
      const container = wordContainerRef.current;
      const activeWord = container.querySelector('.word.active');
      if (activeWord) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeWord.getBoundingClientRect();
        if (activeRect.top < containerRect.top || activeRect.bottom > containerRect.bottom) {
          const scrollOffset = activeWord.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeWord.clientHeight / 2);
          container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        }
      }
    }
  }, [currentWordIndex, isActive]);

  useEffect(() => {
    if (isActive && inputRef.current) inputRef.current.focus();
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const minutes = (timer - timeLeft) / 60;
      if (minutes > 0) {
        const wordsTyped = charactersTyped / 5;
        setWpm(Math.round(wordsTyped / minutes));
        setAccuracy(correctCharacters > 0 ? Math.round((correctCharacters / charactersTyped) * 100) : 0);
      }
    }
  }, [charactersTyped, correctCharacters, timeLeft, timer, isActive]);

  const startTest = () => {
    setTestComplete(false);
    setIsActive(true);
    setTimeLeft(timer);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setCharactersTyped(0);
    setCorrectCharacters(0);
    setWpm(0);
    setAccuracy(100);
    generateWords();
    if (inputRef.current) inputRef.current.focus();
  };

  const endTest = () => { setIsActive(false); setTestComplete(true); };

  const resetTest = () => {
    setIsActive(false);
    setTestComplete(false);
    setTimeLeft(timer);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setCharactersTyped(0);
    setCorrectCharacters(0);
    setWpm(0);
    setAccuracy(100);
    generateWords();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isActive && value.length > 0) startTest();
    if (isActive) {
      setCurrentInput(value);
      if (value.endsWith(' ')) {
        const typedWord = value.trim();
        const currentWord = words[currentWordIndex];
        const minLength = Math.min(typedWord.length, currentWord.length);
        let correctChars = 0;
        for (let i = 0; i < minLength; i++) {
          if (typedWord[i] === currentWord[i]) correctChars++;
        }
        setCharactersTyped(prev => prev + typedWord.length + 1);
        setCorrectCharacters(prev => prev + correctChars);
        setCurrentWordIndex(prev => prev + 1);
        setCurrentInput('');
      }
    }
  };

  const handleTimerChange = (seconds) => {
    setTimer(seconds);
    setTimeLeft(seconds);
    resetTest();
  };

  const handleCustomTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 300) setCustomTime(value);
  };

  return (
    <div className={`w-full h-full min-h-[calc(100vh-4rem)] transition-colors duration-200 font-sans ${isDarkMode ? 'bg-[#0f111a] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${accent.gradientFrom} ${accent.gradientTo}`}>
            Speed Type
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your typing speed and accuracy
          </p>
        </header>

        <main>
          {/* Test Area */}
          <div className={`relative mb-6 p-6 rounded-xl shadow-lg border ${isDarkMode ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <div className={`text-2xl font-bold ${timeLeft <= 5 && isActive ? 'text-red-500 animate-pulse' : isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {timeLeft}s
              </div>
              <div className="flex space-x-3">
                <div className={`px-4 py-1.5 rounded-lg font-medium tracking-wide ${isDarkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  WPM: <span className={accent.text}>{wpm}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-lg font-medium tracking-wide ${isDarkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  Accuracy: <span className={accent.text}>{accuracy}%</span>
                </div>
              </div>
            </div>

            <div 
              ref={wordContainerRef}
              className={`h-28 mb-5 overflow-y-auto p-4 rounded-xl leading-relaxed text-lg border ${isDarkMode ? 'bg-[#10121a] border-gray-800' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex flex-wrap">
                {words.map((word, index) => (
                  <span 
                    key={index} 
                    className={`word mr-2.5 mb-2 px-1 rounded transition-colors ${
                      index === currentWordIndex 
                        ? `active ${accent.text} font-bold opacity-100 scale-105` 
                        : index < currentWordIndex 
                          ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                          : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              disabled={!isActive && testComplete}
              placeholder={isActive ? "Keep typing..." : "Start typing to begin..."}
              className={`w-full p-4 rounded-xl border-2 focus:outline-none text-lg transition-all shadow-sm ${
                isDarkMode 
                  ? `bg-[#0f111a] text-white border-gray-700 focus:${accent.border} ${accent.ring} focus:ring-opacity-20` 
                  : `bg-white text-gray-900 border-gray-300 focus:${accent.border} ${accent.ring} focus:ring-opacity-20`
              }`}
            />

            {testComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl z-10 animate-in fade-in">
                <div className={`text-center p-8 rounded-2xl shadow-2xl max-w-sm w-full ${isDarkMode ? 'bg-[#1a1d27] border border-gray-700' : 'bg-white'}`}>
                  <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`p-4 rounded-xl ${accent.primary} text-white shadow-lg shadow-black/10`}>
                      <p className="text-sm font-medium opacity-90">WPM</p>
                      <p className="text-4xl font-bold mt-1">{wpm}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${accuracy >= 95 ? 'bg-emerald-500' : accuracy >= 80 ? 'bg-amber-500' : 'bg-rose-500'} text-white shadow-lg shadow-black/10`}>
                      <p className="text-sm font-medium opacity-90">Accuracy</p>
                      <p className="text-4xl font-bold mt-1">{accuracy}%</p>
                    </div>
                  </div>
                  <button 
                    onClick={resetTest}
                    className={`w-full ${accent.primary} text-white py-3 px-6 rounded-xl font-medium ${accent.hoverBg} transition-all active:scale-95 shadow-md`}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-xl border ${isDarkMode ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
              {[15, 30, 60].map(seconds => (
                <button
                  key={seconds}
                  onClick={() => handleTimerChange(seconds)}
                  className={`py-1.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                    timer === seconds 
                      ? `${accent.primary} text-white shadow-sm` 
                      : isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {seconds}s
                </button>
              ))}
              <div className="flex items-center ml-2 border-l pl-3 border-gray-200 dark:border-gray-700">
                <input
                  type="number"
                  min="1" max="300"
                  value={customTime}
                  onChange={handleCustomTimeChange}
                  className={`w-16 px-2 py-1.5 rounded-l-lg border border-r-0 text-sm focus:outline-none focus:ring-1 ${accent.ring} ${
                    isDarkMode ? 'bg-[#0f111a] text-white border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-300'
                  }`}
                />
                <button
                  onClick={() => handleTimerChange(customTime)}
                  className={`py-1.5 px-3 rounded-r-lg border ${accent.primary} border-transparent text-white text-sm font-medium ${accent.hoverBg} transition-colors`}
                >
                  Set
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetTest}
                className={`py-2 px-5 rounded-lg font-medium text-sm transition-colors border ${
                  isDarkMode ? 'bg-[#1a1d27] border-gray-700 text-gray-300 hover:bg-gray-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                Reset
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`py-2 px-5 rounded-lg font-medium text-sm text-white transition-colors shadow-sm ${accent.primary} ${accent.hoverBg}`}
              >
                {showSettings ? 'Hide Settings' : 'Settings'}
              </button>
            </div>
          </div>

          {showSettings && (
            <div className={`p-6 rounded-xl border shadow-lg mb-6 animate-in slide-in-from-top-2 ${isDarkMode ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-sm tracking-widest font-bold uppercase mb-3 ${text-muted} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Accent Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(accents).map(themeName => (
                      <button
                        key={themeName}
                        onClick={() => setCurrentThemeColor(themeName)}
                        className={`capitalize py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                          currentThemeColor === themeName 
                            ? `${accents[themeName].primary} text-white shadow-md` 
                            : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {themeName}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-sm tracking-widest font-bold uppercase mb-3 ${text-muted} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {['easy', 'medium', 'hard'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => { setDifficulty(diff); generateWords(); resetTest(); }}
                        className={`capitalize py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                          difficulty === diff 
                            ? `${accent.primary} text-white shadow-md` 
                            : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TypingTest;
