import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';

const LinkedInEnhancementPage = () => {
  const features = [
    {
      icon: "📊",
      title: "Profile Analysis",
      description: "Get personalized feedback and actionable recommendations to improve your LinkedIn presence."
    },
    {
      icon: "📈",
      title: "Analytics Dashboard",
      description: "Track your profile views, engagement metrics, and network growth with comprehensive analytics."
    },
    {
      icon: "📅",
      title: "Content Scheduler",
      description: "Plan and automate your LinkedIn posts to maintain consistent engagement with your network."
    }
  ];

  const tipsEssentials = [
    "Use a professional, high-quality profile picture.",
    "Create a compelling headline that reflects your professional identity.",
    "Write a detailed and engaging summary that highlights your skills and experiences.",
    "Add relevant skills to your profile and seek endorsements from colleagues."
  ];

  const tipsEngagement = [
    "Post regularly with industry insights and professional achievements.",
    "Engage with your network by commenting on and sharing their content.",
    "Join and participate in relevant industry groups and discussions.",
    "Send personalized connection requests to expand your professional network."
  ];

  const youtubeVideos = [
    { 
      title: "Networking Strategies for Professionals", 
      embedId: "xS2gks_c6G8",
      description: "How to optimise your LinkedIn profile from scratch? | Step by step explained"
    },
    { 
      title: "Personal Branding on LinkedIn", 
      embedId: "lzuiuRgwwrc",
      description: "How to create a Great LinkedIn Profile in 2024 | for College Students"
    },
    { 
      title: "LinkedIn Profile Optimization", 
      embedId: "j2YA_TScR-E", 
      description: "Unlock the secrets to creating a standout LinkedIn profile that showcases your skills."
    }
  ];

  const chatbotPrompts = ["How do I write a good headline?", "Tips for profile picture", "How to grow my network"];

  return (
    <GenericSocialPage 
      platformName="LinkedIn"
      gradientFrom="from-blue-50"
      gradientTo="to-indigo-50"
      themeColorText="text-blue-600"
      themeColorBg="bg-blue-600"
      themeColorBorder="border-blue-200"
      themeColorHover="hover:bg-blue-100"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      }
      tipsEssentials={tipsEssentials}
      tipsEngagement={tipsEngagement}
      features={features}
      youtubeVideos={youtubeVideos}
      chatbotPrompts={chatbotPrompts}
    />
  );
};

export default LinkedInEnhancementPage;
