import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';
import { SiCodeforces } from 'react-icons/si';
import { FaTrophy, FaChartBar, FaBrain, FaMedal, FaCode } from 'react-icons/fa';

const Codeforces = () => {
  return (
    <GenericSocialPage
      platformName="Codeforces"
      gradientFrom="from-red-50"
      gradientTo="from-orange-50"
      themeColorText="text-red-600"
      themeColorBg="bg-red-100"
      themeColorBorder="border-red-200"
      themeColorHover="hover:bg-red-200 text-red-800"
      icon={<SiCodeforces className="text-red-600" />}
      
      tipsEssentials={[
        "Maintain a complete profile with your real name and institution to build credibility.",
        "Set realistic rating goals and track your progress consistently over time.",
        "Review your performance graph to identify trends and areas needing improvement.",
        "Keep your contact information updated if you are open to competitive programming recruitment."
      ]}
      
      tipsEngagement={[
        "Participate in Div 1/2/3/4 contests regularly to improve your rating.",
        "Up-solve problems you couldn't complete during contests to maximize learning.",
        "Read editorial solutions and analyze alternative approaches from high-rated coders.",
        "Engage in Codeforces community blogs for algorithmic discussions and contest announcements."
      ]}
      
      features={[
        {
          icon: <FaTrophy className="text-red-500" />,
          title: "Contest Strategy",
          description: "Learn optimal time management and problem selection strategies during live contests."
        },
        {
          icon: <FaBrain className="text-red-500" />,
          title: "Algorithmic Thinking",
          description: "Develop the mindset needed to quickly identify standard patterns in complex problems."
        },
        {
          icon: <FaChartBar className="text-red-500" />,
          title: "Rating Progression",
          description: "Understand the Elo rating system and how to consistently climb to higher divisions."
        },
        {
          icon: <FaMedal className="text-red-500" />,
          title: "Up-Solving mastery",
          description: "Techniques for effectively learning from missed problems after contests end."
        },
        {
          icon: <FaCode className="text-red-500" />,
          title: "Template Building",
          description: "Create robust CP templates in C++ or Java for faster implementation during contests."
        }
      ]}
      
      youtubeVideos={[
        {
          title: "How to become a Candidate Master",
          embedId: "QZq7N1-Yp2A",
          description: "A comprehensive roadmap for progressing from Pupil/Specialist to Candidate Master."
        },
        {
          title: "Codeforces Contest Strategy",
          embedId: "8fL2T0O_x0g",
          description: "Tips on time management, penalty avoidance, and problem selection in Div 2/3."
        },
        {
          title: "Effective Up-solving",
          embedId: "Z_TzzO_lMmM",
          description: "How to actually learn from editorials and implement solutions post-contest."
        }
      ]}
      
      chatbotPrompts={[
        "How to improve my Codeforces rating?",
        "What topics should a Specialist focus on?",
        "How to stop getting Time Limit Exceeded?",
        "Best strategy for Div 3 contests"
      ]}
    />
  );
};

export default Codeforces;
