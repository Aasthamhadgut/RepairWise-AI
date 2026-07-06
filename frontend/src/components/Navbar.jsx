import { Link } from "react-router-dom";
import { LogOut, Recycle, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, demoLogout } = useAuth();
  function signOutUser() {
    demoLogout();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-black text-forest">
          <Recycle size={26} />
          RepairWise AI
        </Link>
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-700 md:flex">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analyzer">Analyzer</Link>
          <Link to="/history">History</Link>
          <Link to="/recycling-guide">Recycle</Link>
          <Link to="/learning">Learn</Link>
        </div>
        {user ? (
          <button onClick={signOutUser} className="flex items-center gap-2 rounded-xl bg-forest px-4 py-2 text-sm font-bold text-white">
            <LogOut size={17} />
            Logout
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-2 rounded-xl bg-forest px-4 py-2 text-sm font-bold text-white">
            <UserRound size={17} />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
