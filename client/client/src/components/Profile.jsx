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
  Award,
  Star
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
  const [activeTab, setActiveTab] = useState(urlTab); // details, milestones, progress
  const [tabHistory, setTabHistory] = useState([]); // internal tab history for Back button

  // Sync state if URL changes directly
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Navigate to a tab and push current tab onto history stack
  const goToTab = (tab) => {
    if (tab === activeTab) return;
    setTabHistory(prev => [...prev, activeTab]);
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Go back: pop history or navigate away
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
  const [isStatsOpen, setIsStatsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null | 'checking' | 'available' | 'taken'
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));

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
      fetchLeetcodeStats(lc);
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
      // Using an unofficial geeksforgeeks API wrapper
      const response = await axios.get(`https://geeks-for-geeks-api.vercel.app/${username}`, { timeout: 8000 });
      // The API returns an object. If invalid user, it usually throws 500 or returns empty data.
      if (!response.data || Object.keys(response.data).length === 0 || response.data.error) {
        throw new Error("Invalid username");
      }
      setGfgStats(response.data);
    } catch (error) {
      console.error("GeeksForGeeks API failed:", error.message);
      setGfgStats(null);
      setGfgError(true);
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
      {/* Profile Photo Section */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Photo</h3>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button onClick={cancelEdit} className="px-4 py-1.5 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSaveProfile} className="px-4 py-1.5 text-sm font-medium rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <Edit2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex-shrink-0">
            <img 
              src={profileData.profilePic || fallbackAvatar} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : ''}`} 
              onError={(e) => { e.target.src = fallbackAvatar; }}
            />
            {(isUploading) && (
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 cursor-pointer hover:bg-black/60 transition-colors">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mb-1"></div>
                ) : (
                  <>
                    <Camera size={24} className="text-white mb-1" />
                    <span className="text-white text-xs font-medium">Upload</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            )}
            {/* Show camera upload only in edit mode */}
            {isEditing && !isUploading && (
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 hover:bg-black/50 cursor-pointer transition-colors group">
                <Camera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity mb-1" />
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <h4 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>Upload a Picture</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">PNG, JPG, JPEG (Max. 1MB)</p>
              <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Not ready with a photo? Use an avatar instead</span>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${num}&backgroundColor=b6e3f4`;
                  const isSelected = (editForm.profilePic || profileData.profilePic) === avatarUrl;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleAvatarSelect(avatarUrl)}
                      title="Use this avatar"
                      className={`w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform flex items-center justify-center overflow-hidden border-2 ${
                        isSelected
                          ? 'border-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-600'
                          : 'border-transparent hover:border-indigo-300'
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
      
      
      {/* Personal Details Section */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name *</label>
            <input
              type="text"
              value={isEditing ? editForm.firstName : profileData.firstName}
              onChange={(e) => isEditing && handleEditChange('firstName', e.target.value)}
              disabled={!isEditing}
              placeholder="e.g. John"
              className={`w-full p-2.5 rounded-xl border transition-colors ${
                isEditing 
                  ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                  : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
              }`}
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name *</label>
            <input
              type="text"
              value={isEditing ? editForm.lastName : profileData.lastName}
              onChange={(e) => isEditing && handleEditChange('lastName', e.target.value)}
              disabled={!isEditing}
              placeholder="e.g. Doe"
              className={`w-full p-2.5 rounded-xl border transition-colors ${
                isEditing 
                  ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                  : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
            <input
              type="email"
              value={profileData.email}
              disabled={true}
              className={`w-full p-2.5 rounded-xl border transition-colors ${
                isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Username field */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
              {usernameStatus === 'available' && <span className="ml-2 text-xs text-green-500 font-normal">✓ Available</span>}
              {usernameStatus === 'taken' && <span className="ml-2 text-xs text-red-500 font-normal">✗ Already taken</span>}
              {usernameStatus === 'checking' && <span className="ml-2 text-xs text-gray-400 font-normal">Checking...</span>}
            </label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 font-medium ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
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
                className={`w-full pl-7 pr-3 py-2.5 rounded-xl border transition-colors ${
                  isEditing
                    ? `${
                        usernameStatus === 'available' ? 'border-green-400 dark:border-green-600' :
                        usernameStatus === 'taken' ? 'border-red-400 dark:border-red-600' :
                        isDarkMode ? 'border-gray-700' : 'border-gray-300'
                      } ${isDarkMode ? 'bg-gray-800/50 text-white focus:ring-1' : 'bg-white text-gray-900'}`
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              />
            </div>
            {isEditing && <p className="text-xs text-gray-400">Only lowercase letters, numbers, dots and underscores allowed</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mobile Number</label>
            <div className="flex gap-2">
              {/* Country code dropdown */}
              <select
                value={isEditing ? editForm.countryCode : profileData.countryCode}
                onChange={(e) => isEditing && handleEditChange('countryCode', e.target.value)}
                disabled={!isEditing}
                style={{ maxWidth: '110px' }}
                className={`w-28 py-2.5 px-2 rounded-xl border transition-colors text-xs ${
                  isEditing
                    ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500')
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} {c.name}</option>
                ))}
              </select>
              {/* Phone number input */}
              <input
                type="tel"
                value={isEditing ? editForm.mobileNumber : profileData.mobileNumber}
                onChange={(e) => isEditing && handleEditChange('mobileNumber', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g. 99999 99999"
                className={`flex-1 p-2.5 rounded-xl border transition-colors ${
                  isEditing
                    ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5" ref={countryDropdownRef}>
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Country</label>
            {isEditing ? (
              <div className="relative">
                <div
                  className={`w-full p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                    isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  onClick={() => setShowCountryDropdown(v => !v)}
                >
                  <span className={editForm.location ? '' : 'text-gray-400'}>
                    {editForm.location || 'Select a country...'}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                {showCountryDropdown && (
                  <div className={`absolute z-50 w-full mt-1 rounded-xl border shadow-xl max-h-60 overflow-auto ${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <div className="sticky top-0 p-2">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <Search size={14} className="text-gray-400" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={e => setCountrySearch(e.target.value)}
                          className={`flex-1 bg-transparent text-sm outline-none ${
                            isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                    {COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map(country => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => {
                          handleEditChange('location', country);
                          setShowCountryDropdown(false);
                          setCountrySearch('');
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          editForm.location === country
                            ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700')
                            : (isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-50')
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                value={profileData.location}
                disabled
                className={`w-full p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Education Year</label>
            <select
              value={isEditing ? editForm.educationYear : profileData.educationYear}
              onChange={(e) => isEditing && handleEditChange('educationYear', e.target.value)}
              disabled={!isEditing}
              className={`w-full p-2.5 rounded-xl border transition-colors appearance-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                  : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
              }`}
            >
              <option value="">Select Year...</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio / Headline</label>
            <textarea
              value={isEditing ? editForm.bio : profileData.bio}
              onChange={(e) => isEditing && handleEditChange('bio', e.target.value)}
              disabled={!isEditing}
              placeholder="A brief summary of your skills and goals..."
              rows={3}
              className={`w-full p-2.5 rounded-xl border transition-colors resize-none ${
                isEditing 
                  ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                  : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
              }`}
            />
          </div>
        </div>
      </div>
      
      {/* Social and Coding Profiles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Social Links */}
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Social Links</h3>
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>GitHub Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">github.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.github : profileData.socialLinks.github}
                  onChange={(e) => isEditing && handleEditChange('github', e.target.value, true)} // The 'true' flag means it's a social link, but we'll need to update it since it's nested
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[95px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn Profile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">linkedin.com/in/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.linkedin : profileData.socialLinks.linkedin}
                  onChange={(e) => isEditing && handleEditChange('linkedin', e.target.value, true)}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[118px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Twitter / X</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">twitter.com/</span>
                </div>
                <input
                  type="text"
                  value={isEditing ? editForm.socialLinks.twitter : profileData.socialLinks.twitter}
                  onChange={(e) => isEditing && handleEditChange('twitter', e.target.value, true)}
                  disabled={!isEditing}
                  placeholder="username"
                  className={`w-full pl-[95px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Resume / Portfolio Link</label>
              <input
                type="url"
                value={isEditing ? editForm.socialLinks.resume : profileData.socialLinks.resume}
                onChange={(e) => isEditing && handleEditChange('resume', e.target.value, true)}
                disabled={!isEditing}
                placeholder="https://..."
                className={`w-full p-2.5 rounded-xl border transition-colors ${
                  isEditing 
                    ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Other Links</label>
              <input
                type="text"
                value={isEditing ? editForm.socialLinks.others : profileData.socialLinks.others}
                onChange={(e) => isEditing && handleEditChange('others', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Comma separated links"
                className={`w-full p-2.5 rounded-xl border transition-colors ${
                  isEditing 
                    ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              />
            </div>

          </div>
        </div>

        {/* Coding Profiles */}
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coding Profiles</h3>
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>LeetCode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm font-mono text-yellow-500 mr-2">λ</span>
                  <span className="text-gray-500 text-sm">leetcode.com/</span>
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
                  className={`w-full pl-[118px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Codeforces</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm font-bold text-red-500 mr-2">ııll</span>
                  <span className="text-gray-500 text-sm">codeforces.com/profile/</span>
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
                  className={`w-full pl-[185px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>HackerRank</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <span className="text-gray-500 text-sm font-bold text-green-500 mr-2">H</span>
                  <span className="text-gray-500 text-sm">hackerrank.com/</span>
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
                  className={`w-full pl-[135px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>GeeksForGeeks</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm font-bold text-green-600 mr-2">G</span>
                  <span className="text-gray-500 text-sm">auth.geeksforgeeks.org/user/</span>
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
                  className={`w-full pl-[215px] p-2.5 rounded-xl border transition-colors ${
                    isEditing 
                      ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                      : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Other Profiles</label>
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
                className={`w-full p-2.5 rounded-xl border transition-colors ${
                  isEditing 
                    ? (isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                    : (isDarkMode ? 'bg-gray-800/20 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed')
                }`}
              />
            </div>

          </div>
        </div>

      </div>
      
      {/* Work Experience Section */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Work Experience</h3>
        
        <div className="flex flex-col gap-6">
          {(isEditing ? editForm.workExperience : profileData.workExperience).map((exp, index) => (
            <div key={index} className={`relative p-5 rounded-xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50/50 border-gray-200'} transition-all`}>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('workExperience', index)}
                  className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Experience"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'company', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. Google"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location Mode</label>
                  <select
                    value={exp.mode}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'mode', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full p-2.5 rounded-xl border transition-colors appearance-none ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  >
                    <option value="">Select Mode...</option>
                    <option value="On-Site">On-Site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'role', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. SDE Intern"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'duration', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. June 2023 - Aug 2023"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => isEditing && handleArrayChange('workExperience', index, 'description', e.target.value)}
                    disabled={!isEditing}
                    placeholder="What did you build? What was your impact?"
                    rows={2}
                    className={`w-full p-2.5 rounded-xl border transition-colors resize-none ${
                       isEditing 
                         ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                         : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}

          {(!profileData.workExperience?.length && !isEditing) && (
             <div className="text-center py-6 text-sm text-gray-400 dark:text-gray-500">
               No work experience added yet. Click edit to add your roles.
             </div>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => handleAddArrayItem('workExperience', { company: '', mode: '', role: '', duration: '', description: '' })}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed transition-colors text-sm font-medium ${
                isDarkMode 
                  ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <Plus size={16} /> Add Experience
            </button>
          )}
        </div>
      </div>
      {/* Skills Section */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(isEditing ? editForm.skills : profileData.skills).map((skill, index) => (
              <span 
                key={index} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}
              >
                {skill}
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveArrayItem('skills', index)}
                    className="hover:text-red-500 ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
            {(!profileData.skills?.length && !isEditing) && (
               <span className="text-sm text-gray-400 dark:text-gray-500 italic">No skills added yet.</span>
            )}
          </div>
          
          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                id="newSkillInput"
                placeholder="e.g. React, Node.js, Python..."
                className={`flex-1 p-2.5 rounded-xl border transition-colors ${
                  isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
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
                className="px-4 py-2.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors text-sm font-medium"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contests Section */}
      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
        <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coding Contests</h3>
        
        <div className="flex flex-col gap-6">
          {(isEditing ? editForm.contests : profileData.contests).map((contest, index) => (
            <div key={index} className={`relative p-5 rounded-xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50/50 border-gray-200'} transition-all`}>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem('contests', index)}
                  className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Contest"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Platform / Contest Name</label>
                  <input
                    type="text"
                    value={contest.platform}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'platform', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. LeetCode Weekly Contest 350"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Rank</label>
                  <input
                    type="text"
                    value={contest.rank}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'rank', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. 145"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Participants</label>
                  <input
                    type="text"
                    value={contest.totalParticipants}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'totalParticipants', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g. 25000"
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Certificate / Proof URL</label>
                  <input
                    type="url"
                    value={contest.url}
                    onChange={(e) => isEditing && handleArrayChange('contests', index, 'url', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://..."
                    className={`w-full p-2.5 rounded-xl border transition-colors ${
                      isEditing 
                        ? (isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500')
                        : (isDarkMode ? 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed' : 'bg-gray-100/50 border-gray-200 text-gray-500 cursor-not-allowed')
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}

          {(!profileData.contests?.length && !isEditing) && (
             <div className="text-center py-6 text-sm text-gray-400 dark:text-gray-500">
               No contest achievements added yet.
             </div>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => handleAddArrayItem('contests', { platform: '', rank: '', totalParticipants: '', url: '' })}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed transition-colors text-sm font-medium ${
                isDarkMode 
                  ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <Plus size={16} /> Add Contest
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderMilestonesTab = () => {
    const MILESTONE_TYPES = [
      { value: 'award', label: 'Award', color: 'text-yellow-500', bg: isDarkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200' },
      { value: 'certification', label: 'Certification', color: 'text-blue-500', bg: isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200' },
      { value: 'project', label: 'Project', color: 'text-green-500', bg: isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200' },
      { value: 'other', label: 'Other', color: 'text-purple-500', bg: isDarkMode ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200' },
    ];
    const getTypeStyle = (type) => MILESTONE_TYPES.find(t => t.value === type) || MILESTONE_TYPES[3];
    const milestones = isEditing ? editForm.milestones : profileData.milestones;

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Milestones</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Awards, certifications, and notable achievements</p>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button onClick={cancelEdit} className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Cancel</button>
                <button onClick={handleSaveProfile} className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition-all">Save</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <Edit2 size={18} />
              </button>
            )}
          </div>

          {/* Milestones list */}
          <div className="flex flex-col gap-4">
            {milestones.map((milestone, index) => {
              const typeStyle = getTypeStyle(milestone.type);
              return (
                <div key={index} className={`relative p-5 rounded-xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50/50 border-gray-200'}`}>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('milestones', index)}
                      className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title *</label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => handleArrayChange('milestones', index, 'title', e.target.value)}
                          placeholder="e.g. Best Project Award"
                          className={`w-full p-2.5 rounded-xl border transition-colors ${isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                        <input
                          type="month"
                          value={milestone.date}
                          onChange={(e) => handleArrayChange('milestones', index, 'date', e.target.value)}
                          className={`w-full p-2.5 rounded-xl border transition-colors ${isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                        <div className="flex gap-2 flex-wrap">
                          {MILESTONE_TYPES.map(t => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => handleArrayChange('milestones', index, 'type', t.value)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                milestone.type === t.value
                                  ? `${t.bg} ${t.color} scale-105`
                                  : (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                        <textarea
                          value={milestone.description}
                          onChange={(e) => handleArrayChange('milestones', index, 'description', e.target.value)}
                          placeholder="Brief description of this achievement..."
                          rows={2}
                          className={`w-full p-2.5 rounded-xl border resize-none transition-colors ${isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-start">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${typeStyle.bg}`}>
                        <Star size={18} className={typeStyle.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{milestone.title || 'Untitled'}</h4>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeStyle.bg} ${typeStyle.color}`}>{getTypeStyle(milestone.type).label}</span>
                        </div>
                        {milestone.date && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                            <Clock size={11} /> {new Date(milestone.date + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </p>
                        )}
                        {milestone.description && <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{milestone.description}</p>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {(!milestones.length && !isEditing) && (
              <div className="text-center py-12">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Trophy size={28} className="text-gray-400" />
                </div>
                <p className={`text-base font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No milestones yet</p>
                <p className="text-sm text-gray-400 mb-4">Add your awards, certifications and achievements</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-500/20 transition-colors"
                >
                  + Add Milestone
                </button>
              </div>
            )}

            {isEditing && (
              <button
                type="button"
                onClick={() => handleAddArrayItem('milestones', { title: '', description: '', date: '', type: 'other' })}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed transition-colors text-sm font-medium ${
                  isDarkMode
                    ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/50'
                    : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <Plus size={16} /> Add Milestone
              </button>
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
    // Note: Codeforces API doesn't return total solved in user.info directly, usually needs user.status. We'll show what we have.

    return (
      <div className={`p-4 md:p-6 rounded-2xl border ${isDarkMode ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-100'} shadow-sm min-h-[400px] flex flex-col gap-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h3 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Coding Overview</h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your unified competitive programming and open-source dashboard.</p>
          </div>
          {hasAnyProfile && (
            <div className={`px-5 py-2.5 rounded-xl border flex items-center gap-3 ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
              <div className="flex flex-col">
                <span className={`text-xs font-semibold tracking-wider uppercase ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Global Solved</span>
                <span className={`text-2xl font-bold leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                   {globalSolved > 0 ? globalSolved.toLocaleString() : '-'}
                </span>
              </div>
              <Trophy size={24} className={isDarkMode ? 'text-indigo-400' : 'text-indigo-500'} />
            </div>
          )}
        </div>

        {!hasAnyProfile ? (
          <div className={`py-16 text-center rounded-2xl border border-dashed flex flex-col items-center justify-center ${isDarkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/50'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <svg className="w-8 h-8 opacity-50 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No Tracked Progress Yet</p>
            <p className={`text-sm max-w-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Link your GitHub, LeetCode, Codeforces, and GeeksForGeeks profiles in the Details tab to generate your unified dashboard.</p>
            <button 
              onClick={() => goToTab('details')}
              className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
            >
              Link Profiles Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* --- LEETCODE CARD --- */}
            {profileData.codingProfile?.leetcode && (
              <div className={`p-5 rounded-2xl border flex flex-col transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 hover:border-yellow-500/30' : 'bg-white border-gray-200 hover:border-yellow-300'}`}>
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 shadow-inner">
                      <span className="text-yellow-500 font-mono font-bold text-xl leading-none">λ</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LeetCode</h4>
                      <a href={`https://leetcode.com/${profileData.codingProfile.leetcode}`} target="_blank" rel="noopener noreferrer" className={`text-xs hover:underline flex items-center gap-1 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-500 hover:text-yellow-600'}`}>
                        @{profileData.codingProfile.leetcode} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  {leetcodeStats && leetcodeStats.ranking && (
                     <div className="text-right">
                       <span className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Global Rank</span>
                       <div className={`text-sm font-semibold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>#{leetcodeStats.ranking.toLocaleString()}</div>
                     </div>
                  )}
                </div>

                {leetcodeError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={24} className="mb-2 opacity-80" />
                    <p className="text-sm font-medium text-center">Failed to load LeetCode stats.</p>
                    <p className="text-xs opacity-70 mt-1">Check username or try again later.</p>
                  </div>
                ) : !leetcodeStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className={`col-span-2 sm:col-span-1 p-4 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                       <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Total Solved</span>
                       <div className="flex items-baseline gap-1">
                         <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leetcodeStats.totalSolved}</span>
                         <span className="text-xs font-medium text-gray-400">/{leetcodeStats.totalQuestions}</span>
                       </div>
                       <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-3 overflow-hidden">
                         <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}></div>
                       </div>
                    </div>
                    
                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 justify-center">
                       <div className={`flex items-center justify-between p-2.5 rounded-lg border ${isDarkMode ? 'bg-gray-800/40 border-teal-500/20' : 'bg-teal-50/50 border-teal-100'}`}>
                         <span className="text-xs tracking-wide font-semibold text-teal-500">Easy</span>
                         <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{leetcodeStats.easySolved} <span className="text-gray-400 font-normal">/{leetcodeStats.totalEasy || 800}</span></span>
                       </div>
                       <div className={`flex items-center justify-between p-2.5 rounded-lg border ${isDarkMode ? 'bg-gray-800/40 border-amber-500/20' : 'bg-amber-50/50 border-amber-100'}`}>
                         <span className="text-xs tracking-wide font-semibold text-amber-500">Med</span>
                         <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{leetcodeStats.mediumSolved} <span className="text-gray-400 font-normal">/{leetcodeStats.totalMedium || 1700}</span></span>
                       </div>
                       <div className={`flex items-center justify-between p-2.5 rounded-lg border ${isDarkMode ? 'bg-gray-800/40 border-rose-500/20' : 'bg-rose-50/50 border-rose-100'}`}>
                         <span className="text-xs tracking-wide font-semibold text-rose-500">Hard</span>
                         <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{leetcodeStats.hardSolved} <span className="text-gray-400 font-normal">/{leetcodeStats.totalHard || 800}</span></span>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* --- CODEFORCES CARD --- */}
            {profileData.codingProfile?.codeforces && (
              <div className={`p-5 rounded-2xl border flex flex-col transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner">
                      <span className="text-blue-500 font-bold text-lg leading-none">CF</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Codeforces</h4>
                      <a href={`https://codeforces.com/profile/${profileData.codingProfile.codeforces}`} target="_blank" rel="noopener noreferrer" className={`text-xs hover:underline flex items-center gap-1 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'}`}>
                        @{profileData.codingProfile.codeforces} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  {codeforcesStats && codeforcesStats.maxRating && (
                     <div className="text-right">
                       <span className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Max Rating</span>
                       <div className={`text-sm font-bold ${getCodeforcesColor(codeforcesStats.maxRating)}`}>{codeforcesStats.maxRating}</div>
                     </div>
                  )}
                </div>

                {codeforcesError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={24} className="mb-2 opacity-80" />
                    <p className="text-sm font-medium text-center">Failed to load Codeforces stats.</p>
                    <p className="text-xs opacity-70 mt-1">Check username or connection.</p>
                  </div>
                ) : !codeforcesStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 gap-4">
                     <div className={`p-5 flex-1 rounded-xl border flex flex-col items-center justify-center text-center relative overflow-hidden ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                        <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${getCodeforcesColor(codeforcesStats.rating)}`}>
                          {getCodeforcesRankLabel(codeforcesStats.rating)}
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`text-4xl font-black ${getCodeforcesColor(codeforcesStats.rating)}`}>
                            {codeforcesStats.rating || 0}
                          </span>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 font-medium">
                          Current Rating
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded-lg border text-center ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-gray-200'}`}>
                          <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{codeforcesStats.contribution || 0}</div>
                          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-0.5">Contribution</div>
                        </div>
                        <div className={`p-3 rounded-lg border text-center ${isDarkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white border-gray-200'}`}>
                          <div className={`text-sm font-bold capitalize ${getCodeforcesColor(codeforcesStats.maxRating)}`}>{codeforcesStats.maxRank || 'Unrated'}</div>
                          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-0.5">Max Rank</div>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* --- GEEKSFORGEEKS CARD --- */}
            {profileData.codingProfile?.geeksforgeeks && (
              <div className={`p-5 rounded-2xl border flex flex-col transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 hover:border-emerald-500/30' : 'bg-white border-gray-200 hover:border-emerald-300'}`}>
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                      <span className="text-emerald-600 font-bold text-sm leading-none">GFG</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GeeksForGeeks</h4>
                      <a href={`https://auth.geeksforgeeks.org/user/${profileData.codingProfile.geeksforgeeks}`} target="_blank" rel="noopener noreferrer" className={`text-xs hover:underline flex items-center gap-1 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}>
                        @{profileData.codingProfile.geeksforgeeks} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  {gfgStats && gfgStats.totalProblemsSolved && (
                     <div className="text-right">
                       <span className={`text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Solved</span>
                       <div className={`text-sm font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{gfgStats.totalProblemsSolved}</div>
                     </div>
                  )}
                </div>

                {gfgError ? (
                  <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed ${isDarkMode ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-red-200 bg-red-50 text-red-600'}`}>
                    <AlertTriangle size={24} className="mb-2 opacity-80" />
                    <p className="text-sm font-medium text-center">Failed to load GFG stats.</p>
                    <p className="text-xs opacity-70 mt-1">Check username framing.</p>
                  </div>
                ) : !gfgStats ? (
                  <div className="flex-1 flex items-center justify-center min-h-[160px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`col-span-1 p-4 rounded-xl border flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Overall Score</span>
                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{gfgStats.codingScore || 0}</span>
                      </div>
                      <div className={`col-span-1 p-4 rounded-xl border flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">Institute Rank</span>
                        <span className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>#{gfgStats.instituteRank || '-'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-1 justify-end">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 pl-1">Difficulty Breakdown</div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 w-full mb-1">
                        {/* Assuming gfgStats gives breakdown. The API structure varies, but let's assume standard keys or safe fallbacks */}
                        <div style={{ width: `${((gfgStats.easy || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-teal-400 h-full" title={`Easy: ${gfgStats.easy || 0}`}></div>
                        <div style={{ width: `${((gfgStats.medium || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-amber-400 h-full" title={`Medium: ${gfgStats.medium || 0}`}></div>
                        <div style={{ width: `${((gfgStats.hard || 0) / gfgStats.totalProblemsSolved) * 100}%` }} className="bg-rose-500 h-full" title={`Hard: ${gfgStats.hard || 0}`}></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
                        <span className="text-teal-500">{gfgStats.easy || 0} Easy</span>
                        <span className="text-amber-500">{gfgStats.medium || 0} Med</span>
                        <span className="text-rose-500">{gfgStats.hard || 0} Hard</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

             {/* --- GITHUB CARD --- */}
             {(profileData.socialLinks?.github || profileData.codingProfile?.hackerrank || profileData.codingProfile?.others) && (
              <div className={`col-span-1 xl:col-span-2 p-5 rounded-2xl border flex flex-col transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                 <h4 className={`text-sm font-semibold mb-3 uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Other Linked Profiles</h4>
                <div className="flex flex-col md:flex-row gap-4">
                  {profileData.socialLinks?.github && (
                    <div className={`flex items-center gap-3 p-3 rounded-xl border flex-1 transition-all ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                       <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center border shadow-inner">
                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                       </div>
                       <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                         <p className={`text-[10px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>GitHub</p>
                         <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>@{profileData.socialLinks.github}</p>
                       </div>
                       <div className="flex justify-end p-2 h-full items-center">
                          <a href={`https://github.com/${profileData.socialLinks.github}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          </a>
                        </div>
                    </div>
                  )}
                  
                  {/* --- OTHER PLATFORMS --- */}
                  {profileData.codingProfile?.hackerrank && (
                     <div className={`flex items-center gap-3 p-3 rounded-xl border flex-1 transition-all ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs border border-green-500/20 shadow-inner">
                          HR
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                          <p className={`text-[10px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>HackerRank</p>
                          <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>@{profileData.codingProfile.hackerrank}</p>
                        </div>
                        <div className="flex justify-end p-2 h-full items-center">
                           <a href={`https://www.hackerrank.com/${profileData.codingProfile.hackerrank}`} target="_blank" rel="noopener noreferrer">
                             <ExternalLink size={16} className={`hover:text-green-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                           </a>
                        </div>
                     </div>
                  )}
                  {profileData.codingProfile?.others && (
                     <div className={`flex items-center gap-3 p-3 rounded-xl border flex-1 transition-all ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner text-purple-500">
                          <Globe size={16} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center h-full">
                          <p className={`text-[10px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} m-0`}>Other Profile</p>
                          <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} m-0 leading-tight`}>{profileData.codingProfile.others}</p>
                        </div>
                        <div className="flex justify-end p-2 h-full items-center">
                          <a href={profileData.codingProfile.others.startsWith('http') ? profileData.codingProfile.others : `https://${profileData.codingProfile.others}`} target="_blank" rel="noopener noreferrer">
                             <ExternalLink size={16} className={`hover:text-purple-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          </a>
                        </div>
                     </div>
                  )}
                </div>

                {profileData.socialLinks?.github && (
                  <div className={`mt-4 p-4 rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                     <p className={`text-[10px] font-medium uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>GitHub Contribution Graph</p>
                    <div className="w-full overflow-x-auto custom-scrollbar">
                      <div className="min-w-[700px] flex justify-center">
                        <img 
                          src={`https://ghchart.rshah.org/${isDarkMode ? '6366f1' : '4f46e5'}/${profileData.socialLinks.github}`} 
                          alt={`${profileData.socialLinks.github}'s Github chart`}
                          className={`w-full h-auto max-w-full ${isDarkMode ? 'filter invert hue-rotate-180 brightness-110 contrast-125' : ''}`}
                          style={{ filter: isDarkMode ? 'invert(1) hue-rotate(180deg) brightness(1.2)' : 'none' }}
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

  return (
    <div className="relative p-4 md:p-8 w-full min-h-[calc(100vh-4rem)] max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Left Navigation Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className={`sticky top-24 rounded-2xl flex flex-col gap-2 p-2 ${isDarkMode ? 'bg-[#111]' : 'bg-white'} shadow-sm`}>
          <button 
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-sm
              ${isDarkMode ? 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
            `}
            onClick={handleBack}
          >
            <span className="text-lg pb-0.5">&lt;</span> Back
          </button>
          
          <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-2"></div>
          
          <button 
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-sm
              ${activeTab === 'details' 
                ? (isDarkMode ? 'bg-gray-800 text-white shadow-inner border border-gray-700' : 'bg-white text-gray-900 shadow-md border border-gray-100') 
                : (isDarkMode ? 'text-gray-400 hover:bg-gray-800/50' : 'text-gray-500 hover:bg-gray-50')
              }
            `}
            onClick={() => goToTab('details')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Profile details
          </button>
          
          <button 
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-sm
              ${activeTab === 'milestones' 
                ? (isDarkMode ? 'bg-gray-800 text-white shadow-inner border border-gray-700' : 'bg-white text-gray-900 shadow-md border border-gray-100') 
                : (isDarkMode ? 'text-gray-400 hover:bg-gray-800/50' : 'text-gray-500 hover:bg-gray-50')
              }
            `}
            onClick={() => goToTab('milestones')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            Milestones
          </button>
          
          <button 
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-sm
              ${activeTab === 'progress' 
                ? (isDarkMode ? 'bg-gray-800 text-white shadow-inner border border-gray-700' : 'bg-white text-gray-900 shadow-md border border-gray-100') 
                : (isDarkMode ? 'text-gray-400 hover:bg-gray-800/50' : 'text-gray-500 hover:bg-gray-50')
              }
            `}
            onClick={() => goToTab('progress')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Progress
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0 pb-24">
        {activeTab === 'details' && renderProfileDetailsTab()}
        {activeTab === 'milestones' && renderMilestonesTab()}
        {activeTab === 'progress' && renderProgressTab()}
      </div>

      {/* Sticky Save/Cancel Bar - only visible when editing on details tab */}
      {isEditing && activeTab === 'details' && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t px-6 py-3 flex items-center justify-between gap-4 shadow-2xl backdrop-blur-sm transition-all animate-slideUp ${
          isDarkMode ? 'bg-[#111]/95 border-gray-800' : 'bg-white/95 border-gray-200'
        }`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              Unsaved changes
            </span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={cancelEdit}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors border ${
                isDarkMode
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Discard
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition-all shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

