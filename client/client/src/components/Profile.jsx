import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { useTheme } from "../context/ThemeContext";
import { 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  MapPin,
  School,
  Clock,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Check,
  Info,
  Edit2,
  Save,
  X,
  Camera,
  AlertTriangle,
  Plus,
  Trash2,
  Search,
  Flag,
  Trophy,
  Star,
  Award,
  Briefcase,
  Camera as CameraIcon,
  LayoutTemplate,
  Activity,
  User as UserIcon,
  Database
} from "lucide-react";
import pp from "../assets/pp.png";

// Country codes for phone number
const COUNTRY_CODES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+40', name: 'Romania', flag: '🇷🇴' },
];

// Country list for location selector
const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahrain','Bangladesh','Belgium','Brazil','Bulgaria','Cambodia','Canada','Chile','China',
  'Colombia','Croatia','Czech Republic','Denmark','Ecuador','Egypt','Ethiopia','Finland',
  'France','Germany','Ghana','Greece','Hungary','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Japan','Jordan','Kazakhstan','Kenya','Kuwait','Malaysia','Mexico',
  'Morocco','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','Norway','Pakistan',
  'Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Saudi Arabia',
  'Senegal','Singapore','South Africa','South Korea','Spain','Sri Lanka','Sudan','Sweden',
  'Switzerland','Taiwan','Thailand','Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates',
  'United Kingdom','United States','Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zimbabwe'
];

