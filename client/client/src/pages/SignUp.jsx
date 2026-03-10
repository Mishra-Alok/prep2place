import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import LogoIcon from "../components/LogoIcon";
import API_BASE_URL from "../utils/apiConfig";

const PERKS = [
  { icon: "✦", text: "AI-powered interview practice" },
  { icon: "✦", text: "Personalized learning roadmaps" },
  { icon: "✦", text: "Resume & portfolio builder" },
  { icon: "✦", text: "Access to coding communities" },
];

const SignUp = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("Please accept the Terms of Service to continue."); return; }
    setLoading(true);
    setError("");
    try {
      const url = `${API_BASE_URL}/users`;
      await axios.post(url, data);
      setShowToast(true);
      setTimeout(() => { navigate("/signin"); }, 2000);
    } catch (err) {
      setLoading(false);
      if (err.response?.status >= 400 && err.response?.status <= 500) {
        setError(err.response.data.message || "Something went wrong. Please try again.");
      }
    }
  };

  const handleSocial = (provider) => {
    const providerPath = provider.toLowerCase();
    window.location.href = `${API_BASE_URL}/oauth/${providerPath}`;
  };

  // Password strength
  const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(data.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

  // Dynamic theme styles
  const bg = isDarkMode ? "bg-[#0a0a0f] text-white" : "bg-gray-50 text-gray-900";
  const inputBg = isDarkMode
    ? "bg-white/[0.06] border-white/[0.1] text-white placeholder-gray-500 focus:ring-indigo-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500";
  const labelColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-500";
  const dividerLine = isDarkMode ? "bg-white/[0.08]" : "bg-gray-200";
  const socialBtn = isDarkMode
    ? "bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] text-gray-200"
    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm";
  const leftPanel = isDarkMode
    ? "bg-gradient-to-br from-purple-900/60 via-indigo-900/40 to-[#0a0a0f]"
    : "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700";
  const featureCard = isDarkMode
    ? "bg-white/[0.03] border-white/[0.06]"
    : "bg-white/[0.1] border-white/[0.15]";
  const noticeBox = isDarkMode
    ? "bg-indigo-500/5 border-indigo-500/15 text-indigo-300"
    : "bg-indigo-50 border-indigo-200 text-indigo-600";

  return (
    <div className={`min-h-screen flex ${bg} overflow-hidden relative transition-colors duration-300`}>

      {/* Background Effects */}
      {isDarkMode && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? "opacity-[0.04]" : "opacity-[0.03]"}`}
          style={{ backgroundImage: "linear-gradient(rgba(100,100,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ─── Left Panel ─── */}
      <div className={`hidden lg:flex w-5/12 flex-col justify-between p-12 relative z-10 ${leftPanel}`}>
        <Link to="/" className="flex items-center gap-3 group">
          <LogoIcon className="w-10 h-10 text-white group-hover:scale-105 transition-transform drop-shadow-lg" glow={true} />
          <span className="text-xl font-bold text-white tracking-tight">Prep2Place</span>
        </Link>

        <div>
          <h2 className="text-3xl font-bold leading-tight mb-3 text-white">
            Start your journey<br />
            <span className="text-indigo-200">to your dream job</span>
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Fill in basics to get started. Add more details like location, skills, and social links from your Profile page anytime.
          </p>
          <div className={`rounded-2xl p-5 border mb-6 ${featureCard}`}>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">What you get for free</p>
            <ul className="space-y-2.5">
              {PERKS.map((p) => (
                <li key={p.text} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-indigo-300 text-xs">{p.icon}</span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-white/25">© 2026 Prep2Place · All rights reserved</p>
      </div>

      {/* ─── Right Form Panel ─── */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center gap-3 group">
              <LogoIcon className={`w-9 h-9 group-hover:scale-105 transition-transform ${isDarkMode ? "text-white" : "text-indigo-600"}`} />
              <span className={`text-lg font-bold hidden sm:block ${isDarkMode ? "text-white" : "text-gray-900"}`}>Prep2Place</span>
            </Link>
          </div>

          {/* Toast */}
          {showToast && (
            <div className="mb-5 flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-300 px-5 py-3 rounded-2xl">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm font-medium">Account created! Redirecting to sign in…</span>
            </div>
          )}

          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Create your account</h1>
            <p className={mutedText}>Just the basics. Add more from your profile later.</p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button onClick={() => handleSocial("Google")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${socialBtn}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.412 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg>
              Google
            </button>
            <button onClick={() => handleSocial("GitHub")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${socialBtn}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12"/></svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`flex-1 h-px ${dividerLine}`} />
            <span className={`text-xs ${mutedText}`}>or fill in your details</span>
            <div className={`flex-1 h-px ${dividerLine}`} />
          </div>

          {/* Error / Info */}
          {error && (
            <div className="mb-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          {info && (
            <div className="mb-4 flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 text-blue-500 px-4 py-3 rounded-xl text-sm">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>First name</label>
                <input type="text" name="firstName" value={data.firstName} onChange={handleChange}
                  placeholder="John" required
                  className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputBg}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>Last name</label>
                <input type="text" name="lastName" value={data.lastName} onChange={handleChange}
                  placeholder="Doe" required
                  className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputBg}`} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>Email address</label>
              <input type="email" name="email" value={data.email} onChange={handleChange}
                placeholder="you@example.com" required
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputBg}`} />
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${labelColor}`}>Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} name="password" value={data.password} onChange={handleChange}
                  placeholder="Create a strong password" required
                  className={`w-full px-4 py-2.5 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputBg}`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              {/* Strength bar */}
              {data.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: i <= strength ? strengthColors[strength] : (isDarkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb") }} />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColors[strength] || "#888" }}>
                    {data.password.length > 0 ? strengthLabels[strength] || "Too short" : ""}
                  </p>
                </div>
              )}
            </div>

            {/* Profile hint */}
            <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${noticeBox}`}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-xs leading-relaxed">
                You can add location, university, social links & skills from your <strong>Profile</strong> page after signing in.
              </p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-indigo-500 cursor-pointer flex-shrink-0" />
              <span className={`text-sm ${mutedText}`}>
                I agree to the{" "}
                <a href="#" className="text-indigo-500 hover:text-indigo-400 underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-indigo-500 hover:text-indigo-400 underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || showToast}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                  Creating account…
                </>
              ) : "Create free account →"}
            </button>
          </form>

          <p className={`text-center text-sm mt-5 ${mutedText}`}>
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
