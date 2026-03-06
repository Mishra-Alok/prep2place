import React from 'react';
import GenericSocialPage from '../components/GenericSocialPage';

const GitHubEnhancementPage = () => {
  const features = [
    {
      icon: "👤",
      title: "Professional Profile",
      description: "Create a standout profile with a professional photo, comprehensive bio, and contact information."
    },
    {
      icon: "📝",
      title: "Compelling README",
      description: "Craft an engaging profile README that highlights your skills, experience, and showcases your personality."
    },
    {
      icon: "🏆",
      title: "Project Highlights",
      description: "Pin your best repositories and ensure they have detailed descriptions and documentation."
    },
    {
      icon: "🤝",
      title: "Active Community",
      description: "Contribute to open source, follow other developers, and engage with the broader GitHub ecosystem."
    },
    {
      icon: "⭐",
      title: "Quality Content",
      description: "Maintain high code quality standards with clean code, thorough documentation, and meaningful commits."
    },
    {
      icon: "🌐",
      title: "Portfolio Integration",
      description: "Connect your GitHub profile with your personal website, blog, and other social profiles."
    }
  ];

  const tipsEssentials = [
    "Create a professional, high-quality profile picture.",
    "Write a compelling bio that reflects your skills and interests.",
    "Create a detailed README.md profile that showcases your projects and skills.",
    "Pin your best repositories to make them easily visible to visitors."
  ];

  const tipsEngagement = [
    "Commit code regularly to maintain an active contribution graph.",
    "Contribute to open source projects to demonstrate collaboration.",
    "Create detailed documentation for all your repositories.",
    "Follow relevant developers and engage with their work."
  ];

  const youtubeVideos = [
    { 
      title: "GitHub Profile Optimization", 
      embedId: "n6d4KHSKqGk", 
      description: "Learn how to create a stunning GitHub profile to showcase your coding skills and projects."
    },
    { 
      title: "Open Source Contribution Strategies", 
      embedId: "yzeVMecydCE",
      description: "How to start contributing to open source projects on GitHub from scratch"
    },
    { 
      title: "GitHub Portfolio for Developers", 
      embedId: "G-EGDH50hGE",
      description: "Create an impressive GitHub portfolio to land your dream developer job"
    }
  ];

  const chatbotPrompts = ["How do I write a good README?", "Tips for GitHub profile picture", "How to showcase projects"];

  return (
    <GenericSocialPage 
      platformName="GitHub"
      gradientFrom="from-gray-50"
      gradientTo="to-gray-100"
      themeColorText="text-gray-900"
      themeColorBg="bg-gray-900"
      themeColorBorder="border-gray-300"
      themeColorHover="hover:bg-gray-200"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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

export default GitHubEnhancementPage;