export default function CodingProfile() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get("tab") || 'details';
  const [activeTab, setActiveTab] = useState(urlTab);
  const [tabHistory, setTabHistory] = useState([]);
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Sync state if URL changes directly
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Browser back button fix: when in edit mode, go back to dashboard not Leave page
  useEffect(() => {
    if (!isEditing) return;
    // Push a fake history entry so the browser back button has something to pop
    window.history.pushState({ _editMode: true }, '');

    const onBack = () => {
      // User pressed browser back while in edit mode → cancel edit, stay on page
      setIsEditing(false);
      setEditForm(prev => prev); // keep editForm as-is (no data loss)
    };
    window.addEventListener('popstate', onBack);
    return () => window.removeEventListener('popstate', onBack);
  }, [isEditing]);

  const goToTab = (tab) => {
    if (tab === activeTab) return;
    setTabHistory(prev => [...prev, activeTab]);
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleBack = () => {
    if (tabHistory.length > 0) {
      const prev = tabHistory[tabHistory.length - 1];
      setTabHistory(h => h.slice(0, -1));
      setActiveTab(prev);
      setSearchParams({ tab: prev });
    } else {
      navigate(-1);
    }
  };



  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null | 'checking' | 'available' | 'taken'
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
  const [isStatsAccordionOpen, setIsStatsAccordionOpen] = useState(true);
  const [isDevAccordionOpen, setIsDevAccordionOpen] = useState(true);
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [leetcodeCalendar, setLeetcodeCalendar] = useState(null);
  const [totalActiveDays, setTotalActiveDays] = useState(null);
  const [leetcodeTopics, setLeetcodeTopics] = useState([]);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const sanitizeUsername = (urlOrName, platform) => {
    if (!urlOrName) return "";
    let cleanValue = urlOrName.trim();
    if (cleanValue.endsWith("/")) cleanValue = cleanValue.slice(0, -1);
    try {
      if (cleanValue.startsWith('http://') || cleanValue.startsWith('https://') || cleanValue.includes('.com/')) {
        const urlString = cleanValue.startsWith('http') ? cleanValue : `https://${cleanValue}`;
        const url = new URL(urlString);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
          if (platform === 'leetcode' && pathSegments[0] === 'u' && pathSegments.length > 1) {
            cleanValue = pathSegments[1];
          } else if (platform === 'codechef' && pathSegments[0] === 'users' && pathSegments.length > 1) {
            cleanValue = pathSegments[1];
          } else if (platform === 'linkedin' && pathSegments[0] === 'in' && pathSegments.length > 1) {
            cleanValue = pathSegments[1];
          } else {
            cleanValue = pathSegments[pathSegments.length - 1]; 
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse URL, falling back to basic extraction");
    }
    if (platform === "leetcode" && cleanValue.startsWith("u/")) cleanValue = cleanValue.substring(2);
    return cleanValue;
  };

  // Country dropdown state for location
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Profile Data State
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    bio: "",
    location: "",
    university: "",
    profilePic: "",
    mobileNumber: "",
    countryCode: "+91",
    educationYear: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      resume: "",
      others: ""
    },
    codingProfile: {
      leetcode: "",
      hackerrank: "",
      codeforces: "",
      geeksforgeeks: "",
      others: ""
    },
    workExperience: [],
    skills: [],
    contests: [],
    milestones: []
  });

  // Stats Data
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [leetcodeError, setLeetcodeError] = useState(false);
  
  const [codeforcesStats, setCodeforcesStats] = useState(null);
  const [codeforcesError, setCodeforcesError] = useState(false);

  const [gfgStats, setGfgStats] = useState(null);
  const [gfgError, setGfgError] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Fetch Codeforces Stats
  useEffect(() => {
    const cf = profileData.codingProfile?.codeforces;
    if (cf) {
      setCodeforcesStats(null);
      setCodeforcesError(false);
      fetchCodeforcesStats(cf);
    }
  }, [profileData.codingProfile?.codeforces]);

  // Fetch GFG Stats
  useEffect(() => {
    const gfg = profileData.codingProfile?.geeksforgeeks;
    if (gfg) {
      setGfgStats(null);
      setGfgError(false);
      fetchGfgStats(gfg);
    }
  }, [profileData.codingProfile?.geeksforgeeks]);

  // FIX: watch codingProfile.leetcode (not socialLinks.leetcode)
  useEffect(() => {
    const lc = profileData.codingProfile?.leetcode;
    if (lc) {
      setLeetcodeStats(null);
      setLeetcodeError(false);
      setLeetcodeCalendar(null);
      setTotalActiveDays(null);
      setLeetcodeTopics([]);
      fetchLeetcodeStats(lc);
      fetchLeetcodeCalendar(lc);
      fetchLeetcodeTopics(lc);
    }
  }, [profileData.codingProfile?.leetcode]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const user = response.data.data;

      // Auto-generate username if user doesn't have one yet
      const generateUsername = (firstName, lastName, email) => {
        const base = (firstName + lastName).toLowerCase().replace(/[^a-z0-9]/g, '');
        const emailPart = email.split('@')[0].replace(/[^a-z0-9]/g, '').substring(0, 6);
        return base || emailPart || 'user' + Math.floor(Math.random() * 9999);
      };

      const loadedData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || generateUsername(user.firstName, user.lastName, user.email),
        bio: user.bio || "",
        location: user.location || "",
        university: user.university || "",
        profilePic: user.profilePic || "",
        mobileNumber: user.mobileNumber || "",
        countryCode: user.countryCode || "+91",
        educationYear: user.educationYear || "",
        socialLinks: {
          github: sanitizeUsername(user.socialLinks?.github, 'github'),
          linkedin: sanitizeUsername(user.socialLinks?.linkedin, 'linkedin'),
          twitter: sanitizeUsername(user.socialLinks?.twitter, 'twitter'),
          resume: user.socialLinks?.resume || "",
          others: user.socialLinks?.others || ""
        },
        codingProfile: {
          leetcode: sanitizeUsername(user.codingProfile?.leetcode, 'leetcode') || sanitizeUsername(user.socialLinks?.leetcode, 'leetcode'),
          hackerrank: sanitizeUsername(user.codingProfile?.hackerrank, 'hackerrank') || sanitizeUsername(user.socialLinks?.hackerrank, 'hackerrank'),
          codeforces: sanitizeUsername(user.codingProfile?.codeforces, 'codeforces'),
          geeksforgeeks: sanitizeUsername(user.codingProfile?.geeksforgeeks, 'geeksforgeeks'),
          others: user.codingProfile?.others || ""
        },
        workExperience: user.workExperience || [],
        skills: user.skills || [],
        contests: user.contests || [],
        milestones: user.milestones || []
      };
      
      setProfileData(loadedData);
      setEditForm(loadedData);
    } catch (error) {
      console.error("Error fetching profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeetcodeStats = async (username) => {
    try {
      setLeetcodeError(false);
      // Try primary API (fastest and working for this user)
      const fallbackRes = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`, {
        timeout: 10000
      });
      
      if (fallbackRes.data.errors) throw new Error("Invalid username");
      
      // Map API to match UI structure
      setLeetcodeStats({
        totalSolved: fallbackRes.data.totalSolved,
        ranking: fallbackRes.data.ranking,
        easySolved: fallbackRes.data.easySolved,
        mediumSolved: fallbackRes.data.mediumSolved,
        hardSolved: fallbackRes.data.hardSolved,
        totalQuestions: fallbackRes.data.totalQuestions || 3300,
        totalEasy: fallbackRes.data.totalEasy || 800,
        totalMedium: fallbackRes.data.totalMedium || 1700,
        totalHard: fallbackRes.data.totalHard || 800
      });
    } catch (primaryError) {
      console.warn("Primary LeetCode API failed, trying secondary...", primaryError.message);
      try {
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
          timeout: 45000 
        });
        if (response.data.errors) {
          throw new Error("Invalid username");
        }
        setLeetcodeStats(response.data);
      } catch (secondaryError) {
        console.error("All LeetCode APIs failed:", secondaryError.message);
        setLeetcodeStats(null);
        setLeetcodeError(true);
      }
    }
  };

  const fetchCodeforcesStats = async (username) => {
    try {
      setCodeforcesError(false);
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`, { timeout: 8000 });
      if (response.data.status === "OK" && response.data.result.length > 0) {
        setCodeforcesStats(response.data.result[0]);
      } else {
        throw new Error("Invalid username");
      }
    } catch (error) {
      console.error("Codeforces API failed:", error.message);
      setCodeforcesStats(null);
      setCodeforcesError(true);
    }
  };

  const fetchGfgStats = async (username) => {
    try {
      setGfgError(false);
      try {
        // Using an unofficial geeksforgeeks API wrapper
        const response = await axios.get(`https://geeks-for-geeks-api.vercel.app/${username}`, { timeout: 8000 });
        if (!response.data || Object.keys(response.data).length === 0 || response.data.error) {
          throw new Error("Invalid username");
        }
        setGfgStats(response.data);
      } catch (primaryError) {
        console.warn("Primary GeeksForGeeks API failed, trying secondary...", primaryError.message);
        // Fallback to secondary API
        const response2 = await axios.get(`https://gfg-api.tashif.codes/api/user/${username}`, { timeout: 8000 });
        if (!response2.data || Object.keys(response2.data).length === 0 || response2.data.error || response2.data.status !== 'success') {
          throw new Error("Invalid username on secondary API");
        }
        setGfgStats(response2.data);
      }
    } catch (error) {
      console.error("GeeksForGeeks API failed:", error.message);
      setGfgStats(null);
      setGfgError(true);
    }
  };

  const fetchLeetcodeCalendar = async (username) => {
    try {
      const res = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, { timeout: 20000 });
      const data = res.data;
      if (data?.submissionCalendar) {
        const calObj = typeof data.submissionCalendar === 'string'
          ? JSON.parse(data.submissionCalendar)
          : data.submissionCalendar;
        setLeetcodeCalendar(calObj);
        const activeDays = Object.values(calObj).filter(v => v > 0).length;
        setTotalActiveDays(activeDays);
      }
    } catch (err) {
      console.warn('LeetCode calendar fetch error:', err.message);
    }
  };

  const fetchLeetcodeTopics = async (username) => {
    try {
      const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { timeout: 20000 });
      const data = res.data;
      if (data?.tagProblemCounts) {
        const allTopics = [
          ...(data.tagProblemCounts.advanced || []),
          ...(data.tagProblemCounts.intermediate || []),
          ...(data.tagProblemCounts.fundamental || []),
        ];
        const seen = new Set();
        const uniqueTopics = allTopics
          .filter(t => t.problemsSolved > 0 && !seen.has(t.tagName) && seen.add(t.tagName))
          .sort((a, b) => b.problemsSolved - a.problemsSolved);
        setLeetcodeTopics(uniqueTopics);
      }
    } catch (err) {
      console.warn('LeetCode topics fetch error:', err.message);
    }
  };



  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/profile`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };


  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    const promises = [];
    const lc = profileData.codingProfile?.leetcode;
    if (lc) {
      promises.push(fetchLeetcodeStats(lc));
      promises.push(fetchLeetcodeCalendar(lc));
      promises.push(fetchLeetcodeTopics(lc));
    }
    if (profileData.codingProfile?.codeforces) promises.push(fetchCodeforcesStats(profileData.codingProfile.codeforces));
    if (profileData.codingProfile?.geeksforgeeks) promises.push(fetchGfgStats(profileData.codingProfile.geeksforgeeks));
    await Promise.allSettled(promises);
    setLastRefreshTime(Date.now());
    setIsRefreshing(false);
  };

  const getTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 5) return 'just now';
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      setIsUploading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/profile/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newPicUrl = response.data.fileUrl;
      setEditForm({ ...editForm, profilePic: newPicUrl });
      setProfileData({ ...profileData, profilePic: newPicUrl });
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarSelect = async (avatarUrl) => {
    // Only allow avatar selection in edit mode — just update the form, don't auto-save
    if (!isEditing) {
      setIsEditing(true);
    }
    setEditForm(prev => ({ ...prev, profilePic: avatarUrl }));
  };

  const handleEditChange = (field, value, isSocial = false) => {
    if (isSocial) {
      const cleanValue = sanitizeUsername(value, field);
      setEditForm({
        ...editForm,
        socialLinks: { ...editForm.socialLinks, [field]: cleanValue }
      });
    } else {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleCodingProfileChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      codingProfile: { ...prev.codingProfile, [field]: sanitizeUsername(value, field) }
    }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...editForm[field]];
    if (key === null) {
      // For simple arrays of strings like 'skills'
      updatedArray[index] = value;
    } else {
      // For arrays of objects
      updatedArray[index] = { ...updatedArray[index], [key]: value };
    }
    setEditForm({ ...editForm, [field]: updatedArray });
  };

  const handleAddArrayItem = (field, emptyItem) => {
    setEditForm({ ...editForm, [field]: [...editForm[field], emptyItem] });
  };

  const handleRemoveArrayItem = (field, index) => {
    const updatedArray = editForm[field].filter((_, i) => i !== index);
    setEditForm({ ...editForm, [field]: updatedArray });
  };

  const toggleStats = () => setIsStatsOpen(!isStatsOpen);

  const CircularProgressBar = ({ value, maxValue = 100, color }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
          {value || 0}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading Profile...</div>;
  }

  // Generate fallback avatar based on user's name
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=random`;

  const renderProfileDetailsTab = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Profile Photo & Summary Section */}
      {isEditing && (
        <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
          <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Edit Identity</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Manage your public persona.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
               <h4 className={`font-semibold text-sm uppercase tracking-widest mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Avatar Style</h4>
               <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 p-6 rounded-2xl border dark:border-white/5 border-indigo-50/50">
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">Choose an auto-generated stunning avatar to quickly aestheticize your profile if you don't have a photo ready.</p>
                 <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                   {[1, 2, 3, 4, 5, 6].map((num) => {
                     // Using an aesthetic gradient background for avatars
                     const bgColors = ['b6e3f4', 'c0aede', 'ffd5dc', 'ffdfbf', 'd1f4ba', 'e0c3fc'];
                     const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${num}&backgroundColor=${bgColors[num-1]}`;
                     const isSelected = (editForm?.profilePic || profileData.profilePic) === avatarUrl;
                     return (
                       <button
                         key={num}
                         type="button"
                         onClick={() => handleAvatarSelect(avatarUrl)}
                         title="Use this avatar"
                         className={`aspect-square w-full rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300 flex items-center justify-center overflow-hidden border-2 shadow-sm ${
                           isSelected
                             ? 'border-indigo-500 ring-4 ring-indigo-500/20 shadow-indigo-500/30'
                             : 'border-transparent hover:border-indigo-300 dark:hover:border-indigo-500/50'
                         }`}
                       >
                         <img src={avatarUrl} alt={`Avatar ${num}`} className="w-full h-full object-cover" />
                       </button>
                     );
                   })}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Personal Details Section */}
      <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
        <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Personal Information</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Details for hiring managers and collaborators.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
          <div className="flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>First Name *</label>
            <input
              type="text"
              value={isEditing ? editForm.firstName : profileData.firstName}
              onChange={(e) => isEditing && handleEditChange('firstName', e.target.value)}
              disabled={!isEditing}
              placeholder="e.g. John"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                  : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
              }`}
            />
          </div>
          
          <div className="flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Last Name *</label>
            <input
              type="text"
              value={isEditing ? editForm.lastName : profileData.lastName}
              onChange={(e) => isEditing && handleEditChange('lastName', e.target.value)}
              disabled={!isEditing}
              placeholder="e.g. Doe"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                  : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 group">
             <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300 flex items-center gap-2`}>
              Email Address <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded font-black tracking-widest">VERIFIED</span>
            </label>
            <input
              type="email"
              value={profileData.email}
              disabled={true}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Username field */}
          <div className="flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300 flex items-center`}>
              Username
              {usernameStatus === 'available' && <span className="ml-2 text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded font-black tracking-widest">AVAILABLE</span>}
              {usernameStatus === 'taken' && <span className="ml-2 text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded font-black tracking-widest">TAKEN</span>}
              {usernameStatus === 'checking' && <span className="ml-2 text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded font-black tracking-widest animate-pulse">CHECKING...</span>}
            </label>
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-black ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}>@</span>
              <input
                type="text"
                value={isEditing ? editForm.username : profileData.username}
                onChange={(e) => {
                  if (!isEditing) return;
                  const val = e.target.value.replace(/[^a-z0-9_.]/g, '');
                  handleEditChange('username', val);
                  if (val.length >= 3) {
                    setUsernameStatus('checking');
                    clearTimeout(window._usernameCheckTimer);
                    window._usernameCheckTimer = setTimeout(async () => {
                      try {
                        const token = localStorage.getItem('token');
                        const res = await axios.get(`${API_BASE_URL}/profile/check-username/${val}`, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        setUsernameStatus(res.data.available ? 'available' : 'taken');
                      } catch { setUsernameStatus(null); }
                    }, 600);
                  } else {
                    setUsernameStatus(null);
                  }
                }}
                disabled={!isEditing}
                placeholder="e.g. johndoe"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                  isEditing
                    ? `${
                        usernameStatus === 'available' ? 'border-green-400 dark:border-green-600 bg-green-50/30 dark:bg-green-900/10 focus:border-green-500' :
                        usernameStatus === 'taken' ? 'border-red-400 dark:border-red-600 bg-red-50/30 dark:bg-red-900/10 focus:border-red-500' :
                        isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50'
                      } ${isDarkMode ? 'text-white' : 'text-gray-900'}`
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Mobile Number</label>
            <div className="flex gap-3">
              {/* Country code dropdown */}
              <select
                value={isEditing ? editForm.countryCode : profileData.countryCode}
                onChange={(e) => isEditing && handleEditChange('countryCode', e.target.value)}
                disabled={!isEditing}
                style={{ maxWidth: '120px' }}
                className={`w-36 py-3 px-3 rounded-xl border-2 transition-all duration-300 outline-none font-medium ${
                  isEditing
                    ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-400 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code} className="dark:bg-slate-800">{c.flag} {c.code}</option>
                ))}
              </select>
              {/* Phone number input */}
              <input
                type="tel"
                value={isEditing ? editForm.mobileNumber : profileData.mobileNumber}
                onChange={(e) => isEditing && handleEditChange('mobileNumber', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g. 99999 99999"
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                  isEditing
                    ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 group" ref={countryDropdownRef}>
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Country</label>
            {isEditing ? (
              <div className="relative">
                <div
                  className={`w-full px-4 py-3 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all duration-300 outline-none ${
                    isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900'
                  }`}
                  onClick={() => setShowCountryDropdown(v => !v)}
                >
                  <span className={editForm.location ? '' : 'text-gray-400'}>
                    {editForm.location || 'Select a country...'}
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${showCountryDropdown ? 'rotate-180 text-indigo-500' : 'text-gray-400'}`} />
                </div>
                {showCountryDropdown && (
                  <div className={`absolute z-50 w-full mt-2 rounded-2xl border shadow-2xl backdrop-blur-3xl max-h-60 overflow-auto animate-fadeIn ${
                    isDarkMode ? 'bg-[#1A1A24]/90 border-white/10' : 'bg-white/95 border-gray-200'
                  }`}>
                    <div className="sticky top-0 p-3 bg-inherit backdrop-blur-xl border-b dark:border-white/5 border-gray-100 z-10">
                      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${
                        isDarkMode ? 'bg-black/30' : 'bg-gray-100/80'
                      }`}>
                        <Search size={16} className="text-gray-400" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                          className="flex-1 bg-transparent text-sm outline-none dark:text-white text-gray-900 placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      {COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map(country => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => {
                            handleEditChange('location', country);
                            setShowCountryDropdown(false);
                            setCountrySearch('');
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                            editForm.location === country
                              ? (isDarkMode ? 'bg-indigo-500 text-white font-bold' : 'bg-indigo-50 text-indigo-700 font-bold')
                              : (isDarkMode ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900')
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                value={profileData.location}
                disabled
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                   isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed'
                }`}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Education Year</label>
            <select
              value={isEditing ? editForm.educationYear : profileData.educationYear}
              onChange={(e) => isEditing && handleEditChange('educationYear', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none appearance-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                  : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
              }`}
            >
              <option value="" className="dark:bg-slate-800">Select Year...</option>
              <option value="1st Year" className="dark:bg-slate-800">1st Year</option>
              <option value="2nd Year" className="dark:bg-slate-800">2nd Year</option>
              <option value="3rd Year" className="dark:bg-slate-800">3rd Year</option>
              <option value="4th Year" className="dark:bg-slate-800">4th Year</option>
              <option value="Graduated" className="dark:bg-slate-800">Graduated</option>
            </select>
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-2 group">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Bio / Headline</label>
            <textarea
              value={isEditing ? editForm.bio : profileData.bio}
              onChange={(e) => isEditing && handleEditChange('bio', e.target.value)}
              disabled={!isEditing}
              placeholder="A brief summary of your skills and goals..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                  : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
              }`}
            />
          </div>
        </div>
      </div>
      
      {/* Social and Coding Profiles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Social Links */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
          <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Social Footprint</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Connect your networks.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub Profile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>github.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.github : profileData.socialLinks.github}
                  onChange={(e) => isEditing && handleEditChange('github', e.target.value, true)} // The 'true' flag means it's a social link, but we'll need to update it since it's nested
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[98px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-blue-400' : 'text-gray-500 group-focus-within:text-blue-600'} transition-colors duration-300`}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LinkedIn Profile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>in/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.linkedin : profileData.socialLinks.linkedin}
                  onChange={(e) => isEditing && handleEditChange('linkedin', e.target.value, true)}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[46px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                     isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-blue-500 focus:bg-blue-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-blue-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-sky-400' : 'text-gray-500 group-focus-within:text-sky-500'} transition-colors duration-300`}>
                 Twitter / X
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>x.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.twitter : profileData.socialLinks.twitter}
                  onChange={(e) => isEditing && handleEditChange('twitter', e.target.value, true)}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[68px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                     isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-sky-500 focus:bg-sky-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-sky-500 focus:bg-sky-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Resume / Portfolio Link</label>
              <input
                type="url"
                value={isEditing ? editForm.socialLinks.resume : profileData.socialLinks.resume}
                onChange={(e) => isEditing && handleEditChange('resume', e.target.value, true)}
                disabled={!isEditing}
                placeholder="https://your-portfolio.com"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                   isEditing 
                    ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              />
            </div>
            
            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Other Links</label>
              <input
                type="text"
                value={isEditing ? editForm.socialLinks.others : profileData.socialLinks.others}
                onChange={(e) => isEditing && handleEditChange('others', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Comma separated links (e.g. Medium...)"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                   isEditing 
                    ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              />
            </div>

          </div>
        </div>

        {/* Coding Profiles */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
          <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
            <div>
              <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coding Platforms</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Where your progress is tracked.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            
            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-yellow-400' : 'text-gray-500 group-focus-within:text-yellow-600'} transition-colors duration-300`}>
                <span className="font-mono text-yellow-500 text-base leading-none">λ</span> LeetCode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>leetcode.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.codingProfile.leetcode : profileData.codingProfile.leetcode}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditForm({
                      ...editForm,
                      codingProfile: { ...editForm.codingProfile, leetcode: sanitizeUsername(e.target.value, 'leetcode') }
                    });
                  }}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[106px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-yellow-500 focus:bg-yellow-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-yellow-500 focus:bg-yellow-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-rose-400' : 'text-gray-500 group-focus-within:text-rose-600'} transition-colors duration-300`}>
                <span className="font-bold text-rose-500 text-base leading-none">ııll</span> Codeforces
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>codeforces.com/profile/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.codingProfile.codeforces : profileData.codingProfile.codeforces}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditForm({
                      ...editForm,
                      codingProfile: { ...editForm.codingProfile, codeforces: sanitizeUsername(e.target.value, 'codeforces') }
                    });
                  }}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[172px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-rose-500 focus:bg-rose-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-rose-500 focus:bg-rose-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-green-400' : 'text-gray-500 group-focus-within:text-green-600'} transition-colors duration-300`}>
                <span className="font-bold text-green-500 text-base leading-none">H</span> HackerRank
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>hackerrank.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.codingProfile.hackerrank : profileData.codingProfile.hackerrank}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditForm({
                      ...editForm,
                      codingProfile: { ...editForm.codingProfile, hackerrank: sanitizeUsername(e.target.value, 'hackerrank') }
                    });
                  }}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[125px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-green-500 focus:bg-green-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-green-500 focus:bg-green-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 group">
               <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-400 group-focus-within:text-emerald-400' : 'text-gray-500 group-focus-within:text-emerald-600'} transition-colors duration-300`}>
                <span className="font-bold text-emerald-600 text-base leading-none">G</span> GeeksForGeeks
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>geeksforgeeks.org/user/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.codingProfile.geeksforgeeks : profileData.codingProfile.geeksforgeeks}
                  onChange={(e) => {
                    if (!isEditing) return;
                    setEditForm({
                      ...editForm,
                      codingProfile: { ...editForm.codingProfile, geeksforgeeks: sanitizeUsername(e.target.value, 'geeksforgeeks') }
                    });
                  }}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[168px] pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isEditing 
                      ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-emerald-500 focus:bg-emerald-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-emerald-500 focus:bg-emerald-50/50 text-gray-900')
                      : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 group">
               <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Other Profiles</label>
              <input
                type="text"
                value={isEditing ? editForm.codingProfile.others : profileData.codingProfile.others}
                onChange={(e) => {
                  if (!isEditing) return;
                  setEditForm({
                    ...editForm,
                    codingProfile: { ...editForm.codingProfile, others: e.target.value }
                  });
                }}
                disabled={!isEditing}
                placeholder="Comma separated links"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                  isEditing 
                    ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                    : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-gray-100 border-transparent text-gray-600 cursor-not-allowed')
                }`}
              />
            </div>

          </div>
        </div>

      </div>
      
      {/* Work Experience Section */}
      <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
        <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Professional Journey</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Your work experience and roles.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {(isEditing ? editForm.workExperience : profileData.workExperience).map((exp, index) => (
            <div key={index} className={`relative p-5 md:p-6 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'} transition-all duration-300 group/card hover:shadow-md`}>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('workExperience', index)}
                  className={`absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 opacity-0 group-hover/card:opacity-100 focus:opacity-100 ${isDarkMode ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' : 'text-red-500 hover:bg-red-50 hover:text-red-600'}`}
                  title="Remove Experience"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-1">
                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'company', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. Google"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed font-medium px-0')
                    }`}
                  />
                </div>
                
                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Location Mode</label>
                  <select
                    value={exp.mode}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'mode', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none appearance-none ${
                      isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed font-medium px-0')
                    }`}
                  >
                    <option value="" className="dark:bg-slate-800">Select Mode...</option>
                    <option value="On-Site" className="dark:bg-slate-800">On-Site</option>
                    <option value="Hybrid" className="dark:bg-slate-800">Hybrid</option>
                    <option value="Remote" className="dark:bg-slate-800">Remote</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'role', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. SDE Intern"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed font-medium px-0')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'duration', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. June 2023 - Aug 2023"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed font-medium px-0')
                    }`}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'description', e.target.value)}
                    disabled={!isEditing}
                    placeholder="What did you build? What was your impact?"
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-600 cursor-not-allowed px-0 text-sm leading-relaxed')
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}

          {(!profileData.workExperience?.length && !isEditing) && (
             <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed dark:border-white/5 border-gray-100 dark:bg-black/10 bg-gray-50/30">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 dark:bg-white/5 bg-white shadow-sm align-middle">
                 <Briefcase size={20} className="text-gray-400" />
               </div>
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No work experience added yet.</p>
               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click edit to showcase your professional timeline.</p>
             </div>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => handleAddArrayItem('workExperience', { company: '', mode: '', role: '', duration: '', description: '' })}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed transition-all duration-300 text-sm font-bold tracking-wide uppercase ${
                isDarkMode 
                  ? 'border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5' 
                  : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <Plus size={16} strokeWidth={3} /> Add Role
            </button>
          )}
        </div>
      </div>
      {/* Skills Section */}
      <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
        <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Core Skills</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Tools and technologies you've mastered.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2.5">
            {(isEditing ? editForm.skills : profileData.skills).map((skill, index) => (
              <span 
                key={index} 
                className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-default shadow-sm ${
                  isDarkMode 
                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40' 
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200'
                }`}
              >
                {skill}
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveArrayItem('skills', index)}
                    className="hover:text-red-500 ml-1 opacity-60 hover:opacity-100 focus:outline-none transition-all duration-200 bg-white/10 hover:bg-red-500/20 rounded-full p-0.5"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                )}
              </span>
            ))}
            {(!profileData.skills?.length && !isEditing) && (
               <span className="text-sm text-gray-400 dark:text-gray-500 italic bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl">No skills added yet.</span>
            )}
          </div>
          
          {isEditing && (
            <div className="flex gap-3">
              <input
                type="text"
                id="newSkillInput"
                placeholder="e.g. React, Node.js, NextJS..."
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-gray-50/50 border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.value.trim()) {
                      handleAddArrayItem('skills', e.target.value.trim());
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('newSkillInput');
                  if (input.value.trim()) {
                    handleAddArrayItem('skills', input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all font-bold shadow-md shadow-indigo-500/20 active:scale-95"
              >
                Add Skill
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contests Section */}
      <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 pb-28 min-h-[300px] ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
        <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-white/10 border-gray-100">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Competitive Coding</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Your recent contest performances and ranks.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {(isEditing ? editForm.contests : profileData.contests).map((contest, index) => (
            <div key={index} className={`relative p-5 md:p-6 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'} transition-all duration-300 group/card hover:shadow-md`}>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('contests', index)}
                  className={`absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 opacity-0 group-hover/card:opacity-100 focus:opacity-100 ${isDarkMode ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' : 'text-red-500 hover:bg-red-50 hover:text-red-600'}`}
                  title="Remove Contest"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-1">
                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Platform / Contest Name</label>
                  <input
                    type="text"
                    value={contest.platform}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'platform', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. LeetCode Biweekly Contest 110"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed font-semibold' : 'bg-transparent border-transparent text-gray-800 cursor-not-allowed font-bold px-0')
                    }`}
                  />
                </div>
                
                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Your Rank</label>
                  <input
                    type="text"
                    value={contest.rank}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'rank', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. 145"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed px-0 font-medium')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Total Participants</label>
                  <input
                    type="text"
                    value={contest.totalParticipants}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'totalParticipants', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. 25000"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-gray-300 cursor-not-allowed' : 'bg-transparent border-transparent text-gray-700 cursor-not-allowed px-0 font-medium')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400 group-focus-within:text-indigo-400' : 'text-gray-500 group-focus-within:text-indigo-600'} transition-colors duration-300`}>Certificate / Proof URL</label>
                  <input
                    type="url"
                    value={contest.url}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'url', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 focus:bg-indigo-500/5 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/50 text-gray-900')
                         : (isDarkMode ? 'bg-white/5 border-transparent text-indigo-400 hover:text-indigo-300 cursor-pointer underline-offset-4 hover:underline' : 'bg-transparent border-transparent text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer underline-offset-4 px-0 font-medium')
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}

          {(!profileData.contests?.length && !isEditing) && (
              <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed dark:border-white/5 border-gray-100 dark:bg-black/10 bg-gray-50/30">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 dark:bg-white/5 bg-white shadow-sm align-middle">
                  <Award size={20} className="text-yellow-500" />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No contest achievements added yet.</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Edit profile to show off your competitive programming ranks.</p>
              </div>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => handleAddArrayItem('contests', { platform: '', rank: '', totalParticipants: '', url: '' })}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed transition-all duration-300 text-sm font-bold tracking-wide uppercase ${
                isDarkMode 
                  ? 'border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5' 
                  : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <Plus size={16} strokeWidth={3} /> Add Contest
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderMilestonesTab = () => {
    const MILESTONE_TYPES = [
      { value: 'award', label: 'Award', color: 'text-amber-500', bg: isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200', icon: Trophy },
      { value: 'certification', label: 'Certification', color: 'text-blue-500', bg: isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200', icon: Award },
      { value: 'project', label: 'Project', color: 'text-emerald-500', bg: isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200', icon: Briefcase },
      { value: 'other', label: 'Other', color: 'text-purple-500', bg: isDarkMode ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200', icon: Star },
    ];
    const getTypeStyle = (type) => MILESTONE_TYPES.find(t => t.value === type) || MILESTONE_TYPES[3];
    const milestones = isEditing ? editForm.milestones : profileData.milestones;

    // Sort milestones by date descending securely
    const sortedMilestones = [...milestones].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
          <div className="flex justify-between items-center mb-0">
            <div>
              <h3 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Career Timeline</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">A visual history of your awards, certifications, and achievements.</p>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button onClick={cancelEdit} className={`px-4 py-2 text-sm font-bold tracking-wide rounded-xl border transition-all duration-300 ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>Cancel</button>
                <button onClick={handleSaveProfile} className="px-5 py-2 text-sm font-bold tracking-wide rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-md shadow-indigo-500/25 active:scale-95 transition-all duration-300 flex items-center gap-2">
                   Save Timeline
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className={`p-3 rounded-xl transition-all duration-300 border shadow-sm ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 hover:text-white' : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-gray-900 hover:border-gray-200'}`}
                title="Edit Milestones"
              >
                <Edit2 size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className={`p-6 md:p-10 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 relative ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
          
          {milestones.length > 0 && (
             <div className={`absolute left-10 md:left-24 top-10 bottom-10 w-0.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          )}

          <div className="flex flex-col gap-8 relative">
            {isEditing ? (
               // EDIT MODE
               milestones.map((milestone, index) => {
                const typeStyle = getTypeStyle(milestone.type);
                return (
                  <div key={index} className={`relative p-6 md:p-8 rounded-2xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'} transition-all duration-300 animate-fadeIn`}>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('milestones', index)}
                      className={`absolute top-4 right-4 p-2 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300' : 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'}`}
                      title="Remove Milestone"
                    >
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2 pr-10">
                      <div className="flex flex-col gap-2 group">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Title *</label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => handleArrayChange('milestones', index, 'title', e.target.value)}
                          placeholder="e.g. Best Project Award"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 text-gray-900'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2 group">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</label>
                        <input
                          type="month"
                          value={milestone.date}
                          onChange={(e) => handleArrayChange('milestones', index, 'date', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 text-white [color-scheme:dark]' : 'bg-white border-gray-200 focus:border-indigo-500 text-gray-900'}`}
                        />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2 group">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</label>
                        <div className="flex gap-3 flex-wrap">
                          {MILESTONE_TYPES.map(t => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => handleArrayChange('milestones', index, 'type', t.value)}
                              className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide border-2 transition-all duration-300 flex items-center gap-2 ${
                                milestone.type === t.value
                                  ? `${t.bg} ${t.color} border-current shadow-sm`
                                  : (isDarkMode ? 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-900')
                              }`}
                            >
                              <t.icon size={16} strokeWidth={2.5} />
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2 group">
                        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description</label>
                        <textarea
                          value={milestone.description}
                          onChange={(e) => handleArrayChange('milestones', index, 'description', e.target.value)}
                          placeholder="Brief description of this achievement..."
                          rows={2}
                          className={`w-full px-4 py-3 rounded-xl border-2 resize-none transition-all duration-300 outline-none ${isDarkMode ? 'bg-black/20 border-white/5 focus:border-indigo-500 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 text-gray-900'}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
               // VIEW MODE
               sortedMilestones.map((milestone, index) => {
                const typeStyle = getTypeStyle(milestone.type);
                const Icon = typeStyle.icon;

                return (
                  <div key={index} className="relative flex items-start gap-6 md:gap-10 group/timeline animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    {/* Timestamp for Desktop (hidden on mobile, shown differently) */}
                    <div className="hidden md:block w-24 flex-shrink-0 pt-1 text-right">
                       <span className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? 'text-gray-400 group-hover/timeline:text-white' : 'text-gray-500 group-hover/timeline:text-gray-900'} transition-colors duration-300`}>
                          {milestone.date ? new Date(milestone.date + '-01').toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Ongoing'}
                       </span>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-all duration-500 group-hover/timeline:scale-110 group-hover/timeline:shadow-md ${isDarkMode ? 'bg-[#181824]' : 'bg-white'} ${typeStyle.bg} border-transparent group-hover/timeline:border-current`}>
                        <Icon size={20} className={`${typeStyle.color} transition-transform duration-500 group-hover/timeline:rotate-12`} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 min-w-0 p-5 md:p-6 rounded-2xl border transition-all duration-300 group-hover/timeline:shadow-lg group-hover/timeline:-translate-y-1 ${isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-black/40' : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white'}`}>
                      <div className="flex flex-col gap-1 mb-2">
                         <div className="flex items-center gap-3 flex-wrap">
                            <h4 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{milestone.title || 'Untitled'}</h4>
                            <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${typeStyle.bg} ${typeStyle.color}`}>
                               {typeStyle.label}
                            </span>
                         </div>
                         {/* Mobile Timestamp */}
                         <div className="md:hidden mt-1">
                            <span className={`text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                               <Clock size={12} strokeWidth={2.5} /> 
                               {milestone.date ? new Date(milestone.date + '-01').toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Ongoing'}
                            </span>
                         </div>
                      </div>
                      
                      {milestone.description && (
                        <p className={`text-sm leading-relaxed mt-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                           {milestone.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {(!milestones.length && !isEditing) && (
              <div className="text-center py-16 px-4 rounded-2xl border-2 border-dashed dark:border-white/5 border-gray-200 dark:bg-black/10 bg-gray-50/50 relative z-10 w-full">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'}`}>
                  <Award size={32} className="text-indigo-500" strokeWidth={2} />
                </div>
                <h4 className={`text-xl font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Milestones Yet</h4>
                <p className="text-sm text-gray-500 font-medium mb-6 max-w-sm mx-auto">Build your career timeline by adding awards, certifications, and notable achievements.</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold tracking-wide shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2 mx-auto uppercase"
                >
                  <Plus size={18} strokeWidth={3} /> Add Milestone
                </button>
              </div>
            )}

            {isEditing && (
              <div className="pt-4">
                 <button
                   type="button"
                   onClick={() => handleAddArrayItem('milestones', { title: '', description: '', date: '', type: 'other' })}
                   className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed transition-all duration-300 text-sm font-bold tracking-wide uppercase ${
                     isDarkMode
                       ? 'border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5'
                       : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50'
                   }`}
                 >
                   <Plus size={18} strokeWidth={3} /> Add Milestone Entry
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Helper to get Codeforces color by rating ---
  const getCodeforcesColor = (rating) => {
    if (!rating) return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    if (rating >= 3000) return 'text-red-500'; // Legendary Grandmaster
    if (rating >= 2600) return 'text-red-400'; // International Grandmaster
    if (rating >= 2400) return 'text-red-300'; // Grandmaster
    if (rating >= 2300) return 'text-orange-500'; // International Master
    if (rating >= 2100) return 'text-orange-400'; // Master
    if (rating >= 1900) return 'text-fuchsia-500'; // Candidate Master
    if (rating >= 1600) return 'text-blue-500'; // Expert
    if (rating >= 1400) return 'text-cyan-500'; // Specialist
    if (rating >= 1200) return 'text-green-500'; // Pupil
    return 'text-gray-500'; // Newbie
  };

  const getCodeforcesRankLabel = (rating) => {
    if (!rating) return 'Unrated';
    if (rating >= 3000) return 'Legendary Grandmaster';
    if (rating >= 2600) return 'International Grandmaster';
    if (rating >= 2400) return 'Grandmaster';
    if (rating >= 2300) return 'International Master';
    if (rating >= 2100) return 'Master';
    if (rating >= 1900) return 'Candidate Master';
    if (rating >= 1600) return 'Expert';
    if (rating >= 1400) return 'Specialist';
    if (rating >= 1200) return 'Pupil';
    return 'Newbie';
  };

  const renderProgressTab = () => {
    const hasAnyProfile = profileData.socialLinks?.github || profileData.codingProfile?.leetcode || profileData.codingProfile?.codeforces || profileData.codingProfile?.geeksforgeeks || profileData.codingProfile?.hackerrank || profileData.codingProfile?.others;

    // Calculate Global Stats
    let globalSolved = 0;
    if (leetcodeStats?.totalSolved) globalSolved += parseInt(leetcodeStats.totalSolved) || 0;
    if (gfgStats?.totalProblemsSolved) globalSolved += parseInt(gfgStats.totalProblemsSolved) || 0;

    return (
      <div className="space-y-8 animate-fadeIn">
        
        {/* Header Section */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#181824]/60 border-white/5' : 'bg-white/80 border-white shadow-gray-200/50'}`}>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div>
               <h3 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coding Dashboard</h3>
               <p className={`text-sm mt-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track your global competitive programming metrics.</p>
             </div>
             {hasAnyProfile && (
               <div className={`px-6 py-4 rounded-2xl border flex items-center gap-4 transition-transform hover:scale-105 ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100 shadow-sm'}`}>
                 <div className="flex flex-col">
                   <span className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Global Solved</span>
                   <span className={`text-3xl font-black leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {globalSolved > 0 ? globalSolved.toLocaleString() : '-'}
                   </span>
                 </div>
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-500/20' : 'bg-white shadow-sm border border-indigo-50'}`}>
                    <Trophy size={24} className={isDarkMode ? 'text-indigo-400' : 'text-indigo-500'} strokeWidth={2.5} />
                 </div>
               </div>
             )}
           </div>
        </div>

        {!hasAnyProfile ? (
          <div className={`py-20 text-center rounded-3xl border-2 border-dashed backdrop-blur-md flex flex-col items-center justify-center ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-gray-200 bg-white/50'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'}`}>
              <svg className="w-10 h-10 opacity-50 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <p className={`text-xl font-bold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Tracked Progress</p>
            <p className={`text-sm max-w-md mx-auto mb-8 font-medium leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Link your GitHub, LeetCode, Codeforces, and GeeksForGeeks profiles in the Details tab to generate your unified dashboard.</p>
            <button 
              onClick={() => goToTab('details')}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-indigo-500/25 active:scale-95 transition-all uppercase"
            >
              Link Profiles Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* --- LEETCODE CARD --- */}
            {profileData.codingProfile?.leetcode && (
              <div className={`group relative p-6 md:p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#181824]/60 border-white/5 hover:border-yellow-500/30 hover:shadow-yellow-500/10' : 'bg-white/80 border-white shadow-lg shadow-gray-200/50 hover:border-yellow-300'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 flex items-center justify-center border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-yellow-500"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.833s.513 2.851 1.494 3.833l10.105 10.105c.514.515 1.366.498 1.902-.038.535-.536.552-1.387.038-1.902l-2.609-2.636c-.467-.467-.683-1.125-.683-1.837s.195-1.357.662-1.824l2.697-2.606c.514-.515 1.365-.497 1.9-.038.535.536.553 1.387.039 1.901z"/></svg>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LeetCode</h4>
                      <a href={`https://leetcode.com/${profileData.codingProfile.leetcode}`} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline flex items-center gap-1.5 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-500 hover:text-yellow-600'}`}>
                        @{profileData.codingProfile.leetcode} <ExternalLink size={12} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                  {leetcodeStats && leetcodeStats.ranking && (
                     <div className="text-right bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                       <span className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Global Rank</span>
                       <div className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>#{leetcodeStats.ranking.toLocaleString()}</div>
                     </div>
                  )}
                </div>

                {leetcodeError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={28} className="mb-3 opacity-80" strokeWidth={2} />
                    <p className="text-sm font-bold tracking-wide">Failed to load LeetCode stats.</p>
                    <p className="text-xs font-medium opacity-70 mt-1">Check username or try again later.</p>
                  </div>
                ) : !leetcodeStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500/30 border-t-yellow-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5 flex-1">
                    <div className={`col-span-2 sm:col-span-1 p-6 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                       <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-50"></div>
                       <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Total Solved</span>
                       <div className="flex items-baseline gap-1.5 relative">
                         <span className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leetcodeStats.totalSolved}</span>
                         <span className="text-sm font-bold text-gray-400">/{leetcodeStats.totalQuestions}</span>
                       </div>
                       <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full mt-5 overflow-hidden shadow-inner">
                         <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}></div>
                       </div>
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-3 justify-center">
                       <div className={`flex items-center justify-between p-3 lg:p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-teal-500/5 border-teal-500/20' : 'bg-teal-50/50 border-teal-100'}`}>
                         <span className="text-xs tracking-widest uppercase font-bold text-teal-500 dark:text-teal-400">Easy</span>
                         <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leetcodeStats.easySolved} <span className="text-gray-400 font-medium">/{leetcodeStats.totalEasy || 800}</span></span>
                       </div>
                       <div className={`flex items-center justify-between p-3 lg:p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50/50 border-amber-100'}`}>
                         <span className="text-xs tracking-widest uppercase font-bold text-amber-500 dark:text-amber-400">Medium</span>
                         <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leetcodeStats.mediumSolved} <span className="text-gray-400 font-medium">/{leetcodeStats.totalMedium || 1700}</span></span>
                       </div>
                       <div className={`flex items-center justify-between p-3 lg:p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50/50 border-rose-100'}`}>
                         <span className="text-xs tracking-widest uppercase font-bold text-rose-500 dark:text-rose-400">Hard</span>
                         <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leetcodeStats.hardSolved} <span className="text-gray-400 font-medium">/{leetcodeStats.totalHard || 800}</span></span>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- CODEFORCES CARD --- */}
            {profileData.codingProfile?.codeforces && (
              <div className={`group relative p-6 md:p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#181824]/60 border-white/5 hover:border-blue-500/30 hover:shadow-blue-500/10' : 'bg-white/80 border-white shadow-lg shadow-gray-200/50 hover:border-blue-300'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-blue-500"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5z"/></svg>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Codeforces</h4>
                      <a href={`https://codeforces.com/profile/${profileData.codingProfile.codeforces}`} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline flex items-center gap-1.5 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'}`}>
                        @{profileData.codingProfile.codeforces} <ExternalLink size={12} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                  {codeforcesStats && codeforcesStats.maxRating && (
                     <div className="text-right bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                       <span className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max Rating</span>
                       <div className={`text-lg font-black tracking-tight ${getCodeforcesColor(codeforcesStats.maxRating)}`}>{codeforcesStats.maxRating}</div>
                     </div>
                  )}
                </div>

                {codeforcesError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={28} className="mb-3 opacity-80" strokeWidth={2} />
                    <p className="text-sm font-bold tracking-wide">Failed to load Codeforces stats.</p>
                    <p className="text-xs font-medium opacity-70 mt-1">Check username or connection.</p>
                  </div>
                ) : !codeforcesStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500/30 border-t-blue-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 gap-5">
                     <div className={`p-6 flex-1 rounded-2xl border flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                        <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-50"></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${getCodeforcesColor(codeforcesStats.rating)}`}>
                          {getCodeforcesRankLabel(codeforcesStats.rating)}
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`text-5xl font-black tracking-tighter ${getCodeforcesColor(codeforcesStats.rating)}`}>
                            {codeforcesStats.rating || 0}
                          </span>
                        </div>
                        <div className="mt-4 text-[10px] tracking-widest uppercase text-gray-500 font-bold">
                          Current Rating
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border text-center transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                          <div className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{codeforcesStats.contribution || 0}</div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-1">Contribution</div>
                        </div>
                        <div className={`p-4 rounded-xl border text-center transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                          <div className={`text-lg font-black capitalize truncate px-2 ${getCodeforcesColor(codeforcesStats.maxRating)}`}>{codeforcesStats.maxRank || 'Unrated'}</div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-1">Max Rank</div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* --- GEEKSFORGEEKS CARD --- */}
            {profileData.codingProfile?.geeksforgeeks && (
              <div className={`group relative p-6 md:p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#181824]/60 border-white/5 hover:border-emerald-500/30 hover:shadow-emerald-500/10' : 'bg-white/80 border-white shadow-lg shadow-gray-200/50 hover:border-emerald-300'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-500"><path d="M12.003 5.4c-4.103 0-7.79 2.503-9.155 6.342-.142.399-.142.825 0 1.224 1.365 3.84 5.052 6.342 9.155 6.342 4.102 0 7.79-2.502 9.155-6.342.142-.399.142-.825 0-1.224-1.365-3.839-5.053-6.342-9.155-6.342zm0 12.3c-2.906 0-5.518-1.776-6.486-4.502a4.457 4.457 0 0 1 0-.916c.968-2.726 3.58-4.502 6.486-4.502 2.905 0 5.517 1.776 6.485 4.502.13.367.13.738 0 1.106-.968 2.716-3.58 4.312-6.485 4.312z"/></svg>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GeeksForGeeks</h4>
                      <a href={`https://auth.geeksforgeeks.org/user/${profileData.codingProfile.geeksforgeeks}`} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline flex items-center gap-1.5 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}>
                        @{profileData.codingProfile.geeksforgeeks} <ExternalLink size={12} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                  {gfgStats && gfgStats.totalProblemsSolved && (
                     <div className="text-right bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                       <span className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Solved</span>
                       <div className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{gfgStats.totalProblemsSolved}</div>
                     </div>
                  )}
                </div>

                {gfgError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={28} className="mb-3 opacity-80" strokeWidth={2} />
                    <p className="text-sm font-bold tracking-wide">Failed to load GFG stats.</p>
                    <p className="text-xs font-medium opacity-70 mt-1">Check username formatting.</p>
                  </div>
                ) : !gfgStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500/30 border-t-emerald-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`col-span-1 p-5 rounded-2xl border flex flex-col items-center justify-center text-center transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Overall Score</span>
                        <span className={`text-3xl font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{gfgStats.codingScore || 0}</span>
                      </div>
                      <div className={`col-span-1 p-5 rounded-2xl border flex flex-col items-center justify-center text-center transition-colors ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Inst. Rank</span>
                        <span className={`text-3xl font-black ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>#{gfgStats.instituteRank || '-'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 flex-1 justify-end mt-2">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Difficulty Breakdown</div>
                      <div className="flex h-3.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 w-full mb-1 shadow-inner">
                        <div style={{ width: `${((gfgStats.easy || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-gradient-to-r from-teal-400 to-teal-500 h-full" title={`Easy: ${gfgStats.easy || 0}`}></div>
                        <div style={{ width: `${((gfgStats.medium || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-gradient-to-r from-amber-400 to-amber-500 h-full" title={`Medium: ${gfgStats.medium || 0}`}></div>
                        <div style={{ width: `${((gfgStats.hard || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-gradient-to-r from-rose-500 to-rose-600 h-full" title={`Hard: ${gfgStats.hard || 0}`}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold px-1">
                        <span className="text-teal-500 dark:text-teal-400">{gfgStats.easy || 0} Easy</span>
                        <span className="text-amber-500 dark:text-amber-400">{gfgStats.medium || 0} Med</span>
                        <span className="text-rose-500 dark:text-rose-400">{gfgStats.hard || 0} Hard</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

             {/* --- GITHUB AND OTHER PROFILES CARD --- */}
             {(profileData.socialLinks?.github || profileData.codingProfile?.hackerrank || profileData.codingProfile?.others) && (
              <div className={`col-span-1 xl:col-span-2 p-6 md:p-8 rounded-3xl border flex flex-col transition-all duration-500 hover:shadow-lg ${isDarkMode ? 'bg-[#181824]/60 border-white/5 hover:border-white/10' : 'bg-white/80 border-white shadow-lg shadow-gray-200/50 hover:border-gray-200'}`}>
                 <h4 className={`text-xs font-black mb-5 uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Other Linked Platforms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {profileData.socialLinks?.github && (
                    <div className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}>
                       <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center border shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                       </div>
                       <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                         <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>GitHub</p>
                         <p className={`text-base font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>@{profileData.socialLinks.github}</p>
                       </div>
                       <div className="flex justify-end p-2 h-full items-center">
                          <a href={`https://github.com/${profileData.socialLinks.github}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} />
                          </a>
                        </div>
                    </div>
                  )}
                  
                  {/* --- OTHER PLATFORMS --- */}
                  {profileData.codingProfile?.hackerrank && (
                     <div className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}>
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-sm border border-green-500/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          HR
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>HackerRank</p>
                          <p className={`text-base font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>@{profileData.codingProfile.hackerrank}</p>
                        </div>
                        <div className="flex justify-end p-2 h-full items-center">
                           <a href={`https://www.hackerrank.com/${profileData.codingProfile.hackerrank}`} target="_blank" rel="noopener noreferrer">
                             <ExternalLink size={18} className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-500 hover:text-green-500' : 'text-gray-400 hover:text-green-600'}`} />
                           </a>
                        </div>
                     </div>
                  )}
                  {profileData.codingProfile?.others && (
                     <div className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-white/5 hover:border-white/10' : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm'}`}>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner text-purple-500 group-hover:scale-105 transition-transform duration-300">
                          <Globe size={20} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>Other Profile</p>
                          <p className={`text-base font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>{profileData.codingProfile.others}</p>
                        </div>
                        <div className="flex justify-end p-2 h-full items-center">
                          <a href={profileData.codingProfile.others.startsWith('http') ? profileData.codingProfile.others : `https://${profileData.codingProfile.others}`} target="_blank" rel="noopener noreferrer">
                             <ExternalLink size={18} className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-500 hover:text-purple-500' : 'text-gray-400 hover:text-purple-600'}`} />
                          </a>
                        </div>
                     </div>
                  )}
                </div>

                {profileData.socialLinks?.github && (
                  <div className={`mt-6 p-6 rounded-2xl border overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                     <p className={`text-xs font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>GitHub Contribution Graph</p>
                    <div className="w-full overflow-x-auto custom-scrollbar pb-2">
                      <div className="min-w-[700px] flex justify-center mix-blend-multiply dark:mix-blend-screen">
                        <img 
                          src={`https://ghchart.rshah.org/${isDarkMode ? '818cf8' : '4f46e5'}/${profileData.socialLinks.github}`} 
                          alt={`${profileData.socialLinks.github}'s Github chart`}
                          className={`w-full h-auto max-w-full`}
                          style={{ filter: isDarkMode ? 'hue-rotate(180deg) brightness(1.2)' : 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getPercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const renderCodolioSidebar = () => (
    <div className={`rounded-xl border flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#18181b] border-white/5' : 'bg-white border-gray-200 shadow-md'}`}>

      {/* ── Header Row ── */}
      <div className={`flex justify-between items-center px-4 py-3 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <Info size={13} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
          <span className={`text-[11px] font-medium tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Public Profile</span>
          <button
            onClick={() => setIsPublicProfile(v => !v)}
            className={`w-8 h-4 rounded-full relative flex-shrink-0 transition-colors duration-300 focus:outline-none ${isPublicProfile ? 'bg-emerald-500' : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-[2px] w-3 h-3 bg-white rounded-full shadow transition-all duration-300 ${isPublicProfile ? 'right-[2px]' : 'left-[2px]'}`} />
          </button>
        </div>
        <button
          onClick={handleRefreshAll}
          disabled={isRefreshing}
          className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${isDarkMode ? 'text-amber-500 hover:text-amber-400' : 'text-orange-500 hover:text-orange-600'}`}
        >
          <svg className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
          </svg>
          Refresh Now
        </button>
      </div>

      {/* ── Profile Photo & Name ── */}
      <div className="flex flex-col items-center px-5 pt-8 pb-4">
        <div className="relative group mb-3">
          <div className={`w-[96px] h-[96px] rounded-full p-[3px] ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} shadow-sm`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img src={profileData.profilePic || fallbackAvatar} alt="Profile" className="w-full h-full object-cover"
                onError={e => { e.target.src = fallbackAvatar; }} />
            </div>
          </div>
          <button onClick={() => setIsEditing(true)}
            className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
            <Edit2 size={16} className="text-white" strokeWidth={2.5} />
          </button>
          <div className={`absolute top-0 right-0 w-7 h-7 rounded-full flex items-center justify-center border-2 ${isDarkMode ? 'bg-[#18181b] border-[#18181b]' : 'bg-white border-white'}`}>
            <button onClick={() => setIsEditing(true)} className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              <Edit2 size={13} strokeWidth={2} />
            </button>
          </div>
        </div>

        <h2 className={`text-lg font-black tracking-tight text-center leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {(profileData.firstName || profileData.lastName) ? `${profileData.firstName} ${profileData.lastName}`.trim() : profileData.username || 'User'}
        </h2>
        <p className={`text-[13px] font-bold mt-1 flex items-center gap-1 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`}>
          @{profileData.username}
          <Check size={12} strokeWidth={3} className="bg-emerald-500 text-white rounded-full p-[2px]" />
        </p>

        {/* Codolio Card Button */}
        <button onClick={() => setIsEditing(true)}
          className="mt-4 w-full py-2 rounded-lg text-[12px] font-bold text-orange-400 hover:text-orange-300 border border-orange-500/30 transition-all hover:bg-orange-500/10">
          Get your Codolio Card
        </button>

        {profileData.bio && (
          <p className={`text-[12px] text-center mt-4 leading-relaxed px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>"{profileData.bio}"</p>
        )}
      </div>

      {/* ── Social Icons ── */}
      <div className={`flex gap-3 justify-center flex-wrap px-4 pb-5 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        {[
          { show: profileData.email, href: `mailto:${profileData.email}`, icon: <Mail size={16} strokeWidth={1.5} />, title: 'Email' },
          { show: profileData.socialLinks?.linkedin, href: `https://linkedin.com/in/${profileData.socialLinks?.linkedin}`, icon: <Linkedin size={16} strokeWidth={1.5} />, title: 'LinkedIn' },
          { show: profileData.socialLinks?.twitter, href: `https://twitter.com/${profileData.socialLinks?.twitter}`, icon: <Twitter size={16} strokeWidth={1.5} />, title: 'Twitter' },
          { show: profileData.socialLinks?.resume, href: profileData.socialLinks?.resume?.startsWith('http') ? profileData.socialLinks.resume : `https://${profileData.socialLinks?.resume}`, target: '_blank', icon: <Globe size={16} strokeWidth={1.5} />, title: 'Portfolio' },
          { show: true, href: '#', target: '_blank', icon: <img src="https://codolio.com/logo.svg" className="w-4 h-4 invert opacity-70" alt="Resume" onError={(e) => e.target.style.display='none'} />, title: 'Resume' },
        ].filter(s => s.show).map((s, i) => (
          <a key={i} href={s.href} target={s.target || undefined} rel="noopener noreferrer" title={s.title}
            className={`flex items-center justify-center transition-all ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            {s.icon}
          </a>
        ))}
      </div>

      {/* ── Location / University ── */}
      {(profileData.location || profileData.university) && (
        <div className={`px-5 py-4 space-y-2.5 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          {profileData.location && (
            <div className={`flex items-center gap-2.5 text-[12px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin size={14} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} /> {profileData.location}
            </div>
          )}
          {profileData.university && (
            <div className={`flex items-center gap-2.5 text-[12px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <School size={14} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} /> <span className="truncate">{profileData.university}</span>
            </div>
          )}
        </div>
      )}

      {/* ── About Accordions ── */}
      <div className="px-3 py-3 flex-1 space-y-2">
        <p className={`text-[12px] font-bold px-2 py-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</p>

        {/* Problem Solving */}
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-[#212126]' : 'bg-gray-100'}`}>
          <button onClick={() => setIsStatsAccordionOpen(v => !v)}
            className={`w-full px-3 py-2.5 flex justify-between items-center text-[12px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Problem Solving Stats
            <div className={`p-0.5 rounded bg-white/5`}>
                <ChevronUp size={14} className={`text-gray-400 transition-transform ${isStatsAccordionOpen ? '' : 'rotate-180'}`} />
            </div>
          </button>
          {isStatsAccordionOpen && (
            <div className={`pb-2 px-1`}>
              {[
                { key: 'leetcode', label: 'LeetCode', href: `https://leetcode.com/${profileData.codingProfile?.leetcode}`,
                  img: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
                { key: 'geeksforgeeks', label: 'GeeksForGeeks', href: `https://auth.geeksforgeeks.org/user/${profileData.codingProfile?.geeksforgeeks}`,
                  img: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg' },
                { key: 'codechef', label: 'CodeChef', href: `https://www.codechef.com/users/${profileData.codingProfile?.codechef}`,
                  img: 'https://cdn.iconscout.com/icon/free/png-256/codechef-2752179-2285043.png' },
                { key: 'hackerrank', label: 'HackerRank', href: `https://www.hackerrank.com/${profileData.codingProfile?.hackerrank}`,
                  img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png' },
              ].filter(p => profileData.codingProfile?.[p.key]).map((p, i) => (
                <a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all group hover:bg-white/5`}>
                  <div className="flex items-center gap-2.5">
                    <img src={p.img} alt={p.label} className="w-4 h-4 object-contain rounded-sm bg-white" />
                    <span className={`text-[12px] font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{p.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} strokeWidth={3} className="text-emerald-500 bg-emerald-500/20 rounded-full p-[1px]" />
                    <ExternalLink size={12} className="text-gray-500 opacity-60" />
                  </div>
                </a>
              ))}
              <button onClick={() => setIsEditing(true)}
                className={`w-full flex justify-center items-center gap-1.5 mt-2 py-1.5 px-3 text-[11px] font-bold rounded-lg border border-dashed transition-all ${isDarkMode ? 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10' : 'text-orange-600 border-orange-200 hover:bg-orange-50'}`}>
                <Plus size={12} strokeWidth={3} /> Add Platform
              </button>
            </div>
          )}
        </div>

        {/* Development Stats */}
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-[#212126]' : 'bg-gray-100'}`}>
          <button onClick={() => setIsDevAccordionOpen(v => !v)}
            className={`w-full px-3 py-2.5 flex justify-between items-center text-[12px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Development Stats
            <div className={`p-0.5 rounded bg-white/5`}>
                <ChevronUp size={14} className={`text-gray-400 transition-transform ${isDevAccordionOpen ? '' : 'rotate-180'}`} />
            </div>
          </button>
          {isDevAccordionOpen && (
            <div className={`pb-2 px-1`}>
              {profileData.socialLinks?.github ? (
                <a href={`https://github.com/${profileData.socialLinks.github}`} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all group hover:bg-white/5`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </div>
                    <span className={`text-[12px] font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GitHub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} strokeWidth={3} className="text-emerald-500 bg-emerald-500/20 rounded-full p-[1px]" />
                    <ExternalLink size={12} className="text-gray-500 opacity-60" />
                  </div>
                </a>
              ) : (
                <button onClick={() => setIsEditing(true)} className={`w-full flex items-center justify-center gap-1.5 mt-2 py-1.5 px-3 text-[11px] font-bold rounded-lg border border-dashed transition-all ${isDarkMode ? 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10' : 'text-orange-600 border-orange-200 hover:bg-orange-50'}`}>
                  <Plus size={11} strokeWidth={3} /> Add GitHub
                </button>
              )}
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <p className={`text-[12px] font-bold px-2 pt-2 pb-1 flex justify-between items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Leaderboard <span className="text-[10px] font-normal text-blue-500 underline cursor-pointer">How it works ?</span>
        </p>
        <div className={`rounded-xl overflow-hidden mb-3 ${isDarkMode ? 'bg-[#212126]' : 'bg-gray-100'}`}>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-1">
                <p className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Global Rank</p>
                <div className="flex gap-1">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center cursor-pointer"><ChevronUp size={12} className="-rotate-90"/></div>
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center cursor-pointer"><ChevronUp size={12} className="rotate-90"/></div>
                </div>
            </div>
            <p className={`text-[9px] mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Based on C Score</p>
            <div className="flex items-center gap-3 mb-4">
              <Activity size={20} className="text-white" />
              <span className={`text-[26px] font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>23509</span>
            </div>
            <button className="w-full py-2 rounded-lg text-[12px] font-bold text-white transition-all bg-orange-500 hover:bg-orange-600">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer Stats ── */}
      <div className={`px-5 py-4 space-y-2.5 ${isDarkMode ? '' : 'bg-gray-50'}`}>
        {[
          { label: 'Profile Views:', value: '1' },
          { label: 'Last Refresh:', value: getTimeAgo(lastRefreshTime) },
          { label: 'Profile Visibility:', value: isPublicProfile ? 'Public' : 'Private', color: isPublicProfile ? 'text-white' : 'text-gray-500' },
        ].map((row, i) => (
          <div key={i} className={`flex justify-between items-center text-[12px] tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>{row.label}</span>
            <span className={row.color || (isDarkMode ? 'text-orange-500' : 'text-orange-600')}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCodolioDashboard = () => {
    const totalSolved = (leetcodeStats?.totalSolved || 0) + (gfgStats?.totalProblemsSolved || 0);

    /* ── Heatmap renderer ── */
    const renderHeatmap = () => {
      if (!leetcodeCalendar) return null;
      const WEEKS = 26, CELL = 12, GAP = 3;
      const today = new Date(); today.setHours(0,0,0,0);
      const start = new Date(today);
      start.setDate(start.getDate() - WEEKS * 7);
      start.setDate(start.getDate() - start.getDay());

      const dayMap = {};
      Object.entries(leetcodeCalendar).forEach(([ts, c]) => {
        const d = new Date(parseInt(ts) * 1000);
        const k = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        dayMap[k] = (dayMap[k] || 0) + c;
      });
      const maxCount = Math.max(...Object.values(leetcodeCalendar), 1);
      const color = (n, future) => {
        if (future) return 'transparent';
        if (!n) return isDarkMode ? '#2d2d31' : '#ebedf0';
        const p = n / maxCount;
        return p > .75 ? '#39d353' : p > .5 ? '#26a641' : p > .25 ? '#0e4429' : (isDarkMode ? '#003d1c' : '#9be9a8');
      };
      const weeks = []; const months = []; let prevM = -1;
      for (let w = 0; w < WEEKS; w++) {
        const days = [];
        for (let d = 0; d < 7; d++) {
          const dt = new Date(start); dt.setDate(start.getDate() + w * 7 + d);
          const k = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
          if (d === 0 && dt.getMonth() !== prevM) { months.push({ w, label: dt.toLocaleString('default', {month:'short'}) }); prevM = dt.getMonth(); }
          days.push({ dt, count: dayMap[k] || 0, future: dt > today });
        }
        weeks.push(days);
      }
      const W = WEEKS*(CELL+GAP), H = 7*(CELL+GAP)+16;
      return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',overflow:'visible'}}>
          {months.map((m,i) => <text key={i} x={m.w*(CELL+GAP)} y={9} fontSize="10" fontWeight="bold" fill={isDarkMode?'#71717a':'#9ca3af'}>{m.label}</text>)}
          {weeks.map((wk,wi) => wk.map((day,di) => (
            <rect key={`${wi}-${di}`} x={wi*(CELL+GAP)} y={di*(CELL+GAP)+12} width={CELL} height={CELL} rx="2" fill={color(day.count,day.future)}>
              {day.count>0 && <title>{day.dt.toLocaleDateString()}: {day.count} submission{day.count!==1?'s':''}</title>}
            </rect>
          )))}
        </svg>
      );
    };

    /* ── SVG Ring ── */
    const Ring = ({ segments, total, center, small=false }) => {
      const r = small ? 32 : 46, cx = small ? 36 : 52, cy = small ? 36 : 52, circ = 2 * Math.PI * r;
      let cum = 0;
      return (
        <svg viewBox={`0 0 ${cx*2} ${cy*2}`} className={`${small ? 'w-16 h-16' : 'w-24 h-24'} flex-shrink-0`} style={{transform:'rotate(-90deg)'}}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={isDarkMode?'#2d2d31':'#e5e7eb'} strokeWidth={small ? "6" : "8"}/>
          {segments.map((s,i) => {
            const pct = total > 0 ? s.v / total : 0;
            const dash = pct * circ, off = -cum * circ;
            cum += pct;
            return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.c} strokeWidth={small ? "6" : "8"} strokeDasharray={`${dash} ${circ}`} strokeDashoffset={off} strokeLinecap="round"/>;
          })}
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={small ? "18" : "24"} fontWeight="900"
            fill={isDarkMode?'#fff':'#111'} style={{transform:`rotate(90deg)`,transformOrigin:`${cx}px ${cy}px`}}>
            {center}
          </text>
        </svg>
      );
    };

    return (
      <div className="flex flex-col gap-4 w-full">

        {/* ── Row 1: Stat Cards ── */}
        <div className="flex gap-4 mb-1">
          <div className={`relative p-5 py-6 rounded-lg flex-1 flex flex-col items-center justify-center ${isDarkMode?'bg-[#18181b] border-white/5':'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-[13px] font-bold ${isDarkMode?'text-white':'text-gray-700'}`}>Total Questions</span>
                <Info size={12} className={isDarkMode?'text-gray-500':'text-gray-400'} />
            </div>
            <p className={`text-[42px] font-black tracking-tighter leading-none ${isDarkMode?'text-white':'text-gray-900'}`}>{totalSolved || 0}</p>
          </div>
          <div className={`relative p-5 py-6 rounded-lg flex-1 flex flex-col items-center justify-center ${isDarkMode?'bg-[#18181b] border-white/5':'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-1.5 mb-2">
                <span className={`text-[13px] font-bold ${isDarkMode?'text-white':'text-gray-700'}`}>Total Active Days</span>
                <Info size={12} className={isDarkMode?'text-gray-500':'text-gray-400'} />
            </div>
            <p className={`text-[42px] font-black tracking-tighter leading-none ${isDarkMode?'text-white':'text-gray-900'}`}>{totalActiveDays !== null ? totalActiveDays : 0}</p>
          </div>
        </div>

        {/* ── Row 2: Heatmap + Badges ── */}
        <div className={`p-6 rounded-lg ${isDarkMode?'bg-[#18181b]':'bg-white shadow-sm'}`}>
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5"><span className="text-[10px] font-bold text-gray-500">Submissions</span> <strong className="text-[10px] text-white font-black">{leetcodeStats?.totalSolved || 0}</strong></div>
              <div className="flex items-center gap-1.5"><span className="text-[10px] font-bold text-gray-500">Max.Streak</span> <strong className="text-[10px] text-white font-black">18</strong></div>
              <div className="flex items-center gap-1.5"><span className="text-[10px] font-bold text-gray-500">Current.Streak</span> <strong className="text-[10px] text-white font-black">18</strong></div>
            </div>
            <select className={`text-[11px] font-bold px-2 py-1 rounded bg-[#212126] text-gray-300 outline-none border-none`}>
                <option>Current</option>
            </select>
          </div>
          {leetcodeCalendar ? (
            <div className="overflow-x-auto mb-8" style={{scrollbarWidth:'none'}}>
              <div style={{minWidth:'600px'}}>{renderHeatmap()}</div>
            </div>
          ) : (
            <div className="py-10 text-center text-[12px] opacity-50">Loading activity...</div>
          )}

          {/* Badges Section Inside Heatmap Card */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5 relative">
            <div className="w-14 h-16 relative flex items-center justify-center" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: '#fb923c'}}>
                <div className="absolute inset-[2px] bg-[#ffedd5] flex flex-col items-center justify-center rounded text-[#ea580c]" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                    <Database size={16} strokeWidth={2.5}/>
                    <span className="text-[8px] font-black uppercase mt-1">sql</span>
                    <span className="text-[6px] font-black">★</span>
                </div>
            </div>
            <div className="w-16 h-[72px] relative flex items-center justify-center bg-white" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="flex flex-col items-center justify-center text-gray-900">
                    <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" className="w-5 h-5 object-contain" alt="Java"/>
                    <span className="text-[9px] font-black mt-1">Java</span>
                    <span className="text-[8px] font-black text-gray-400">★★★</span>
                </div>
            </div>
            <div className="w-[72px] h-[52px] rounded-full relative flex items-center justify-center overflow-hidden border-2 border-green-500 bg-[#111118]">
                <div className="font-bold text-[14px] text-green-500 italic">Spring</div>
            </div>
            <div className="w-[64px] h-[36px] rounded-[50%] relative flex items-center justify-center border-2 border-blue-500 bg-[#111118]">
                <b className="text-[12px] text-blue-500">SQL</b>
            </div>
          </div>
          <p className="text-center mt-6"><button className="text-[12px] text-blue-500 font-bold underline">show more</button></p>
        </div>


        {/* ── Row 3: DSA Topic Analysis ── */}
        <div className={`p-6 rounded-lg ${isDarkMode?'bg-[#18181b]':'bg-white shadow-sm'}`}>
            <h3 className={`text-[16px] font-bold mb-6 ${isDarkMode?'text-white':'text-gray-900'}`}>DSA Topic Analysis</h3>
            {leetcodeTopics.length > 0 ? (
              <>
                <div className="space-y-3 px-2">
                  {leetcodeTopics.slice(0, 10).map((t, i) => {
                    const max = leetcodeTopics[0]?.problemsSolved || 1;
                    const pct = Math.max((t.problemsSolved / max) * 100, 5);
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <span className={`text-[11px] w-[130px] text-right flex-shrink-0 ${isDarkMode?'text-gray-300':'text-gray-500'}`}>{t.tagName}</span>
                        <div className="flex-1 h-3 rounded-sm flex items-center">
                          <div className="h-full bg-[#2563eb] rounded-sm relative" style={{width:`${pct}%`}}>
                            <span className="absolute right-[-24px] top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">{t.problemsSolved}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {leetcodeTopics.length > 10 && (
                  <p className="text-center mt-6">
                    <button className="text-[12px] text-blue-500 font-bold underline">show more</button>
                  </p>
                )}
              </>
            ) : <div className="py-8 text-center text-sm opacity-50">Loading topics...</div>}
        </div>

        {/* ── Row 4: Problems Solved ── */}
        <div className={`p-6 rounded-lg ${isDarkMode?'bg-[#18181b]':'bg-white shadow-sm'}`}>
            <h3 className={`text-[16px] font-bold mb-8 text-center ${isDarkMode?'text-white':'text-gray-900'}`}>Problems Solved</h3>

            <div className="space-y-8 max-w-[400px] mx-auto">
                {/* Fundamentals */}
                <div>
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <h4 className={`text-[12px] font-bold text-white`}>Fundamentals</h4>
                        <Info size={12} className="text-gray-500"/>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <Ring segments={[
                            {v: gfgStats?.easy||0, c:'#eab308'},
                            {v: gfgStats?.medium||0, c:'#22c55e'},
                            {v: gfgStats?.hard||0, c:'#ffffff'}
                        ]} total={gfgStats?.totalProblemsSolved||0} center={gfgStats?.totalProblemsSolved||0} small={false}/>
                        <div className="w-[180px] space-y-2">
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#4ade80]">GFG</span>
                                <span className="text-[11px] font-bold text-white">{gfgStats?.totalProblemsSolved||0}</span>
                            </div>
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#eab308]">HackerRank</span>
                                <span className="text-[11px] font-bold text-white">26</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 my-4"/>

                {/* DSA */}
                <div>
                    <div className="text-center mb-5">
                        <h4 className={`text-[12px] font-bold text-white`}>DSA</h4>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <Ring segments={[
                            {v:leetcodeStats?.easySolved||0, c:'#eab308'},
                            {v:leetcodeStats?.mediumSolved||0, c:'#22c55e'},
                            {v:leetcodeStats?.hardSolved||0, c:'#ef4444'}
                        ]} total={leetcodeStats?.totalSolved||0} center={leetcodeStats?.totalSolved||0} small={false}/>
                        <div className="w-[180px] space-y-2">
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#4ade80]">Easy</span>
                                <span className="text-[11px] font-bold text-white">{leetcodeStats?.easySolved||0}</span>
                            </div>
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#eab308]">Medium</span>
                                <span className="text-[11px] font-bold text-white">{leetcodeStats?.mediumSolved||0}</span>
                            </div>
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#ef4444]">Hard</span>
                                <span className="text-[11px] font-bold text-white">{leetcodeStats?.hardSolved||0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 my-4"/>

                {/* Competitive Programming */}
                <div>
                    <div className="text-center mb-5">
                        <h4 className={`text-[12px] font-bold text-white`}>Competitive Programming</h4>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                         <Ring segments={[{v:codeforcesStats?.rating||0, c:'#4ade80'}]}
                            total={Math.max(codeforcesStats?.maxRating||codeforcesStats?.rating||0,1)} center={codeforcesStats?.rating||0} small={false}/>
                        <div className="w-[180px] space-y-2">
                            <div className="flex justify-between px-3 py-2 bg-[#212126] rounded">
                                <span className="text-[11px] font-bold text-[#4ade80]">Codechef</span>
                                <span className="text-[11px] font-bold text-white">32</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className={`min-h-[calc(100vh-4rem)] w-full font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0d0d14] text-white' : 'bg-[#f4f4f8] text-slate-900'}`}>
      <div className="max-w-[1400px] mx-auto px-4 py-6 md:px-6 md:py-8">

        {isEditing ? (
          /* ====== EDIT MODE ====== */
          <div className="animate-fadeIn">
            {/* Edit Header */}
            <div className={`flex items-center justify-between mb-6 p-4 rounded-2xl border ${isDarkMode ? 'bg-[#141419] border-white/5' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={cancelEdit}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
                  title="Back to Profile"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                </button>
                <div>
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Edit Profile</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Changes are saved when you click "Save"</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={cancelEdit}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                >
                  Save Profile
                </button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              {renderProfileDetailsTab()}
            </div>
          </div>
        ) : (
          /* ====== VIEW / DASHBOARD MODE ====== */
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* Left Sidebar */}
            <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-6">
              {renderCodolioSidebar()}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-5">
              {/* Edit Profile Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    isDarkMode
                      ? 'border-white/10 bg-[#141419] text-gray-300 hover:text-white hover:bg-white/10'
                      : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50'
                  }`}
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                  Edit Profile
                </button>
              </div>
              {renderCodolioDashboard()}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

