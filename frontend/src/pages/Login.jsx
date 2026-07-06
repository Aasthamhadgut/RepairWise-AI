import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, registerWithEmail } from "../services/firebase";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState({ name: "", phone: "", city: "", role: "Student", organization: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  async function submit(event) {
    event.preventDefault();
    setMessage("Working...");
    try {
      const credential = mode === "register"
        ? await registerWithEmail(email, password, { ...profile, email })
        : await loginWithEmail(email, password);
      demoLogin(credential.user.profile || { ...profile, email, name: credential.user.displayName });
      setMessage("Authentication successful.");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function updateProfileField(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-66px)] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <section>
        <p className="font-bold text-leaf">Secure Email Authentication</p>
        <h1 className="mt-3 text-5xl font-black text-ink">Welcome back to wiser repair decisions.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Login is required before using the website, analyzer, reports, recycling guide, and learning center.</p>
      </section>
      <form onSubmit={submit} className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-soft">
        <div className="mb-6 flex gap-2 rounded-xl bg-emerald-50 p-1">
          {["login", "register"].map((item) => (
            <button type="button" key={item} onClick={() => setMode(item)} className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold ${mode === item ? "bg-white text-forest shadow" : "text-slate-500"}`}>
              {item}
            </button>
          ))}
        </div>
        {mode === "register" && (
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold text-slate-700">Full Name<input className="input mt-2" value={profile.name} onChange={(e) => updateProfileField("name", e.target.value)} required /></label>
            <label className="text-sm font-bold text-slate-700">Phone<input className="input mt-2" value={profile.phone} onChange={(e) => updateProfileField("phone", e.target.value)} required /></label>
            <label className="text-sm font-bold text-slate-700">City<input className="input mt-2" value={profile.city} onChange={(e) => updateProfileField("city", e.target.value)} required /></label>
            <label className="text-sm font-bold text-slate-700">Role<select className="input mt-2" value={profile.role} onChange={(e) => updateProfileField("role", e.target.value)}><option>Student</option><option>Consumer</option><option>Repair Shop</option><option>Recycler</option></select></label>
            <label className="text-sm font-bold text-slate-700 md:col-span-2">School / Company / Organization<input className="input mt-2" value={profile.organization} onChange={(e) => updateProfileField("organization", e.target.value)} /></label>
          </div>
        )}
        <label className="text-sm font-bold text-slate-700">Email</label>
        <input className="input mt-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label className="mt-4 block text-sm font-bold text-slate-700">Password</label>
        <input className="input mt-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} />
        <button className="btn-primary mt-6 w-full" type="submit">Continue</button>
        {message && <p className="mt-4 text-sm font-semibold text-slate-600">{message}</p>}
      </form>
    </main>
  );
}
