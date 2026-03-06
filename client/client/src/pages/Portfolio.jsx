import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';
import { FaBook, FaPaintBrush, FaCodeBranch, FaMobile, FaSearch, FaEnvelope } from 'react-icons/fa';

const Portfolio = () => {
  return (
    <GenericSocialPage
      platformName="Portfolio"
      gradientFrom="from-purple-50"
      gradientTo="from-violet-50"
      themeColorText="text-purple-600"
      themeColorBg="bg-purple-100"
      themeColorBorder="border-purple-200"
      themeColorHover="hover:bg-purple-200 text-purple-800"
      icon={<FaBook className="text-purple-600" />}
      
      tipsEssentials={[
        "Ensure your website loads quickly; optimize your images and minify your code.",
        "Buy a custom domain name (e.g., yourname.com) instead of using free subdomains.",
        "Include a clear, easy-to-find contact form or direct email link.",
        "Highlight your top 3-4 projects rather than listing every single thing you've built."
      ]}
      
      tipsEngagement={[
        "Write case studies for your major projects, detailing the problem, your role, and the technologies used.",
        "Ensure your portfolio is fully responsive and looks great on mobile devices.",
        "Add a 'Thoughts' or 'Blog' section to demonstrate your communication skills and technical depth.",
        "Integrate analytics (like Google Analytics) to understand who is visiting your site and what sections they read."
      ]}
      
      features={[
        {
          icon: <FaPaintBrush className="text-purple-500" />,
          title: "Branding & Design",
          description: "Develop a consistent personal brand with a unified color palette, typography, and logo."
        },
        {
          icon: <FaCodeBranch className="text-purple-500" />,
          title: "Project Showcases",
          description: "Structure your case studies to highlight your unique contributions and problem-solving abilities."
        },
        {
          icon: <FaMobile className="text-purple-500" />,
          title: "Responsive Layouts",
          description: "Techniques for ensuring your portfolio provides a seamless experience across all screen sizes."
        },
        {
          icon: <FaSearch className="text-purple-500" />,
          title: "SEO Optimization",
          description: "Make sure recruiters can find you when they search your name or specific developer skills."
        },
        {
          icon: <FaEnvelope className="text-purple-500" />,
          title: "Call to Actions",
          description: "Designing effective contact sections that encourage recruiters to reach out to you."
        }
      ]}
      
      youtubeVideos={[
        {
          title: "Building an Impressive Dev Portfolio",
          embedId: "QxQ-0q-0_18", // Replace with real video
          description: "A complete guide on what to include and what to leave out of your personal website."
        },
        {
          title: "Writing Great Project Case Studies",
          embedId: "qN9pM1Y01x4", // Replace with real video
          description: "How to explain your code so non-technical hiring managers understand your value."
        },
        {
          title: "Portfolio SEO Basics",
          embedId: "Qz1P4M8K0Gg", // Replace with real video
          description: "Getting your name to the top of Google search results."
        }
      ]}
      
      chatbotPrompts={[
        "What are the best frameworks for a portfolio website?",
        "How many projects should I showcase?",
        "Should I include a blog on my portfolio?",
        "What makes a good developer landing page?"
      ]}
    />
  );
};

export default Portfolio;
