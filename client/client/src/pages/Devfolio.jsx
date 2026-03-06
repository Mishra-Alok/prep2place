import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';
import { SiDevpost } from 'react-icons/si'; 
import { FaLaptopCode, FaRegLightbulb, FaUsers, FaAward, FaRocket } from 'react-icons/fa';

const Devfolio = () => {
  return (
    <GenericSocialPage
      platformName="Devfolio"
      gradientFrom="from-teal-50"
      gradientTo="from-cyan-50"
      themeColorText="text-teal-600"
      themeColorBg="bg-teal-100"
      themeColorBorder="border-teal-200"
      themeColorHover="hover:bg-teal-200 text-teal-800"
      icon={<SiDevpost className="text-teal-600" />} // Using Devpost icon as closest approximation
      
      tipsEssentials={[
        "Craft a clear, developer-focused bio highlighting your stack and hackathon interests.",
        "Add high-quality team and project photos to your past hackathon submissions.",
        "Ensure all project links (GitHub repos, live demos) in your portfolio are functional.",
        "Keep your skills and interested technologies up-to-date for team matching."
      ]}
      
      tipsEngagement={[
        "Follow other builders and hackathon winners to stay inspired.",
        "Engage in discussions on hackathon project pages.",
        "Actively look for team members before major hackathons start.",
        "Share your Devfolio profile link when applying to developer roles."
      ]}
      
      features={[
        {
          icon: <FaLaptopCode className="text-teal-500" />,
          title: "Hackathon Discovery",
          description: "Learn how to find and apply strategy to the most impactful developer hackathons."
        },
        {
          icon: <FaRegLightbulb className="text-teal-500" />,
          title: "Project Ideation",
          description: "Frameworks for coming up with winning hackathon ideas that solve real problems."
        },
        {
          icon: <FaUsers className="text-teal-500" />,
          title: "Team Formation",
          description: "How to use your profile to attract complementary skill sets for your next hack."
        },
        {
          icon: <FaAward className="text-teal-500" />,
          title: "Submission Quality",
          description: "Crafting beautiful project pages that catch the judges' attention immediately."
        },
        {
          icon: <FaRocket className="text-teal-500" />,
          title: "Pitching",
          description: "Structuring your Devfolio submission video and text to serve as a perfect pitch."
        }
      ]}
      
      youtubeVideos={[
        {
          title: "How to Win Hackathons",
          embedId: "QxQ-0q-0_18", // Replace with real video
          description: "A comprehensive guide on team building, ideation, and pitching at major hackathons."
        },
        {
          title: "Building a Devfolio Profile",
          embedId: "qN9pM1Y01x4", // Replace with real video
          description: "Step-by-step optimization of your builder profile for recruiters and teams."
        },
        {
          title: "The Perfect Hackathon Submission",
          embedId: "Qz1P4M8K0Gg", // Replace with real video
          description: "What judges look for in project pages, videos, and live demonstrations."
        }
      ]}
      
      chatbotPrompts={[
        "How do I find a team for a hackathon?",
        "What makes a winning Devfolio project page?",
        "How to showcase unfinished hackathon tools?",
        "Best practices for demo videos"
      ]}
    />
  );
};

export default Devfolio;
