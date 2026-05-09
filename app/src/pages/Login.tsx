import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Brain, ArrowRight } from "lucide-react";

function getOAuthUrl() {
  const authUrl = new URL(
    `${import.meta.env.VITE_KIMI_AUTH_URL}/api/oauth/authorize`
  );
  authUrl.searchParams.set("client_id", import.meta.env.VITE_APP_ID);
  authUrl.searchParams.set(
    "redirect_uri",
    `${window.location.origin}/api/oauth/callback`
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "profile");
  authUrl.searchParams.set(
    "state",
    btoa(Math.random().toString(36).substring(2))
  );
  return authUrl.toString();
}

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#314934]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#fbf6c5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#314934]/30 rounded-xl mb-4">
            <Brain className="w-7 h-7 text-[#61be72]" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-1">TheOptimizer</h1>
          <p className="text-sm text-gray-400">AI-Powered Loan Recovery Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-lg font-semibold text-white mb-1 text-center">Welcome Back</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Sign in to access your dashboard</p>

          <a
            href={getOAuthUrl()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#314934] text-white rounded-lg hover:bg-[#3d5f42] transition-all font-medium"
          >
            Sign in with Kimi <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            \u2190 Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
