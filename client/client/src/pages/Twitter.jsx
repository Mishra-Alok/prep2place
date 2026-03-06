import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';
import { FaTwitter, FaPenNib, FaUsers, FaChartLine, FaCheckCircle, FaUserPlus } from 'react-icons/fa';

const Twitter = () => {
  return (
    <GenericSocialPage
      platformName="Twitter"
      gradientFrom="from-sky-50"
      gradientTo="from-blue-50"
      themeColorText="text-blue-600"
      themeColorBg="bg-blue-100"
      themeColorBorder="border-blue-200"
      themeColorHover="hover:bg-blue-200 text-blue-800"
      icon={<FaTwitter className="text-blue-500" />}
      
      tipsEssentials={[
        "Use a professional, clear headshot or easily recognizable brand logo for your avatar.",
        "Write a compelling bio that includes your expertise, interests, and relevant hashtags.",
        "Include a link to your portfolio, blog, or current main project in your profile.",
        "Use a high-quality header image that gives context to who you are or what you do."
      ]}
      
      tipsEngagement={[
        "Tweet consistently about topics in your niche to build an engaged audience.",
        "Reply meaningfully to industry leaders and peers to expand your network.",
        "Use threads to break down complex topics and provide high value.",
        "Participate in relevant Twitter Spaces and tech community discussions."
      ]}
      
      features={[
        {
          icon: <FaPenNib className="text-blue-500" />,
          title: "Content Strategy",
          description: "Learn how to write engaging tweets and threads that capture attention and provide value."
        },
        {
          icon: <FaUsers className="text-blue-500" />,
          title: "Audience Building",
          description: "Discover techniques for growing a targeted follower base of industry peers and leaders."
        },
        {
          icon: <FaChartLine className="text-blue-500" />,
          title: "Analytics Tracking",
          description: "Understand which tweets perform best and how to optimize your posting schedule."
        },
        {
          icon: <FaCheckCircle className="text-blue-500" />,
          title: "Profile Optimization",
          description: "Make your profile highly discoverable with the right keywords and positioning."
        },
        {
          icon: <FaUserPlus className="text-blue-500" />,
          title: "Networking",
          description: "Master the art of the 'cold DM' and connecting with industry mentors on the platform."
        }
      ]}
      
      youtubeVideos={[
        {
          title: "How to Grow on Tech Twitter",
          embedId: "qN9pM1Y01x4",
          description: "Strategies for developers and tech professionals to build an audience from zero."
        },
        {
          title: "Writing Viral Tech Threads",
          embedId: "Qz1P4M8K0Gg",
          description: "Learn the anatomy of a highly engaging Twitter thread about programming and tech."
        },
        {
          title: "Twitter Networking Strategy",
          embedId: "zVzY2Y2Y2Y2", // Replace with real video if available
          description: "How to connect with senior developers and recruiters effectively."
        }
      ]}
      
      chatbotPrompts={[
        "How do I write a good Twitter bio?",
        "What should I tweet about as a developer?",
        "How to grow followers from zero?",
        "Tips for writing engaging Twitter threads"
      ]}
    />
  );
};

export default Twitter;
