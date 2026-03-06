import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Camera, VideoOff, Send } from 'lucide-react';

const interviewQuestions = {
  "SDE-1": ["Tell me about yourself.", "Why do you want to be a software developer?", "How would you solve this algorithmic problem?", "What are your strengths and weaknesses?", "Explain a time when you had to debug a challenging issue.", "What is OOP and why is it important?", "What are your thoughts on Agile development?"],
  "SDE-2": ["Tell me about a complex project you've worked on.", "How do you handle code reviews?", "What design patterns have you used?", "Describe a challenging problem you solved and how you approached it.", "What is your experience with system design?", "How do you prioritize tasks in a project?"],
  "SDE-3": ["Describe your leadership experience.", "How do you mentor junior developers?", "What’s your approach to handling high-pressure situations?", "How do you ensure code quality in your team?", "What’s your experience with cloud technologies?", "How do you keep up with new technologies?"],
  "Data Analyst": ["Tell me about yourself.", "How would you analyze a dataset with missing values?", "What are the most important skills for a data analyst?", "Can you explain the difference between mean, median, and mode?", "What is the process of ETL?", "Have you used SQL for data analysis? Give an example.", "How do you visualize data effectively?"],
  "Cybersecurity Engineer": ["Tell me about yourself.", "What is the difference between symmetric and asymmetric encryption?", "Explain how a man-in-the-middle attack works.", "How would you secure a network from external threats?", "What is a firewall and how does it work?", "What is penetration testing?", "How would you handle a security breach?"],
  "DevOps Engineer": ["Tell me about yourself.", "What is CI/CD and how do you implement it?", "Explain the concept of containerization.", "What tools have you used for automation?", "How do you monitor a production system?", "What is infrastructure as code?", "What is the most challenging part of working with DevOps?"],
  "UI/UX Designer": ["Tell me about yourself.", "What is your design process?", "How do you balance user needs with business goals?", "Explain how you conduct user testing.", "How would you improve the user interface of a product?", "What tools do you use for wireframing and prototyping?", "Can you explain the difference between UI and UX?"],
  "UI-UX Designer": ["Tell me about yourself.", "What is your design process?", "How do you balance user needs with business goals?", "Explain how you conduct user testing.", "How would you improve the user interface of a product?", "What tools do you use for wireframing and prototyping?", "Can you explain the difference between UI and UX?"],
  "Cloud Engineer": ["Tell me about yourself.", "What is cloud computing?", "What are the differences between IaaS, PaaS, and SaaS?", "What is your experience with cloud providers like AWS, Azure, or Google Cloud?", "How do you ensure high availability and disaster recovery in a cloud environment?", "What are containers and how do they relate to cloud infrastructure?", "How do you manage cloud cost optimization?"],
  "Data Scientist": ["Tell me about yourself.", "What is the difference between supervised and unsupervised learning?", "How do you handle missing data in a dataset?", "Explain a time when you built a predictive model. What algorithm did you use?", "What is the importance of feature engineering?", "How do you ensure the accuracy of a machine learning model?", "Explain the bias-variance tradeoff."],
  "QA Engineer": ["Tell me about yourself.", "What is the difference between manual and automated testing?", "How do you approach writing test cases?", "What is regression testing and why is it important?", "What tools have you used for automated testing?", "How do you ensure that a product is bug-free?", "Can you explain the concept of continuous testing in a CI/CD pipeline?"],
  "Machine Learning Engineer": ["Tell me about yourself.", "What is the difference between a machine learning model and an algorithm?", "What are some common algorithms used in machine learning?", "Explain a time when you worked on training a model. What data and techniques did you use?", "What is the importance of data preprocessing in machine learning?", "How do you evaluate the performance of a machine learning model?", "What is overfitting and how do you prevent it?"],
  "Full Stack Developer": ["Tell me about yourself.", "What technologies do you use in both front-end and back-end development?", "Explain how you handle API development and integration.", "What is the MVC architecture and how do you implement it?", "How do you ensure the scalability of a full stack application?", "What are the best practices for version control in full-stack development?", "How do you handle authentication and authorization in your applications?"]
};

