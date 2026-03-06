import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardNavbar from './components/DashboardNavbar';
import Home from './components/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import OAuthCallback from './pages/OAuthCallback';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Index from './pages/index';
import Community from './pages/Community';
import Esmoai from './pages/Esmoai';
import Roadmap from './pages/Roadmap';
import Findevents from './pages/Findevents';
import Profile from './components/Profile';
import Interview from './components/Interview';
import InterviewIndex from './components/InterviewIndex';
import Career from './components/Career';
import PlanYourDay from './pages/Planyourday';
import ResumeForm from './pages/ResumeForm';
import ResumePreview from './pages/ResumePreview';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';

import Home1 from './lp/components/Home1';
import Features from './lp/components/Features';
import Aboutus from './lp/components/Aboutus';
import Usp from './lp/components/Usp';
import Footer from './lp/components/Footer';
import Navbar from './lp/components/Navbar';
import PersonalizedRoadmap from './pages/PersonalizedRoadmap';
import EnhanceResume from './pages/EnhanceResume';
import AdditionalInterview from './components/AdditionalInterview';
import MachineCode from './pages/MachineCode';
import Social from './pages/Social';
import LinkedInEnhancementPage from './pages/LinkedIn';
import GitHubEnhancementPage from './pages/Github';
import LeetCodeEnhancementPage from './pages/Leetcode';
import Twitter from './pages/Twitter';
import Codeforces from './pages/Codeforces';
import Devfolio from './pages/Devfolio';
import Stackoverflow from './pages/Stackoverflow';
import Portfolio from './pages/Portfolio';
import TypingTest from './pages/TypingTest';

const LandingPage = () => (
  <>
    <Navbar />
    <Home1 />
    <Features />
    <Usp />
    <Aboutus />
    <Footer />
  </>
);

// Protected layout — sidebar state lives here so main content can react to it
const AuthLayout = ({ isAuthenticated, loading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // While localStorage token is being checked, render nothing (avoid premature redirect)
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200 w-full overflow-x-hidden">
      {/* Top Navbar */}
      <DashboardNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Sidebar receives controlled open state */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/*
        Main Content:
        On desktop (md+): content shifts right margin to make room for the sidebar = push layout.
        DashboardNavbar is fixed top, so we universally add pt-20 (or mt-16 pt-4) to clear it.
      */}
      <main
        className={`flex-1 w-full pt-[72px] transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'md:pl-[17rem]' : ''}`} // 16rem for sidebar + 1rem extra buffer
      >
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            loading ? null :
            isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />
          }
        />
        <Route
          path="/signup"
          element={
            loading ? null :
            isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />
          }
        />
        <Route
          path="/signin"
          element={
            loading ? null :
            isAuthenticated ? <Navigate to="/home" replace /> : <SignIn />
          }
        />
        {/* OAuth callback — must be public and outside AuthLayout */}
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<AuthLayout isAuthenticated={isAuthenticated} loading={loading} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/userprofile" element={<Profile />} />
          <Route path="/skills" element={<Index />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/community" element={<Community />} />
          <Route path="/esmoai" element={<Esmoai />} />
          <Route path="/findevents" element={<Findevents />} />
          <Route path="/interview" element={<InterviewIndex />} />
          <Route path="/interview/:role" element={<Interview />} />
          <Route path="/career" element={<Career />} />
          <Route path="/personalized-roadmap" element={<PersonalizedRoadmap />} />
          <Route path="/resume-enchancer" element={<EnhanceResume />} />
          <Route path="/more-interviews" element={<AdditionalInterview />} />
          <Route path="/machine-coding" element={<MachineCode />} />
          <Route path="/enhance-social" element={<Social />} />
          <Route path="/linkedin" element={<LinkedInEnhancementPage />} />
          <Route path="/github" element={<GitHubEnhancementPage />} />
          <Route path="/leetcode" element={<LeetCodeEnhancementPage />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/codeforces" element={<Codeforces />} />
          <Route path="/devfolio" element={<Devfolio />} />
          <Route path="/stackoverflow" element={<Stackoverflow />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/typing-test" element={<TypingTest />} />
          <Route path="/resume-form" element={<ResumeForm setResumeData={setResumeData} />} />
          <Route path="/resume-preview" element={<ResumePreview resumeData={resumeData} />} />
          <Route path="/planyourday" element={<PlanYourDay />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={
            loading ? null :
            <Navigate to={isAuthenticated ? '/home' : '/signin'} replace />
          }
        />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
