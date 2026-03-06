import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import LogoIcon from "../components/LogoIcon";

const ForgotPassword = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const bg = isDarkMode ? "bg-[#0a0a0f] text-white" : "bg-gray-50 text-gray-900";
  const inputCls = isDarkMode
    ? "bg-white/[0.06] border-white/[0.12] text-white placeholder-gray-500 focus:ring-indigo-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500";
  const cardCls = isDarkMode
    ? "bg-white/[0.04] border-white/[0.08]"
    : "bg-white border-gray-200 shadow-xl";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    setResetUrl("");
    try {
      const response = await axios.post(`${API_BASE_URL}/password/forgot`, { email: email.trim() });
      if (response.data?.devMode && response.data?.resetUrl) {
        setResetUrl(response.data.resetUrl);
      }
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${bg}`}>
      {/* Background effects */}
      {isDarkMode && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        </div>
      )}

      <div className={`relative z-10 w-full max-w-md border rounded-2xl p-8 ${cardCls}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 group w-fit">
          <LogoIcon className={`w-9 h-9 group-hover:scale-105 transition-transform ${isDarkMode ? "text-white" : "text-indigo-600"}`} />
          <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Prep2Place</span>
        </Link>

        {!sent ? (
          <>
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Forgot password?</h1>
            <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Enter your registered email and we'll send you a reset link.
            </p>

            {error && (
              <div className="mb-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending…
                  </>
                ) : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Check your inbox</h2>
            <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              We sent a password reset link to <strong>{email}</strong>. It expires in 1 hour.
            </p>

            {resetUrl && (
              <div className="mt-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left mb-6">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-bold mb-2 uppercase tracking-wide">
                  Development Mode
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  In development, emails are not sent automatically. Click below to continue:
                </p>
                <a href={resetUrl} className="block w-full text-center py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors">
                  Reset Password Now
                </a>
              </div>
            )}

            <button
              onClick={() => { setSent(false); setEmail(""); setResetUrl(""); }}
              className={`text-sm text-indigo-500 hover:text-indigo-400 transition-colors w-full text-center ${resetUrl ? 'mt-2' : ''}`}
            >
              ← Try a different email
            </button>
          </div>
        )}

        <p className={`text-center text-sm mt-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Remember it?{" "}
          <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