const Interview = () => {
  const { role } = useParams();

  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [videoStream, setVideoStream] = useState(null);
  const [sessionTime, setSessionTime] = useState(0); 
  const [recognizedSpeech, setRecognizedSpeech] = useState(""); 
  const [recognition, setRecognition] = useState(null); 

  const currentQuestions = interviewQuestions[role] || []; 

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognitionAPI();
      recog.continuous = true; 
      recog.interimResults = true; 
      recog.lang = "en-US"; 

      recog.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setRecognizedSpeech((prevSpeech) => prevSpeech + " " + transcript);
      };

      recog.onerror = (event) => {
        console.error('Speech Recognition Error: ', event.error);
      };

      setRecognition(recog); 
    } else {
      console.warn("Speech Recognition API is not supported in your browser.");
    }
  }, []); 

  useEffect(() => {
    setRecognizedSpeech("");
  }, [currentQuestionIndex]); 

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setVideoStream(stream);
      setIsWebcamOn(true);

      if (recognition) {
        recognition.start();
      }
    } catch (err) {
      console.error("Error accessing webcam/mic", err);
      alert("Failed to access webcam and mic.");
    }
  };

  const stopWebcam = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
    setIsWebcamOn(false);

    if (recognition) {
      recognition.stop();
    }
  };

  // Cleanly stop webcam when unmounting
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      if (recognition) recognition.stop();
    };
  }, [videoStream, recognition]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    alert(`Interview submitted!`);
    stopWebcam();
  };

  const currentQuestion = currentQuestions[currentQuestionIndex] || "No questions available for this role.";

  useEffect(() => {
    if (isWebcamOn) {
      const sessionTimer = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(sessionTimer);
    }
  }, [isWebcamOn]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)] w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-500 relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      {/* Video Panel (Left) */}
      <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col items-center justify-center relative z-10 border-b border-r-0 lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10">
        <div className="w-full max-w-xl mx-auto flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-500" />
              Live Interview
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
              <div className={`w-2 h-2 rounded-full ${isWebcamOn ? 'bg-red-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
              <span className="text-sm font-semibold text-slate-600 dark:text-gray-300">{Math.floor(sessionTime / 60)}m {sessionTime % 60}s</span>
            </div>
          </div>

          <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-slate-200 dark:border-white/10 group">
            {!isWebcamOn ? (
               <div className="flex flex-col items-center p-8 text-center">
                 <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 border border-slate-700">
                   <VideoOff className="w-8 h-8 text-slate-400" />
                 </div>
                 <p className="text-slate-400 mb-6 font-medium">Your camera is currently disabled.</p>
                 <button
                   onClick={startWebcam}
                   className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 active:scale-95"
                 >
                   <Camera className="w-4 h-4" /> Turn On Camera
                 </button>
               </div>
            ) : (
              <>
                <video
                  autoPlay
                  muted
                  ref={(video) => {
                    if (video && videoStream) {
                      video.srcObject = videoStream;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={stopWebcam}
                  className="absolute top-4 left-4 px-4 py-2 bg-red-600/90 hover:bg-red-600 backdrop-blur-md text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2"
                >
                  <VideoOff className="w-3 h-3" /> Turn Off
                </button>
                {/* Transcribed Speech overlay */}
                {recognizedSpeech && (
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/70 backdrop-blur-md text-white text-sm rounded-2xl border border-white/10 shadow-xl max-h-32 overflow-y-auto outline outline-1 outline-indigo-500/20">
                    <p className="opacity-90 leading-relaxed font-medium">"{recognizedSpeech}"</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Question Panel (Right) */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center relative z-10 bg-white/50 dark:bg-black/20">
        <div className="w-full max-w-xl mx-auto flex flex-col justify-between h-full">
          
          <div className="flex-1 flex flex-col justify-center relative my-10 min-h-[300px]">
            {/* Very large faded question number placed securely so it doesn't overlap text awkwardly */}
            <div className="absolute -top-10 -left-6 md:-left-12 opacity-[0.05] dark:opacity-[0.1] pointer-events-none select-none">
              <span className="text-[12rem] font-black leading-none text-indigo-900 dark:text-indigo-400">
                {currentQuestionIndex + 1}
              </span>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {currentQuestion}
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 bg-white dark:bg-[#111116] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <button
              onClick={handleSubmit}
              className="text-slate-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 font-bold text-sm px-4 py-2 transition-colors w-full sm:w-auto text-center"
            >
              End Session
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= currentQuestions.length - 1}
              className={`flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl font-bold w-full sm:w-auto transition-all ${
                currentQuestionIndex >= currentQuestions.length - 1
                  ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
              }`}
            >
              Next Question <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interview;
