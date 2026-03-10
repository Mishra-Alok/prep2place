import React, { useState } from 'react';
import { Play, Check, Terminal, Code2, Menu, FileText } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../utils/apiConfig';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';

const MachineCode = () => {
  const { isDarkMode } = useTheme();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('machineCode_language') || 'javascript';
  });
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem('machineCode_code');
    return saved !== null ? saved : 'function main() {\n    console.log("Hello, World!");\n}\n\nmain();';
  });
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showQuestions, setShowQuestions] = useState(() => {
    const saved = localStorage.getItem('machineCode_showQuestions');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedQuestion, setSelectedQuestion] = useState(() => {
    const saved = localStorage.getItem('machineCode_selectedQuestion');
    return saved ? JSON.parse(saved) : null;
  });

  React.useEffect(() => {
    localStorage.setItem('machineCode_language', language);
  }, [language]);

  React.useEffect(() => {
    localStorage.setItem('machineCode_code', code);
  }, [code]);

  React.useEffect(() => {
    if (selectedQuestion) {
      localStorage.setItem('machineCode_selectedQuestion', JSON.stringify(selectedQuestion));
    } else {
      localStorage.removeItem('machineCode_selectedQuestion');
    }
  }, [selectedQuestion]);

  const defaultTemplates = {
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    javascript: 'function main() {\n    console.log("Hello, World!");\n}\n\nmain();',
    python: 'def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()'
  };

  const codingQuestions = [
    {
      id: 1, title: "Hello World",
      description: "Write a program that prints 'Hello, World!' to the console.",
      language: "javascript",
      template: 'function main() {\n    // Write your code here\n    \n}\n\nmain();',
      solution: 'console.log("Hello, World!");',
      expectedOutput: 'Hello, World!', solved: false
    },
    {
      id: 2, title: "Sum of Two Numbers",
      description: "Write a program that adds two numbers (5 and 7) and prints the result.",
      language: "java",
      template: 'public class Main {\n    public static void main(String[] args) {\n        // Add 5 and 7 and print the result\n        \n    }\n}',
      solution: 'System.out.println(12);',
      expectedOutput: '12', solved: false
    },
    {
      id: 3, title: "FizzBuzz",
      description: "Print numbers from 1 to 15. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For multiples of both, print 'FizzBuzz'.",
      language: "javascript",
      template: 'function fizzBuzz() {\n    // Implement FizzBuzz for numbers 1-15\n    \n}\n\nfizzBuzz();',
      solution: 'for (let i = 1; i <= 15; i++) {\n        if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");\n        else if (i % 3 === 0) console.log("Fizz");\n        else if (i % 5 === 0) console.log("Buzz");\n        else console.log(i);\n    }',
      expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solved: false
    },
    {
      id: 4, title: "Even or Odd",
      description: "Write a program that determines if a number (42) is even or odd and prints the result.",
      language: "python",
      template: 'def check_even_odd(num):\n    # Check if num is even or odd and print the result\n    pass\n\ncheck_even_odd(42)',
      solution: 'if num % 2 == 0:\n        print(f"{num} is even")\n    else:\n        print(f"{num} is odd")',
      expectedOutput: '42 is even', solved: false
    }
  ];

  const [questions, setQuestions] = useState(codingQuestions);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (!selectedQuestion) {
      setCode(defaultTemplates[newLang] || '');
      setOutput('');
      setError('');
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/execute`, { language, code });
      const resultOutput = response.data.output || '';
      const resultError = response.data.error || '';
      if (resultError) {
        setError(resultError);
      } else {
        setOutput(resultOutput || 'Program executed with no explicit output.');
        if (selectedQuestion) {
          const question = questions.find(q => q.id === selectedQuestion);
          if (question && !question.solved) {
            const cleanOutput = resultOutput.trim().replace(/\r\n/g, '\n');
            const cleanExpected = question.expectedOutput.trim().replace(/\r\n/g, '\n');
            if (cleanOutput === cleanExpected || cleanOutput.includes(cleanExpected)) {
              markSolved(selectedQuestion);
            }
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || `Runtime Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const markSolved = (id) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, solved: true } : q));
  };

  const clearOutput = () => { setOutput(''); setError(''); };
  const toggleQuestions = () => {
    const newVal = !showQuestions;
    setShowQuestions(newVal);
    localStorage.setItem('machineCode_showQuestions', JSON.stringify(newVal));
  };

  const selectQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(id);
      setLanguage(question.language);
      setCode(question.template);
      setOutput('');
      setError('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] w-full bg-[#f8fafc] dark:bg-[#0A0A0A] text-slate-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* Top Navbar for IDE - Full width, flush with edges */}
      <div className="flex justify-between items-center px-4 md:px-6 h-14 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#111116] z-10">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Code2 className="w-5 h-5" />
          <span className="font-extrabold text-sm tracking-wide">Machine Coding IDE</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <select
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 font-medium text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="javascript">Node.js</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>

          <button
            onClick={toggleQuestions}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold border transition-all shadow-sm ${
              showQuestions
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700 dark:bg-[#1A1A24] dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5'
            }`}
          >
            <Menu size={16} />
            <span className="hidden sm:inline">Problems</span>
          </button>
          
          <button
            onClick={runCode}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 disabled:dark:bg-gray-700 text-white transition-all shadow-md active:scale-95 ml-2"
          >
            {isRunning ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            Run
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Questions Library */}
        {showQuestions && (
          <div className="w-72 md:w-80 flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#111116] overflow-hidden transition-all duration-300">
            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
              <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Problem Set</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1 content-start custom-scrollbar">
              {questions.map((question, idx) => (
                <button
                  key={question.id}
                  onClick={() => selectQuestion(question.id)}
                  className={`w-full text-left p-4 rounded-xl text-sm flex flex-col group transition-all border ${
                    selectedQuestion === question.id
                      ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20'
                      : 'bg-white border-transparent hover:border-gray-200 dark:bg-[#111116] dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                     <span className={`font-bold truncate ${selectedQuestion === question.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {idx + 1}. {question.title}
                     </span>
                     {question.solved && <Check size={16} className="text-emerald-500 shrink-0 stroke-[3]" />}
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 truncate max-w-[90%]">
                     {question.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Center/Right Panel: Editor Top, Terminal Bottom */}
        <div className="flex-1 flex flex-col min-w-[300px] bg-white dark:bg-[#111116] overflow-hidden">
          
          {selectedQuestion && (
            <div className="p-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5">{questions.find(q => q.id === selectedQuestion)?.title}</h3>
                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                   {questions.find(q => q.id === selectedQuestion)?.description}
                 </p>
               </div>
            </div>
          )}
          
          <div className="flex-1 relative border-b border-gray-200 dark:border-white/10">
            <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              theme={isDarkMode ? 'vs-dark' : 'light'}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 4,
                wordWrap: 'on',
                formatOnPaste: true,
                cursorBlinking: 'smooth'
              }}
            />
          </div>

          {/* Bottom Terminal */}
          <div className="h-64 flex-shrink-0 flex flex-col bg-slate-900 dark:bg-black/80">
            <div className="flex justify-between items-center px-5 py-2.5 bg-slate-950 dark:bg-[#050505] border-b border-slate-800 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-400 tracking-wider">TERMINAL OUTPUT</span>
              </div>
              <button 
                onClick={clearOutput}
                className="text-xs font-bold text-slate-500 hover:text-white px-3 py-1 bg-slate-800/50 hover:bg-slate-700/50 rounded transition-colors"
              >
                Clear Console
              </button>
            </div>
            <div className="flex-1 p-5 overflow-auto custom-scrollbar font-mono text-sm leading-relaxed">
              {isRunning ? (
                <div className="flex items-center gap-3 text-slate-400">
                   <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                   <span>Executing script...</span>
                </div>
              ) : error ? (
                <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
              ) : output ? (
                <pre className="text-white whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-slate-600 font-medium">✨ Output will appear here. Run your code to see results.</span>
              )}
              
              {selectedQuestion && questions.find(q => q.id === selectedQuestion)?.solved && (
                <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-medium text-sm flex items-center gap-2 shadow-inner">
                  <Check className="w-5 h-5" /> All test cases passed successfully!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineCode;
