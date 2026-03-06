import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';
import { FaStackOverflow, FaQuestionCircle, FaCheckSquare, FaTags, FaMedal, FaComments } from 'react-icons/fa';

const Stackoverflow = () => {
  return (
    <GenericSocialPage
      platformName="Stack Overflow"
      gradientFrom="from-orange-50"
      gradientTo="from-amber-50"
      themeColorText="text-orange-600"
      themeColorBg="bg-orange-100"
      themeColorBorder="border-orange-200"
      themeColorHover="hover:bg-orange-200 text-orange-800"
      icon={<FaStackOverflow className="text-orange-600" />}
      
      tipsEssentials={[
        "Fill out your Developer Story extensively to attract recruiters looking for specific expertise.",
        "Link your GitHub, personal website, and LinkedIn in your profile 'About Me' section.",
        "Choose specific technology tags you want to build a reputation in (e.g., React, Python).",
        "Keep your location and job status fields updated for localized opportunities."
      ]}
      
      tipsEngagement={[
        "Answer unanswered questions in your expertise tags to build reputation quickly.",
        "Edit and improve existing questions and answers to earn community moderation badges.",
        "Format your code blocks cleanly and provide Minimal, Reproducible Examples.",
        "Always explain *why* your code solves the problem, not just dropping code snippets."
      ]}
      
      features={[
        {
          icon: <FaQuestionCircle className="text-orange-500" />,
          title: "Asking Good Questions",
          description: "Master the art of creating questions that get answered quickly without downvotes."
        },
        {
          icon: <FaCheckSquare className="text-orange-500" />,
          title: "Writing Accepted Answers",
          description: "Learn formatting and explanation structures that lead to the coveted green checkmark."
        },
        {
          icon: <FaTags className="text-orange-500" />,
          title: "Tag Specialization",
          description: "Focusing on niche or emerging technologies to dominate specific tag leaderboards."
        },
        {
          icon: <FaMedal className="text-orange-500" />,
          title: "Reputation Growth",
          description: "Strategies for crossing key reputation thresholds (1k, 10k) to unlock site privileges."
        },
        {
          icon: <FaComments className="text-orange-500" />,
          title: "Community Moderation",
          description: "Participating in review queues and meta discussions to become a recognized community leader."
        }
      ]}
      
      youtubeVideos={[
        {
          title: "How to Build Stack Overflow Rep",
          embedId: "QxQ-0q-0_18", // Replace with real video
          description: "A fast-track guide to reaching 10,000 reputation and accessing moderation tools."
        },
        {
          title: "Writing the Perfect Question",
          embedId: "qN9pM1Y01x4", // Replace with real video
          description: "Avoid downvotes and closures by formatting your problems correctly."
        },
        {
          title: "Stack Overflow for Jobs",
          embedId: "Qz1P4M8K0Gg", // Replace with real video
          description: "How recruiters use the platform to source top engineering talent."
        }
      ]}
      
      chatbotPrompts={[
        "How to quickly get 50 reputation points?",
        "Why was my question closed and how do I fix it?",
        "Best practices for answering old questions",
        "How to format code blocks properly"
      ]}
    />
  );
};

export default Stackoverflow;
