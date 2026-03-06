import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * This page handles the OAuth redirect from the backend.
 * The backend redirects to /oauth/callback?token=<JWT>
 * We store the token and redirect to /home.
 */
const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } else {
      // Either 'error' query param or just no token
      navigate("/signin?error=" + (error || "oauth_failed"), { replace: true });
    }
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] dark:bg-gray-900">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <p className="text-white text-lg font-medium">Completing sign in…</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
