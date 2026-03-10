import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import LogoIcon from "../components/LogoIcon";
import API_BASE_URL from "../utils/apiConfig";

const FEATURES = [
  { icon: "🎯", title: "AI-Powered Interviews", desc: "Practice with real-time AI feedback and analytics." },
  { icon: "🗺️", title: "Personalized Roadmaps", desc: "Follow curated paths tailored to your goals." },
  { icon: "🚀", title: "Career Accelerator", desc: "Land your dream job faster with expert guidance." },
];

const METHODS = [
  { id: "email", label: "Email / Username" },
  { id: "mobile", label: "Mobile" },
];

const SignIn = () => {
  const { isDarkMode } = useTheme();
  const [loginMethod, setLoginMethod] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Switch tab — clear everything
  const switchMethod = (method) => {
    setLoginMethod(method);
    setIdentifier("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setError("");
    setInfo("");
  };

  const handleEmailOrUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) { setError("Please enter your email or username."); return; }
    if (!password.trim())  { setError("Please enter your password."); return; }
    setLoading(true);
    setError("");
    try {
      const { data: res } = await axios.post(`${API_BASE_URL}/auth`, {
        identifier,
        password,
      });
      localStorage.setItem("token", res.data);
      setShowToast(true);
      setTimeout(() => { window.location.href = "/home"; }, 1200);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    const clean = identifier.replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data: res } = await axios.post(`${API_BASE_URL}/otp/send`, { phone: clean });
      setOtpSent(true);
      const hint = res.maskedEmail ? ` → ${res.maskedEmail}` : "";
      setInfo(res.message + hint);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length < 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const clean = identifier.replace(/\D/g, "");
      const { data: res } = await axios.post(`${API_BASE_URL}/otp/verify`, {
        phone: clean,
        otp: otp.trim(),
      });
      localStorage.setItem("token", res.data);
      setShowToast(true);
      setTimeout(() => { window.location.href = "/home"; }, 1200);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    }
  };

  const handleSocial = (provider) => {
    window.location.href = `${API_BASE_URL}/oauth/${provider.toLowerCase()}`;
  };

  // ── Theme tokens ──────────────────────────────────────────────────────────
  const bg = isDarkMode ? "bg-[#0a0a0f] text-white" : "bg-gray-50 text-gray-900";
  const inputCls = isDarkMode
    ? "bg-white/[0.06] border-white/[0.12] text-white placeholder-gray-500 focus:ring-indigo-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500";
  const labelCls    = isDarkMode ? "text-gray-300" : "text-gray-700";
  const mutedCls    = isDarkMode ? "text-gray-400" : "text-gray-500";
  const tabWrapper  = isDarkMode ? "bg-white/[0.05] border-white/[0.08]" : "bg-gray-100 border-gray-200";
  const socialBtn   = isDarkMode
    ? "bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] text-gray-200"
    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm";
  const divider     = isDarkMode ? "bg-white/[0.08]" : "bg-gray-200";
  const leftPanel   = isDarkMode
    ? "bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-[#0a0a0f]"
    : "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800";
  const featureCard = isDarkMode
    ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
    : "bg-white/[0.1] border-white/[0.15] hover:bg-white/[0.2]";

  const placeholder = {
    email:  "Email address or username",
    mobile: "Enter 10-digit number",
  }[loginMethod];

  return (
    <div className={`min-h-screen flex ${bg} overflow-hidden relative transition-colors duration-300`}>

      {/* Background effects */}
      {isDarkMode && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${isDarkMode ? "opacity-[0.04]" : "opacity-[0.03]"}`}
          style={{ backgroundImage: "linear-gradient(rgba(100,100,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── Left Panel ── */}
      <div className={`hidden lg:flex w-5/12 flex-col justify-between p-12 relative z-10 ${leftPanel}`}>
        <Link to="/" className="flex items-center gap-3 group">
          <LogoIcon className="w-10 h-10 text-white group-hover:scale-105 transition-transform drop-shadow-lg" glow={true} />
          <span className="text-xl font-bold text-white tracking-tight">Prep2Place</span>
        </Link>

        <div>
          <h2 className="text-3xl font-bold leading-tight mb-3 text-white">
            Ace every interview,<br /><span className="text-indigo-200">land your dream job</span>
          </h2>
          <p className="text-indigo-100/80 text-sm leading-relaxed mb-10">
            Your all-in-one platform to master technical interviews, grow your network, and land your dream job.
          </p>
          <div className="space-y-3">
            {FEATURES.map((f) => (
              <div key={f.title} className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${featureCard}`}>
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm mb-0.5 text-white">{f.title}</p>
                  <p className="text-xs text-white/60">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/30">© 2026 Prep2Place · All rights reserved</p>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center gap-3 group">
              <LogoIcon className={`w-9 h-9 group-hover:scale-105 transition-transform ${isDarkMode ? "text-white" : "text-indigo-600"}`} />
              <span className={`text-lg font-bold hidden sm:block ${isDarkMode ? "text-white" : "text-gray-900"}`}>Prep2Place</span>
            </Link>
          </div>

          {/* Success toast */}
          {showToast && (
            <div className="mb-5 flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-300 px-5 py-3 rounded-2xl">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm font-medium">Signed in! Redirecting…</span>
            </div>
          )}

          <div className="mb-6">
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Welcome back</h1>
            <p className={mutedCls}>Sign in to continue to your dashboard.</p>
          </div>

          {/* Method Tabs */}
          <div className={`flex p-1 border rounded-xl mb-5 ${tabWrapper}`}>
            {METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => switchMethod(m.id)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginMethod === m.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : `${mutedCls} hover:${isDarkMode ? "text-white" : "text-gray-900"}`}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          {/* Info Banner */}
          {info && (
            <div className="mb-4 flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 text-blue-500 px-4 py-3 rounded-xl text-sm">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {info}
            </div>
          )}

          {/* ── EMAIL / USERNAME FORM ── */}
          {(loginMethod === "email" || loginMethod === "username") && (
            <form onSubmit={handleEmailOrUsernameSubmit} className="space-y-4" noValidate>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelCls}`}>
                  Email address or Username
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={placeholder}
                  autoComplete="username"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls}`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`text-sm font-medium ${labelCls}`}>Password</label>
                  <Link to="/forgot-password" className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
                    {showPass
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || showToast}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading
                  ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Signing in…</>
                  : "Sign In"}
              </button>
            </form>
          )}

          {/* ── MOBILE / OTP FORM ── */}
          {loginMethod === "mobile" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4" noValidate>
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${labelCls}`}>Mobile number</label>
                <div className="flex">
                  <span className={`inline-flex items-center px-4 border border-r-0 rounded-l-xl text-sm font-medium ${isDarkMode ? "bg-white/[0.06] border-white/[0.12] text-gray-400" : "bg-gray-100 border-gray-300 text-gray-500"}`}>+91</span>
                  <input
                    type="tel"
                    value={identifier}
                    onChange={(e) => { setIdentifier(e.target.value.replace(/\D/g, "")); setError(""); }}
                    placeholder="98765 43210"
                    maxLength={10}
                    className={`flex-1 px-4 py-3 border rounded-r-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls}`}
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${labelCls}`}>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit OTP"
                    maxLength={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent tracking-widest text-center text-lg font-semibold transition ${inputCls}`}
                  />
                </div>
              )}

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Verify &amp; Sign In
                </button>
              )}

              <p className={`text-center text-xs ${mutedCls}`}>
                OTP will be sent to your registered mobile number via SMS.
              </p>
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className={`flex-1 h-px ${divider}`} />
            <span className={`text-xs ${mutedCls}`}>or continue with</span>
            <div className={`flex-1 h-px ${divider}`} />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => handleSocial("Google")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${socialBtn}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.412 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg>
              Google
            </button>
            <button type="button" onClick={() => handleSocial("GitHub")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${socialBtn}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12"/></svg>
              GitHub
            </button>
          </div>

          <p className={`text-center text-sm mt-6 ${mutedCls}`}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors">
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
