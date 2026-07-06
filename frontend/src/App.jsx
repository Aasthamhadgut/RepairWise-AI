import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analyzer from "./pages/Analyzer.jsx";
import Result from "./pages/Result.jsx";
import History from "./pages/History.jsx";
import RecyclingGuide from "./pages/RecyclingGuide.jsx";
import LearningCenter from "./pages/LearningCenter.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <main className="mx-auto max-w-4xl px-4 py-16 text-center font-bold text-forest">Checking login...</main>;
  }
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/analyzer" element={<ProtectedRoute><Analyzer /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/recycling-guide" element={<ProtectedRoute><RecyclingGuide /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningCenter /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
