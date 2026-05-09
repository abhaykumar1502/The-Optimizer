import { useNavigate } from "react-router";
import { Brain, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Brain className="w-12 h-12 text-[#61be72]/30 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#314934] text-white rounded-lg hover:bg-[#3d5f42] transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Home
        </button>
      </div>
    </div>
  );
}
