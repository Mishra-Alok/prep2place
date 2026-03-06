import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';

const LeetCodeEnhancementPage = () => {
  const features = [
    {
      icon: "👤",
      title: "Profile Optimization",
      description: "Create a comprehensive profile that showcases your programming skills, experience, and achievements to stand out to potential employers."
    },
    {
      icon: "🎯",
      title: "Problem Selection",
      description: "Learn to strategically select problems based on your skill level, target company, and specific algorithm patterns to maximize your learning."
    },
    {
      icon: "🏅",
      title: "Achievement Tracking",
      description: "Track your progress and showcase your achievements through badges, streaks, and rankings to demonstrate your commitment."
    },
    {
      icon: "🏆",
      title: "Contest Participation",
      description: "Participate in weekly contests to challenge yourself, compare your skills with others, and improve your global ranking."
    },
    {
       icon: "📚",
       title: "Study Plans",
       description: "Follow structured study plans designed to systematically build your skills from fundamental concepts to advanced algorithms."
    },
    {
       icon: "📝",
       title: "Solution Documentation",
       description: "Document your solutions with clear explanations and time/space complexity analyses to demonstrate your analytical thinking."
    }
  ];

  const tipsEssentials = [
    "Complete your profile with real name and professional photo.",
    "Write a concise bio highlighting your programming background and goals.",
    "Connect your GitHub account to showcase your real-world coding projects.",
    "Add your tech stack and programming languages to highlight your technical expertise.",
    "Link your LinkedIn profile to build your professional network."
  ];

  const tipsEngagement = [
    "Solve problems regularly to maintain a consistent activity graph.",
    "Master problems across all difficulty levels, not just easy ones.",
    "Contribute high-quality solutions to the discussion boards.",
    "Focus on core patterns rather than memorizing specific problems.",
    "Participate in weekly contests to boost your ranking."
  ];

  const youtubeVideos = [
    { 
      title: "LeetCode Profile Optimization", 
      embedId: "xpIPfrItO_I", 
      description: "How to use LeetCode Effectively in 2024 to crack interviews easily || Effective use of LeetCode"
    },
    { 
      title: "Mastering Data Structures & Algorithms", 
      embedId: "8wysIxzqgPI",
      description: "My Brain after 569 Leetcode Problems"
    },
    { 
      title: "Acing Technical Interviews with LeetCode", 
      embedId: "0bHoB32fuj0",
      description: "Don't watch my A2Z DSA Course"
    }
  ];

  const chatbotPrompts = ["How to improve my problem-solving speed?", "Tips for dynamic programming", "How to prepare for contests"];

  return (
    <GenericSocialPage 
      platformName="LeetCode"
      gradientFrom="from-yellow-50"
      gradientTo="to-orange-50"
      themeColorText="text-orange-500"
      themeColorBg="bg-orange-500"
      themeColorBorder="border-orange-200"
      themeColorHover="hover:bg-orange-100"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744.603 0 1.186-.229 1.7-.744.514-.514.75-1.146.75-1.823s-.236-1.309-.749-1.823l-2.747-2.688c-1.337-1.336-3.159-2.072-5.497-2.072-2.322 0-4.161.736-5.498 2.073l-4.45 4.512c-1.336 1.337-2.072 3.159-2.072 5.498s.736 4.161 2.072 5.498l4.45 4.512c1.337 1.336 3.176 2.072 5.498 2.072 2.338 0 4.161-.736 5.498-2.072l2.747-2.688c.513-.513.749-1.146.749-1.823s-.236-1.309-.75-1.823c-.514-.514-1.096-.744-1.699-.744-.604 0-1.201.229-1.714.744z" />
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

export default LeetCodeEnhancementPage;
