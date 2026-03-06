import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import LogoIcon from "../components/LogoIcon";
import API_BASE_URL from "../utils/apiConfig";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const bg = isDarkMode ? "bg-[#0a0a0f] text-white" : "bg-gray-50 text-gray-900";
  const inputCls = isDarkMode
    ? "bg-white/[0.06] border-white/[0.12] text-white placeholder-gray-500 focus:ring-indigo-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500";
  const cardCls = isDarkMode
    ? "bg-white/[0.04] border-white/[0.08]"
    : "bg-white border-gray-200 shadow-xl";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/password/reset/${token}`, { password });
      setDone(true);
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength
  const strength = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    ? "strong" : password.length >= 6 ? "medium" : password.length > 0 ? "weak" : "";
  const strengthColor = { strong: "bg-emerald-500", medium: "bg-yellow-400", weak: "bg-red-500" }[strength] || "";
  const strengthW = { strong: "w-full", medium: "w-2/3", weak: "w-1/3" }[strength] || "w-0";

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${bg}`}>
      {isDarkMode && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        </div>
      )}

      <div className={`relative z-10 w-full max-w-md border rounded-2xl p-8 ${cardCls}`}>
        <Link to="/" className="flex items-center gap-3 mb-8 group w-fit">
          <LogoIcon className={`w-9 h-9 group-hover:scale-105 transition-transform ${isDarkMode ? "text-white" : "text-indigo-600"}`} />
          <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Prep2Place</span>
        </Link>

        {!done ? (
          <>
            <h1 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Set new password</h1>
            <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Choose a strong password you haven't used before.
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
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>New password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Min. 6 characters"
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
                    {showPass
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  </button>
                </div>
                {/* Strength bar */}
                {password && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10">
                      <div className={`h-full rounded-full transition-all duration-300 ${strengthColor} ${strengthW}`} />
                    </div>
                    <p className={`text-xs mt-1 capitalize ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{strength} password</p>
                  </div>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Confirm password</label>
                <input
                  type={showPass ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                  placeholder="Repeat your password"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition ${inputCls} ${confirm && confirm !== password ? "border-red-500/50" : ""}`}
                />
                {confirm && confirm !== password && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || (confirm && confirm !== password)}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Resetting…
                  </>
                ) : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Password reset!</h2>
            <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Your password has been changed. Redirecting to sign in…
            </p>
            <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors text-sm">
              Sign in now →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
